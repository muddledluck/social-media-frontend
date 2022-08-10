import {
  AccessToken,
  ACCESS_TOKEN,
  RefreshToken,
  REFRESH_TOKEN,
} from "@/helpers/persistStorageHelper";
import { AxiosAuthRefreshRequestConfig } from "axios-auth-refresh";
import axios, { AxiosError } from "axios";
import QueryString from "qs";
import { getCookie, setCookie } from "cookies-next";
import { SuccessResult, ErrorResult, ServerError } from "@/types/types";
import { SERVER_URL } from "@/utils/serverUrl";
export const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
  paramsSerializer: (params) =>
    QueryString.stringify(params, { arrayFormat: "brackets" }),
});

// Request interceptor for API calls

axiosInstance.interceptors.request.use(
  async (config) => {
    // ignore the token reload request
    if (config.url !== "sessions/refresh") {
      const accessToken = getCookie(ACCESS_TOKEN);
      const refreshToken = getCookie(REFRESH_TOKEN);
      if (accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }
      if (refreshToken) {
        config.headers = {
          ...config.headers,
          "x-refresh": `Bearer ${refreshToken}`,
        };
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const request = async <T>(
  config: AxiosAuthRefreshRequestConfig
): Promise<SuccessResult<T> | ErrorResult> => {
  try {
    const response = await axiosInstance.request<T>({ ...config });
    if (response.headers.accesstoken) {
      setCookie(ACCESS_TOKEN, response.headers.accesstoken);
    }
    if (response.headers.refreshtoken) {
      setCookie(REFRESH_TOKEN, response.headers.refreshtoken);
    }
    return {
      remote: "success",
      data: response.data,
    };
  } catch (error: any) {
    if (error) {
      if (error.response) {
        const axiosError = error as AxiosError<ServerError>;
        if (axiosError.response && axiosError.response.data) {
          let errorMessage = axiosError.response.data.errors;
          // check for 500 to handle message defined by the app
          if (axiosError.response.status === 500) {
            errorMessage = "Internal Server Error";
          } else {
            errorMessage = error.response.data.errors;
          }
          return {
            remote: "failure",
            error: {
              status: axiosError.response.status,
              errors: errorMessage,
            },
          };
        }
      } else {
        const axiosError = error as AxiosError;
        let errorMessage = axiosError.message;

        return {
          remote: "failure",
          error: {
            errors: errorMessage,
          },
        };
      }
    }
    throw error;
  }
};

export const parseResponse = <T>(
  response: any
): SuccessResult<T> | ErrorResult => {
  const data = JSON.parse(response);
  if (data && (data.errors || data.error)) {
    return {
      remote: "failure",
      error: {
        errors: data.errors ?? data.error,
      },
    };
  }
  return {
    remote: "success",
    data,
  };
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { axiosInstance, request, parseResponse };
