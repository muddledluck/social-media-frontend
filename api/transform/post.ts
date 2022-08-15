import { User } from "@/api/transform/user";
import { Attachment, Vote } from "@/types/types";
import { generateRandomAvatar } from "@/utils/generateFakeData";
import { string } from "yup";

export type CreatePostRequestData = {
  content: string;
};

export type CountType = {
  comments: number;
  votes: number;
};

export type PostResponse = {
  id: string;
  content: string;
  shares: number;
  attachment?: Attachment[];
  createdAt: string;
  user: User;
  votes: Vote[];
  _count: CountType;
  isVoted: boolean;
};

export interface PostInterface {
  id: string;
  user: Omit<User, "email">;
  createdAt: string;
  content: string;
  attachment: Attachment[];
  likedUsers: Vote[];
  totalShare: number;
  totalComments: number;
  totalLikes: number;
  isLiked: boolean;
}

export interface ToggleVoteInterface {
  action: "delete" | "create";
  data: Vote;
}

export const transformCreatePostResponse = (
  data: PostResponse
): PostInterface => {
  return {
    id: data.id,
    content: data.content,
    user: {
      name: data.user.name,
      id: data.user.id,
      profileImage:
        data.user.profileImage ||
        generateRandomAvatar(data.user.id, data.user.name),
    },
    createdAt: data.createdAt,
    attachment: data.attachment || [],
    likedUsers: data.votes,
    totalShare: data.shares,
    totalComments: data._count.comments,
    totalLikes: data._count.votes,
    isLiked: data.isVoted,
  };
};

export const transformPostResponse = (
  data: PostResponse[]
): PostInterface[] => {
  const newData = data.map((post) => transformCreatePostResponse(post));
  return newData;
};
