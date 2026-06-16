# Math Blitz

A single-file mental-math speed game. Open `index.html` in any modern browser — no build step, no install. Built with React (vendored under `vendor/`, so it runs even where an external CDN is blocked) and the whole game lives in one file.

## Play

1. Open `index.html`.
2. Pick a **game mode** on the home screen.
3. (Optional) Enter a **seed** to replay a specific run, or leave it blank for a random one.
4. Hit **Start** and answer each problem on the numpad.

## Game modes

The home screen lists ready-to-play modes. Each mode is a complete, self-contained
configuration (it carries the full default settings plus its own twist), so a mode
always plays the same way every time:

- **Classic Division** — mixed divisors, the original blitz.
- **2-3 Digit Division** — division where every quotient lands between 10 and 999.
- **11–20 Times Tables** — multiply 11–20 by 2–20.
- **Decimal Division** — quotients are single-place decimals.
- **Tips** — gratuity on a restaurant check (10/15/20/25/30%).
- **Percents (1–99%)** — convert a fraction to a whole percent.
- **Percents (1–999%)** — fraction → percent, including improper fractions.
- **Full Mix** — all four operations.

## Seeds

Leave the seed blank for a random run, or type your own. The same seed and the same
mode always produce the same problems in the same order, so runs can be shared or
replayed. The active seed is shown on the summary screen.

## High scores

Scores are saved per mode in your browser's `localStorage`. The summary screen shows
your top scores for the mode you just played and flags a new personal best.

## How a round works

The problem (e.g. `500 ÷ 20`) shows up top with a hidden slot for each answer digit.
Tap digits on the numpad:

- **Correct digit** for the current position → it locks in green and you move on.
- **Wrong digit** → it flashes red and clears so you can try again. Three wrong taps
  in a round reveals the answer and ends the round.

When a time limit is set, the bar at the top runs down; let it hit zero and the round
ends. A one-use-per-game ⏰ button refills the clock. When every digit is in, the next
round loads automatically.

## Scoring

- 1st digit on the first try: **5 pts**, 2nd: **10 pts**, 3rd: **15 pts**, … (+5 per position).
- A digit that needed a retry is worth **1/5** of its value.
- Clear a whole round with no mistakes for a **perfect round** — each consecutive perfect
  round adds a 🔥 to the streak bar and raises a combo multiplier (up to ×5) on every
  point earned. Miss one and the streak resets.
- Finishing an answer with time to spare adds a time bonus.

At the end you get total score, rounds played, accuracy (first-try digits), perfect
rounds, and the seed for replaying.
</content>
