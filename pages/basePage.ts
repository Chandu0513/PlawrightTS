import { chromium, firefox, webkit, Browser, BrowserContext, Page } from '@playwright/test';
import { ConfigReader } from '../utils/configreader';
import { log } from '../utils/logger';

export class BasePage {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  constructor() {}

  async init() {
    const browserType = ConfigReader.getBrowser();
    const headless = ConfigReader.getHeadless();
    const baseURL = ConfigReader.getBaseURL();

    log.info(`Initializing browser: ${browserType}, headless: ${headless}`);

    switch (browserType) {
      case 'firefox':
        this.browser = await firefox.launch({ headless });
        break;
      case 'webkit':
        this.browser = await webkit.launch({ headless });
        break;
      default:
        this.browser = await chromium.launch({ headless });
    }

    
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();

      if (baseURL) {
      log.info(`Navigating to base URL: ${baseURL}`);
      await this.page.goto(baseURL);
    } else {
      log.warn('No BASE_URL found in environment or config file.');
    }
  }

  async tearDown() {
    log.info('Tearing down browser session...');
    if (this.page) await this.page.close();
    if (this.context) await this.context.close();
    if (this.browser) await this.browser.close();
    log.success('Browser session closed successfully.');
  }
}
