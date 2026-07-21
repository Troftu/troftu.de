(eval):5: parse error near `end'
import assert from "node:assert/strict";
import test from "node:test";
import { normalizeRows } from "../src/lib/rowing-data.js";

test("normalizes valid rows and reports skipped invalid rows", () => {
  const result = normalizeRows([
    { Description: "2000m row", Date: "2025-01-02 03:04:05", "Work Time (Seconds)": "421.5" },
    { Description: "2000m row", Date: "not-a-date", "Work Time (Seconds)": "421.5" },
    { Description: "2000m row", Date: "2025-01-02 03:04:05", "Work Time (Seconds)": "NaN" },
    { Description: "other activity", Date: "2025-01-02 03:04:05", "Work Time (Seconds)": "421.5" },
  ]);

  assert.equal(result.rows.length, 1);
  assert.equal(result.rows[0].workTimeSeconds, 421.5);
  assert.equal(result.rows[0].date.toISOString(), "2025-01-02T03:04:05.000Z");
  assert.equal(result.skipped, 2);
});

test("returns no records when all candidate rows are unusable", () => {
  const result = normalizeRows([
    { Description: "500m row", Date: "", "Work Time (Seconds)": "100" },
    { Description: "500m row", Date: "2025-01-02 03:04:05", "Work Time (Seconds)": "" },
  ]);

  assert.deepEqual(result.rows, []);
  assert.equal(result.skipped, 2);
});
