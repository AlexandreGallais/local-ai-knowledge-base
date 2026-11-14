---
title: "Disallow ignoring the value within takeWhile (rxjs-x/no-ignored-takewhile-value)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-ignored-takewhile-value.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow ignoring the value within `takeWhile` (`rxjs-x/no-ignored-takewhile-value`)

💼 This rule is enabled in the following configs: ✅ `recommended`, 🔒 `strict`.

This rule effects failures if the value received by a `takeWhile` callback is not used in an expression.

## Rule details

Examples of **incorrect** code for this rule:

```ts
import { takeWhile } from "rxjs/operators";

let flag = true;
const whilst = source.pipe(takeWhile(() => flag));
```

Examples of **correct** code for this rule:

```ts
import { takeWhile } from "rxjs/operators";

const whilst = source.pipe(takeWhile(value => value));
```

## When Not To Use It

If you don't care about using the given value in a `takeWhile` callback, then you don't need this rule.

## Resources

- Rule source
- Test source
