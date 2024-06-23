import typescript from "@rollup/plugin-typescript"
import { nodeResolve } from '@rollup/plugin-node-resolve';

// rollup.config.mjs
export default {
  input: ["src/devtool.ts", "src/background.ts"],
  output: {
    dir: "dist",
    format: "es",
    entryFileNames: "[name].js",
  },
  plugins: [typescript(),nodeResolve()],
}
