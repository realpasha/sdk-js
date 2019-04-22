import { isObjectOrEmpty } from "./is";

export const invariant = (condition: boolean | null | undefined, message: string): void => {
  if (!!condition === true) {
    return;
  }

  throw new Error(`Invariant violation: ${message}`);
};

invariant.params = (params: any) => invariant(isObjectOrEmpty(params), "params must be an object or empty");
