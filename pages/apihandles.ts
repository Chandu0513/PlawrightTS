import { APIRequestContext, APIResponse } from '@playwright/test';
import { LoginPayload } from '../payloads/userPayload';

export class LoginApi {
  private request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

  async login(
    email: string,
    password: string,
    domain: string,
    deviceToken: string
  ): Promise<APIResponse> {

    const payload = LoginPayload.loginPayload(email, password, domain, deviceToken);

    const response = await this.request.post(
      'https://api.urbuddi.com/v1/authentication',
      {
        data: payload,
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'User-Agent': 'PlaywrightAPI',
        },
      }
    );

    return response;
  }
}
