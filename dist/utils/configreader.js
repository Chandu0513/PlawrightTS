import dotenv from 'dotenv';
dotenv.config();
export class ConfigReader {
    static getBaseURL() {
        return process.env.BASE_URL || 'https://dev.urbuddi.com/';
    }
    static getBrowser() {
        const browser = process.env.BROWSER?.toLowerCase();
        if (browser === 'firefox')
            return 'firefox';
        if (browser === 'webkit')
            return 'webkit';
        return 'chromium';
    }
    static getHeadless() {
        return process.env.HEADLESS?.toLowerCase() === 'false' ? false : true;
    }
    static getAdminUsername() {
        return process.env.ADMIN_USERNAME || '';
    }
    static getAdminPassword() {
        return process.env.ADMIN_PASSWORD || '';
    }
    static getEmpUsername() {
        return process.env.EMP_USERNAME || '';
    }
    static getEmpPassword() {
        return process.env.EMP_PASSWORD || '';
    }
}
