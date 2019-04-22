import { IRoleDataSet } from "./Role";

export type UserStatus = "active" | "inactive";

export interface IUserDataSet {
  avatar: any | null;
  company: string | null;
  email: string;
  email_notifications: boolean;
  external_id: any | null;
  first_name: string;
  high_contrast_mode: boolean;
  id: number;
  last_access_on: string;
  last_name: string;
  last_page: string;
  locale: string;
  locale_options: null;
  roles: IRoleDataSet[];
  status: UserStatus;
  timezone: string;
  title: string | null;
  token: string;
}

export interface IUsersResponse {
  meta: {
    result_count: number;
    total_count: number;
  };
  data: IUserDataSet[];
}

export interface IUserResponse {
  data: IUserDataSet;
}
