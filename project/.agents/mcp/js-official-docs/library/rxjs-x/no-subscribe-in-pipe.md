---
title: "Disallow calling of subscribe within any RxJS operator inside a pipe (rxjs-x/no-subscribe-in-pipe)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-subscribe-in-pipe.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow calling of `subscribe` within any RxJS operator inside a `pipe` (`rxjs-x/no-subscribe-in-pipe`)

💼 This rule is enabled in the following configs: ✅ `recommended`, 🔒 `strict`.

💭 This rule requires type information.

This rule effects failures if `subscribe` is called within any operator inside a `pipe` operation.

## Rule details

Examples of **incorrect** code for this rule:

```ts
import { of } from "rxjs";
import { map } from "rxjs/operators";

of(42, 54).pipe(
  map(value => {
    of(value).subscribe(console.log);
    return value * 2;
  })
).subscribe(result => console.log(result));
```

Examples of **correct** code for this rule:

```ts
import { of } from "rxjs";
import { map, tap } from "rxjs/operators";

of(42, 54).pipe(
  tap(value => console.log(value)),
  map(value => value * 2)
).subscribe(result => console.log(result));
```

## When Not To Use It

If you need to subscribe within `pipe` and are aware of the potential issues,
then you might not need this rule.
However, you should typically prefer to use higher-order mapping operators
like `mergeMap`, `switchMap`, or `concatMap` to handle nested observables.

Type checked lint rules are more powerful than traditional lint rules, but also require configuring type checked linting.

## Related To

- `no-nested-subscribe`

## Resources

- Rule source
- Test source
