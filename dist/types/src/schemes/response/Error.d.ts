import { AxiosError } from 'axios';
export interface IError<T extends any = any> extends AxiosError {
    json?: boolean;
    error: Error;
    data: T;
}
//# sourceMappingURL=Error.d.ts.map