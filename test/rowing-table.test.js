import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const chartPath = new URL("../src/pages/rowing/chart.astro", import.meta.url);

test("the rowing chart includes a semantic synchronized results table", async () => {
  const source = await readFile(chartPath, "utf8");

  assert.match(source, /<table id="resultsTable">/);
  assert.match(source, /<caption>Rowing workouts currently shown in the chart<\/caption>/);
  assert.equal((source.match(/<th scope="col">/g) ?? []).length, 7);
  assert.match(source, /renderTable\(sourceRows\.filter/);
  assert.match(source, /aria-describedby="chartSummary"/);
  assert.match(source, /borderDash/);
});
