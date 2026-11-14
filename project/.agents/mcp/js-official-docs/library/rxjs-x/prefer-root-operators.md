---
title: "Disallow importing operators from rxjs/operators (rxjs-x/prefer-root-operators)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/prefer-root-operators.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow importing operators from `rxjs/operators` (`rxjs-x/prefer-root-operators`)

💼 This rule is enabled in the following configs: ✅ `recommended`, 🔒 `strict`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

This rule prevents importing from the `rxjs/operators` export site.
Most operators were moved to the `rxjs` export site in RxJS v7.2.0
(excepting a few old and deprecated operators).
The `rxjs/operators` export site has since been deprecated and will be removed in a future major version.

Note that because a few operators were renamed or not migrated to the `rxjs` export site,
this rule may not provide an automatic fixer if renaming the import path is not guaranteed to be safe.
See the documentation linked below.

## Rule details

Examples of **incorrect** code for this rule:

```ts
import { map } from 'rxjs/operators';
```

Examples of **correct** code for this rule:

```ts
import { map } from 'rxjs';
```

## When Not To Use It

If you don't care about importing from the deprecated site, then you don't need this rule.

Type checked lint rules are more powerful than traditional lint rules, but also require configuring type checked linting.

## Further reading

- Importing instructions

## Resources

- Rule source
- Test source
