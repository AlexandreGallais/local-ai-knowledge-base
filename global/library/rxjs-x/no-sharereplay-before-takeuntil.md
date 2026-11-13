---
title: "Disallow using shareReplay({ refCount: false }) before takeUntil (rxjs-x/no-sharereplay-before-takeuntil)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-sharereplay-before-takeuntil.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow using `shareReplay({ refCount: false })` before `takeUntil` (`rxjs-x/no-sharereplay-before-takeuntil`)

💼 This rule is enabled in the 🔒 `strict` config.

This rule effects failures if the `shareReplay` operator is used without its reference counting behavior
and placed in an observable composition before `takeUntil`.

## Rule details

Examples of **incorrect** code for this rule:

```ts
source.pipe(
    shareReplay(),
    takeUntil(notifier),
);
```

Examples of **correct** code for this rule:

```ts
source.pipe(
    shareReplay({ refCount: true }),
    takeUntil(notifier),
);
```

## Options

| Name             | Description                              | Type     | Default                |
| :--------------- | :--------------------------------------- | :------- | :--------------------- |
| `takeUntilAlias` | List of operators to treat as takeUntil. | String[] | [`takeUntilDestroyed`] |

This rule accepts a single option which allows specifying any potential aliases for `takeUntil`. The purpose of this is to enforce the "no `shareReplay` before" rule on other operators that are used as `takeUntil()`. The default configuration is Angular friendly by specifying
`takeUntilDestroyed`
as an alias.

## When Not To Use It

If you are confident your project uses `shareReplay` and `takeUntil` correctly,
then you may not need this rule.

## Further reading

- Avoiding takeUntil leaks#An update

## Resources

- Rule source
- Test source
