# Math Blitz — Division

A single-file division speed game. Open `index.html` in any modern browser — no build step, no install. Built with React (loaded from a CDN) so the whole game lives in one file.

## Play

1. Open `index.html`.
2. Configure your run on the **settings screen**.
3. Hit **Start Blitz** and answer each problem on the numpad.

## Settings

- **Number range** — dividends up to 100, 500, or 1000.
- **Rounds** — how many problems in a run.
- **Time / round** — ∞ (no limit), 5s, 10s, or 20s. The bar runs out → the round ends.
- **Rounded numbers only** — divisors are round (multiples of 10); division is always clean.
- **No zero in result** — answers never contain a `0` digit.
- **Parity** — Any, Odds only (dividend & divisor odd), or Evens only.
- **Seed** — leave blank for a random seed, type your own, or tap **🗓️ Today's Challenge** for the daily seed (same problems for everyone that calendar day). The same seed + same settings always produces the same problems in the same order. The active seed is shown during the game and on the summary so runs can be shared or replayed.

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
