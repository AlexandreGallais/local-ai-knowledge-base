---
title: "Disallow passing handlers to subscribe (rxjs-x/no-subscribe-handlers)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-subscribe-handlers.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow passing handlers to `subscribe` (`rxjs-x/no-subscribe-handlers`)

💭 This rule requires type information.

This rule effects failures whenever `subscribe` is called with handlers.

## Rule details

Examples of **incorrect** code for this rule:

```ts
import { of } from "rxjs";
import { tap } from "rxjs/operators";

of(42, 54).subscribe((value) => console.log(value));
```

```ts
import { of } from "rxjs";
import { tap } from "rxjs/operators";

of(42, 54).subscribe({
  next: (value) => console.log(value),
});
```

Examples of **correct** code for this rule:

```ts
import { of } from "rxjs";

of(42, 54)
  .pipe(tap((value) => console.log(value)))
  .subscribe();
```

## When Not To Use It

If you don't require all logic to go in the `pipe` section of your observables, then you don't need this rule.
Also, if your project uses `no-ignored-subscribe`, which is the opposite of this rule, then you should not use this rule.

Type checked lint rules are more powerful than traditional lint rules, but also require configuring type checked linting.

## Related To

- `no-ignored-subscribe`

## Resources

- Rule source
- Test source
