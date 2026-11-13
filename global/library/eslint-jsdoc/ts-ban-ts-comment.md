---
title: "ts-ban-ts-comment"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/ts-ban-ts-comment.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `ts-ban-ts-comment`

Disallows `@ts-<directive>` comments (`@ts-expect-error`, `@ts-ignore`,
`@ts-nocheck`, `@ts-check`) or requires that they be accompanied by a
description, mirroring the behavior of
`@typescript-eslint/ban-ts-comment`.

This rule is only recommended for `typescript-flavor` configs (i.e., those
using TypeScript-style JSDoc without an actual TypeScript compiler), since
`typescript` configs are expected to already have `typescript-eslint`
enabled, which offers its own `@typescript-eslint/ban-ts-comment` rule for
this purpose.

Note that when `ts-ignore` is banned (the default), this rule always
suggests replacing `@ts-ignore` with `@ts-expect-error`, since the latter
will itself report an error if the following line turns out not to need
suppressing. However, `@ts-expect-error` requires the following line to
*always* error, so it is unsuitable if, e.g., a codebase is type-checked
against multiple TypeScript versions and the line only errors under some
of them; in that scenario, `@ts-ignore` remains the appropriate choice.
Since the rule cannot detect this (it does not run the type checker), such
codebases should instead configure `ts-ignore` as `false` or
`"allow-with-description"` so the necessary `@ts-ignore` comments are not
reported.

## Options

A single options object has the following properties.

### `minimumDescriptionLength`

A minimum character length for descriptions when `allow-with-description` is enabled. Defaults to `3`.

### `ts-check`

Whether (and how) to allow `@ts-check` directives.

### `ts-expect-error`

Whether (and how) to allow `@ts-expect-error` directives.

### `ts-ignore`

Whether (and how) to allow `@ts-ignore` directives.

### `ts-nocheck`

Whether (and how) to allow `@ts-nocheck` directives.

|||
|---|---|
|Context|everywhere|
|Tags|``|
|Recommended|false, but recommended for `typescript-flavor` configs|
|Settings||

## Failing examples

The following patterns are considered problems:

````ts
// @ts-ignore
foo();
// Message: Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free.

/* @ts-ignore */
foo();
// Message: Use "@ts-expect-error" instead of "@ts-ignore", as "@ts-ignore" will do nothing if the following line is error-free.

// @ts-nocheck
foo();
// Message: Do not use "@ts-nocheck" because it alters compilation errors.

// @ts-nocheck
// Message: Do not use "@ts-nocheck" because it alters compilation errors.

// @ts-check
foo();
// "jsdoc/ts-ban-ts-comment": ["error"|"warn", {"ts-check":true}]
// Message: Do not use "@ts-check" because it alters compilation errors.

// @ts-expect-error
foo();
// "jsdoc/ts-ban-ts-comment": ["error"|"warn", {"ts-expect-error":true}]
// Message: Do not use "@ts-expect-error" because it alters compilation errors.

// @ts-expect-error
foo();
// Message: Include a description after the "@ts-expect-error" directive to explain why the @ts-expect-error is necessary. The description must be 3 characters or longer.

// @ts-expect-error: TS
foo();
// "jsdoc/ts-ban-ts-comment": ["error"|"warn", {"minimumDescriptionLength":10}]
// Message: Include a description after the "@ts-expect-error" directive to explain why the @ts-expect-error is necessary. The description must be 10 characters or longer.

/*
   @ts-expect-error: not matching format text */
foo();
// "jsdoc/ts-ban-ts-comment": ["error"|"warn", {"ts-expect-error":{"descriptionFormat":"^: TS\\d+ because .+$"}}]
// Message: The description for the "@ts-expect-error" directive must match the ^: TS\d+ because .+$ format.
````

## Passing examples

The following patterns are not considered problems:

````ts
// A regular comment.
/* Another regular comment. */
function foo () {}

/** JSDoc comment. */
function foo () {}

// @ts-check
foo();

foo();
// @ts-nocheck

// @ts-check
foo();
// "jsdoc/ts-ban-ts-comment": ["error"|"warn", {"ts-check":{}}]

// @ts-ignore
foo();
// "jsdoc/ts-ban-ts-comment": ["error"|"warn", {"ts-ignore":false}]

// @ts-expect-error: Suppress next line
foo();

// @ts-expect-error: TS2345 because reasons
foo();
// "jsdoc/ts-ban-ts-comment": ["error"|"warn", {"ts-expect-error":{"descriptionFormat":"^: TS\\d+ because .+$"}}]
````
