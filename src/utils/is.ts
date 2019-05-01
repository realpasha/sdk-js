const isType = (t: string, v: any) => Object.prototype.toString.call(v) === `[object ${t}]`;

export const hasKeysWith = (validator: (v: any) => boolean, obj: any, keys: string[]) => {
  if (!isObjectOrEmpty(obj) || !isArrayOrEmpty(keys)) {
    return false;
  }

  const length = keys.length;
  for (let i = 0; i < length; i++) {
    if (!Object.prototype.hasOwnProperty.call(obj, keys[i])) {
      return false;
    }

    if (!validator(obj[keys[i]])) {
      return false;
    }
  }

  return true;
};

export const isNotNull = (v: any) => v !== null && v !== undefined;

export const isString = (v: any) => v && typeof v === "string" && /\S/.test(v);

export const isNumber = (v: any) => isType("Number", v) && isFinite(v) && !isNaN(parseFloat(v));

export const isFunction = (v: any) => v instanceof Function;

export const isObjectOrEmpty = (v: any) => isType("Object", v);

export const isArrayOrEmpty = (v: any) => isType("Array", v);

export const isArray = (v: any) => (!isArrayOrEmpty(v) ? false : v.length > 0);

export const hasKeysWithString = (obj: any, keys: string[]) => hasKeysWith(isString, obj, keys);

export const isObject = (v: any) => {
  if (!isObjectOrEmpty(v)) {
    return false;
  }

  for (const key in v) {
    if (Object.prototype.hasOwnProperty.call(v, key)) {
      return true;
    }
  }

  return false;
};
