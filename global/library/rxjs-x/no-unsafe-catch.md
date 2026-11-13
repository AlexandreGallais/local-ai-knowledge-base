---
title: "Disallow unsafe catchError usage in effects and epics (rxjs-x/no-unsafe-catch)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-unsafe-catch.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow unsafe `catchError` usage in effects and epics (`rxjs-x/no-unsafe-catch`)

💭 This rule requires type information.

This rule effects failures if `catchError` is used in an effect or epic in a manner that will complete the outermost observable.

## Rule details

Examples of **incorrect** code for this rule:

```ts
actions.pipe(
  ofType("SOMETHING"),
  switchMap((action) => something(action)),
  catchError(handleError)
);
```

Examples of **correct** code for this rule:

```ts
actions.pipe(
  ofType("SOMETHING"),
  switchMap((action) => something(action).pipe(
    catchError(handleError)
  ))
);
```

```ts
actions.pipe(
  ofType("SOMETHING"),
  switchMap((action) => something(action)),
  catchError((error, caught) => {
    handleError(error);
    return caught;
  })
);
```

## Options

| Name         | Description                                                   | Type   | Default                  |
| :----------- | :------------------------------------------------------------ | :----- | :----------------------- |
| `observable` | A RegExp that matches an effect or epic's actions observable. | String | `[Aa]ction(s\|s\$\|\$)$` |

This rule accepts a single option which is an object with an `observable` property that is a regular expression used to match an effect or epic's actions observable. The default `observable` regular expression should match most effect and epic action sources.

```json
{
  "rxjs-x/no-unsafe-catch": [
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
