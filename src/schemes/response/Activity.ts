import { IRoleDataSet } from "./Role";
import { IUserDataSet } from "./User";

export type ActivityAction = string; // update ...
export type ActivityCollection = string; // members ...

export interface IActivityDataSet {
  action: ActivityAction;
  action_by: IUserDataSet;
  roles: IRoleDataSet[];
  action_on: string;
  collection: ActivityAction;
  comment: any | null;
  comment_deleted_on: string | null;
  edited_on: string | null;
  id: number;
  ip: string;
  item: string;
  user_agent: string;
}

export interface IActivityResponse {
  meta: {
    result_count: number;
    total_count: number;
  };
  data: IActivityDataSet[];
}
