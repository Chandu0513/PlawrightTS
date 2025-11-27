import { test, expect } from '@playwright/test';
import { LoginApi } from '../pages/apihandles';

test('Login API works with POM structure', async ({ request }) => {
  const loginApi = new LoginApi(request);

  const response = await loginApi.login(
    "chandrashekar.bakulapally@optimworks.com",
    "Chandu@0513",
    "optimworks",
    "dal2as1EWSuUJ72i-jOvT6:APA91bEHDs2_ykDbSUR63RcNDrnteBdyqiB225ZPTwiBWhoR4frgEFzvBwDQlw-cinVV2LnMZ1RRcyQj4V0cdSqDXROBl6zuy6Nieg02n3_uc0zx37esa9A"
  );

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log("Token:", body.token);

  expect(body.token).toBeDefined();
});
