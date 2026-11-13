---
title: "Disallow Observables in places not designed to handle them (rxjs-x/no-misused-observables)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-misused-observables.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow Observables in places not designed to handle them (`rxjs-x/no-misused-observables`)

💼 This rule is enabled in the 🔒 `strict` config.

💭 This rule requires type information.

This rule forbids providing observables to logical locations where the TypeScript compiler allows them but they are not handled properly.
These situations can often arise due to a misunderstanding of the way observables are handled.

> **Tip:**
> `no-misused-observables` only detects code that provides observables to incorrect _logical_ locations.
> See `no-floating-observables` for detecting unhandled observable _statements_.

This rule is like no-misused-promises but for Observables.

> **Note:**
> Unlike `@typescript-eslint/no-misused-promises`, this rule does not check conditionals like `if` statements.
> Use `@typescript-eslint/no-unnecessary-condition` for linting those situations.

## Rule details

Examples of **incorrect** code for this rule:

```ts
import { of } from "rxjs";

[1, 2, 3].forEach(i => of(i));

interface MySyncInterface {
    foo(): void;
}
class MyRxClass implements MySyncInterface {
    foo(): Observable<number> {
        return of(42);
    }
}

const a = of(42);
const b = { ...b };
```

Examples of **correct** code for this rule:

```ts
import { of } from "rxjs";

[1, 2, 3].map(i => of(i));

interface MyRxInterface {
    foo(): Observable<number>;
}
class MyRxClass implements MyRxInterface {
    foo(): Observable<number> {
        return of(42);
    }
}
```

## Options

| Name               | Description                                                                 | Type    | Default |
| :----------------- | :-------------------------------------------------------------------------- | :------ | :------ |
| `checksSpreads`    | Disallow `...` spreading an Observable.                                     | Boolean | `true`  |
| `checksVoidReturn` | Disallow returning an Observable from a function typed as returning `void`. | Object  | `true`  |

### `checksVoidReturn`

You can disable selective parts of the `checksVoidReturn` option. The following sub-options are supported:

| Name               | Description                                                                                                                              | Type    | Default |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------- | :------ | :------ |
| `arguments`        | Disallow passing an Observable-returning function as an argument where the parameter type expects a function that returns `void`.        | Boolean | `true`  |
| `attributes`       | Disallow passing an Observable-returning function as a JSX attribute expected to be a function that returns `void`.                      | Boolean | `true`  |
| `inheritedMethods` | Disallow providing an Observable-returning function where a function that returns `void` is expected by an extended or implemented type. | Boolean | `true`  |
| `properties`       | Disallow providing an Observable-returning function where a function that returns `void` is expected by a property.                      | Boolean | `true`  |
| `returns`          | Disallow returning an Observable-returning function where a function that returns `void` is expected.                                    | Boolean | `true`  |
| `variables`        | Disallow assigning or declaring an Observable-returning function where a function that returns `void` is expected.                       | Boolean | `true`  |

## When Not To Use It

Like `@typescript-eslint/no-misused-promises`,
this rule can be difficult to enable on large existing projects that set up many misused observables.

Type checked lint rules are more powerful than traditional lint rules, but also require configuring type checked linting.

## Further reading

- TypeScript void function assignability

## Related To

- `no-floating-observables`

## Resources

- Rule source
- Test source
