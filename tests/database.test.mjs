import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { afterEach, beforeEach, test } from 'node:test';
import { Miniflare } from 'miniflare';

let runtime;
let db;
beforeEach(async () => {
  runtime = new Miniflare({
    workers: [{ config: {
      name: 'database-tests',
      compatibilityDate: '2026-10-12',
      manifest: {
        mainModule: 'worker.js',
        modules: {
          'worker.js': { type: 'esm', contents: 'export default { fetch() { return new Response(null, { status: 404 }); } };' },
        },
      },
      env: { DB: { type: 'd1', id: 'database-tests' } },
    } }],
  });
  db = await runtime.getD1Database('DB');
  const sql = await readFile(new URL('../migrations/0001_initial.sql', import.meta.url), 'utf8');
  await db.batch(sql.split(';').filter((statement) => statement.trim()).map((statement) => db.prepare(statement)));
});
afterEach(async () => { await runtime?.dispose(); });

test('initial migration creates all tables without example data', async () => {
  for (const table of ['trips', 'participants', 'expenses', 'expense_shares', 'settlements', 'sessions', 'write_requests']) {
    assert.equal(await db.prepare(`SELECT COUNT(*) FROM ${table}`).first('COUNT(*)'), 0);
  }
});

async function run(sql, ...values) {
  return db.prepare(sql).bind(...values).run();
}

async function seedTrips() {
  await run("INSERT INTO trips VALUES ('trip-a', 'Trip A', 'hash-a', 1), ('trip-b', 'Trip B', 'hash-b', 1)");
  await run("INSERT INTO participants VALUES ('a', 'trip-a', 'A', 0), ('b', 'trip-a', 'B', 1), ('c', 'trip-b', 'C', 0)");
}

async function expense(id, trip = 'trip-a', payer = 'a', amount = 100) {
  return run("INSERT INTO expenses VALUES (?, ?, ?, 'Meal', 'shared', '{}', ?, 1, 1, 1)", id, trip, payer, amount);
}

async function settlement(id, sender = 'a', receiver = 'b', amount = 100) {
  return run("INSERT INTO settlements VALUES (?, 'trip-a', ?, ?, ?, 1, 1, 1)", id, sender, receiver, amount);
}

test('rupiah values reject fractions and amounts outside the safe integer range', async () => {
  await seedTrips();
  await expense('money-expense');
  await run("INSERT INTO expense_shares VALUES ('trip-a', 'money-expense', 'b', 100)");
  await settlement('money-settlement');
  for (const [table, column, minimum] of [
    ['expenses', 'total_rupiah', 0],
    ['expense_shares', 'amount_rupiah', 0],
    ['settlements', 'amount_rupiah', 1],
  ]) {
    for (const value of [-1, 1.5, 9007199254740992, ...(minimum === 1 ? [0] : [])]) {
      await assert.rejects(run(`UPDATE ${table} SET ${column} = ?`, value), /CHECK constraint failed/);
    }
    await run(`UPDATE ${table} SET ${column} = ?`, minimum);
    await run(`UPDATE ${table} SET ${column} = ?`, Number.MAX_SAFE_INTEGER);
    assert.equal(await db.prepare(`SELECT ${column} FROM ${table}`).first(column), Number.MAX_SAFE_INTEGER);
  }
});

test('foreign keys reject missing records and participants from another trip on insert and update', async () => {
  await seedTrips();
  await expense('money-expense');
  await run("INSERT INTO expense_shares VALUES ('trip-a', 'money-expense', 'b', 100)");
  await settlement('money-settlement');
  await assert.rejects(run("INSERT INTO participants VALUES ('orphan', 'missing', 'Orphan', 0)"), /FOREIGN KEY constraint failed/);
  await assert.rejects(expense('foreign-payer', 'trip-a', 'c'), /FOREIGN KEY constraint failed/);
  await assert.rejects(expense('missing-payer', 'trip-a', 'missing'), /FOREIGN KEY constraint failed/);
  await expense('foreign-expense', 'trip-b', 'c');
  await assert.rejects(run("INSERT INTO expense_shares VALUES ('trip-a', 'money-expense', 'c', 1)"), /FOREIGN KEY constraint failed/);
  await assert.rejects(run("INSERT INTO expense_shares VALUES ('trip-a', 'foreign-expense', 'a', 1)"), /FOREIGN KEY constraint failed/);
  await assert.rejects(run("INSERT INTO expense_shares VALUES ('trip-a', 'missing', 'a', 1)"), /FOREIGN KEY constraint failed/);
  await assert.rejects(settlement('foreign-sender', 'c', 'b'), /FOREIGN KEY constraint failed/);
  await assert.rejects(settlement('foreign-receiver', 'a', 'c'), /FOREIGN KEY constraint failed/);
  await assert.rejects(settlement('self-payment', 'a', 'a'), /CHECK constraint failed/);
  for (const sql of [
    "UPDATE expenses SET payer_id = 'c' WHERE id = 'money-expense'",
    "UPDATE expense_shares SET participant_id = 'c' WHERE expense_id = 'money-expense'",
    "UPDATE expense_shares SET expense_id = 'foreign-expense' WHERE expense_id = 'money-expense'",
    "UPDATE settlements SET sender_id = 'c' WHERE id = 'money-settlement'",
    "UPDATE settlements SET receiver_id = 'c' WHERE id = 'money-settlement'",
  ]) {
    await assert.rejects(run(sql), /FOREIGN KEY constraint failed/);
  }
});

test('deleting an expense removes its shares and preserves settlement records', async () => {
  await seedTrips();
  await expense('money-expense');
  await run("INSERT INTO expense_shares VALUES ('trip-a', 'money-expense', 'b', 100)");
  await settlement('money-settlement');
  await assert.rejects(run("DELETE FROM participants WHERE id = 'a'"), /FOREIGN KEY constraint failed/);
  await run("DELETE FROM expenses WHERE id = 'money-expense'");
  assert.equal(await db.prepare("SELECT COUNT(*) AS count FROM expense_shares WHERE expense_id = 'money-expense'").first('count'), 0);
  assert.equal(await db.prepare("SELECT COUNT(*) AS count FROM settlements WHERE id = 'money-settlement'").first('count'), 1);
});
