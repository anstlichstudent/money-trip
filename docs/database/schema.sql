-- Draft design only. Not a deployed migration.
CREATE TABLE trips (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL CHECK (length(trim(name)) > 0),
  viewer_token_hash TEXT NOT NULL UNIQUE,
  created_at INTEGER NOT NULL
);

CREATE TABLE participants (
  id TEXT PRIMARY KEY NOT NULL,
  trip_id TEXT NOT NULL REFERENCES trips(id),
  name TEXT NOT NULL CHECK (length(trim(name)) > 0),
  split_order INTEGER NOT NULL CHECK (split_order >= 0),
  UNIQUE (trip_id, id),
  UNIQUE (trip_id, split_order)
);

CREATE TABLE expenses (
  id TEXT PRIMARY KEY NOT NULL,
  trip_id TEXT NOT NULL REFERENCES trips(id),
  payer_id TEXT NOT NULL,
  name TEXT NOT NULL CHECK (length(trim(name)) > 0),
  kind TEXT NOT NULL CHECK (kind IN ('items', 'shared')),
  input_json TEXT NOT NULL CHECK (json_valid(input_json)),
  total_rupiah INTEGER NOT NULL CHECK (typeof(total_rupiah) = 'integer' AND total_rupiah BETWEEN 0 AND 9007199254740991),
  version INTEGER NOT NULL DEFAULT 1 CHECK (version >= 1),
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  UNIQUE (trip_id, id),
  FOREIGN KEY (trip_id, payer_id) REFERENCES participants(trip_id, id)
);

CREATE TABLE expense_shares (
  trip_id TEXT NOT NULL,
  expense_id TEXT NOT NULL,
  participant_id TEXT NOT NULL,
  amount_rupiah INTEGER NOT NULL CHECK (typeof(amount_rupiah) = 'integer' AND amount_rupiah BETWEEN 0 AND 9007199254740991),
  PRIMARY KEY (expense_id, participant_id),
  FOREIGN KEY (trip_id, expense_id) REFERENCES expenses(trip_id, id) ON DELETE CASCADE,
  FOREIGN KEY (trip_id, participant_id) REFERENCES participants(trip_id, id)
);

CREATE TABLE settlements (
  id TEXT PRIMARY KEY NOT NULL,
  trip_id TEXT NOT NULL REFERENCES trips(id),
  sender_id TEXT NOT NULL,
  receiver_id TEXT NOT NULL,
  amount_rupiah INTEGER NOT NULL CHECK (typeof(amount_rupiah) = 'integer' AND amount_rupiah BETWEEN 1 AND 9007199254740991),
  version INTEGER NOT NULL DEFAULT 1 CHECK (version >= 1),
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL,
  CHECK (sender_id <> receiver_id),
  FOREIGN KEY (trip_id, sender_id) REFERENCES participants(trip_id, id),
  FOREIGN KEY (trip_id, receiver_id) REFERENCES participants(trip_id, id)
);

CREATE TABLE sessions (
  token_hash TEXT PRIMARY KEY NOT NULL,
  expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);

CREATE TABLE write_requests (
  trip_id TEXT NOT NULL REFERENCES trips(id),
  request_id TEXT NOT NULL,
  operation TEXT NOT NULL CHECK (operation IN ('create_expense', 'update_expense', 'delete_expense', 'record_settlement', 'update_settlement', 'delete_settlement')),
  input_hash TEXT NOT NULL,
  result_json TEXT NOT NULL CHECK (json_valid(result_json)),
  created_at INTEGER NOT NULL,
  PRIMARY KEY (trip_id, request_id)
);

CREATE INDEX expenses_trip_history ON expenses(trip_id, created_at, id);
CREATE INDEX expenses_payer ON expenses(trip_id, payer_id);
CREATE INDEX shares_participant ON expense_shares(trip_id, participant_id);
CREATE INDEX settlements_sender ON settlements(trip_id, sender_id);
CREATE INDEX settlements_receiver ON settlements(trip_id, receiver_id);
CREATE INDEX settlements_trip_history ON settlements(trip_id, created_at, id);
CREATE INDEX sessions_expiry ON sessions(expires_at);
