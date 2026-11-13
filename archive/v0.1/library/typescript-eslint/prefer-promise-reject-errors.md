---
title: "prefer-promise-reject-errors"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/prefer-promise-reject-errors.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# prefer-promise-reject-errors

It uses type information to enforce that `Promise`s are only rejected with `Error` objects.

## Examples

**❌ Incorrect**

```ts
Promise.reject('error');

const err = new Error();
Promise.reject('an ' + err);

new Promise((resolve, reject) => reject('error'));

new Promise((resolve, reject) => {
  const err = new Error();
  reject('an ' + err);
});
```

**✅ Correct**

```ts
Promise.reject(new Error());

class CustomError extends Error {
  // ...
}
Promise.reject(new CustomError());

new Promise((resolve, reject) => reject(new Error()));

new Promise((resolve, reject) => {
  class CustomError extends Error {
    // ...
  }
  return reject(new CustomError());
});
```

## Options

This rule adds the following options:

```ts
interface Options {
  /**
   * Type specifiers that can be used as Promise rejection reasons.
   */
  allow?: (
    | {
        from: 'file';
        name: string[] | string;
        path?: string;
      }
    | {
        from: 'lib';
        name: string[] | string;
      }
    | {
        from: 'package';
        name: string[] | string;
        package: string;
      }
    | string
  )[];

  /**
   * Whether to always allow throwing values typed as `any`.
   */
  allowThrowingAny?: boolean;

  /**
   * Whether to always allow throwing values typed as `unknown`.
   */
  allowThrowingUnknown?: boolean;
}

const defaultOptions: Options = {
  allow: [],
  allowThrowingAny: false,
  allowThrowingUnknown: false,
};
```

### `allow`

This option takes the shared `TypeOrValueSpecifier` format.
It can be useful for rejecting with error types defined by libraries that do not extend `Error`.

Examples of code for this rule with:

```jsonc
{
  "allow": [{ "from": "file", "name": "CustomError" }],
}
```

```ts
class CustomError /* does NOT extend Error */ {
  // ...
}

Promise.reject(new CustomError());
```

### `allowThrowingAny`

Examples of **correct** code with `{ allowThrowingAny: true }`:

```ts
declare const value: any;

Promise.reject(value);
```

### `allowThrowingUnknown`

Examples of **correct** code with `{ allowThrowingUnknown: true }`:

```ts
declare const value: unknown;

Promise.reject(value);
```
