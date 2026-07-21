(eval):5: parse error near `end'
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const overviewPath = new URL(
  "../src/pages/rowing/index.astro",
  import.meta.url,
);

test("the rowing overview links the chart card to the chart route", async () => {
  const source = await readFile(overviewPath, "utf8");

  assert.match(source, /link:\s*["']\/rowing\/chart["']/);
  assert.doesNotMatch(source, /["']rowing\/chart["']/);
  assert.doesNotMatch(source, /\/rowing\/rowing\/chart/);
});
