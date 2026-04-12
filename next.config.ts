import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /** PinArkive SDK ships as CJS; transpile the aliased `sdk-ts` dependency for the App Router server bundle. */
  transpilePackages: ["sdk-ts"],
};

export default nextConfig;
