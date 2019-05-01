import { IAPIResponse } from "../APIResponse";
export interface IFieldMeta {
    Deleted: number;
    Draft: number;
    Published: number;
    table: string;
    total: number;
    total_entries: number;
    type: string;
}
export interface IFieldDataInfo {
    id: string;
    sort: number | null;
    status: number | null;
}
export interface IField<T> extends IAPIResponse<T & IFieldDataInfo, IFieldMeta> {
}
//# sourceMappingURL=Field.d.ts.map