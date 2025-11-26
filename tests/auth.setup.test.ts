import { test } from '@playwright/test';
import fs from 'fs';

test('login and save auth state', async ({ page, context }) => {
  // Go to login page
  await page.goto('https://optimworks.urbuddi.com/login');

  // Fill login form
  await page.fill('#userEmail', 'chandrashekar.bakulapally@optimworks.com');
  await page.fill('#userPassword', 'Chandu@0513');
  await page.click('button[type="submit"]');

  // Wait for dashboard / successful login
  await page.waitForURL('https://optimworks.urbuddi.com/');

  // Save cookies for this domain
  const cookies = await context.cookies('https://optimworks.urbuddi.com');

  // Save localStorage
  const localStorageData = await page.evaluate(() => {
    const store: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) store[key] = localStorage.getItem(key) as string;
    }
    return store;
  });

  // Save both cookies and localStorage to a JSON file
  fs.writeFileSync('auth.json', JSON.stringify({ cookies, localStorage: localStorageData }, null, 2));

  console.log('Auth saved successfully!');
});
