---
title: "Disallow importing index modules (rxjs-x/no-index)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-index.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow importing index modules (`rxjs-x/no-index`)

💼 This rule is enabled in the following configs: ✅ `recommended`, 🔒 `strict`.

This rule effects failures if an index module is specified as the import location.

## Rule details

Examples of **incorrect** code for this rule:

```ts
import { of } from "rxjs/index";
```

Examples of **correct** code for this rule:

```ts
import { of } from "rxjs";
```

## When Not To Use It

If you don't care about unnecessary import path segments, then you don't need this rule.

## Further reading

- Importing instructions

## Resources

- Rule source
- Test source
