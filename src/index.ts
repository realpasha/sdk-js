import { Configuration } from "./Configuration";
import { SDK } from "./SDK";

export {
  // export config for re-setting defaults across all SDK instances
  Configuration,
  // named exports is preferred, keep default for transition phase
  SDK,
};

/**
 * @deprecated please use named imports instead of defaults
 */
export default SDK;
