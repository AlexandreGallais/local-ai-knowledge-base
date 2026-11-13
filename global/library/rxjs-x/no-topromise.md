---
title: "Disallow use of the toPromise method (rxjs-x/no-topromise)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-topromise.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow use of the `toPromise` method (`rxjs-x/no-topromise`)

💼 This rule is enabled in the following configs: ✅ `recommended`, 🔒 `strict`.

💡 This rule is manually fixable by editor suggestions.

💭 This rule requires type information.

This rule effects failures if the `toPromise` method is used.

This rule provides three editor suggestions which replace `toPromise` with either:

- `lastValueFrom(..., { defaultValue: undefined })`, which imitates the behavior of `toPromise`,
- or `lastValueFrom(...)`, which throws `EmptyError` instead of defaulting to `undefined`,
- or `firstValueFrom(...)`.

## When Not To Use It

If you rely on RxJS's deprecation of `toPromise` and don't need to double-flag usage,
then you don't need this rule.

Type checked lint rules are more powerful than traditional lint rules, but also require configuring type checked linting.

## Further reading

- Conversion to Promises

## Related To

- `no-ignored-default-value`

## Resources

- Rule source
- Test source
