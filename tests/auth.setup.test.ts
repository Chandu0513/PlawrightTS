import { test } from '@playwright/test';
import fs from 'fs';

test('login and save auth state', async ({ page, context }) => {
  
  await page.goto('https://optimworks.urbuddi.com/login');

  
  await page.fill('#userEmail', 'chandrashekar.bakulapally@optimworks.com');
  await page.fill('#userPassword', 'Chandu@0513');
  await page.click('button[type="submit"]');

  
  await page.waitForURL('https://optimworks.urbuddi.com/');

  
  const cookies = await context.cookies('https://optimworks.urbuddi.com');

  
  const localStorageData = await page.evaluate(() => {
    const store: Record<string, string> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) store[key] = localStorage.getItem(key) as string;
    }
    return store;
  });

  
  fs.writeFileSync('auth.json', JSON.stringify({ cookies, localStorage: localStorageData }, null, 2));

  console.log('Auth saved successfully!');
});
