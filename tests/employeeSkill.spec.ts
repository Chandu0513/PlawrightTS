import { test, expect } from '@playwright/test';
import { BasePage } from '../pages/basePage';
import { LoginPage } from '../pages/loginPage';
import {SkillsPage} from '../pages/employeSkills';

test.describe('Skills Tests', () => {

  let basePage: BasePage;
  let loginPage: LoginPage;
  let skillsPage: SkillsPage;

  test.beforeEach(async () => {
    basePage = new BasePage();
    await basePage.init();

    loginPage = new LoginPage(basePage);
    skillsPage = new SkillsPage(basePage);

    await loginPage.loginAsAdmin();
    
  });

  test('Add Skill Test', async () => {
    await skillsPage.addNewSkill('Selenium', '10');
    
  });

  test.afterAll(async () => {
    await basePage.tearDown();
  });

});
