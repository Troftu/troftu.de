const VALID_DESCRIPTIONS = new Set([
  "500m row",
  "2000m row",
  "5000m row",
  "10000m row",
]);

function parseDate(value) {
  if (typeof value !== "string" || value.trim() === "") return null;
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})[ T](\d{2}):(\d{2}):(\d{2})$/);
  if (!match) return null;

  const [, year, month, day, hour, minute, second] = match;
  const timestamp = Date.UTC(year, month - 1, day, hour, minute, second);
  const date = new Date(timestamp);
  return date.getUTCFullYear() === Number(year)
    && date.getUTCMonth() === Number(month) - 1
    && date.getUTCDate() === Number(day)
    && date.getUTCHours() === Number(hour)
    && date.getUTCMinutes() === Number(minute)
    && date.getUTCSeconds() === Number(second)
    ? date
    : null;
}

function parseWorkTime(value) {
  if (typeof value !== "string" && typeof value !== "number") return null;
  if (typeof value === "string" && value.trim() === "") return null;
  const seconds = Number(value);
  return Number.isFinite(seconds) ? seconds : null;
}

export function normalizeRows(rows) {
  const normalized = [];
  let skipped = 0;

  for (const row of rows) {
    if (!VALID_DESCRIPTIONS.has(row?.Description)) continue;

    const date = parseDate(row.Date);
    const workTimeSeconds = parseWorkTime(row["Work Time (Seconds)"]);
    if (!date || workTimeSeconds === null) {
      skipped += 1;
      continue;
    }

    normalized.push({
      description: row.Description,
      date,
      workTimeSeconds,
      workTimeFormatted: row["Work Time (Formatted)"],
      heartRate: row["Avg Heart Rate"],
      avgWatts: row["Avg Watts"],
      calHr: row["Cal/Hour"],
      pace: row.Pace,
    });
  }

  return { rows: normalized, skipped };
}

export function filterDataPoints(datasets, start, end) {
  return datasets.map((dataset) => ({
    ...dataset,
    data: dataset.data.filter((point) => point.x >= start && point.x <= end),
  }));
}
