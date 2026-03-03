import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule: { test?: { test?: (s: string) => boolean } }) =>
      rule.test?.test?.(".svg")
    );
    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ },
        use: [
          {
            loader: "@svgr/webpack",
            options: {
              replaceAttrValues: { "#6C737F": "currentColor" },
              dimensions: false,
            },
          },
        ],
      }
    );
    if (fileLoaderRule) fileLoaderRule.exclude = /\.svg$/i;
    return config;
  },
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
