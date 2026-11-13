---
title: "@angular-eslint/template/no-inline-styles (part 1 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/no-inline-styles.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/no-inline-styles`

Disallows the use of inline styles in HTML templates

- Type: suggestion

## Rationale

Inline styles in templates (style attribute, ngStyle directive, [style] bindings, or [style.property] bindings) make it difficult to maintain consistent styling across an application and can violate Content Security Policy (CSP) restrictions. Styles should be defined in component stylesheets or CSS classes where they can be managed centrally, reused, cached by browsers, and easily modified. Inline styles also mix presentation concerns with template structure, making templates harder to read. Using CSS classes with [class] or [ngClass] bindings provides the same dynamic styling capabilities while keeping styles organized and maintainable. This rule can be configured to allow ngStyle or style bindings if needed for specific use cases. Setting an option to "dynamic" allows a binding only when its value cannot be known ahead of time (for example `[style.width.px]="column.width"`), while still reporting bindings whose value is a constant (for example `[style.color]="'red'"`), since those could be expressed as a class instead.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * Whether `[ngStyle]` bindings are allowed. `true` allows them unconditionally. `"dynamic"` allows them only when the bound value is not a constant (e.g. `{ color: textColor }` is allowed, but `{ color: 'red' }` is reported because it could be a class).
   *
   * Default: `false`
   */
  allowNgStyle?: boolean | "dynamic";
  /**
   * Whether `[style]`, `[style.property]` and `style="{{ }}"` bindings are allowed. `true` allows them unconditionally. `"dynamic"` allows them only when the bound value is not a constant (e.g. `[style.width.px]="column.width"` is allowed, but `[style.color]="'red'"` is reported because it could be a class).
   *
   * Default: `false`
   */
  allowBindToStyle?: boolean | "dynamic";
}

```
