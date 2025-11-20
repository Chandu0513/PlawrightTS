import { BasePage } from './basePage';
import { log } from '../utils/logger';

export class SkillsPage extends BasePage {

  constructor(basePage: BasePage) {
    super();
    this.page = basePage.page;
  }

  

  private get yourProfileLink() {
    return this.page.getByRole('link', { name: 'Your Profile' });
  }

  private get skillsButton() {
    return this.page.getByRole('button', { name: 'Skills' });
  }

  private get addSkillButton() {
    return this.page.getByRole('button').filter({ hasText: /^$/ }).nth(2); 
  }

  private get skillTextbox() {
    return this.page.getByRole('textbox');
  }

  private get ratingDropdown() {
    return this.page.getByRole('combobox');
  }

  private get submitButton() {
    return this.page.getByRole('button', { name: 'Submit' });
  }

 

  async addNewSkill(skillName: string, ratingValue: string) {
    log.info("Starting Skill Add Process...");

    await this.yourProfileLink.click();
    await this.skillsButton.click();
    await this.addSkillButton.click();

    await this.skillTextbox.click();
    await this.skillTextbox.fill(skillName);

    await this.ratingDropdown.selectOption(ratingValue);

    await this.submitButton.click();

    log.success(`Skill '${skillName}' added successfully with rating ${ratingValue}`);
  }
}
