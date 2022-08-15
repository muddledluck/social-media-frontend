import { PostInterface } from "@/api/transform/post";
import { SuggestedUserInterface } from "@/slice/userSlices";
import { getPreviousDay } from "@/utils/constant";
import { faker } from "@faker-js/faker";

export const randomName = (): string => {
  return faker.name.findName();
};
export const randomEmail = (): string => {
  return faker.internet.email();
};

export const randomDateBetween = (): string => {
  const startDate = getPreviousDay();
  const endDate = new Date();
  return faker.date.between(startDate, endDate).toDateString();
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

export const randomJobTitle = () => faker.name.jobTitle();

const generateRandomNumber = (range: number): number => {
  return Math.round(Math.random() * range);
};

export const generateRandomSuggestedUser = (): SuggestedUserInterface => {
  return {
    designation: randomJobTitle(),
    name: randomName(),
    profileImage: randomAvatar(),
  };
};

export const generateRandomAvatar = (id: string, name: string): string => {
  return `https://robohash.org/${name}${id}`;
};
