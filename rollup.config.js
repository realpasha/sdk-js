// @ts-check
import resolve from "rollup-plugin-node-resolve";
import stripblocks from "rollup-plugin-strip-blocks";

// @ts-ignore
import pkg from "./package.json";

export default {
  input: "dist/esm/index.js",
  output: {
    file: "dist/umd/directus-sdk.js",
    format: "umd",
    name: "Directus",
    globals: "base-64",
    sourcemap: true,
    exports: "named", // danger zone
    banner: `/**! ${pkg.name} v${pkg.version} */`
  },
  plugins: [
    stripblocks({
      start: "nodeonlyblock:start",
      end: "nodeonlyblock:end"
    }),
    resolve({
      customResolveOptions: {
        moduleDirectory: "node_modules"
      }
    })
  ],
  moduleContext: {
    [require.resolve("whatwg-fetch")]: "window"
  },
  external: ["isomorphic-fetch", "es6-promise"]
}
