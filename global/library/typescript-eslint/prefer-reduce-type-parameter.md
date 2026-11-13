---
title: "prefer-reduce-type-parameter"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/prefer-reduce-type-parameter.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# prefer-reduce-type-parameter

It's common to call `Array#reduce` with a generic type, such as an array or object, as the initial value.
Since these values are empty, their types are not usable:

- `[]` has type `never[]`, which can't have items pushed into it as nothing is type `never`
- `{}` has type `{}`, which doesn't have an index signature and so can't have properties added to it

A common solution to this problem is to use an `as` assertion on the initial value.
While this will work, it's not the most optimal solution as type assertions have subtle effects on the underlying types that can allow bugs to slip in.

A better solution is to pass the type in as a generic type argument to `Array#reduce` explicitly.
This means that TypeScript doesn't have to try to infer the type, and avoids the common pitfalls that come with assertions.

This rule looks for calls to `Array#reduce`, and reports if an initial value is being passed & asserted.
It will suggest instead pass the asserted type to `Array#reduce` as a generic type argument.

## Examples

**❌ Incorrect**

```ts
[1, 2, 3].reduce((arr, num) => arr.concat(num * 2), [] as number[]);

['a', 'b'].reduce(
  (accumulator, name) => ({
    ...accumulator,
    [name]: true,
  }),
  {} as Record<string, boolean>,
);
```

**✅ Correct**

```ts
[1, 2, 3].reduce<number[]>((arr, num) => arr.concat(num * 2), []);

['a', 'b'].reduce<Record<string, boolean>>(
  (accumulator, name) => ({
    ...accumulator,
    [name]: true,
  }),
  {},
);
```

## When Not To Use It

This rule can sometimes be difficult to work around when creating objects using a `.reduce`.
See [prefer-reduce-type-parameter] unfixable reporting #3440 for more details.
You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.
