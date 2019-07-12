import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
export interface IConcurrencyQueueItem {
    request: AxiosRequestConfig;
    resolver: (queuedRequest: AxiosRequestConfig) => any;
}
/**
 * Handling and limiting concurrent requests for the API.
 * @param {AxiosInstance} axios   Reference to the caller instance
 * @param {number=10} limit       When to reate-limit outgoing requests
 */
export declare const concurrencyManager: (axios: AxiosInstance, limit?: number) => {
    limit: number;
    queue: IConcurrencyQueueItem[];
    running: IConcurrencyQueueItem[];
    interceptors: {
        request: any;
        response: any;
    };
    push(reqHandler: IConcurrencyQueueItem): void;
    shiftInitial(): void;
    shift(): void;
    requestHandler(req: AxiosRequestConfig): Promise<AxiosRequestConfig>;
    responseHandler(res: AxiosResponse<any>): AxiosResponse<any>;
    detach(): void;
    attach(limitConcurrentRequestsTo?: number): void;
};
//# sourceMappingURL=ConcurrencyManager.d.ts.map