---
title: "@angular-eslint/directive-selector (part 1 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/directive-selector.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/directive-selector`

Directive selectors should follow given naming rules. See more at https://angular.dev/style-guide#choosing-directive-selectors.

- Type: suggestion

## Rationale

Consistent directive selector naming conventions help identify which directives belong to your application versus third-party libraries, prevent naming collisions with native HTML attributes and other directives, and make code reviews and debugging easier. For example, using a camelCase attribute selector with a prefix like 'appHighlight' makes it immediately clear that this is a custom directive from your application.

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
