import { Page, BrowserContext } from '@playwright/test';

export class NetworkController {
  private page: Page;
  private context: BrowserContext;

  constructor(page: Page, context: BrowserContext) {
    this.page = page;
    this.context = context;
  }

  // 1. Simulate SLOW network (2 sec delay for all requests)
  async slowNetwork(delay: number = 2000) {
    await this.page.route('**/*', async route => {
      await new Promise(res => setTimeout(res, delay));
      await route.continue();
    });
  }

  // 2. Simulate VERY slow network (5 sec delay)
  async verySlowNetwork(delay: number = 5000) {
    await this.page.route('**/*', async route => {
      await new Promise(res => setTimeout(res, delay));
      await route.continue();
    });
  }

  // 3. Slow only APIs (not images, css, etc)
  async slowApiOnly(delay: number = 3000) {
    await this.page.route('**/api/**', async route => {
      await new Promise(res => setTimeout(res, delay));
      await route.continue();
    });
  }

  // 4. Simulate OFFLINE mode
  async goOffline() {
    await this.context.setOffline(true);
  }

  // Bring network back online
  async goOnline() {
    await this.context.setOffline(false);
  }

  // 5. Simulate unstable / flaky connection
  async unstableNetwork(delay: number = 3000, failRate: number = 0.3) {
    await this.page.route('**/*', async route => {
      if (Math.random() < failRate) {
        await route.abort();
      } else {
        await new Promise(res => setTimeout(res, delay));
        await route.continue();
      }
    });
  }

  // Optional - clear all route handlers
  async resetNetwork() {
    await this.page.unroute('**/*');
  }
}
