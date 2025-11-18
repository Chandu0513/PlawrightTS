import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

import { BasePage } from '../pages/basePage';
import { LoginPage } from '../pages/loginPage';
import { ReimbursementPage } from '../pages/reimbursement';

dotenv.config();

test.describe('Reimbursement', () => {

let basePage: BasePage;
let loginPage: LoginPage;
let reimbursementPage: ReimbursementPage;

  test.beforeEach(async () => {
    basePage = new BasePage();
    await basePage.init();
    loginPage = new LoginPage(basePage);
    reimbursementPage = new ReimbursementPage(basePage);
  });

test('User should apply extra working', async () => {
    await loginPage.loginAsAdmin();
    await reimbursementPage.applyExtraWork();
  
    });
    

    test.afterEach(async () => {
    await basePage.tearDown();
  });

});
