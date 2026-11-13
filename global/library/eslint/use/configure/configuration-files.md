---
title: "Configuration Files (part 1 of 4)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/use/configure/configuration-files.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# Configuration Files

{%- from 'components/npx_tabs.macro.html' import npx_tabs %}
{%- from 'components/npm_tabs.macro.html' import npm_tabs with context %}

**Tip:**
This page explains how to use flat config files.

You can put your ESLint project configuration in a configuration file. You can include built-in rules, how you want them enforced, plugins with custom rules, shareable configurations, which files you want rules to apply to, and more.

## Configuration File

The ESLint configuration file may be named any of the following:

- `eslint.config.js`
- `eslint.config.mjs`
- `eslint.config.cjs`
- `eslint.config.ts` (requires additional setup)
- `eslint.config.mts` (requires additional setup)
- `eslint.config.cts` (requires additional setup)

It should be placed in the root directory of your project and export an array of configuration objects. Here's an example:

```js
// eslint.config.js
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		rules: {
			semi: "error",
			"prefer-const": "error",
		},
	},
]);
```

In this example, the `defineConfig()` helper is used to define a configuration array with just one configuration object. The configuration object enables two rules: `semi` and `prefer-const`. These rules are applied to all of the files ESLint processes using this config file.

If your project specifies `"type": "commonjs"` in its `package.json` file, then `eslint.config.js` must be in CommonJS format, such as:

```js
// eslint.config.js
const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
	{
		rules: {
			semi: "error",
			"prefer-const": "error",
		},
	},
]);
```
