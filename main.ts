// The Printer Finally Answers — make.fun program/v1 entry.
// Writes one line, in the office printer's own voice, to entry.txt
// in the output directory (MAKEFUN_OUTPUT_DIR, default /output).
// Gate: UTF-8 text of 1 to 240 characters, not only white space.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE: string =
  "Thump me again and I'll print your print history: 412,806 sheets, 80 of them just to read one page.";

const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

function validate(line: string): void {
  // Character count per the gate: Unicode code points, as [...line].length.
  const chars: number = [...line].length;
  if (chars < 1 || chars > 240) {
    throw new Error(`gate violation: entry must be 1-240 characters, got ${chars}`);
  }
  if (line.trim().length === 0) {
    throw new Error("gate violation: entry must not be only white space");
  }
  // Single line, sticker-ready: no line breaks, no tabs, no control chars.
  if (/[\r\n\t]/.test(line) || /[\u0000-\u001F\u007F]/.test(line)) {
    throw new Error("gate violation: entry must be a single clean line");
  }
  // UTF-8 round-trip: encoding then decoding must reproduce the line.
  const bytes: Buffer = Buffer.from(line, "utf8");
  if (bytes.toString("utf8") !== line) {
    throw new Error("gate violation: entry is not valid UTF-8 text");
  }
}

validate(LINE);
mkdirSync(outDir, { recursive: true });
// Write the exact line as UTF-8 bytes, no trailing newline appended.
writeFileSync(join(outDir, "entry.txt"), Buffer.from(LINE, "utf8"));
console.log(
  `wrote entry.txt (${[...LINE].length} chars, ${Buffer.byteLength(LINE, "utf8")} bytes) to ${outDir}`,
);
