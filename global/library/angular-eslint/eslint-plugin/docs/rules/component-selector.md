---
title: "@angular-eslint/component-selector (part 1 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/component-selector.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/component-selector`

Component selectors should follow given naming rules. See more at https://angular.dev/style-guide#choosing-component-selectors.

- Type: suggestion

## Rationale

Consistent component selector naming conventions provide several benefits: they make components easily identifiable in templates and browser DevTools, prevent naming collisions with native HTML elements and third-party components, enable teams to quickly identify which library or feature area a component belongs to, and align with the Web Components specification for custom elements. For example, prefixing selectors with 'app-' (like 'app-user-profile') clearly distinguishes your application components from third-party libraries.

## Rule Options

The rule accepts an options object with the following properties:

```ts
type Options =
  | {
      /**
       * Default: `undefined`
       */
      type: string | ("element" | "attribute")[];
      /**
       * Default: `"app"`
       */
      prefix?: string | string[];
      /**
       * Default: `undefined`
       */
      style: "camelCase" | "kebab-case";
    }
  | [
      {
        /**
         * Default: `undefined`
         */
        type: "element" | "attribute";
        /**
         * Default: `"app"`
         */
        prefix?: string | string[];
        /**
         * Default: `undefined`
         */
        style: "camelCase" | "kebab-case";
      }
    ]
  | [
      {
        /**
         * Default: `undefined`
         */
        type: "element" | "attribute";
        /**
         * Default: `"app"`
         */
        prefix?: string | string[];
        /**
         * Default: `undefined`
         */
        style: "camelCase" | "kebab-case";
      },
      {
        /**
         * Default: `undefined`
         */
        type: "element" | "attribute";
        /**
         * Default: `"app"`
         */
        prefix?: string | string[];
        /**
         * Default: `undefined`
         */
        style: "camelCase" | "kebab-case";
      }
    ];

```
