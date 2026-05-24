import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

const browserGlobals = {
  console: "readonly",
  document: "readonly",
  fetch: "readonly",
  setTimeout: "readonly",
  clearTimeout: "readonly",
  setInterval: "readonly",
  clearInterval: "readonly",
  NodeJS: "readonly",
  window: "readonly",
  navigator: "readonly",
  localStorage: "readonly",
  sessionStorage: "readonly",
  URL: "readonly",
  URLSearchParams: "readonly",
  HTMLElement: "readonly",
  Element: "readonly",
  Event: "readonly",
  MouseEvent: "readonly",
  KeyboardEvent: "readonly",
  FormData: "readonly",
  Blob: "readonly",
  File: "readonly",
  Headers: "readonly",
  Request: "readonly",
  Response: "readonly",
};

const nodeGlobals = {
  console: "readonly",
  process: "readonly",
  require: "readonly",
  __dirname: "readonly",
  __filename: "readonly",
  module: "readonly",
  exports: "readonly",
  global: "readonly",
  Buffer: "readonly",
  setTimeout: "readonly",
  clearTimeout: "readonly",
  setInterval: "readonly",
  clearInterval: "readonly",
};

export default tseslint.config(
  { ignores: [".next/**", "node_modules/**", "wrangler.json"] },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["scripts/**/*.js"],
    languageOptions: {
      parserOptions: { project: null },
      globals: nodeGlobals,
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-undef": "off",
    },
  },
  {
    files: ["src/hooks/**/*.ts", "src/lib/**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...browserGlobals, ...nodeGlobals },
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    files: ["src/**/*.ts", "src/**/*.tsx"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
      },
      globals: browserGlobals,
    },
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  {
    files: ["next.config.ts", "open-next.config.ts", "postcss.config.mjs"],
    languageOptions: {
      parserOptions: { project: null },
      globals: nodeGlobals,
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
  {
    files: ["src/app/**/*.tsx", "src/components/**/*.tsx"],
    rules: {
      "react/no-unescaped-entities": "off",
    },
  }
);