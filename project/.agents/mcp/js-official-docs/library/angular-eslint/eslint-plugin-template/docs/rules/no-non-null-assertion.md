---
title: "@angular-eslint/template/no-non-null-assertion (part 1 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/no-non-null-assertion.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/no-non-null-assertion`

Disallows the non-null assertion operator (!) in templates

- Type: suggestion

## Rationale

Equivalent of @typescript-eslint/no-non-null-assertion rule for Angular templates. TypeScript's `!` non-null assertion operator asserts to the type system that an expression is non-nullable, as in not `null` or `undefined`. Using assertions to tell the type system new information is often a sign that code is not fully type-safe. It's generally better to structure program logic so that TypeScript understands when values may be nullable.

## Rule Options

The rule does not have any configuration options.
