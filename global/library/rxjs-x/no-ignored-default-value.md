---
title: "Disallow using firstValueFrom, lastValueFrom, first, and last without specifying a default value (rxjs-x/no-ignored-default-value)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-ignored-default-value.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow using `firstValueFrom`, `lastValueFrom`, `first`, and `last` without specifying a default value (`rxjs-x/no-ignored-default-value`)

💼 This rule is enabled in the 🔒 `strict` config.

💭 This rule requires type information.

This rule prevents `EmptyError` rejections if there were no emissions from `firstValueFrom`, `lastValueFrom`, `first`, or `last` by requiring `defaultValue`.

## Rule details

Examples of **incorrect** code for this rule:

```ts
import { Subject, firstValueFrom } from "rxjs";

const sub = new Subject();
const result = firstValueFrom(sub);
sub.complete();
```

Examples of **correct** code for this rule:

```ts
import { Subject, firstValueFrom } from "rxjs";

const sub = new Subject();
const result = firstValueFrom(sub, { defaultValue: null });
sub.complete();
```

## When Not To Use It

If you intentionally want `EmptyError` rejections when the observable completes, then you may not need this rule.
You might consider using ESLint disable comments for specific situations instead of completely disabling this rule.

Type checked lint rules are more powerful than traditional lint rules, but also require configuring type checked linting.

## Resources

- Rule source
- Test source
