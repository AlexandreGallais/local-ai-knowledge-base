---
title: "@angular-eslint/no-input-rename (part 1 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/no-input-rename.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/no-input-rename`

Ensures that input bindings are not aliased

- Type: suggestion
- 🔧 Supports autofix (`--fix`)

- 💡 Provides suggestions on how to fix issues (https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

## Rationale

Renaming inputs creates a confusing situation where the property has one name inside the component class (private name) and a different name in templates (public name). For example, with the @Input() decorator: '@Input("userName") name: string' means you access 'this.name' in the component but bind with '[userName]' in templates. Similarly, with the signal-based input() function: 'userName = input<string>({ alias: "name" })' means you access 'this.userName()' internally but bind with '[name]' in templates. This dual naming makes the code harder to understand, complicates refactoring, and can cause bugs when developers forget which name to use in which context. Keep the internal and external names the same unless you have a strong reason for the mismatch.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * A list with allowed input names
   *
   * Default: `[]`
   */
  allowedNames?: string[];
}

```
