import { chromium, firefox, webkit, Browser, BrowserContext, Page } from '@playwright/test';
import { ConfigReader } from '../utils/configreader';
import { log } from '../utils/logger';

export class BasePage {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  constructor(page?: Page) {
    if (page) {
      this.page = page;
    }
  }

  async init() {
    const browserType = ConfigReader.getBrowser();
    //const headless = ConfigReader.getHeadless();
    const baseURL = ConfigReader.getBaseURL();

    log.info(`Initializing browser: ${browserType}`);

    switch (browserType) {
      case 'firefox':
        this.browser = await firefox.launch();
        break;
      case 'webkit':
        this.browser = await webkit.launch();
        break;
      default:
        this.browser = await chromium.launch();
    }

    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    

    if (baseURL) {
      log.info(`Navigating to base URL: ${baseURL}`);
      await this.page.goto(baseURL, { waitUntil: 'load' }); 
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
