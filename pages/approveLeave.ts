import { BasePage } from './basePage';
import { log } from '../utils/logger';
import { getValidLeaveDates } from '../utils/helpers';  
import { expect } from '@playwright/test';

export class ApproveLeave extends BasePage {
  constructor(basePage: BasePage) {
    super();
    this.page = basePage.page;
  }

  private get leavemanagment() {
    return this.page.getByText('Leave Management', { exact: true });
  }

  private get leaverequests(){
    return this. page.locator('button:has-text("Requests")');
  }
}
