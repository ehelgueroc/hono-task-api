# How to create a new Hono API

This guide will show you how to create a new Hono API.

## Create a new project

Create a new project with Hono CLI:

```bash
pnpm create hono-app@latest
```

Once the project is created, you can configure eslint:

```bash
pnpm dlx @antfu/eslint-config@latest
```

A menu is going to be shown, select the following options:

- Select framework: None
- Select a extra utils: Formatter
- Update .vscode/settings.json: Yes

Then, you can start the project:

```bash
pnpm dev
```

## Create a new API

Create a new API in the `src/index.ts` file:

```ts
import { Hono } from 'hono'

const app = new Hono()
```
