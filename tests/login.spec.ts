import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { LoginPage } from '../pages/loginPage';



test.describe('Login Tests', () => {
  let basePage: BasePage;
  let loginPage: LoginPage;

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
