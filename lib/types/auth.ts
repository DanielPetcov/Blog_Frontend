export type LoginForm = {
  email: string;
  password: string;
};

export type LoginResponse =
  | {
      success: true;
      data: LoginResponseData;
    }
  | {
      success: false;
      error: string;
    };

export type LoginResponseData = {
  access_token: string;
};
