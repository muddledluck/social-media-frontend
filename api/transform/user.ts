import { generateRandomAvatar } from "@/utils/generateFakeData";

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
  profileImage: string;
  name: string;
  createdAt?: string;
};

export const transformSessionDetailsResponse = (
  data: UserSessionResponse
): UserSessionResponse => {
  return {
    ...data,
    user: {
      ...data.user,
      profileImage: data.user.profileImage
        ? data.user.profileImage
        : generateRandomAvatar(data.user.id, data.user.name),
    },
  };
};
