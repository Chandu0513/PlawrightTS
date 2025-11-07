import { test } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { LoginPage } from '../pages/loginPage';
test.describe('Login Tests', () => {
    let basePage;
    let loginPage;
    test.beforeEach(async () => {
        basePage = new BasePage();
        await basePage.init();
        loginPage = new LoginPage(basePage);
    });
    test('Admin should login successfully', async () => {
        await loginPage.loginAsAdmin();
    });
    test('Employee should login successfully', async () => {
        await loginPage.loginAsEmployee();
    });
    test.afterEach(async () => {
        await basePage.tearDown();
    });
});
