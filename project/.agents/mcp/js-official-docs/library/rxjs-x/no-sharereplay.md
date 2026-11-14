---
title: "Disallow unsafe shareReplay usage (rxjs-x/no-sharereplay)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-sharereplay.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow unsafe `shareReplay` usage (`rxjs-x/no-sharereplay`)

💼 This rule is enabled in the following configs: ✅ `recommended`, 🔒 `strict`.

This rule effects failures if the `shareReplay` operator is used - or if it is used without specifying a `config` argument.

The behavior of `shareReplay` has changed several times - see the blog post linked below.

## Options

| Name          | Description                                          | Type    | Default |
| :------------ | :--------------------------------------------------- | :------ | :------ |
| `allowConfig` | Allow shareReplay if a config argument is specified. | Boolean | `true`  |

This rule accepts a single option which is an object with an `allowConfig` property that that determines whether `shareReplay` is allow if a config argument is specified. By default, `allowConfig` is `true`.

```json
{
  "rxjs-x/no-sharereplay": [
    "error",
    { "allowConfig": true }
  ]
}
```

## When Not To Use It

If you are confident that `shareReplay` is used properly your project,
then you may not need this rule.
However, keep in mind that it's recommended to always provide a config object
that explicitly specifies `refCount` (see linked blog post);
by default, `shareReplay` without any config defaults to `refCount: false`,
which means the source observable will never be unsubscribed from,
potentially leading to unexpected behavior and memory leaks.

## Further reading

- What's changed with shareReplay

## Resources

- Rule source
- Test source
