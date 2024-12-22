# How to create a new Hono API

This guide will show you how to create a new Hono API.

## Create a new project

Create a new project with Hono CLI:

```bash
pnpm create hono-app@latest
```

## Configure eslint

Once the project is created, you can configure eslint:

```bash
pnpm dlx @antfu/eslint-config@latest
```

A menu is going to be shown, select the following options:

- Select framework: None
- Select a extra utils: Formatter
- Update .vscode/settings.json: Yes

Once you have antfu eslint config installed, you can add additional eslint config in the `eslint.config.js` file:

```js
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
});
```

In package.JSON, add the following scripts:

```json
{
  "scripts": {
    // ...
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

## Run server

Then, you can start the project:

```bash
pnpm dev
```

## Create a new API

Create a new API in the `src/index.ts` file:

```ts
import { Hono } from "hono";

const app = new Hono();
```
