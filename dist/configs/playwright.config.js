import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
dotenv.config();
// Ensure the reports directory exists
const reportDirectory = path.join(__dirname, 'reports', 'htmlreports', 'html-report');
if (!fs.existsSync(reportDirectory)) {
    fs.mkdirSync(reportDirectory, { recursive: true });
}
export default defineConfig({
    testDir: './tests',
    /* General behavior */
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    timeout: 60000,
    use: {
        baseURL: process.env.BASE_URL || 'https://dev.urbuddi.com/login',
        headless: false,
        trace: 'retain-on-failure',
        video: 'retain-on-failure',
        screenshot: 'only-on-failure',
    },
    reporter: [
        ['list'],
        // HTML Reporter - Ensure path is dynamic and directory exists
        ['html', {
                outputFolder: reportDirectory,
                open: 'always'
            }],
        ['allure-playwright', {
                outputFolder: path.join(__dirname, 'reports', 'allure-results')
            }]
    ],
    /* Browsers */
    projects: [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    ],
});
