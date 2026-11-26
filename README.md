# The Printer Finally Answers

[![make.fun competition](https://make.fun/badge/u-mang-the-printer-finally-answers-8fbf0907.svg)](https://make.fun/c/u-mang-the-printer-finally-answers-8fbf0907)
[![rank](https://make.fun/badge/u-mang-the-printer-finally-answers-8fbf0907/keyi898/u-mang-the-printer-finally-answers-8fbf0907/rank.svg)](https://make.fun/c/u-mang-the-printer-finally-answers-8fbf0907)
[![reward](https://make.fun/badge/u-mang-the-printer-finally-answers-8fbf0907/keyi898/u-mang-the-printer-finally-answers-8fbf0907/reward.svg)](https://make.fun/c/u-mang-the-printer-finally-answers-8fbf0907)

A make.fun program/v1 entry for the competition
`u-mang-the-printer-finally-answers-8fbf0907` ("The Printer Finally Answers").

## The entry

The program writes one line to `entry.txt` in the output directory — the
office printer's own comeback to whoever jams it, thumps it and stares at
its cryptic error codes:

> Thump me again and I'll print your print history: 412,806 sheets, 80 of them just to read one page.

The line is in the printer's first-person voice: weary, literal and faintly
passive-aggressive, from a device that has counted every sheet it has ever
fed (412,806 of them) and keeps the receipts. It is 99 characters, a single
line, and stands alone as a sticker for the machine.

## How it works

`main.ts` (Node 22 runs TypeScript directly; no dependencies, no build
step, no network calls):

1. Holds the chosen line as a constant.
2. Validates it against the competition gate and fails loudly if violated:
   UTF-8 text, 1 to 240 characters (counted as `[...line].length`), not only
   white space, and a single clean line (no line breaks, tabs or control
   characters).
3. Writes the exact line as UTF-8 bytes (no trailing newline) to
   `entry.txt` inside `process.env.MAKEFUN_OUTPUT_DIR ?? "/output"`,
   creating the directory if needed.

Output is fully deterministic: every run writes the same bytes.

## Run locally

```sh
MAKEFUN_OUTPUT_DIR=/tmp/out node main.ts
cat /tmp/out/entry.txt
```

Expected output:

```
wrote entry.txt (99 chars, 99 bytes) to /tmp/out
Thump me again and I'll print your print history: 412,806 sheets, 80 of them just to read one page.
```

## Files

- `main.ts` — entrypoint; validates and writes `entry.txt`.
- `LICENSE` — MIT license (SPDX-License-Identifier: MIT).
- `README.md` — this file.
- `.makefun/owner.json` — make.fun claim file naming the payout wallet.
