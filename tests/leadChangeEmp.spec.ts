import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { LoginPage } from '../pages/loginPage';
import { ApplyLeave } from '../pages/applyLeave';
import { LeadChangeEmpPage } from '../pages/leadChangeEmp';
import { ApproveLeave } from '../pages/approveLeave';

test.describe('Change Admin for Emp', () => {
  let basePage: BasePage;
  let loginPage: LoginPage;
  let approveLeave: ApproveLeave;   
  let leadChangeEmpPage: LeadChangeEmpPage;        

  test.beforeEach(async () => {
    basePage = new BasePage();
    await basePage.init();
    loginPage = new LoginPage(basePage);
    approveLeave = new ApproveLeave(basePage);
    leadChangeEmpPage = new LeadChangeEmpPage(basePage);
    await loginPage.loginAsAdmin();
  });

  test('Change Admin for Emp Test', async () => {
    await leadChangeEmpPage.changeEmployeeLead();
    
  });
}); 
    