import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  turbopack: {
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              replaceAttrValues: { "#6C737F": "currentColor" },
              dimensions: false,
            },
          },
        ],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
