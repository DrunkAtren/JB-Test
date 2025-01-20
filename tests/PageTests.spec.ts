import { test, expect } from '@playwright/test';

test('test1', async ({ page }) => {
  await page.goto('http://localhost:483/swagger/index.html');
  await page.waitForTimeout(3000);
});

test('test2', async ({ page }) => {
  await page.goto('http://localhost:8080');
  await page.waitForTimeout(3000);
});

