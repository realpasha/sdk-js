import { IAPIResponse } from "../APIResponse";
export interface IRoleDataSet {
    description: string;
    external_id: any | null;
    id: number;
    ip_whitelist: any | null;
    name: string;
    nav_blacklist: any | null;
    nav_override: any | null;
}
export interface IRoleResponse extends IAPIResponse<IRoleDataSet[]> {
}
//# sourceMappingURL=Role.d.ts.map