import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const chartPath = new URL("../src/pages/rowing/chart.astro", import.meta.url);

test("the rowing chart exposes accessible loading and failure controls", async () => {
  const source = await readFile(chartPath, "utf8");

  assert.match(source, /id="chartStatus"[^>]+aria-live="polite"/);
  assert.match(source, /id="retryLoad"/);
  assert.match(source, /HTTP \$\{response\.status\}/);
  assert.match(source, /CSV is malformed/);
  assert.match(source, /no usable workout rows/);
});
