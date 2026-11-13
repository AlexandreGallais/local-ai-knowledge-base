---
title: "Disallow applying operators after takeUntil (rxjs-x/no-unsafe-takeuntil)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-unsafe-takeuntil.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow applying operators after `takeUntil` (`rxjs-x/no-unsafe-takeuntil`)

💼 This rule is enabled in the following configs: ✅ `recommended`, 🔒 `strict`.

💭 This rule requires type information.

This rule effects failures whenever `takeUntil` is used in observable compositions that can leak subscriptions.

Although it's recommended that `takeUntil` be placed last - to ensure unsubscription from any inner observables - there are a number of operators that might _need_ to be placed after it - like `toArray` or any other operator that depends upon a `complete` notification. The rule is aware of these operators (see the rule's options, below) and will not effect failures if they are placed after `takeUntil`.

## Rule details

Examples of **incorrect** code for this rule:

```ts
const combined = source
    .pipe(takeUntil(notifier), combineLatest(b))
    .subscribe((value) => console.log(value));
```

Examples of **correct** code for this rule:

```ts
const combined = source
    .pipe(combineLatest(b), takeUntil(notifier))
    .subscribe((value) => console.log(value));
```

## Options

| Name    | Description                                                                 | Type     | Default                                                                                                                                                                                                                                                    |
| :------ | :-------------------------------------------------------------------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alias` | An array of operator names that should be treated similarly to `takeUntil`. | String[] |                                                                                                                                                                                                                                                            |
| `allow` | An array of operator names that are allowed to follow `takeUntil`.          | String[] | [`count`, `defaultIfEmpty`, `endWith`, `every`, `finalize`, `finally`, `isEmpty`, `last`, `max`, `min`, `publish`, `publishBehavior`, `publishLast`, `publishReplay`, `reduce`, `share`, `shareReplay`, `skipLast`, `takeLast`, `throwIfEmpty`, `toArray`] |

This rule accepts a single option which is an object with `alias` and `allow` properties. The `alias` property is an array of names of operators that should be treated similarly to `takeUntil` and the `allow` property is an array of names of operators that are safe to use after `takeUntil`.

By default, the `allow` property contains all of the built-in operators that are safe to use after `takeUntil`.

```json
{
    "rxjs-x/no-unsafe-takeuntil": [
        "error",
        {
            "alias": ["untilDestroyed"]
        }
    ]
}
```

The properties in the options object are themselves optional; they do not all have to be specified.

## When Not To Use It

If you are confident your project uses `takeUntil` correctly, then you may not need this rule.

Type checked lint rules are more powerful than traditional lint rules, but also require configuring type checked linting.

## Further reading

- Avoiding takeUntil leaks

## Resources

- Rule source
- Test source
