import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  testDir: './tests',

  /* General behavior */
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  timeout: 60000,

  use: {
    baseURL: process.env.BASE_URL || 'https://dev.urbuddi.com/',
    headless: process.env.CI ? true : false,  
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  /* Reporters */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/html-report', open: process.env.CI ? 'never' : 'always' }], // ✅ avoid auto-open in CI
    ['allure-playwright'],
  ],

  /* Browsers */
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
