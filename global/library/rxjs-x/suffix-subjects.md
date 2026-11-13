---
title: "Enforce the use of a suffix in subject identifiers (rxjs-x/suffix-subjects)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/suffix-subjects.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Enforce the use of a suffix in subject identifiers (`rxjs-x/suffix-subjects`)

💭 This rule requires type information.

This rule effects failures if subject variables, properties and parameters don't conform to a naming scheme that identifies them as subjects.

> **Note:**
> This rule is designed to be optionally compatible with `finnish`.
> Using Finnish notation (adding a `$` suffix) your subject names will _not_ cause a failure of this rule.

## Rule details

Examples of **incorrect** code for this rule:

```ts
const answers = new Subject<number>();
```

Examples of **correct** code for this rule:

```ts
const answersSubject = new Subject<number>();
const answersSubject$ = new Subject<number>();

// The static observable creators that accept a sources object are exempt from this rule.
combineLatest({ answers: new Subject<number>() });
```

## Options

| Name         | Description                                                                | Type    | Default           |
| :----------- | :------------------------------------------------------------------------- | :------ | :---------------- |
| `objects`    | Require for object literal keys.                                           | Boolean | `true`            |
| `parameters` | Require for parameters.                                                    | Boolean | `true`            |
| `properties` | Require for properties, except object literal keys (see "objects" option). | Boolean | `true`            |
| `suffix`     | The suffix to enforce.                                                     | String  | `Subject`         |
| `types`      | Enforce for specific types. Keys are a RegExp, values are a boolean.       | Object  | `[object Object]` |
| `variables`  | Require for variables.                                                     | Boolean | `true`            |

This rule accepts a single option which is an object with properties that determine whether subject suffixes are enforced for `parameters`, `properties`, `objects`, and `variables`.
It also contains a `types` property that determine whether or not the naming convention is to be enforced for specific types
and a `suffix` property.

The default (Angular-friendly) configuration looks like this:

```json
{
  "rxjs-x/suffix-subjects": [
    "error",
    {
      "parameters": true,
      "properties": true,
      "objects": true,
      "suffix": "Subject",
      "types": {
        "^EventEmitter$": false
      },
      "variables": true,
    }
  ]
}
```

The properties in the options object are themselves optional; they do not all have to be specified.

> **Tip:**
> This rule will skip `method` enforcement if the `override` keyword is present.
> Users are encouraged to enable `noImplicitOverride` in their `tsconfig.json` to take advantage of this.

## When Not To Use It

If you don't use suffixes on your project's subjects, then you don't need this rule.
However, keep in mind that inconsistent style can harm readability in a project.

Type checked lint rules are more powerful than traditional lint rules, but also require configuring type checked linting.

## Related To

- `finnish`

## Resources

- Rule source
- Test source
