import { User } from "@/api/transform/user";

export type RemoteDataStatus = "success" | "failure";

export type ServerError = {
  status?: number;
  errors: string;
};

export type SuccessResult<T> = {
  remote: Extract<RemoteDataStatus, "success">;
  data: T;
};

export type ErrorResult = {
  remote: Extract<RemoteDataStatus, "failure">;
  error: ServerError;
};

export type Attachment = {
  id: string;
  type: string;
  path: string;
};

export type Vote = {
  id: string;
  vote: 1;
  createdAt?: string;
  user: Omit<User, "email" | "createdAt">;
};
