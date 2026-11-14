---
title: "Disallow banned observable creators (rxjs-x/ban-observables)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/ban-observables.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow banned observable creators (`rxjs-x/ban-observables`)

It can sometimes be useful to ban specific `rxjs` imports.
This rule can be configured to ban a list of specific `rxjs` imports developers want to avoid in their project.

> **Tip:**
> `ban-observables` only bans at the _import_ site. (In fact, it can ban anything imported from `rxjs`.)
> See `ban-operators` for banning operators at their _usage_.

## Options

This rule accepts a single option which is an object the keys of which are the names of anything in `rxjs` and the values are either booleans or strings containing the explanation for the ban.

The following configuration bans `partition` and `onErrorResumeNext`:

```json
{
  "rxjs-x/ban-observables": [
    "error",
    {
      "partition": true,
      "of": false,
      "onErrorResumeNext": "What is this? Visual Basic?"
    }
  ]
}
```

## When Not To Use It

If you have no need to ban importing anything from `rxjs`, you don't need this rule.

## Related To

- `ban-operators`

## Resources

- Rule source
- Test source
