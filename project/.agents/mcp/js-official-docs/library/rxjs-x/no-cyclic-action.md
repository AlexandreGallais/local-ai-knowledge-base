---
title: "Disallow cyclic actions in effects and epics (rxjs-x/no-cyclic-action)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-cyclic-action.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow cyclic actions in effects and epics (`rxjs-x/no-cyclic-action`)

💭 This rule requires type information.

This rule effects failures for effects and epics that emit actions that would pass their `ofType` filter. Such actions are cyclic and, upon emission, immediately re-trigger the effect or epic.

## Rule details

Examples of **incorrect** code for this rule:

```ts
actions.pipe(
  ofType("SOMETHING"),
  map(() => ({ type: "SOMETHING" }))
);
```

Examples of **correct** code for this rule:

```ts
actions.pipe(
  ofType("SOMETHING"),
  map(() => ({ type: "SOMETHING_ELSE" }))
);
```

This rule can be used with effects _and epics_, so it makes **no attempt** to discern whether or not dispatching is disabled for an NgRx effect. That is, code like this will effect (🙈) a failure:

```ts
someEffect = createEffect(() =>
  this.actions$.pipe(
    ofType("SOMETHING"),
    tap(() => console.log("do something")),
  ),
  { dispatch: false }
);
```

Instead, you can use the the RxJS `ignoreElements` operator:

```ts
someEffect = createEffect(() =>
  this.actions$.pipe(
    ofType("SOMETHING"),
    tap(() => console.log("do something")),
    ignoreElements()
  )
);
```

Or you can use an ESLint inline comment to disable the rule for a specific effect.

## Options

| Name         | Description                                                   | Type   | Default                  |
| :----------- | :------------------------------------------------------------ | :----- | :----------------------- |
| `observable` | A RegExp that matches an effect or epic's actions observable. | String | `[Aa]ction(s\|s\$\|\$)$` |

This rule accepts a single option which is an object with an `observable` property that is a regular expression used to match an effect or epic's actions observable. The default `observable` regular expression should match most effect and epic action sources.

```json
{
  "rxjs-x/no-cyclic-action": [
    "error",
    { "observable": "[Aa]ction(s|s\\$|\\$)$" }
  ]
}
```

## When Not To Use It

If you don't use a library with effects and epics (e.g. NgRx or redux-observable),
then you don't need this rule.
Alternatively, if you use NgRx's own `avoid-cyclic-effects` rule,
then you don't need this rule.

Type checked lint rules are more powerful than traditional lint rules, but also require configuring type checked linting.

## Resources

- Rule source
- Test source
