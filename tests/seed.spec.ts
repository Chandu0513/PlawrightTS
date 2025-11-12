import { test } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { LoginPage } from '../pages/loginPage';
import { ApplyLeave } from '../pages/applyLeave';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Seed Application Flow', () => {
  let basePage: BasePage;
  let loginPage: LoginPage;
  let applyLeave: ApplyLeave;

  test.beforeAll(async () => {
    basePage = new BasePage();
    await basePage.init();
    loginPage = new LoginPage(basePage);
    applyLeave = new ApplyLeave(basePage);
  });

  test('Seed: Login and visit Leave Management', async () => {
    console.log('Seeding app structure for AI agents...');

        
    await loginPage.loginAsAdmin();
    await basePage.page.getByText('Leave Management', { exact: true }).click();
    await basePage.page.waitForTimeout(1000);

    console.log('Seed complete — AI agents can now explore this page.');
  });

  test.afterAll(async () => {
    await basePage.tearDown();
  });
});
