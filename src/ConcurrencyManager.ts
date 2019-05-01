// tslint:disable: object-literal-sort-keys
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface IConcurrencyQueueItem {
  request: AxiosRequestConfig;
  resolver: (queuedRequest: AxiosRequestConfig) => any;
}

export const concurrencyManager = (axios: AxiosInstance, limit: number = 10) => {
  if (limit < 1) {
    throw new Error("ConcurrencyManager Error: minimun concurrent requests is 1");
  }

  const instance = {
    limit,
    queue: [] as IConcurrencyQueueItem[],
    running: [] as IConcurrencyQueueItem[],
    interceptors: {
      request: null,
      response: null,
    },
    push(reqHandler: IConcurrencyQueueItem) {
      instance.queue.push(reqHandler);
      instance.shiftInitial();
    },
    shiftInitial(): void {
      setTimeout(() => {
        if (instance.running.length < instance.limit) {
          instance.shift();
        }
      }, 0);
    },
    shift(): void {
      if (instance.queue.length) {
        const queued = instance.queue.shift();

        queued.resolver(queued.request);
        instance.running.push(queued);
      }
    },
    // use as interceptor. Queue outgoing requests
    requestHandler(req: AxiosRequestConfig): Promise<AxiosRequestConfig> {
      return new Promise(resolve => {
        instance.push({
          request: req,
          resolver: resolve,
        } as IConcurrencyQueueItem);
      });
    },
    // use as interceptor. Execute queued request upon receiving a response
    responseHandler(res: AxiosResponse<any>): AxiosResponse<any> {
      instance.running.shift();
      instance.shift();

      return res;
    },
    detach(): void {
      axios.interceptors.request.eject(instance.interceptors.request);
      axios.interceptors.response.eject(instance.interceptors.response);
    },
    attach(limitConcurrentRequestsTo?: number): void {
      if (limitConcurrentRequestsTo) {
        instance.limit = limitConcurrentRequestsTo;
      }

      // queue concurrent requests
      instance.interceptors.request = axios.interceptors.request.use(instance.requestHandler);
      instance.interceptors.response = axios.interceptors.response.use(
        instance.responseHandler,
        instance.responseHandler
      );
    },
  };

  return instance;
};
