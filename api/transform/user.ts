export type SignUpRequestData = {
  email: string;
  password: string;
  name: string;
};
export type SignInRequestData = {
  email: string;
  password: string;
};

export type UserDataResponse = {
  id: string;
  email: string;
  name: string;
};

export type UserSessionResponse = {
  id: string;
  userAgent: string;
  user: User;
};

export type User = {
  id: string;
  email: string;
  profileImage?: string;
  name: string;
};
