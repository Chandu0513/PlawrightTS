import { test, expect, request } from '@playwright/test';

test('Login API works', async () => {
  const api = await request.newContext({
    extraHTTPHeaders: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'PlaywrightAPI'
    }
  });

  const payload = {
    email: "chandrashekar.bakulapally@optimworks.com",
    password: "Chandu@0513",
    domain_name: "optimworks",
    device_token: "dal2as1EWSuUJ72i-jOvT6:APA91bEHDs2_ykDbSUR63RcNDrnteBdyqiB225ZPTwiBWhoR4frgEFzvBwDQlw-cinVV2LnMZ1RRcyQj4V0cdSqDXROBl6zuy6Nieg02n3_uc0zx37esa9A"
  };

  const response = await api.post('https://api.urbuddi.com/v1/authentication', {
    data: payload
  });

  expect(response.status()).toBe(200);

  const text = await response.text();
  console.log('Response body:', text);

  const body = JSON.parse(text);
  console.log('Token:', body.token);

  // ✅ Correct access to top-level token
  expect(body.token).toBeDefined();
});
