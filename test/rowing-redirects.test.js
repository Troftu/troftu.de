import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const redirectsPath = new URL("../src/pages/rowing/[redirect].astro", import.meta.url);
const componentPath = new URL("../src/components/Concept2Redirect.astro", import.meta.url);

test("all Concept2 redirects use the shared destination component", async () => {
  const [redirects, component] = await Promise.all([
    readFile(redirectsPath, "utf8"),
    readFile(componentPath, "utf8"),
  ]);

  assert.match(redirects, /concept2Destinations/);
  assert.match(redirects, /<Concept2Redirect/);
  assert.match(component, /meta http-equiv="refresh"/);
  assert.match(component, /target="_blank" rel="noopener noreferrer"/);
  assert.match(component, /data-redirect-target/);
});
