---
title: "no-unsafe-function-type"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-unsafe-function-type.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-unsafe-function-type

TypeScript's built-in `Function` type allows being called with any number of arguments and returns type `any`.
`Function` also allows classes or plain objects that happen to possess all properties of the `Function` class.
It's generally better to specify function parameters and return types with the function type syntax.

"Catch-all" function types include:

- `() => void`: a function that has no parameters and whose return is ignored
- `(...args: never) => unknown`: a "top type" for functions that can be assigned any function type, but can't be called

Examples of code for this rule:

**❌ Incorrect**

```ts
let noParametersOrReturn: Function;
noParametersOrReturn = () => {};

let stringToNumber: Function;
stringToNumber = (text: string) => text.length;

let identity: Function;
identity = value => value;
```

**✅ Correct**

```ts
let noParametersOrReturn: () => void;
noParametersOrReturn = () => {};

let stringToNumber: (text: string) => number;
stringToNumber = text => text.length;

let identity: <T>(value: T) => T;
identity = value => value;
```

## When Not To Use It

If your project is still onboarding to TypeScript, it might be difficult to fully replace all unsafe `Function` types with more precise function types.
You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.

## Related To

- Avoiding `any`s with Linting and TypeScript
- Revamping the `ban-types` rule
- `no-empty-object-type`
- `no-restricted-types`
- `no-unsafe-call`
- `no-wrapper-object-types`
