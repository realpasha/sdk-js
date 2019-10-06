import { AuthModes } from "../../Authentication";

export interface ILoginCredentials {
  email: string;
  password: string;
  url?: string;
  project?: string;
  persist?: boolean;
}

export interface ILoginOptions {
  persist: boolean;
  storage: boolean;
  mode: AuthModes;
}
