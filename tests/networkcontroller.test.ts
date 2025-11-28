import { test, expect } from '@playwright/test';
import { NetworkController } from '../utils/networkcontroller';

test('Login works on slow network', async ({ page, context }) => {

  const network = new NetworkController(page, context);

  // Choose the speed you want
 //await network.slowNetwork();          // 2 sec delay
  await network.verySlowNetwork();   // 5 sec delay
 // await network.slowApiOnly();       // Slow only APIs
  //await network.goOffline();         // Offline mode
  //await network.unstableNetwork();   // Unstable connection

  await page.goto('https://dev.urbuddi.com/');

  await page.fill('#userEmail', 'testUserAdmin07112025@gmail.com');
  await page.fill('#userPassword', 'Test@123');
  await page.click('button[type="submit"]');

//branch test comment ignore 
  // Restore normal network after test
  await network.resetNetwork();
  await network.goOnline();
});
