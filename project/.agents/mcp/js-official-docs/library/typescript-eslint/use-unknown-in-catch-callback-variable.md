---
title: "use-unknown-in-catch-callback-variable"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/use-unknown-in-catch-callback-variable.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# use-unknown-in-catch-callback-variable

This rule enforces that you always use the `unknown` type for the parameter of a Promise rejection callback.

**❌ Incorrect**

```ts
Promise.reject(new Error('I will reject!')).catch(err => {
  console.log(err);
});

Promise.reject(new Error('I will reject!')).catch((err: any) => {
  console.log(err);
});

Promise.reject(new Error('I will reject!')).catch((err: Error) => {
  console.log(err);
});

Promise.reject(new Error('I will reject!')).then(
  result => {
    console.log(result);
  },
  err => {
    console.log(err);
  },
);
```

**✅ Correct**

```ts
Promise.reject(new Error('I will reject!')).catch((err: unknown) => {
  console.log(err);
});
```

The reason for this rule is to enable programmers to impose constraints on `Promise` error handling analogously to what TypeScript provides for ordinary exception handling.

For ordinary exceptions, TypeScript treats the `catch` variable as `any` by default. However, `unknown` would be a more accurate type, so TypeScript introduced the `useUnknownInCatchVariables` compiler option to treat the `catch` variable as `unknown` instead.

```ts
try {
  throw x;
} catch (err) {
  // err has type 'any' with useUnknownInCatchVariables: false
  // err has type 'unknown' with useUnknownInCatchVariables: true
}
```

The Promise analog of the `try-catch` block, `Promise.prototype.catch()`, is not affected by the `useUnknownInCatchVariables` compiler option, and its "`catch` variable" will always have the type `any`.

```ts
Promise.reject(x).catch(err => {
  // err has type 'any' regardless of `useUnknownInCatchVariables`
});
```

However, you can still provide an explicit type annotation, which lets you achieve the same effect as the `useUnknownInCatchVariables` option does for synchronous `catch` variables.

```ts
Promise.reject(x).catch((err: unknown) => {
  // err has type 'unknown'
});
```

**Info:**
There is actually a way to have the `catch()` and `then()` callback variables use the `unknown` type _without_ an explicit type annotation at the call sites, but it has the drawback that it involves overriding global type declarations.
For example, the library better-TypeScript-lib sets this up globally for your project (see the relevant lines in the better-TypeScript-lib source code for details on how).

For further reading on this, you may also want to look into
the discussion in the proposal for this rule and this TypeScript issue on typing catch callback variables as unknown.

## When Not To Use It

If your codebase is not yet able to enable `useUnknownInCatchVariables`, it likely would be similarly difficult to enable this rule.

If you have modified the global type declarations in order to make `then()` and `catch()` callbacks use the `unknown` type without an explicit type annotation, you do not need this rule.

## Related To

- Avoiding `any`s with Linting and TypeScript
