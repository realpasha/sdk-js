import * as AV from "argument-validator";
import * as base64 from "base-64";
import { isNumber } from "./utils/is";

/**
 * Retrieves the payload from a JWT
 * @param  {String} token The JWT to retrieve the payload from
 * @return {Object}       The JWT payload
 */
export function getPayload<T extends object = object>(token: string): T {
  if (!token) {
    // no token equals no payload
    return {} as T;
  }

  const payloadBase64 = token
    .split(".")[1]
    .replace("-", "+")
    .replace("_", "/");
  const payloadDecoded = base64.decode(payloadBase64);
  const payloadObject = JSON.parse(payloadDecoded);

  if (isNumber(payloadObject.exp)) {
    payloadObject.exp = new Date(payloadObject.exp * 1000);
  }

  return payloadObject;
}
