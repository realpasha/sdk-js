import { IConfiguration, IConfigurationValues } from "./Configuration";

// Scheme types
import { IAuthenticateResponse } from "./schemes/auth/Authenticate";
import { ILoginCredentials, ILoginOptions } from "./schemes/auth/Login";
import { ILoginResponse } from "./schemes/response/Login";
import { IRefreshTokenResponse } from "./schemes/response/Token";

// Utilities
import { invariant } from "./utils/invariant";
import { hasKeysWithString, isFunction, isObject, isString } from './utils/is';
import { getPayload } from "./utils/payload";

interface IAuthenticationRefreshError {
  code?: number;
  message: string;
}

interface IAuthenticationInjectableProps {
  post<T>(url: string, data: any): Promise<T>;
}

export interface IAuthentication {
  refreshInterval?: number;
  isLoggedIn(): boolean;
  login(credentials: ILoginCredentials, options: ILoginOptions): Promise<ILoginResponse>;
  logout(): void;
  refreshIfNeeded(): Promise<[boolean, Error?]>;
  refresh(token: string): Promise<IRefreshTokenResponse>;
}

export class Authentication implements IAuthentication {
  public refreshInterval?: number;
  private onAutoRefreshError?: (msg: IAuthenticationRefreshError) => void;
  private onAutoRefreshSuccess?: (config: IConfigurationValues) => void;

  constructor(private config: IConfiguration, private inject: IAuthenticationInjectableProps) {
    // Only start the auto refresh interval if the token exists and it's a JWT
    if (config.token && config.token.includes(".")) {
      this.startInterval(true);
    }
  }

  /**
   * If the current auth status is logged in
   */
  public isLoggedIn(): boolean {
    if (
      isString(this.config.token) &&
      isString(this.config.url) &&
      isString(this.config.project) &&
      isObject(this.getPayload())
    ) {
      if (this.config.localExp > Date.now()) {
        // Not expired, succeed
        return true;
      }
    }
    return false;
  }

  /**
   * Login to the API; Gets a new token from the API and stores it in this.token.
   */
  public login(
    credentials: ILoginCredentials,
    options: ILoginOptions = { persist: true, storage: false }
  ): Promise<ILoginResponse> {
    invariant(isObject(credentials), "malformed credentials");
    invariant(hasKeysWithString(credentials, ["email", "password"]), "email & password required in credentials");

    this.config.token = null;

    if (hasKeysWithString(credentials, ["url"])) {
      this.config.url = credentials.url;
    }

    if (hasKeysWithString(credentials, ["project"])) {
      this.config.project = credentials.project;
    }

    if (credentials.persist || options.persist) {
      this.startInterval();
    }

    return new Promise((resolve, reject) => {
      this.inject
        .post("/auth/authenticate", {
          email: credentials.email,
          password: credentials.password,
        })
        .then((res: IAuthenticateResponse) => {
          // Save new token in configuration
          return this.config.token = res.data.token;
        })
        .then((token: string) => {
          // Expiry date is the moment we got the token + 5 minutes
          this.config.localExp = new Date(Date.now() + this.config.tokenExpirationTime).getTime();

          resolve({
            localExp: this.config.localExp,
            project: this.config.project,
            token,
            url: this.config.url,
          });
        })
        .catch(reject);
    });
  }

  /**
   * Logs the user out by "forgetting" the token, and clearing the refresh interval
   */
  public logout(): void {
    this.config.reset();

    if (this.refreshInterval) {
      this.stopInterval();
    }
  }

  /// REFRESH METHODS ----------------------------------------------------------

  /**
   * Refresh the token if it is about to expire (within 30 seconds of expiry date).
   * - Calls onAutoRefreshSuccess with the new token if the refreshing is successful.
   * - Calls onAutoRefreshError if refreshing the token fails for some reason.
   * @returns {[boolean, Error?]}
   */
  public refreshIfNeeded(): Promise<[boolean, Error?]> {
    const payload = this.getPayload<{ exp: any }>();

    if (
      !isString(this.config.token) ||
      !isString(this.config.url) ||
      !isString(this.config.project)
    ) {
      return;
    }

    if (!payload || !payload.exp) {
      return;
    }

    const timeDiff = (this.config.localExp || 0) - Date.now();

    if (timeDiff <= 0) {
      if (isFunction(this.onAutoRefreshError)) {
        this.onAutoRefreshError({
          code: 102,
          message: "auth_expired_token",
        });
      }
      return;
    }

    if (timeDiff < 30000) {
      return new Promise<[boolean, Error?]>((resolve: (res: [boolean, Error?]) => any) => {
        this.refresh(this.config.token)
          .then((res: IRefreshTokenResponse) => {
            const localExp = this.config.localExp = new Date(Date.now() + this.config.tokenExpirationTime).getTime();
            const token = this.config.token = res.data.token || this.config.token;
            const autorefreshResult = {
              localExp,
              project: this.config.project,
              token,
              url: this.config.url,
            };

            // If autorefresh succeeded
            if (isFunction(this.onAutoRefreshSuccess)) {
              this.onAutoRefreshSuccess(autorefreshResult);
              resolve([true]);
            }

            // If expiration via storage
            this.config.update(autorefreshResult);
            resolve([true]);
          })
          .catch((error: Error) => {
            if (isFunction(this.onAutoRefreshError)) {
              this.onAutoRefreshError(error);
            }

            resolve([true, error]);
          });
      });
    } else {
      Promise.resolve([false]);
    }
  }

  /**
   * Use the passed token to request a new one
   */
  public refresh(token: string): Promise<IRefreshTokenResponse> {
    invariant(isString(token), "token must be a string");

    return this.inject.post<IRefreshTokenResponse>("/auth/refresh", { token });
  }

  /**
   * Starts an interval of 10 seconds that will check if the token needs refreshing
   */
  private startInterval(fireImmediately?: boolean): void {
    if (fireImmediately) {
      this.refreshIfNeeded();
    }

    this.refreshInterval = setInterval(this.refreshIfNeeded.bind(this), 10000);
  }

  /**
   * Clears and nullifies the token refreshing interval
   */
  private stopInterval(): void {
    clearInterval(this.refreshInterval);
    this.refreshInterval = null;
  }

  /**
   * Gets the payload of the current token, return type can be generic
   */
  private getPayload<T extends object = object>(): T {
    if (!isString(this.config.token)) {
      return null;
    }

    return getPayload<T>(this.config.token);
  }
}
