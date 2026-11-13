---
title: "explicit-module-boundary-types"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/explicit-module-boundary-types.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# explicit-module-boundary-types

Explicit types for function return values and arguments makes it clear to any calling code what is the module boundary's input and output.
Adding explicit type annotations for those types can help improve code readability.
It can also improve TypeScript type checking performance on larger codebases.

## Examples

**❌ Incorrect**

```ts
// Should indicate that no value is returned (void)
export function test() {
  return;
}

// Should indicate that a string is returned
export var arrowFn = () => 'test';

// All arguments should be typed
export var arrowFn = (arg): string => `test ${arg}`;
export var arrowFn = (arg: any): string => `test ${arg}`;

export class Test {
  // Should indicate that no value is returned (void)
  method() {
    return;
  }
}
```

**✅ Correct**

```ts
// A function with no return value (void)
export function test(): void {
  return;
}

// A return value of type string
export var arrowFn = (): string => 'test';

// All arguments should be typed
export var arrowFn = (arg: string): string => `test ${arg}`;
export var arrowFn = (arg: unknown): string => `test ${arg}`;

export class Test {
  // A class method with no return value (void)
  method(): void {
    return;
  }
}

// The function does not apply because it is not an exported function.
function test() {
  return;
}
```

## Options

### Configuring in a mixed JS/TS codebase

If you are working on a codebase within which you lint non-TypeScript code (i.e. `.js`/`.mjs`/`.cjs`/`.jsx`), you should ensure that you should use ESLint `overrides` to only enable the rule on `.ts`/`.mts`/`.cts`/`.tsx` files. If you don't, then you will get unfixable lint errors reported within `.js`/`.mjs`/`.cjs`/`.jsx` files.

```jsonc
{
  "rules": {
    // disable the rule for all files
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
  "overrides": [
    {
      // enable the rule specifically for TypeScript files
      "files": ["*.ts", "*.mts", "*.cts", "*.tsx"],
      "rules": {
        "@typescript-eslint/explicit-module-boundary-types": "error",
      },
    },
  ],
}
```

### `allowArgumentsExplicitlyTypedAsAny`

Examples of code for this rule with `{ allowArgumentsExplicitlyTypedAsAny: false }`:

**❌ Incorrect**

```ts
export const func = (value: any): number => value + 1;
```

**✅ Correct**

```ts
export const func = (value: any): number => value + 1;
```

### `allowDirectConstAssertionInArrowFunctions`

Examples of code for this rule with `{ allowDirectConstAssertionInArrowFunctions: false }`:

**❌ Incorrect**

```ts
export const func = (value: number) => ({ type: 'X', value });
export const foo = () => ({
  bar: true,
});
export const bar = () => 1;
```

**✅ Correct**

```ts
export const func = (value: number) => ({ type: 'X', value }) as const;
export const foo = () =>
  ({
    bar: true,
  }) as const;
export const bar = () => 1 as const;
```

### `allowedNames`

You may pass <example-value> names you would like this rule to ignore, like so:

```json
{
  "@typescript-eslint/explicit-module-boundary-types": [
    "error",
    {
      "allowedNames": ["ignoredFunctionName", "ignoredMethodName"]
    }
  ]
}
```

### `allowHigherOrderFunctions`

Examples of code for this rule with `{ allowHigherOrderFunctions: false }`:

**❌ Incorrect**

```ts
export const arrowFn = () => () => {};

export function fn() {
  return function () {};
}

export function foo(outer: string) {
  return function (inner: string) {};
}
```

**✅ Correct**

```ts
export const arrowFn = () => (): void => {};

export function fn() {
  return function (): void {};
}

export function foo(outer: string) {
  return function (inner: string): void {};
}
```

### `allowTypedFunctionExpressions`

Examples of code for this rule with `{ allowTypedFunctionExpressions: false }`:

**❌ Incorrect**

```ts
export let arrowFn = () => 'test';

export let funcExpr = function () {
  return 'test';
};

export let objectProp = {
  foo: () => 1,
};

export const foo = bar => {};
```

**✅ Correct**

```ts
type FuncType = () => string;

export let arrowFn: FuncType = () => 'test';

export let funcExpr: FuncType = function () {
  return 'test';
};

export let asTyped = (() => '') as () => string;

interface ObjectType {
  foo(): number;
}
export let objectProp: ObjectType = {
  foo: () => 1,
};
export let objectPropAs = {
  foo: () => 1,
} as ObjectType;

type FooType = (bar: string) => void;
export const foo: FooType = bar => {};
```

### `allowOverloadFunctions`

Examples of correct code when `allowOverloadFunctions` is set to `true`:

```ts
export function test(a: string): string;
export function test(a: number): number;
export function test(a: unknown) {
  return a;
}
```

## When Not To Use It

If your project is not used by downstream consumers that are sensitive to API types, you can disable this rule.

## Further Reading

- TypeScript Functions

## Related To

- explicit-function-return-type
