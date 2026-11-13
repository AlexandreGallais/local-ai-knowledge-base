---
title: "@angular-eslint/inject-at-top (part 1 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/inject-at-top.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/inject-at-top`

Requires inject() calls to be declared at the top of the class, before any other member

- Type: problem

## Rationale

Class fields are initialized in the order they are declared, so a field that calls inject() only creates its value when the initializer runs. Anything declared above that line which tries to read the injected service will see undefined, and the error message (usually something like 'Cannot read properties of undefined') points at the consumer, not at the field that was initialized out of order. TypeScript catches the obvious shape of this bug when a later-declared field is referenced directly from an earlier initializer, but it does not trace through a getter body or a method call, so the moment the read of this.someService happens behind that indirection the compiler lets it through and the failure only shows up at runtime. The scenario is deceptively easy to introduce: a getter that reads an injected service is defined below the inject() call, someone later adds a small convenience field above the getter that references it, and the class breaks at construction time even though nothing about the change looks suspicious. Keeping every inject() call at the very top of the class removes the ordering concern entirely, because every dependency is guaranteed to exist before any other field, getter, method, or constructor statement runs. Codebases often wrap inject() in their own helpers, for example an injectTranslations() function that injects a translation service and derives a scoped accessor from it; such a helper has exactly the same ordering constraint, so it can be declared through the additionalInjectFunctions option to be treated like inject() itself.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * A list of additional functions which perform injection, such as your own `injectTranslations()` helper. Each entry is a regular expression which must match the whole function name, so plain names such as `injectTranslations` work as well as patterns such as `inject[A-Z].*`.
   *
   * Default: `[]`
   */
  additionalInjectFunctions?: string[];
}

```
