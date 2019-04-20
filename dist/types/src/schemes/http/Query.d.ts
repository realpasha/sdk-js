/**
 * @see https://docs.directus.io/api/reference.html#query-parameters
 */
interface IQueryParameters {
    meta: {
        collection?: string;
        type?: string;
        result_count?: number;
        total_count?: number;
        status_count?: {
            deleted?: number;
            draft?: number;
            coming_soon?: number;
            published?: number;
        };
    };
    fields: string[];
    limit: number;
    offset: number;
    single: 1;
    sort: string[];
    status: string[];
    filter: any;
    lang: any;
    q: any;
    groups: any;
    activity_skip: any;
    comment: any;
}
export declare type QueryParameters = Partial<IQueryParameters>;
export {};
//# sourceMappingURL=Query.d.ts.map