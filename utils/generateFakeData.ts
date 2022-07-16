import { getPreviousDay } from "@/utils/constant";
import { faker } from "@faker-js/faker";

export const randomName = (): string => {
  return faker.name.findName();
};
export const randomEmail = (): string => {
  return faker.internet.email();
};

export const randomDateBetween = (): Date => {
  const startDate = getPreviousDay();
  const endDate = new Date();
  return faker.date.between(startDate, endDate);
};

export const randomAvatar = (): string => {
  return faker.image.avatar();
};

export const randomAbstract = (
  width: number = 500,
  height: number = 500,
  randomize: boolean = true
): string => {
  return `${faker.image.abstract(width, height, randomize)}?random=${Math.round(
    Math.random() * 1000
  )}`;
};

export const randomLorem = (sentenceCount: number): string => {
  return faker.lorem.lines(sentenceCount);
};
