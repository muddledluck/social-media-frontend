import { ErrorResult } from "@/types/types";
import { SuccessResult } from "@/types/types";
import api from "api/api";
import {
  SignInRequestData,
  SignUpRequestData,
  UserDataResponse,
  UserSessionResponse,
} from "api/transform/user";

const USER_BASE_ROUTE = "/api/users/";
const SESSION_BASE_ROUTE = "/api/session/";
export const signUp = async (
  requestData: SignUpRequestData
): Promise<SuccessResult<string> | ErrorResult> => {
  const response = await api.request<UserDataResponse>({
    url: USER_BASE_ROUTE,
    method: "POST",
    data: { ...requestData },
  });

  if (response.remote === "success") {
    return {
      remote: "success",
      data: "Successfully Registered",
    };
  }
  return response;
};

export const signIn = async (
  requestData: SignInRequestData
): Promise<SuccessResult<string> | ErrorResult> => {
  const response = await api.request({
    url: SESSION_BASE_ROUTE,
    method: "POST",
    data: { ...requestData },
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: "Successfully LoggedIn",
    };
  }
  return response;
};

export const getSessionDetails = async (): Promise<
  SuccessResult<UserSessionResponse> | ErrorResult
> => {
  const response = await api.request<UserSessionResponse>({
    url: SESSION_BASE_ROUTE,
    method: "GET",
  });
  if (response.remote === "success") {
    return {
      remote: "success",
      data: response.data,
    };
  }
  return response;
};
