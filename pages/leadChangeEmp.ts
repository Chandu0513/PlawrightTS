import { BasePage } from './basePage';
import { log } from '../utils/logger';
import fs from 'fs';

export class LeadChangeEmpPage extends BasePage {

  constructor(basePage: BasePage) {
    super();
    this.page = basePage.page;
  }

  private get yourProfileLink() {
    return this.page.getByRole('link', { name: 'Your Profile' });
  }

  private get othersButton() {
    return this.page.getByRole('button', { name: 'Others' });
  }

  private get certificatesDiv() {
    return this.page.locator('div').filter({ hasText: 'Certificates SubmittedNo' }).nth(5);
  }

  private get submitButton() {
    return this.page.getByRole('button', { name: 'Submit' });
  }

  private get personalInfoButton() {
    return this.page.getByRole('button', { name: 'Personal Info' });
  }

  private get combobox() {
    return this.page.getByRole('combobox');
  }
private async getAllComboOptions() {
  const options = this.page.locator('select.select-input option');
  const count = await options.count();
  const list: string[] = [];

  for (let i = 1; i < count; i++) {  // skip index 0 (---select---)
    const value = await options.nth(i).getAttribute('value');
    if (value) list.push(value);
  }

  log.info(`Dropdown emails: ${list}`);
  return list;
}

  private getNextLeadIndex(total: number): number {
  const file = "leadIndex.json";

  if (!require('fs').existsSync(file)) {
    require('fs').writeFileSync(file, JSON.stringify({ index: 0 }));
    return 0;
  }

  const data = JSON.parse(require('fs').readFileSync(file, "utf8"));
  let nextIndex = (data.index + 1) % total;

  require('fs').writeFileSync(file, JSON.stringify({ index: nextIndex }));

  return nextIndex;
}


    async changeEmployeeLead() {
    log.info("Starting Employee Lead Change process...");

    await this.yourProfileLink.click();
    await this.othersButton.click();
    await this.combobox.click();
    const allLeads = await this.getAllComboOptions();

    if (allLeads.length === 0) {
      throw new Error("No options found inside dropdown!");
    }

    const index = this.getNextLeadIndex(allLeads.length);
    const selectedLead = allLeads[index];
    log.info(`Selected Lead for this run: ${selectedLead}`);
    await this.combobox.selectOption({ label: selectedLead });
    await this.submitButton.click();
    log.success("Lead updated successfully!");
  }
}
