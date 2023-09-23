import { test, expect } from "@playwright/test";

test("first test", async ({ page }) => {
  await page.goto("https://demoqa.com/");

  await page.pause();
});
