import api from "@/api/api";
import {
  CreatePostRequestData,
  PostInterface,
  PostResponse,
  ToggleVoteInterface,
  transformCreatePostResponse,
  transformPostResponse,
} from "@/api/transform/post";
import { ErrorResult, SuccessResult } from "@/types/types";

const POST_BASE_ROUTE = "/api/post";

export const createPost = async (
  requestData: CreatePostRequestData
): Promise<SuccessResult<PostInterface> | ErrorResult> => {
  const response = await api.request<PostResponse>({
    url: POST_BASE_ROUTE,
    method: "POST",
    data: requestData,
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: transformCreatePostResponse(response.data),
    };
  }
  return response;
};

export const getFeedPost = async (): Promise<
  SuccessResult<PostInterface[]> | ErrorResult
> => {
  const response = await api.request<PostResponse[]>({
    url: `${POST_BASE_ROUTE}/feed`,
    method: "GET",
  });

  if (response.remote === "success") {
    return {
      remote: "success",
      data: transformPostResponse(response.data),
    };
  }
  return response;
};

export const toggleLikePost = async (
  postId: string
): Promise<SuccessResult<ToggleVoteInterface> | ErrorResult> => {
  const response = await api.request<ToggleVoteInterface>({
    method: "PUT",
    url: `${POST_BASE_ROUTE}/toggle-like/${postId}`,
  });
  return response;
};
