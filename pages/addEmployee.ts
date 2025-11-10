import { BasePage } from './basePage';
import { log } from '../utils/logger';
import { faker } from '@faker-js/faker';
import { expect } from '@playwright/test';

export class AddEmployeePage extends BasePage {
  private firstName: string;
  private lastName: string;
  private employeeId: string;
  private emloyeeEmail: string;

  constructor(basePage: BasePage) {
    super();
    this.page = basePage.page;
   this.firstName = faker.person.firstName().replace(/[^a-zA-Z]/g, '');
   this.lastName = faker.person.lastName().replace(/[^a-zA-Z]/g, '');
    this.employeeId = `EMP${faker.number.int({ min: 1000, max: 9999 })}`;
    this.emloyeeEmail = `${this.firstName.toLowerCase()}.${this.lastName.toLowerCase()}@test.com`;
  }

  private get employees() {
    return this.page.getByText('Employees', { exact: true });
  }

  private get addEmployeeButton() {
    return this.page.getByRole('button', { name: /Add Employee/i });
  }

  private get submitButton() {
    return this.page.getByRole('button', { name: /^Add$/i });
  }

  private get empIdFilterInput() {
    return this.page.locator('input[aria-label="EMAIL Filter Input"]');
  }

  private get resultTable() {
    return this.page.locator('.ag-center-cols-container');
  }

  private get nextPageButton() {
    return this.page.locator('div[role="button"][aria-label="Next Page"]');
  }

  private get pageNumberLabel() {
    return this.page.locator('.ag-paging-description .ag-paging-number');
  }

  private get duplicateWarning() {
  return this.page.locator('text=Employee with this Email or ID already exists');
}

  private get firstNameInput() { return this.page.locator('input[name="firstName"]'); }
  private get lastNameInput() { return this.page.locator('input[name="lastName"]'); }
  private get employeeIdInput() { return this.page.locator('#employeeID'); }
  private get emailInput() { return this.page.locator('input[name="email"]'); }
  private get roleSelect() { return this.page.locator('#role'); }
  private get passwordInput() { return this.page.locator('input[name="password"]'); }
  private get dobInput() { return this.page.locator('input[name="dob"]'); }
  private get joiningDateInput() { return this.page.locator('input[name="joiningDate"]'); }
  private get qualificationsSelect() { return this.page.locator('#qualifications'); }
  private get departmentInput() { return this.page.locator('input[name="department"]'); }
  private get genderSelect() { return this.page.locator('#gender'); }
  private get mobileInput() { return this.page.locator('input[name="mobileNumber"]'); }
  private get bloodGroupSelect() { return this.page.locator('#bloodGroup'); }
  private get designationInput() { return this.page.locator('input[name="designation"]'); }
  private get salaryInput() { return this.page.locator('#salary'); }
  private get locationInput() { return this.page.locator('input[name="location"]'); }
  private get reportingToSelect() { return this.page.locator('#reportingTo'); }

  private get certificateDropdownBtn() { return this.page.locator('button.dropdown-btn'); }
  private get certificate10th() { return this.page.locator('input[name="10th"]'); }
  private get certificateDegree() { return this.page.locator('input[name="Degree"]'); }

  async openAddEmployeeModal() {
    log.info('Opening Add Employee modal...');
    await this.employees.click();
    await this.addEmployeeButton.click();
  }

  async fillEmployeeForm() {
    log.info('Filling Add Employee form...');

    const email = `${this.firstName.toLowerCase()}.${this.lastName.toLowerCase()}@test.com`;
    const mobileNumber = faker.number.int({ min: 6000000000, max: 9999999999 }).toString();

    await this.firstNameInput.fill(this.firstName);
    await this.lastNameInput.fill(this.lastName);
    await this.employeeIdInput.fill(this.employeeId);
    await this.emailInput.fill(email);
    await this.roleSelect.selectOption('Employee');
    await this.passwordInput.fill('Password123!');
    await this.dobInput.fill('1995-05-10');
    await this.joiningDateInput.fill('2025-11-10');
    await this.qualificationsSelect.selectOption('B.Tech');
    await this.departmentInput.fill('SDET');
    await this.genderSelect.selectOption('Male');
    await this.mobileInput.fill(mobileNumber);
    await this.bloodGroupSelect.selectOption('O+');
    await this.designationInput.fill('Test Engineer');
    await this.salaryInput.fill('65000');
    await this.locationInput.fill('Hyderabad');
    await this.reportingToSelect.selectOption('charan@optimworks.com');

    await this.certificateDropdownBtn.click();
    await this.certificate10th.check();
    await this.certificateDegree.check();

    log.success(`Employee form filled successfully for ${this.firstName} ${this.lastName} (ID: ${this.employeeId})`);
  }

  async submitEmployeeForm() {
    log.info('Submitting Add Employee form...');
    await this.submitButton.click();
    await this.page.waitForTimeout(3000);

  
    if (await this.duplicateWarning.isVisible({ timeout: 3000 }).catch(() => false)) {
      log.warn(`⚠️ Duplicate detected for Employee ID: ${this.employeeId} or Email: ${this.emloyeeEmail}`);
      return;
    }

    log.success('Add Employee modal closed after submission.');
  }

  
  async verifyEmployeeCreated() {
    log.info(`Verifying if employee ${this.employeeId} exists in the list...`);

   
    await this.empIdFilterInput.fill(this.emloyeeEmail);
    await this.page.waitForTimeout(1500);
    const isEmployeePresent = await this.resultTable.locator(`text=${this.emloyeeEmail}`).isVisible();

    expect(isEmployeePresent).toBeTruthy();
    log.success(`Employee ${this.emloyeeEmail} found in the employee list.`);
  } 

 async verifyDuplicateWarning() {
  log.info('Checking if duplicate employee warning is displayed...');
  
  const isVisible = await this.duplicateWarning.isVisible({ timeout: 7000 }).catch(() => false);
  
  if (isVisible) {
    log.success('Duplicate warning is visible.');
  } else {
    log.warn('Duplicate warning is NOT visible.');
  }
}

}

