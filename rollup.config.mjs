import typescript from "@rollup/plugin-typescript"
import { nodeResolve } from "@rollup/plugin-node-resolve"

// rollup.config.mjs
export default [
  {
    input: ["src/contentScript.ts"],
    output: {
      dir: "dist",
      entryFileNames: "[name].js",
      format: "iife",
    },
    plugins: [typescript(), nodeResolve()],
  },
  {
    input: ["src/devtool.ts"],
    output: {
      dir: "dist",
      entryFileNames: "[name].js",
    },
    plugins: [typescript(), nodeResolve()],
  },
  {
    input: ["src/background.ts"],
    output: {
      dir: "dist",
      entryFileNames: "[name].js",
    },
    plugins: [typescript(), nodeResolve()],
  },
]
