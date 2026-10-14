# Design System Inspiration of Money App

This file defines the visual system for the trip expense app. Use the current Pencil design as the visual source and the current feature specification as the source for behavior and calculations.

Sources:

- Pencil document: `/home/anstlich/Projects/rpl/brida-ojs-09/untitled.pen`. Read it through Pencil MCP.
- Foundation: `t7f4ha`. Original controls: `x4RNl3`.
- App component library: `ApV8W`.
- [HTML prototype](docs/prototype/index.html): screen and modal flow reference. It uses sample data and system font substitutes.
- [Design decisions and screen inventory](.scratch/trip-expenses/design-notes.md).
- [Feature specification](.scratch/trip-expenses/spec.md) and [technical specification](.scratch/trip-expenses/technical-spec.md).

The prototype is a reference, not production code. Its sample amounts do not define calculation rules. The component library board background is canvas tooling, not an app surface.

## 1. Visual Theme & Atmosphere

The app looks like a shared trip ledger. Warm white pages and white cards keep records readable. Deep wine headers give the trip and participant names a clear place. Large amounts make the next payment easy to find. Peach marks the receipt split and successful recording of a payment.

Use regular and medium type weights. Keep the layout in one column. Use space to separate records, but keep financial summaries compact. Give each action a clear text label.

- Warm page canvas: `#FEFCFB`.
- Wine headers and main actions: `#3A0303`.
- White cards with a `1px` light border.
- Main card radius: `24px`; card padding: `24px`.
- Page edges: `24px`; gap between main cards: `16px`.
- Overview total: `46px`, medium weight.
- Participant name in profile header: `44px`, medium weight.
- Main controls: `44–48px` high with pill corners.
- Receipts: `2px` corners, mono text, right-aligned amounts.
- Modal backdrop: `#16151299`; dialog radius: `24px`.

All app text is in English. Display amounts in whole rupiah, such as `Rp200.000`.

## 2. Color Palette & Roles

Pencil names use the `terms-` prefix. The CSS variable names below are their implementation mapping; they are not a claim that production CSS exists.

### Primary and text colors

- **Canvas** (`#FEFCFB`, `$terms-canvas`, `--terms-canvas`): page background and light text on wine.
- **Surface** (`#FFFFFF`, `$terms-surface`, `--terms-surface`): cards, dialogs, and receipt paper.
- **Ink** (`#161512`, `$terms-ink`, `--terms-ink`): headings, participant names, and main text on light surfaces.
- **Body** (`#555555`, `$terms-body`, `--terms-body`): descriptions, field labels, payer names, and supporting text.
- **Muted** (`#777777`, `$terms-muted`, `--terms-muted`): low emphasis metadata only where contrast is sufficient.
- **Subtle** (`#989490`, `$terms-subtle`, `--terms-subtle`): decoration. Do not use for required text on white.
- **Wine** (`#3A0303`, `$terms-wine`, `--terms-wine`): headers, primary buttons, links, and emphasized amounts on light surfaces.
- **Peach** (`#F7C4B2`, `$terms-peach`, `--terms-peach`): small labels on wine and the success check background.
- **Ember** (`#D63800`, `$terms-ember`, `--terms-ember`): foundation accent. It is not the default app action or status color.

### Surfaces and borders

- **Control** (`#F2F2F2`, `$terms-control`, `--terms-control`): inputs, nested debt cards, secondary buttons, and Refresh bars.
- **Border** (`#EEEEEE`, `$terms-border`, `--terms-border`): `1px` card borders and list separators.
- **Split wash** (`#F9EEE8`, `--receipt-split-wash`): receipt split background and login error message background.
- **Paper edge** (`#E2DDD8`, `--receipt-paper-edge`): receipt outline.
- **Paper divider** (`#DDD7D2`, `--receipt-divider`): receipt section dividers.
- **Split divider** (`#E8D8CC`, `--receipt-split-divider`): separators inside the peach receipt split.
- **Wine divider** (`#F7C4B244`, `--header-divider`): divider inside a dark header, about 27% peach opacity.
- **Wine outline** (`#F7C4B266`, `--header-outline`): Share link border on wine, 40% peach opacity.

### Overlay, shadows, and status

- **Modal overlay** (`#16151299`, `rgba(22,21,18,0.6)`): dims the underlying app while keeping its context visible.
- **Receipt shadow** (`#3A03030D`, `rgba(58,3,3,0.051)`): light paper elevation.
- **Success**: peach circle, wine check, and explicit `Payment recorded` text. There is no separate green success palette.
- **Error**: wine text on split wash, with a message that states the problem. Do not use color alone.
- **Warning**: no dedicated warning palette was finalized. Use an explicit warning message with the existing ink/wine colors until that state is designed.

## 3. Typography Rules

Primary stack: `"Geist", Arial, system-ui, sans-serif`.

Mono stack: `"Geist Mono", ui-monospace, SFMono-Regular, Consolas, monospace`.

Pencil uses Diatype and the HTML prototype uses Arial. The approved implementation uses Geist from Google Fonts for the UI and Geist Mono for receipts. Regular (400) and medium (500) files are stored in `public/fonts/`, with their SIL Open Font License files. Load `/fonts/fonts.css` and use `font-display: swap`. The app serves these files locally. Use tabular figures for aligned numeric columns.

| Role | Font | Size | Weight | Line height | Letter spacing | Notes |
| --- | --- | --- | --- | --- | --- | --- |
| Overview total | Sans | 46px | 500 | 1.05 | -1.5px | Primary amount in the overview header |
| Profile name | Sans | 44px | 500 | 1.4 | -1px | Participant identity |
| Payment success amount | Sans | 44px | 500 | 1.1 | -1.5px | Centered in confirmation card |
| Display title | Sans | 36px | 500 | 1.05 | -1px | Trip and login headers |
| Page heading | Sans | 32px | 500 | 1.4 | -0.8px | Input and payment pages |
| Summary amount | Sans | 28px | 500 | 1.1 | -0.7px | Still to settle and profile balances |
| Section heading | Sans | 22px | 500 | 1.2 | 0 | Main card headings; wrap when needed |
| Sub-heading | Sans | 18–20px | 400–500 | 1.3–1.4 | 0 | Person and payment direction |
| Participant card amount | Sans | 24px | 400–500 | 1.3 | -0.7px | Two labeled amounts per participant |
| Body | Sans | 14–16px | 400 | 1.4 | 0 | Form content and descriptions |
| History title | Sans | 15px | 400 | 1.4 | 0 | Expense name in a preview |
| Button | Sans | 13–14px | 500 | 1.3–1.4 | 0 | Text is always visible |
| Caption | Sans | 12–13px | 400 | 1.3–1.4 | 0 | Payer, status, and helper text |
| Micro label | Mono | 10–11px | 400–500 | 1.1–1.3 | 0.5–1px | Uppercase labels and table headings |
| Receipt heading | Mono | 18px | 500 | 1.3 | 0 | Centered expense title |
| Receipt line | Mono | 12px | 400 | 1.3 | 0 | Item, quantity, cost, tax, and discount |
| Receipt share | Mono | 22px | 500 | 1.1 | -0.8px | Emphasized participant share in review |
| Receipt total | Mono | 26px | 500 | 1.1 | -1px | Itemized review total |
| History amount | Mono | 13px | 400 | 1.4 | 0 | Right-aligned table and preview amounts |

Keep `Rp` and the amount together. Wrap descriptive text before reducing financial text size. Do not use a display heading size for every card.

## 4. Component Stylings

### Reusable components

The Pencil library contains 24 named masters. App screens remain regular frames. Their repeated parts are linked instances. Keep shared styles in components; vary names, values, status, and row data through instance content or props.

| Component group | Pencil master IDs | Use |
| --- | --- | --- |
| Participant card | `F8uJx` | Large overview card; light and wine variants |
| Payment direction row | `julh1` | Sender, recipient, and amount |
| Text and password inputs | `mSSRb`, `rH5dR` | Login controls |
| Text and icon buttons | `hSPoy`, `z04lX` | Primary and secondary action variants |
| Trip financial summary | `oLbjJ` | Compact dark header summary |
| Expense previews | `pRFtG`, `ibvNF`, `pE1Fa` | Receipt link, three rows, or two rows |
| Refresh bar | `PnwDC` | Bottom of overview and profiles |
| Receipts | `Lilyh`, `sWMpW` | Itemized review and participant split |
| Empty payment history | `kKPIK` | Empty state card |
| Profile balances | `Y2RprD` | Still owes and Still to receive |
| Debt cards | `mEMJi`, `GNJLv`, `R3BJpk` | Empty and populated lists |
| Balance calculation | `OVvtH` | How this adds up |
| History tables | `zLf34`, `bfUz5` | Three-row and two-row samples |
| Receipt share actions | `j9ELBr` | WhatsApp and Save image |
| History dialogs | `QZ4kG`, `BALgt` | Table modal variants |

Two-row and three-row masters reflect sample canvas structures. Production history components should accept rows as data rather than require separate code components for each row count. Some nested node IDs changed during component conversion. Read the current screen tree instead of using old part IDs.

### Buttons

- **Primary**: wine fill, canvas text, no shadow, `999px` radius, `48px` height, `16px` side padding. Use for Save expense, Record payment, and Sign in.
- **Primary on wine**: canvas fill and wine text. Used for Add expense in the overview header.
- **Secondary**: control fill, ink text, pill radius, `44–48px` height. Used for Close and Save image.
- **Header outline**: transparent wine surface, `1px` header-outline border, light text, `44px` height, `16px` side padding. Used for Share link at the top right. Its color was questioned but no replacement color was confirmed.
- **Text action**: wine text, medium weight. Used for View all and Record another payment. Give the actual control a touch target of at least `44px` even if the text is smaller.
- **Icon and text**: `16px` icon with `8px` gap. Use the existing icon family; never use a handmade WhatsApp logo. The current message-circle icon is a generic share channel symbol.

Hover, pressed, loading, and disabled states were not finalized in Pencil. Implementation guidance: keep the same palette on hover and press, use a small fill or opacity change, show a loading label, and prevent repeated submissions. Disabled controls must be visibly inactive and use native disabled behavior. Focus must have a visible `2px` outline with `2px` offset: wine on light surfaces and peach on wine. These state rules need validation during implementation.

### Cards and participant balances

Main cards use surface fill, `1px` border, `24px` corners, `24px` padding, and `20px` internal section gap. Do not add shadows to every card.

Participant cards use a `20px` medium name and two labeled amount columns. People with money to receive can use the wine variant; people who only owe use the light variant. If a participant both owes and receives, retain both labels and use explicit values rather than relying on color. Current specifications allow both indicators to be positive when different parties are involved.

Debt list inner cards use control fill, `16px` corners, `16px` padding, and a `16px` gap. Show person, status, remaining amount, and smaller expense detail rows. Keep empty cards visible with a clear statement and zero amount.

### Inputs and forms

Login inputs use control fill, `12px` corners, `52px` height, left padding `16px`, and right padding `12px`. Use a visible `13px` field label and a `14px` value or placeholder. Password visibility has a `44px` touch target and an `18px` eye icon.

Other form fields use the same control surface and corner treatment. Money fields use larger wine amounts. Errors use a `16px` padded split-wash area and wine text. Associate messages with their inputs. Do not put the only field label in a placeholder.

### Navigation and screen structure

Public and admin overviews share the same header and content structure. The admin header adds Manager, Share link, Add expense, and Record payment. Keep Share link in the top toolbar; do not leave it alone beneath the main action.

Overview order: participant cards, Trip expenses, Payment history, then Refresh. Put total spending, participant/expense counts, and Still to settle in the header. Do not create a separate Trip summary card.

Every profile has these five cards in this order:

1. Who does [name] owe?
2. Who owes [name]?
3. How this adds up
4. [name]’s expense share
5. Payment history

Place Refresh below the cards. All five remain visible when empty. Use the current pair-based debt rules in the feature specification; do not derive obligations from the old sample global balance.

### History previews and tables

Trip expenses and expense share use the same preview style. Show up to three rows, each with name, Paid by, and a right-aligned amount. Separate rows with a `1px` border and `16px` bottom padding. View all follows the rows.

View all opens a table modal. Columns are Expense, Paid by, and Amount for the trip, or Share for a participant. Use `10px` mono headers and `13px` cells. On the `390px` reference, rows have `8px` gaps and `14px` vertical padding; payer is about `52px` wide and amount about `100px` wide. Allow the expense column to take the remaining width. Show a total under the table.

Selecting a trip expense in either preview or table opens the full receipt. Preview rows use a `14px` chevron. Table links use wine text and a clear interactive treatment.

### Receipts and sharing

Use white paper with a paper-edge border, `2px` corners, `24px` padding, and `14–16px` section gaps. Center the expense title and payer line. Align costs to the right.

Put the wine payment-recipient block near the top, then the peach participant split. Names and amounts must be readable before item details. Label the original payer’s own cost as Own share. A receipt describes one expense; profile debts include pair offsets and settlements. Do not show the receipt as a second payment obligation.

Draft review has Save expense below the paper, with no share controls. After a successful save, show the same complete receipt with Saved status in a modal. The two action buttons are WhatsApp and Save image. WhatsApp shares text and a receipt link; Save image exports the complete receipt. Neither action records a payment.

### Dialogs and payment confirmation

Dialogs use `24px` corners, `20px` padding, and `20px` internal gaps. Keep the underlying screen visible under the overlay. Long receipts scroll inside the dialog. Close returns to the prior history rather than resetting the page. Support Escape, an accessible title, focus containment, and focus restoration.

Payment recorded uses a centered white confirmation card: `56px` peach success circle, `28px` check, `26px` title, `44px` amount, and `20px` sender → recipient. A separate card shows updated balances in two columns. Back to overview is primary; Record another payment is secondary.

## 5. Layout Principles

Use a `4px` base spacing unit. Foundation spacing tokens are `4, 8, 12, 16, 24, 32, 44, 64, 96px`. Existing app exceptions include `6px` compact summary gaps, `10px` metadata gaps, `14px` receipt gaps, and `20px` card section gaps. Preserve these where they define the current layout; do not force all spacing into one value.

- Reference screen width: `390px`.
- Page horizontal padding: `24px`; typical card width: `342px`.
- Header padding: `24px`; header gap: `24px`.
- Header summary: `16px` top inset, `6px` main gap, `10px` secondary gap, one top divider.
- Profile ledger: one column with `16px` between cards.
- Participant balance columns: equal widths with `20–24px` gap.
- Modal screen edges: `16px` in Pencil; live prototype leaves at least `12px` at narrow widths.
- Radius scale: `0px` for full-width headers, `2px` for receipt paper, `12px` for inputs, `16px` for inner cards, `24px` for cards/dialogs, and `999px` for pills.

Use content height for pages and cards. Canvas screen heights are not fixed browser page heights. Text, translated content, and long names must be able to wrap. Keep labels close to their values; do not spread summary facts across unrelated blocks.

## 6. Depth & Elevation

| Level | Treatment | Use |
| --- | --- | --- |
| Page | Canvas fill, no shadow | Main screen |
| Card | Surface fill, `1px` border, no shadow | Records and forms |
| Inner card | Control or split-wash fill, no shadow | Debt detail and split sections |
| Receipt paper | `0 4px 16px rgba(58,3,3,0.051)` | Itemized paper receipt |
| Modal | `rgba(22,21,18,0.6)` backdrop; no required dialog shadow | History and receipt overlays |

The inherited contract prompt component has layered shadows, but it is not the default money-app card style. Do not copy its elevation into every app control. The foundation gradient, library board, prototype toolbar, and prototype outer drop shadow are not part of the app screen design.

## 7. Do’s and Don’ts

### Do

- Make the payment amount and recipient easy to find.
- Keep admin and public screen styling consistent.
- Keep all five profile cards, including empty states.
- Use the same preview and table pattern for expense histories.
- Show explicit debt and receivable labels, status text, and whole-rupiah amounts.
- Build repeated UI from shared components and data.
- Keep complete receipt content in review, saved modal, and image export.
- Use the current specifications for calculations and access rules.

### Don’t

- Do not make entire screens reusable merely to avoid component work.
- Do not use a dashboard grid or sidebar that changes the established single-column structure.
- Do not add a separate Trip summary card or a transfer list to the public overview.
- Do not hide empty profile sections or move Refresh above the main content.
- Do not add green WhatsApp branding, gradients, or heavy shadows without a design decision.
- Do not use receipt item shares as proof that a current pair debt equals that amount.
- Do not share a draft before Save expense or state success before saving completes.
- Do not use sample canvas amounts as valid calculation fixtures without checking them.

## 8. Responsive Behavior

The approved structure remains one column on desktop. No separate dashboard arrangement is required. The exact production desktop max-width and new breakpoint styles were not defined in Pencil.

Use these reference sizes and implementation checks:

| Width | Behavior |
| --- | --- |
| 320–389px | Narrow phone: preserve one column; let descriptions wrap; check large amounts and the two balance columns |
| 390px | Pencil reference size: `24px` page edges and `342px` cards |
| 500px | Prototype-only toolbar breakpoint; not an app layout breakpoint |
| 768px and above | Desktop/tablet check: center the same bounded column; do not expand cards to the full viewport |

Start with a `390px` maximum content column to match the current design. Treat a wider production maximum as a later design choice. Keep header width relative to this column. Use at least `44px` action targets; original `36px` close icons need a larger interaction area.

Keep table amounts right-aligned. Wrap expense names on narrow screens before removing columns. Dialogs must fit the viewport width and scroll vertically; the prototype uses a maximum height of `calc(100dvh - 40px)`. Prevent horizontal page overflow.

Keep reference font sizes when they fit. If a long total exceeds the narrow-screen width, reduce that display amount from `46px` toward `38px` or use a fitted layout. Do not reduce required labels below their reference sizes to hide layout problems. No animation system was approved; avoid decorative motion.

## 9. Agent Prompt Guide

### Quick reference

Canvas `#FEFCFB`; surface `#FFFFFF`; ink `#161512`; body `#555555`; wine `#3A0303`; peach `#F7C4B2`. Control `#F2F2F2`, border `#EEEEEE`, receipt split `#F9EEE8`.

Use Geist for UI, Geist Mono for receipts and numeric history columns. Start from a `390px` single-column screen, `24px` page padding, `24px` card radius/padding, and `16px` between main cards. Keep overview total `46px`, section headings `22px`, body `14px`, and buttons `44–48px` tall.

### Component prompts

> Build a participant card using the Money App design system. Show the participant name, Still owes, and Still to receive in two columns. Use current pair-debt values, whole rupiah, and a 24px card radius. Selecting it opens that participant’s profile.

> Build an expense history card with at most three preview rows. Each row shows expense name, payer, and amount. View all opens a scrollable table dialog. Selecting a trip expense opens the complete receipt and closing it restores the history dialog.

> Build a receipt with white paper, 2px corners, mono item rows, a wine recipient block, and a peach participant split near the top. Keep the full content after Save expense. The saved dialog has WhatsApp and Save image actions.

> Build a participant profile with the full-width wine header, two outstanding balance indicators, the five required cards in order, and Refresh at the bottom. Keep empty cards visible. Use the current specification for debt offsets and settlements.

### Iteration guidance

When a summary feels empty, reduce gaps and increase the important amount before adding decoration. When a receipt lacks clarity, move recipient and split information higher. When a card looks unlike other screens, compare its padding, radius, text hierarchy, and border before creating a new variant.

Check real long names, large amounts, zero debt, simultaneous debt/receivable, empty history, failed login, and long receipt content. Confirm that the UI does not imply a second transfer or duplicate save. Browser verification requires user permission under this repository’s instructions.
