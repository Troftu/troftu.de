import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const cssPath = new URL("../public/index.css", import.meta.url);
const pagePath = new URL("../src/pages/index.astro", import.meta.url);

test("the home page uses a scrollable responsive layout with visible logo focus", async () => {
  const [css, page] = await Promise.all([
    readFile(cssPath, "utf8"),
    readFile(pagePath, "utf8"),
  ]);

  assert.match(css, /overflow-y:\s*auto/);
  assert.match(css, /font-size:\s*clamp\(/);
  assert.match(css, /\.logolink:focus-visible/);
  assert.doesNotMatch(css, /position:\s*absolute/);
  assert.doesNotMatch(css, /overflow:\s*hidden/);
  assert.match(page, /class="logolink"/);
});
