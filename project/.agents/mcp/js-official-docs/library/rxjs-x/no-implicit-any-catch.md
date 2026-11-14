---
title: "Disallow implicit any error parameters in catchError, subscribe, and tap (rxjs-x/no-implicit-any-catch)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-implicit-any-catch.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow implicit `any` error parameters in `catchError`, `subscribe`, and `tap` (`rxjs-x/no-implicit-any-catch`)

💼 This rule is enabled in the following configs: ✅ `recommended`, 🔒 `strict`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

💭 This rule requires type information.

This rule requires an explicit type annotation for error parameters in error handlers for `catchError`, `subscribe`, and `tap`.
It's similar to the typescript-eslint `use-unknown-in-catch-callback-variable` rule
or the TSConfig `useUnknownInCatchVariables` option,
but is for observables - not `try`/`catch` statements.

## Rule details

Examples of **incorrect** code for this rule:

```ts
import { catchError, throwError } from "rxjs";

throwError(() => new Error("Kaboom!")).pipe(
  catchError((error) => console.error(error))
);
```

```ts
import { throwError } from "rxjs";

throwError(() => new Error("Kaboom!")).subscribe({
  error: (error) => console.error(error)
});
```

```ts
import { tap, throwError } from "rxjs";

throwError(() => new Error("Kaboom!")).pipe(
  tap({
    error: (error) => console.error(error),
  }),
);
```

Examples of **correct** code for this rule:

```ts
import { catchError, throwError } from "rxjs";

throwError(() => new Error("Kaboom!")).pipe(
  catchError((error: unknown) => console.error(error))
);
```

```ts
import { throwError } from "rxjs";

throwError(() => new Error("Kaboom!")).subscribe({
  error: (error: unknown) => console.error(error)
});
```

```ts
import { tap, throwError } from "rxjs";

throwError(() => new Error("Kaboom!")).pipe(
  tap({
    error: (error: unknown) => console.error(error),
  }),
);
```

```ts
// With allowExplicitError option:
throwError(() => new Error("Kaboom!")).pipe(
  catchError((error: Error) => console.error(error))
);
```

## Options

| Name                 | Description                                           | Type    | Default |
| :------------------- | :---------------------------------------------------- | :------ | :------ |
| `allowExplicitAny`   | Allow error variable to be explicitly typed as `any`. | Boolean | `true`  |
| `allowExplicitError` | Allow narrowing error type to `Error`.                | Boolean | `false` |

This rule accepts a single option which is an object with the following properties:

- `allowExplicitAny`: Determines whether or not the error variable can be explicitly typed as `any`. By default, the use of explicit `any` is allowed.
- `allowExplicitError`: Determines whether the error parameter can be narrowed to the `Error` type. By default, narrowing to `Error` is not allowed.

```json
{
  "rxjs-x/no-implicit-any-catch": [
    "error",
    { 
      "allowExplicitAny": true,
      "allowExplicitError": true
    }
  ]
}
```

> **Warning:**
> The `allowExplicitError` option is inherently unsafe.
> The JavaScript `throw` statement can be followed by any kind of expression,
> and so `catch (e)` can provide anything instead of just `Error`;
> annotating the error as anything except `unknown` is technically incorrect.
>
> However, `allowExplicitError` is convenient in codebases
> where `throw` is known to only receive `Error` objects.
> We highly recommend you use the `only-throw-error` rule from `typescript-eslint`,
> as well as `throw-error` from this plugin.
> Note this also assumes that 3rd-party libraries also only throw `Error`.

## When Not To Use It

If your codebase is not yet able to enable `useUnknownInCatchVariables`,
it likely would be similarly difficult to enable this rule.

Type checked lint rules are more powerful than traditional lint rules, but also require configuring type checked linting.

## Further reading

- Catching Unknowns

## Related To

- `throw-error`

## Resources

- Rule source
- Test source
