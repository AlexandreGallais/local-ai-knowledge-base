---
title: "Disallow banned operators (rxjs-x/ban-operators)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/ban-operators.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow banned operators (`rxjs-x/ban-operators`)

💭 This rule requires type information.

This rule can be configured so that developers can ban `rxjs` operators they want to avoid in their project.

> **Note:**
> Operators outside of a `pipe` or not directly exported by `rxjs` are ignored.

## Options

This rule accepts a single option which is an object the keys of which are the names of operators and the values are either booleans or strings containing the explanation for the ban.

The following configuration bans `partition` and `onErrorResumeNext`:

```json
{
  "rxjs-x/ban-operators": [
    "error",
    {
      "partition": true,
      "map": false,
      "onErrorResumeNext": "What is this? Visual Basic?"
    }
  ]
}
```

## When Not To Use It

If you have no need to ban `rxjs` operators, you don't need this rule.

Type checked lint rules are more powerful than traditional lint rules, but also require configuring type checked linting.

## Related To

- `ban-observables`

## Resources

- Rule source
- Test source
