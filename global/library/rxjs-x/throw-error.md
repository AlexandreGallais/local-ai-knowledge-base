---
title: "Enforce passing only Error values to throwError or Subject.error (rxjs-x/throw-error)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/throw-error.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Enforce passing only `Error` values to `throwError` or `Subject.error` (`rxjs-x/throw-error`)

💼 This rule is enabled in the following configs: ✅ `recommended`, 🔒 `strict`.

💡 This rule is manually fixable by editor suggestions.

💭 This rule requires type information.

This rule forbids passing values that are not `Error` objects to `throwError` or `Subject.error`.
It's similar to the typescript-eslint `only-throw-error` rule,
but is for the `throwError` Observable creation function or the `Subject.error` method - not `throw` statements.

## Rule details

Examples of **incorrect** code for this rule:

```ts
import { throwError, Subject } from "rxjs";

throwError(() => "Kaboom!");

const subject = new Subject<void>();
subject.error("Kaboom!");
```

Examples of **correct** code for this rule:

```ts
import { throwError, Subject } from "rxjs";

throwError(() => new Error("Kaboom!"));

const subject = new Subject<void>();
subject.error(new Error("Kaboom!"));
```

## Options

| Name                   | Description                                                 | Type    | Default |
| :--------------------- | :---------------------------------------------------------- | :------ | :------ |
| `allowThrowingAny`     | Whether to always allow throwing values typed as `any`.     | Boolean | `true`  |
| `allowThrowingUnknown` | Whether to always allow throwing values typed as `unknown`. | Boolean | `true`  |

## When Not To Use It

If you don't care about throwing values that are not `Error` objects, then you don't need this rule.
However, keep in mind that, while JavaScript _allows_ throwing any value,
most developer may find this behavior surprising or inconvenient to handle.

Type checked lint rules are more powerful than traditional lint rules, but also require configuring type checked linting.

## Resources

- Rule source
- Test source
