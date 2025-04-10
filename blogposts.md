# Next.js Configuration for Ignoring ESLint and TypeScript Errors

In this configuration, we're setting up Next.js to ignore ESLint errors during builds and TypeScript errors during the build process. This is particularly useful for development environments where you might want to focus on the functionality rather than the code quality.

Here's the configuration:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
