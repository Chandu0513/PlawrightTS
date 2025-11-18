import { BasePage } from './basePage';
import { ConfigReader } from '../utils/configreader';
import { log } from '../utils/logger';
import {getRandomWeekdayDate} from '../utils/helpers';

export class ReimbursementPage extends BasePage {
     
  
  constructor(basePage: BasePage) {
    super();
    this.page = basePage.page;
  }


  private get reimbursement() {
    return this.page.getByRole('link', { name: 'Reimbursement' });
  }

  private get applyExtraWorkButton() {
    return this.page.getByRole('button', { name: 'Apply Extra Work' });
  }

  private get dateInput() {
    return this.page.locator('input[name="date"]');
  }

  private get hoursInput() {
    return this.page.locator('input[name="hours"]');
  }

  private get userCombobox() {
    return this.page.getByRole('combobox');
  }

  private get submitButton() {
    return this.page.getByRole('button', { name: 'Submit' });
  }

  
  async applyExtraWork() {
    await this.reimbursement.click();
    log.info('Applying for extra work reimbursement...');
    await this.applyExtraWorkButton.click();
    log.step('Filling out extra work form...');
    const dateStr = getRandomWeekdayDate(new Date('2025-10-10'), new Date('2025-11-18'));
    await this.dateInput.fill(dateStr);
    log.step('Entering hours worked...');
    await this.hoursInput.click();
    await this.hoursInput.fill('2');
    log.step('Selecting user for reimbursement...');
    await this.userCombobox.selectOption('testuseradmin07112025@gmail.com');
    log.step('Submitting extra work reimbursement request...');
    await this.submitButton.click();
    log.success('Extra work submitted successfully!');
  }

}