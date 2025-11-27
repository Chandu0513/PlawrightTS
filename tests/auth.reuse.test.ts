import { test } from '@playwright/test';
import fs from 'fs';

test('reuse saved auth state', async ({ browser }) => {
  const auth = JSON.parse(fs.readFileSync('auth.json', 'utf8'));

  const context = await browser.newContext();

  
  await context.addCookies(auth.cookies);
    const page = await context.newPage();

  
  await page.addInitScript(storage => {
    for (const key in storage)
      localStorage.setItem(key, storage[key]);
  }, auth.localStorage);

  
  await page.goto('https://optimworks.urbuddi.com/leave_management');
  await page.waitForLoadState("networkidle");
 console.log("Bypass login successful!");
});
