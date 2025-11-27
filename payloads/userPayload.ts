export class LoginPayload {
  static loginPayload(
    email: string,
    password: string,
    domain_name: string,
    device_token: string
  ) {
    return {
      email,
      password,
      domain_name,
      device_token,
    };
  }
}
