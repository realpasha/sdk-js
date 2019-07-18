/**
 * @module exports
 */

import { Configuration } from "./Configuration";
import { SDK } from "./SDK";
import { getCollectionItemPath } from "./utils/collection";
import { getPayload } from "./utils/payload";

export {
  // export config for re-setting defaults across all SDK instances
  Configuration,
  // named exports is preferred, keep default for transition phase
  SDK,
  // helper functions which can be used standalone
  getCollectionItemPath,
  getPayload

};

/**
 * @deprecated please use named imports instead of defaults
 * @preferred {@link exports.SDK}
 */
export default SDK;
