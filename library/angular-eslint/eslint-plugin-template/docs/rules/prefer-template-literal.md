---
title: "@angular-eslint/template/prefer-template-literal (part 1 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/prefer-template-literal.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/prefer-template-literal`

Ensure that template literals are used instead of concatenating strings or expressions.

- Type: suggestion
- 🔧 Supports autofix (`--fix`)

## Rationale

Template literals (backticks with ${} syntax) are more modern, readable, and maintainable than string concatenation with the + operator. String concatenation like "Hello " + name + "!" is harder to read and error-prone (easy to forget spaces or quotes) compared to the template literal `Hello ${name}!`. Template literals make string composition clearer, especially with multiple expressions. This is a widely accepted JavaScript/TypeScript best practice that should be followed in Angular templates for consistency. Angular templates have supported template literal syntax since v19.2. Using template literals throughout your codebase creates a consistent style and makes complex string building much more readable.

ℹ This rule is not checked in inline templates due to the common use of backticks to define the inline template.

## Rule Options

The rule does not have any configuration options.
