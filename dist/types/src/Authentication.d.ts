import { IConfiguration } from "./Configuration";
import { ILoginCredentials, ILoginOptions } from "./schemes/auth/Login";
import { ILoginResponse } from "./schemes/response/Login";
import { IRefreshTokenResponse } from "./schemes/response/Token";
interface IAuthenticationInjectableProps {
    post<T>(url: string, data: any): Promise<T>;
}
export interface IAuthentication {
    isLoggedIn(): boolean;
    login(credentials: ILoginCredentials, options: ILoginOptions): Promise<ILoginResponse>;
    logout(): void;
    refreshIfNeeded(): Promise<[boolean, Error?]>;
    refresh(token: string): Promise<IRefreshTokenResponse>;
}
export declare class Authentication implements IAuthentication {
    private config;
    private inject;
    private refreshInterval?;
    private onAutoRefreshError?;
    private onAutoRefreshSuccess?;
    constructor(config: IConfiguration, inject: IAuthenticationInjectableProps);
    /**
     * If the current auth status is logged in
     */
    isLoggedIn(): boolean;
    /**
     * Login to the API; Gets a new token from the API and stores it in this.token.
     */
    login(credentials: ILoginCredentials, options?: ILoginOptions): Promise<ILoginResponse>;
    /**
     * Logs the user out by "forgetting" the token, and clearing the refresh interval
     */
    logout(): void;
    /**
     * Refresh the token if it is about to expire (within 30 seconds of expiry date).
     * - Calls onAutoRefreshSuccess with the new token if the refreshing is successful.
     * - Calls onAutoRefreshError if refreshing the token fails for some reason.
     * @returns {[boolean, Error?]}
     */
    refreshIfNeeded(): Promise<[boolean, Error?]>;
    /**
     * Use the passed token to request a new one
     */
    refresh(token: string): Promise<IRefreshTokenResponse>;
    /**
     * Starts an interval of 10 seconds that will check if the token needs refreshing
     */
    private startInterval;
    /**
     * Clears and nullifies the token refreshing interval
     */
    private stopInterval;
    /**
     * Gets the payload of the current token, return type can be generic
     */
    private getPayload;
}
export {};
//# sourceMappingURL=Authentication.d.ts.map