import { test, expect, devices } from '@playwright/test';

test.use(devices['iPhone 11 Pro']);

test('Mobile web test example', async ({ page }) => {
  await page.goto('https://dev.urbuddi.com/login');
  
  await page.fill('#userEmail', 'testUserAdmin07112025@gmail.com');
  await page.fill('#userPassword', 'Test@123');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(5000);

  
});