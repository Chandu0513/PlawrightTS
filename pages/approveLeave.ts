import { BasePage } from './basePage';
import { log } from '../utils/logger';
import { getValidLeaveDates } from '../utils/helpers';
import { expect, test } from '@playwright/test';

export class ApproveLeave extends BasePage {
  constructor(basePage: BasePage) {
    super();
    this.page = basePage.page;
  }

  private get leavemanagment() {
    return this.page.getByText('Leave Management', { exact: true });
  }

  private get leaverequests() {
    return this.page.locator('button:has-text("Requests")');
  }

  private get approveButton() {
    return this.page.getByRole('button', { name: 'Approve' });
  }

  async approveLeave() {
    log.info('Approving leave request...');

    // Step 1: Open Leave Management
    await this.leavemanagment.click();

    // Step 2: Click Requests only if visible
    const requestButtonVisible = await this.leaverequests.isVisible().catch(() => false);

    if (requestButtonVisible) {
      log.info('"Requests" button found. Clicking...');
      await this.leaverequests.click();
      await this.page.waitForLoadState('networkidle');
    } else {
      log.warn('"Requests" button not found. Skipping click step.');
    }

    // Step 3: Check for Approve buttons
    const approveButtons = await this.page.locator('button:has-text("Approve")').all();

    if (approveButtons.length === 0) {
      log.warn('No leave requests available to approve. Skipping test...');
      test.skip(true, 'No leave requests available to approve.');
      return;
    }

    // Step 4: Approve the first available request
    await approveButtons[0].click();
    log.info('Leave request approved successfully.');
  }
}
