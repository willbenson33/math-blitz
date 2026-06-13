# Math Blitz

A single-file mental-math speed game. Open `index.html` in any modern browser — no build step, no install. Built with React (loaded from a CDN) so the whole game lives in one file.

## Play

1. Open `index.html`.
2. Pick a **game mode** on the home screen, or set up a **Custom Game**.
3. Answer each problem on the numpad.

## Game modes

The home screen lists ready-to-play modes. Each mode is a complete, self-contained
configuration (it carries the full default settings plus its own twist), so a mode
always plays the same way regardless of what's in your custom Settings:

- **Classic Division** — mixed divisors, the default blitz.
- **÷ Single Digit** — divide by 2–9.
- **÷ Two Digits** — divide by 10–99.
- **÷ Round Numbers** — divisors are multiples of 10.
- **Times Tables** — multiply by 2–12.
- **Add Sprint** / **Sub Sprint** — back-to-back addition or subtraction.
- **Add & Subtract** — mixed + and − problems.
- **Full Mix** — all four operations.

## Custom Game

Pick a mode from the **Game Mode** dropdown on the home screen and hit start, or use
the **Custom Game** panel (home or summary screen) to play a run with whatever you've
configured on the Settings screen.

## Settings

Settings apply to the **Custom Game** (game modes carry their own configuration):

- **Number range** — dividends up to 100, 500, or 1000.
- **Rounds** — how many problems in a run.
- **Time / round** — ∞ (no limit), 5s, 10s, or 20s. The bar runs out → the round ends.
- **Seed** — leave blank for a random seed or type your own. The same seed + same settings always produces the same problems in the same order. The active seed is shown during the game and on the summary so runs can be shared or replayed.

## How a round works

The problem (e.g. `500 ÷ 20`) shows up top with a slot for each answer digit. Tap digits on the numpad:

- **Correct digit** for the current position → it locks in green and you move on.
- **Wrong digit** → it flashes red and clears so you can try again.

When every digit is in, the next round loads automatically.

## Scoring

- 1st digit on the first try: **5 pts**, 2nd: **10 pts**, 3rd: **15 pts**, … (+5 per position).
- A digit that needed a retry is worth **1/5** of its value.
- Clear a whole round with no mistakes for a **perfect round** — each consecutive perfect round adds a 🔥 to the streak bar at the top. Miss one and the streak resets.

At the end you get total score, rounds played, accuracy (first-try digits), perfect rounds, and the seed for replaying.
