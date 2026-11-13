---
title: "Disallow operators that return connectable observables (rxjs-x/no-connectable)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-connectable.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow operators that return connectable observables (`rxjs-x/no-connectable`)

💭 This rule requires type information.

This rule prevents the use of operators that return connectable observables.

> **Note:**
> All operators banned by this rule are also deprecated by RxJS,
> so this rule may be removed in a future major version.

## Rule details

Examples of **incorrect** code for this rule:

```ts
import { of, publish } from "rxjs";

const result = of(42).pipe(publish());
```

## When Not To Use It

If you use operators that return connectable observables in your project, you may not need this rule.
Or you may rely on RxJS's deprecation of those operators and don't need to double-flag the operators as banned.

Type checked lint rules are more powerful than traditional lint rules, but also require configuring type checked linting.

## Resources

- Rule source
- Test source
