import { BasePage } from './basePage';
import { log } from '../utils/logger';
import { getValidLeaveDate } from '../utils/helpers';  
import { expect } from '@playwright/test';

export class ApplyLeave extends BasePage {
  constructor(basePage: BasePage) {
    super();
    this.page = basePage.page;
  }

  private get leavemanagment() {
    return this.page.getByText('Leave Management', { exact: true });
  }

  private get applyLeaveButton() {
    return this.page.getByRole('button', { name: /Apply Leave/i });
  }

  private get fromDateInput() {
    return this.page.locator('input#fromDate');
  }

  private get toDateInput() {
    return this.page.locator('input#toDate');
  }

  private get subjectInput() {
    return this.page.locator('input[name="subject"]');
  }

  private get reasonTextarea() {
    return this.page.locator('textarea[name="reason"]');
  }

  private get leaveRadio() {
    return this.page.locator('input#leave');
  }

  private get submitButton() {
    return this.page.getByRole('button', { name: /Submit/i });
  }

  async applyLeave() {
    log.info('Applying for leave...');

    const today = new Date();
    const validDateStr  = getValidLeaveDate(today); 
    

    log.info(`Applying for date: ${validDateStr }`);

    await this.leavemanagment.click();
    await this.applyLeaveButton.click();
    await this.fromDateInput.fill(validDateStr );
    await this.toDateInput.fill(validDateStr );
    await this.subjectInput.fill('Family Function');
    await this.reasonTextarea.fill('Attending a family wedding.');
    await this.leaveRadio.check();
    await this.submitButton.click();

    log.info('Leave application submitted successfully.');
  }
}
