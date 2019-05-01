import { IAPIMetaList, IAPIResponse } from "../APIResponse";
import { IRoleDataSet } from "./Role";
import { IUserDataSet } from "./User";
export declare type ActivityAction = string;
export declare type ActivityCollection = string;
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
export interface IActivityResponse extends IAPIResponse<IActivityDataSet[], IAPIMetaList> {
}
//# sourceMappingURL=Activity.d.ts.map