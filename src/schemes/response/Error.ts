import { AxiosError } from "axios";

export interface IErrorResponse<T extends any = any> extends AxiosError {
  json?: boolean;
  error: Error;
  data: T;
}
