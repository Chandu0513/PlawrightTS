import { BasePage } from './basePage';
import { ConfigReader } from '../utils/configreader';
import { log } from '../utils/logger';

export class LoginPage extends BasePage {
  private emailLoginInput = '#userEmail';
  private passwordLoginInput = '#userPassword';
  private loginButton = 'button[type="submit"]';

  constructor(basePage: BasePage) {
    super();
    this.page = basePage.page; 
  }

  async loginAsAdmin() {
    log.info('Starting Admin Login flow');
    log.step(`Filling email: ${ConfigReader.getAdminUsername()}`);
    await this.page.fill(this.emailLoginInput, ConfigReader.getAdminUsername());
    log.step(`Filling password`);
    await this.page.fill(this.passwordLoginInput, ConfigReader.getAdminPassword());
    await this.page.click(this.loginButton);
    log.success('Admin login completed successfully!');
  }

  async loginAsEmployee() {
    log.info('Starting Employee Login flow');
    log.step(`Filling email: ${ConfigReader.getEmpUsername()}`);
    await this.page.fill(this.emailLoginInput, ConfigReader.getEmpUsername());
    log.step(`Filling password`);
    await this.page.fill(this.passwordLoginInput, ConfigReader.getEmpPassword());
    await this.page.click(this.loginButton);
    log.success('Employee login completed successfully!');
  }
}
