import { IConfiguration, IConfigurationValues } from "./Configuration";

// Other classes
import { IAPI } from "./API";

// Scheme types
import { IAuthenticateResponse } from "./schemes/auth/Authenticate";
import { ILoginCredentials, ILoginOptions } from "./schemes/auth/Login";
import { ILoginResponse, RefreshIfNeededResponse } from "./schemes/response/Login";
import { IRefreshTokenResponse } from "./schemes/response/Token";

// Utilities
import { invariant } from "./utils/invariant";
import { isFunction, isObject, isString } from "./utils/is";
import { getPayload } from "./utils/payload";

interface IAuthenticationRefreshError {
  code?: number;
  message: string;
}

interface IAuthenticationInjectableProps {
  post: IAPI["post"];
}

export interface IAuthentication {
  refreshInterval?: number;
  isLoggedIn(): boolean;
  login(credentials: ILoginCredentials, options?: ILoginOptions): Promise<ILoginResponse>;
  logout(): void;
  refreshIfNeeded(): Promise<[boolean, Error?]>;
  refresh(token: string): Promise<IRefreshTokenResponse>;
}

/**
 * Handles all authentication related logic, decoupled from the core
 * @internal
 * @author Jan Biasi <biasijan@gmail.com>
 */
export class Authentication implements IAuthentication {
  /**
   * Current set auto-refresh interval or undefined
   * @type {number|undefined}
   */
  public refreshInterval?: number;

  /**
   * Optional customized error handler
   * @internal
   */
  private onAutoRefreshError?: (msg: IAuthenticationRefreshError) => void;

  /**
   * Optional customized success handler
   * @internal
   */
  private onAutoRefreshSuccess?: (config: IConfigurationValues) => void;

  /**
   * Creates a new authentication instance
   * @constructor
   * @param {IConfiguration} config
   * @param {IAuthenticationInjectableProps} inject
   */
  constructor(private config: IConfiguration, private inject: IAuthenticationInjectableProps) {
    // Only start the auto refresh interval if the token exists and it's a JWT
    if (config.token && config.token.includes(".")) {
      this.startInterval(true);
    }
  }

  /**
   * If the current auth status is logged in
   * @return {boolean}
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
   * @param {ILoginCredentials} credentials   User login credentials
   * @param {ILoginOptions?} options          Additional options regarding persistance and co.
   * @return {Promise<ILoginResponse>}
   */
  public login(credentials: ILoginCredentials, options?: ILoginOptions): Promise<ILoginResponse> {
    invariant(isObject(credentials), "malformed credentials");
    invariant(
      isString(credentials.email) && isString(credentials.password),
      "email & password are required in credentials"
    );

    this.config.token = null;

    if (isString(credentials.url)) {
      this.config.url = credentials.url;
    }

    if (isString(credentials.project)) {
      this.config.project = credentials.project;
    }

    if (credentials.persist || (options && options.persist) || this.config.persist) {
      // use interval for login refresh when option persist enabled
      this.startInterval();
    }

    return new Promise((resolve, reject) => {
      this.inject
        .post("/auth/authenticate", {
          email: credentials.email,
          password: credentials.password,
        })
        .then((res: IAuthenticateResponse) => {
          // save new token in configuration
          return (this.config.token = res.data.token);
        })
        .then((token: string) => {
          // expiry date is the moment we got the token + 5 minutes
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
   * @return {RefreshIfNeededResponse}
   */
  public refreshIfNeeded(): Promise<RefreshIfNeededResponse> {
    const payload = this.getPayload<{ exp: any }>();
    const { token, url, project, localExp } = this.config;

    if (!isString(token) || !isString(url) || !isString(project)) {
      return;
    }

    if (!payload || !payload.exp) {
      return;
    }

    const timeDiff = (localExp || 0) - Date.now();

    if (timeDiff <= 0) {
      // token has expired, skipping auto refresh
      if (isFunction(this.onAutoRefreshError)) {
        this.onAutoRefreshError({
          code: 102,
          message: "auth_expired_token",
        });
      }
      return;
    }

    if (timeDiff < 30000) {
      return new Promise<RefreshIfNeededResponse>((resolve: (res: RefreshIfNeededResponse) => any) => {
        this.refresh(token)
          .then((res: IRefreshTokenResponse) => {
            this.config.localExp = new Date(Date.now() + this.config.tokenExpirationTime).getTime();
            this.config.token = res.data.token || token;

            // if autorefresh succeeded
            if (isFunction(this.onAutoRefreshSuccess)) {
              this.onAutoRefreshSuccess(this.config);
            }

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
   * Use the passed token to request a new one.
   * @param {string} token
   */
  public refresh(token: string): Promise<IRefreshTokenResponse> {
    invariant(isString(token), "token must be a string");

    return this.inject.post<IRefreshTokenResponse>("/auth/refresh", { token });
  }

  /**
   * Starts an interval of 10 seconds that will check if the token needs refreshing
   * @param {boolean?} fireImmediately    If it should immediately call [refreshIfNeeded]
   */
  private startInterval(fireImmediately?: boolean): void {
    if (fireImmediately) {
      this.refreshIfNeeded();
    }

    this.refreshInterval = setInterval(this.refreshIfNeeded.bind(this), 10000) as any;
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
   * @typeparam T     The payload response type, arbitrary object
   * @return {T}
   */
  private getPayload<T extends object = object>(): T {
    if (!isString(this.config.token)) {
      return null;
    }

    return getPayload<T>(this.config.token);
  }
}
