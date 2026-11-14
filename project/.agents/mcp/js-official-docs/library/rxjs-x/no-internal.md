---
title: "Disallow importing internal modules (rxjs-x/no-internal)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-internal.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow importing internal modules (`rxjs-x/no-internal`)

💼 This rule is enabled in the following configs: ✅ `recommended`, 🔒 `strict`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

This rule effects failures if an internal module is specified as the import location.

## Rule details

Examples of **incorrect** code for this rule:

```ts
import { of } from "rxjs/internal/observable/of";
```

Examples of **correct** code for this rule:

```ts
import { of } from "rxjs";
```

## When Not To Use It

If you need to import internal modules that are not covered by the public API,
then you don't need this rule.
However, keep in mind that internal modules may change without notice.

## Further reading

- Importing instructions

## Resources

- Rule source
- Test source
