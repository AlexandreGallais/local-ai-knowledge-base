---
title: "Enforce Finnish notation (rxjs-x/finnish)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/finnish.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Enforce Finnish notation (`rxjs-x/finnish`)

💭 This rule requires type information.

This rule enforces the use of Finnish notation - i.e. the `$` suffix.

## Rule details

Examples of **incorrect** code for this rule:

```ts
const answers = of(42, 54);
```

Examples of **correct** code for this rule:

```ts
const answer$ = of(42, 54);

// The static observable creators that accept a sources object are exempt from this rule.
combineLatest({ answer: of(42, 54) });
```

Examples of **incorrect** code with `strict` enabled:

```ts
const answer$ = 'green';
```

Examples of **correct** code with `strict` enabled but a specific name allowed:

```ts
/* eslint rxjs-x/finnish: ["error", { "strict": true, "names": { "^answer$": true } }] */
const answer$ = 'green';
```

## Options

| Name         | Description                                                                | Type    | Default           |
| :----------- | :------------------------------------------------------------------------- | :------ | :---------------- |
| `functions`  | Require for function-valued names.                                         | Boolean | `true`            |
| `methods`    | Require for methods.                                                       | Boolean | `true`            |
| `names`      | Enforce for specific names. Keys are a RegExp, values are a boolean.       | Object  | `[object Object]` |
| `objects`    | Require for object literal keys.                                           | Boolean | `true`            |
| `parameters` | Require for parameters.                                                    | Boolean | `true`            |
| `properties` | Require for properties, except object literal keys (see "objects" option). | Boolean | `true`            |
| `strict`     | Disallow Finnish notation for non-Observables.                             | Boolean | `false`           |
| `types`      | Enforce for specific types. Keys are a RegExp, values are a boolean.       | Object  | `[object Object]` |
| `variables`  | Require for variables.                                                     | Boolean | `true`            |

This rule accepts a single option which is an object with properties that determine whether Finnish notation is enforced for `functions`, `methods`, `parameters`, `properties`, `objects` and `variables`. It also contains:

- `names` and `types` properties that determine whether or not Finnish notation is to be enforced for specific names or types.
- a `strict` property that, if `true`, allows the `$` suffix to be used _only_ with identifiers that have an `Observable` type.

The `functions` option applies to all function-valued names, including variables, parameters, class and interface properties, and object literal keys.
Class and interface method declarations remain controlled by the `methods` option.

The default (Angular-friendly) configuration looks like this:

```json
{
    "rxjs-x/finnish": [
        "error",
        {
            "functions": true,
            "methods": true,
            "names": {
                "^(canActivate|canActivateChild|canDeactivate|canLoad|intercept|resolve|validate)$": false
            },
            "parameters": true,
            "properties": true,
            "objects": true,
            "strict": false,
            "types": {
                "^EventEmitter$": false
            },
            "variables": true
        }
    ]
}
```

The properties in the options object are themselves optional; they do not all have to be specified.

> **Tip:**
> This rule will skip `method` enforcement if the `override` keyword is present.
> Users are encouraged to enable `noImplicitOverride` in their `tsconfig.json` to take advantage of this.

## When Not To Use It

If you don't use Finnish notation in your project or don't care about enforcing Finnish notation in your project, you don't need this rule.
However, keep in mind that inconsistent style can harm readability in a project;
consider using `no-finnish` to ban Finnish notation if you don't use it in your project.

Type checked lint rules are more powerful than traditional lint rules, but also require configuring type checked linting.

## Further reading

- Observables and Finnish Notation

## Related To

- `no-finnish`
- `suffix-subjects`

## Resources

- Rule source
- Test source
