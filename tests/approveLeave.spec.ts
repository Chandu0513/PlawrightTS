import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { LoginPage } from '../pages/loginPage';
import { ApplyLeave } from '../pages/applyLeave';
import { ApproveLeave } from '../pages/approveLeave';

test.describe('Leave Approval Tests', () => {
  let basePage: BasePage;
  let loginPage: LoginPage;
  let approveLeave: ApproveLeave;           

    test.beforeEach(async () => {
    basePage = new BasePage();
    await basePage.init();
    loginPage = new LoginPage(basePage);
    approveLeave = new ApproveLeave(basePage);
    await loginPage.loginAsAdmin();
    await basePage.page.waitForLoadState('networkidle');
    }); 
    test('Leave approval Test', async () => {
    await approveLeave.approveLeave();
    await basePage.page.waitForLoadState('networkidle');
        });
    test.afterAll(async () => {
    await basePage.tearDown();
    }

);
}
);