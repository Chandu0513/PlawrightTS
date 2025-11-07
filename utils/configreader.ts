import dotenv from 'dotenv';
dotenv.config();

export class ConfigReader {
  static getBaseURL(): string {
    return process.env.BASE_URL || 'https://dev.urbuddi.com/';
  }

  static getBrowser(): 'chromium' | 'firefox' | 'webkit' {
    const browser = process.env.BROWSER?.toLowerCase();
    if (browser === 'firefox') return 'firefox';
    if (browser === 'webkit') return 'webkit';
    return 'chromium';
  }

  static getHeadless(): boolean {
    return process.env.HEADLESS?.toLowerCase() === 'false' ? false : true;
  }

  static getAdminUsername(): string {
    return process.env.ADMIN_USERNAME || '';
  }

  static getAdminPassword(): string {
    return process.env.ADMIN_PASSWORD || '';
  }

  static getEmpUsername(): string {
    return process.env.EMP_USERNAME || '';
  }

  static getEmpPassword(): string {
    return process.env.EMP_PASSWORD || '';
  }
}
