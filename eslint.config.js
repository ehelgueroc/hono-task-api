// is a predefined eslint config
import antfu from "@antfu/eslint-config";

export default antfu({
  type: "app",
  formatters: true,
  typescript: true,
  stylistic: {
    indent: 2,
    semi: true,
    quotes: "double",
  },
}, {
  rules: {
    "no-console": ["warn"],
    "antful/no-top-level-await": "off", // disable rule preventing top level await
    "node/prefer-global/process": "off", // disable rule preventing process usage
    "node/prefer-global/env": "error", // enable rule preventing env usage
    "perfectionist/sort-imports": ["error", {
      internalPattern: ["@/**"],
    }],
    "unicorn/filename-case": ["error", {
      case: "kebabCase",
      ignore: ["README.md", "docs/HOWTO.md"], 
    }],
  },
});
