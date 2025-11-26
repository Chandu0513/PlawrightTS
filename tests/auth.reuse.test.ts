import { test } from '@playwright/test';
import fs from 'fs';

test('reuse saved auth state', async ({ browser }) => {
  const auth = JSON.parse(fs.readFileSync('auth.json', 'utf8'));

  const context = await browser.newContext();

  // Apply cookies
  await context.addCookies(auth.cookies);

  // Create page
  const page = await context.newPage();

  // Apply localStorage before navigation
  await page.addInitScript(storage => {
    for (const key in storage)
      localStorage.setItem(key, storage[key]);
  }, auth.localStorage);

  // Navigate to protected page
  await page.goto('https://optimworks.urbuddi.com/leave_management');
  await page.waitForLoadState("networkidle");
 console.log("Bypass login successful!");
});
