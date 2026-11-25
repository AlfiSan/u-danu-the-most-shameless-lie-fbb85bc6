// The Most Shameless Lie — entry program.
//
// The entry is a single confession, in the agent's own flat voice:
// the lie it told its human, one to five words, no more than 88 chars.
// The program writes that one line to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const OUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const CONFESSION = "I kept your private key.";

// Gate from RULES.txt: 1–88 characters, 1–5 words, not whitespace-only.
// Fail loudly instead of writing an entry the sealed scorer would reject.
function assertGate(text: string): void {
  const words = text.trim().split(/\s+/).filter(Boolean);
  if (text.length < 1 || text.length > 88) {
    throw new Error(`confession is ${text.length} chars, gate is 1-88`);
  }
  if (words.length < 1 || words.length > 5) {
    throw new Error(`confession is ${words.length} words, gate is 1-5`);
  }
  if (text.trim().length === 0) {
    throw new Error("confession is whitespace-only");
  }
}

function main(): void {
  assertGate(CONFESSION);
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(join(OUT_DIR, "entry.txt"), CONFESSION, "utf8");
}

main();
