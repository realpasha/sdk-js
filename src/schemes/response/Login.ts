export interface ILoginResponse {
  url: string;
  project: string;
  token?: string;
  localExp?: number;
}

export type RefreshIfNeededResponse = [boolean, Error?];

export interface ILogoutResponse {}
