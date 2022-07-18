import { PostStateInterface } from "@/slice/postSlices";
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

export const generateRandomPostData = (): PostStateInterface => {
  const randomNumber = generateRandomNumber(5);
  const randomLikedUsers = [];
  for (let i = 0; i < randomNumber; i++) {
    randomLikedUsers.push({
      id: i,
      name: randomName(),
      profileImage: randomAvatar(),
    });
  }
  return {
    name: randomName(),
    date: randomDateBetween(),
    post: {
      content: randomLorem(3),
      images: [randomAbstract()],
    },
    likedUsers: randomLikedUsers,
    totalShare: generateRandomNumber(100),
    totalComments: generateRandomNumber(100),
  };
};

export const generateRandomSuggestedUser = (): SuggestedUserInterface => {
  return {
    designation: randomJobTitle(),
    name: randomName(),
    profileImage: randomAvatar(),
  };
};
