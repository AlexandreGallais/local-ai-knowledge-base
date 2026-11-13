---
title: "Getting started"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/docs/user-guide/get-started.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# Getting started

You can quickly get started by extending an appropriate shared config.

## Linting CSS

Use npm and our `create` tool to automatically setup Stylelint and extend our standard config:

```shell
npm create stylelint@latest
```

> **Note:**
> Stylelint is also compatible with the Bun, pnpm, and Yarn package managers. You can use your preferred one to set up Stylelint, e.g. `bun create stylelint` or `pnpm create stylelint`.

### Manual setup

Alternatively, you can manually setup Stylelint to lint CSS.

1. Create a `stylelint.config.mjs` configuration file in the root of your project with the following content:
   ```js
   /** @type {import('stylelint').Config} */
   export default {
     extends: ["stylelint-config-standard"]
   };
   ```
2. Use npm (or your preferred package manager) to add the related dependencies:
   ```shell
   npm add -D stylelint stylelint-config-standard
   ```
3. Run Stylelint on all the CSS files in your project:
   ```shell
   npx stylelint "**/*.css"
   ```

> **Note:**
> The `npx` command allows you to run locally installed tools.
> You can also use your preferred package manager's equivalent, e.g. `bunx stylelint "**/*.css"` or `pnpm dlx stylelint "**/*.css"`.
> We'll omit `npx` in the rest of this guide.

Once you're up and running, you can customize Stylelint.

## Linting CSS-like languages and CSS within containers

You can extend a community config to lint:

- CSS-like languages, e.g. SCSS, Sass and Less
- CSS within containers, e.g. in HTML, CSS-in-JS and Vue SFCs

For example, to lint SCSS you can extend the SCSS community config:

1. Create a `stylelint.config.mjs` configuration file in the root of your project with the following content:
   ```js
   /** @type {import('stylelint').Config} */
   export default {
     extends: ["stylelint-config-standard-scss"]
   };
   ```
2. Use npm (or your preferred package manager) to add the related dependencies:
   ```shell
   npm add -D stylelint stylelint-config-standard-scss
   ```
3. Run Stylelint on all the SCSS files in your project:
   ```shell
   stylelint "**/*.scss"
   ```

The config includes the:

- SCSS syntax - a custom syntax to parse SCSS
- SCSS plugin - a set of custom rules for SCSS

You'll find more community configs in Awesome Stylelint.

### Using a custom syntax directly

If a shared config isn't available for your preferred language or container, you can install the appropriate custom syntax and use the `customSyntax` option yourself.

For example, to lint CSS inside of Lit elements using the Lit custom syntax:

1. Create a `stylelint.config.mjs` configuration file in the root of your project with the following content:
   ```js
   /** @type {import('stylelint').Config} */
   export default {
     extends: "stylelint-config-standard",
     customSyntax: "postcss-lit"
   };
   ```
2. Use npm (or your preferred package manager) to add the related dependencies:
   ```shell
   npm add -D stylelint stylelint-config-standard postcss-lit
   ```
3. Run Stylelint on all the JavaScript files in your project:
   ```shell
   stylelint "**/*.js"
   ```

You'll find more custom syntaxes in Awesome Stylelint.

#### Using more than one custom syntax

If you want to lint more than one language or container, you can use the `overrides` property.

For example, to lint CSS files and the CSS within Lit Elements you can update your configuration to:

```js
/** @type {import('stylelint').Config} */
export default {
  extends: ["stylelint-config-standard"],
  overrides: [
    {
      files: ["*.js"],
      customSyntax: "postcss-lit"
    }
  ]
};
```

And then run Stylelint on both your CSS and JavaScript files:

```shell
stylelint "**/*.{css,js}"
```
