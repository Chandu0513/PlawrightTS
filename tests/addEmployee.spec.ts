import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { LoginPage } from '../pages/loginPage';
import { AddEmployeePage } from '../pages/addEmployee';

test.describe('Employee Management Tests', () => {
  let basePage: BasePage;
  let loginPage: LoginPage;
  let addemployee: AddEmployeePage;

  test.beforeEach(async () => {
    basePage = new BasePage();
    await basePage.init();
    loginPage = new LoginPage(basePage);
    addemployee = new AddEmployeePage(basePage);

    await loginPage.loginAsAdmin();
    await basePage.page.waitForLoadState('networkidle');
    
  });

  test('Adding Employee Test', async () => {
    await addemployee.openAddEmployeeModal();
    await addemployee.fillEmployeeForm();
    await addemployee.submitEmployeeForm();
    await addemployee.verifyDuplicateWarning();
    await basePage.page.waitForLoadState('networkidle');
    await addemployee.verifyEmployeeCreated();
    await addemployee.DeleteEmployeeIfExists();
      });

  test.afterAll(async () => {
    await basePage.tearDown();
  });
});
