import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable standalone output to avoid symlink issues
  output: undefined,
};

export default nextConfig;
