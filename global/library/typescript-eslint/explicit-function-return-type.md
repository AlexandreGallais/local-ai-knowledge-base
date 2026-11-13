---
title: "explicit-function-return-type"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/explicit-function-return-type.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# explicit-function-return-type

Functions in TypeScript often don't need to be given an explicit return type annotation.
Leaving off the return type is less code to read or write and allows the compiler to infer it from the contents of the function.

However, explicit return types do make it visually more clear what type is returned by a function.
They can also speed up TypeScript type checking performance in large codebases with many large functions.

This rule enforces that functions do have an explicit return type annotation.

## Examples

**❌ Incorrect**

```ts
// Should indicate that no value is returned (void)
function test() {
  return;
}

// Should indicate that a number is returned
var fn = function () {
  return 1;
};

// Should indicate that a string is returned
var arrowFn = () => 'test';

class Test {
  // Should indicate that no value is returned (void)
  method() {
    return;
  }
}
```

**✅ Correct**

```ts
// No return value should be expected (void)
function test(): void {
  return;
}

// A return value of type number
var fn = function (): number {
  return 1;
};

// A return value of type string
var arrowFn = (): string => 'test';

class Test {
  // No return value should be expected (void)
  method(): void {
    return;
  }
}
```

## Options

### Configuring in a mixed JS/TS codebase

If you are working on a codebase within which you lint non-TypeScript code (i.e. `.js`/`.mjs`/`.cjs`/`.jsx`), you should ensure that you should use ESLint `overrides` to only enable the rule on `.ts`/`.mts`/`.cts`/`.tsx` files. If you don't, then you will get unfixable lint errors reported within `.js`/`.mjs`/`.cjs`/`.jsx` files.

```jsonc
{
  "rules": {
    // disable the rule for all files
    "@typescript-eslint/explicit-function-return-type": "off",
  },
  "overrides": [
    {
      // enable the rule specifically for TypeScript files
      "files": ["*.ts", "*.mts", "*.cts", "*.tsx"],
      "rules": {
        "@typescript-eslint/explicit-function-return-type": "error",
      },
    },
  ],
}
```

### `allowExpressions`

Examples of code for this rule with `{ allowExpressions: true }`:

**❌ Incorrect**

```ts
function test() {}

const fn = () => {};

export default () => {};
```

**✅ Correct**

```ts
node.addEventListener('click', () => {});

node.addEventListener('click', function () {});

const foo = arr.map(i => i * i);
```

### `allowTypedFunctionExpressions`

Examples of code for this rule with `{ allowTypedFunctionExpressions: true }`:

**❌ Incorrect**

```ts
let arrowFn = () => 'test';

let funcExpr = function () {
  return 'test';
};

let objectProp = {
  foo: () => 1,
};
```

**✅ Correct**

```ts
type FuncType = () => string;

let arrowFn: FuncType = () => 'test';

let funcExpr: FuncType = function () {
  return 'test';
};

let asTyped = (() => '') as () => string;

interface ObjectType {
  foo(): number;
}
let objectProp: ObjectType = {
  foo: () => 1,
};
let objectPropAs = {
  foo: () => 1,
} as ObjectType;

declare function functionWithArg(arg: () => number);
functionWithArg(() => 1);

declare function functionWithObjectArg(arg: { method: () => number });
functionWithObjectArg({
  method() {
    return 1;
  },
});
```

### `allowHigherOrderFunctions`

Examples of code for this rule with `{ allowHigherOrderFunctions: true }`:

**❌ Incorrect**

```ts
var arrowFn = () => () => {};

function fn() {
  return function () {};
}
```

**✅ Correct**

```ts
var arrowFn = () => (): void => {};

function fn() {
  return function (): void {};
}
```

### `allowDirectConstAssertionInArrowFunctions`

Examples of code for this rule with `{ allowDirectConstAssertionInArrowFunctions: true }`:

**❌ Incorrect**

```ts
const func = (value: number) => ({ type: 'X', value }) as any;
const func = (value: number) => ({ type: 'X', value }) as Action;
```

**✅ Correct**

```ts
const func = (value: number) => ({ foo: 'bar', value }) as const;
const func = () => x as const;
```

### `allowConciseArrowFunctionExpressionsStartingWithVoid`

Examples of code for this rule with `{ allowConciseArrowFunctionExpressionsStartingWithVoid: true }`:

**❌ Incorrect**

```ts
var join = (a: string, b: string) => `${a}${b}`;

const log = (message: string) => {
  console.log(message);
};
```

**✅ Correct**

```ts
var log = (message: string) => void console.log(message);
```

### `allowFunctionsWithoutTypeParameters`

Examples of code for this rule with `{ allowFunctionsWithoutTypeParameters: true }`:

**❌ Incorrect**

```ts
function foo<T>(t: T) {
  return t;
}

const bar = <T>(t: T) => t;
```

**✅ Correct**

```ts
function foo<T>(t: T): T {
  return t;
}

const bar = <T>(t: T): T => t;

function allowedFunction(x: string) {
  return x;
}

const allowedArrow = (x: string) => x;
```

### `allowedNames`

You may pass <example-value> names you would like this rule to ignore, like so:

```json
{
  "@typescript-eslint/explicit-function-return-type": [
    "error",
    {
      "allowedNames": ["ignoredFunctionName", "ignoredMethodName"]
    }
  ]
}
```

### `allowIIFEs`

Examples of code for this rule with `{ allowIIFEs: true }`:

**❌ Incorrect**

```ts
var func = () => 'foo';
```

**✅ Correct**

```ts
var foo = (() => 'foo')();

var bar = (function () {
  return 'bar';
})();
```

## When Not To Use It

If you don't find the added cost of explicitly writing function return types to be worth the visual clarity, or your project is not large enough for it to be a factor in type checking performance, then you will not need this rule.

## Further Reading

- TypeScript Functions
