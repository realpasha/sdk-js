import { IAPIMetaList, IAPIResponse } from "../APIResponse";
import { IUser } from "../directus/User";

/**
 * @see https://docs.directus.io/api/reference.html#users
 */
export interface IUserResponse<User extends IUser = IUser> extends IAPIResponse<User> {}

/**
 * @see https://docs.directus.io/api/reference.html#users
 */
export interface IUsersResponse<Users extends IUser[] = IUser[]> extends IAPIResponse<Users, IAPIMetaList> {}
