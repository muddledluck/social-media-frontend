import { faker } from "@faker-js/faker";

export const randomName = (): string => {
  return faker.name.findName();
};
export const randomEmail = (): string => {
  return faker.internet.email();
};

export const randomAvatar = (): string => {
  return faker.image.avatar();
};
