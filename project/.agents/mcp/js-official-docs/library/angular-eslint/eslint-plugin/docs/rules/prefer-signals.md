---
title: "@angular-eslint/prefer-signals (part 1 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/prefer-signals.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/prefer-signals`

Use readonly signals instead of `@Input()`, `@ViewChild()` and other legacy decorators

- Type: suggestion
- 🔧 Supports autofix (`--fix`)

## Rationale

Angular signals represent the future of reactivity in Angular, offering fine-grained change detection, better performance, and improved developer experience. Signal-based APIs like input(), viewChild(), and contentChild() provide type-safe, reactive properties that integrate seamlessly with computed values and effects. Unlike decorator-based APIs (@Input(), @ViewChild(), etc.), signals enable more granular tracking of dependencies and updates, allowing Angular to optimize change detection. Signal properties should be marked readonly because signals themselves are stable references - you read their value by calling them, you don't reassign the signal. This prevents bugs where developers might accidentally reassign a signal instead of updating its value. Using signals throughout your components creates a consistent, reactive programming model that makes data flow explicit and easier to understand.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * Default: `true`
   */
  preferReadonlySignalProperties?: boolean;
  /**
   * Default: `true`
   */
  preferInputSignals?: boolean;
  /**
   * Default: `true`
   */
  preferQuerySignals?: boolean;
  /**
   * Default: `false`
   */
  useTypeChecking?: boolean;
  /**
   * Default: `[]`
   */
  additionalSignalCreationFunctions?: string[];
}

```
