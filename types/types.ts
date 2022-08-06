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
