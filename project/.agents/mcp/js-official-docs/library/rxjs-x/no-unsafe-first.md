---
title: "Disallow unsafe first/take usage in effects and epics (rxjs-x/no-unsafe-first)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-unsafe-first.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow unsafe `first`/`take` usage in effects and epics (`rxjs-x/no-unsafe-first`)

💭 This rule requires type information.

This rule effects failures if `first` is used in an effect or epic in a manner that will complete the outermost observable.

## Options

| Name         | Description                                                   | Type   | Default                  |
| :----------- | :------------------------------------------------------------ | :----- | :----------------------- |
| `observable` | A RegExp that matches an effect or epic's actions observable. | String | `[Aa]ction(s\|s\$\|\$)$` |

This rule accepts a single option which is an object with an `observable` property that is a regular expression used to match an effect or epic's actions observable. The default `observable` regular expression should match most effect and epic action sources.

```json
{
  "rxjs-x/no-unsafe-first": [
    "error",
    { "observable": "[Aa]ction(s|s\\$|\\$)$" }
  ]
}
```

## When Not To Use It

If you don't use a library with effects and epics (e.g. NgRx or redux-observable),
then you don't need this rule.

Type checked lint rules are more powerful than traditional lint rules, but also require configuring type checked linting.

## Resources

- Rule source
- Test source
