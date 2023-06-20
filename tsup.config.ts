import { defineConfig } from "tsup";

export default defineConfig({
  target: "es2019",
  sourcemap: true,
  dts: true,
  platform: "browser",
  format: ["esm", "cjs", "iife"],
});
