import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { LoginPage } from '../pages/loginPage';
import { ApplyLeave } from '../pages/applyLeave';

test.describe('Leave Management Tests', () => {
  let basePage: BasePage;
  let loginPage: LoginPage;
  let applyLeave: ApplyLeave;           

    test.beforeEach(async () => {
    basePage = new BasePage();
    await basePage.init();
    loginPage = new LoginPage(basePage);
    applyLeave = new ApplyLeave(basePage);
    await loginPage.loginAsAdmin();
    await basePage.page.waitForLoadState('networkidle');
    }); 
    test('Apply Leave Test', async () => {
    await applyLeave.applyLeave();
    await basePage.page.waitForLoadState('networkidle');
        });
    test.afterAll(async () => {
    await basePage.tearDown();
    }

);
}
);