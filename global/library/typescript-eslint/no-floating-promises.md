---
title: "no-floating-promises"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-floating-promises.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-floating-promises

A "floating" Promise is one that is created without any code set up to handle any errors it might throw.
Floating Promises can cause several issues, such as improperly sequenced operations, ignored Promise rejections, and more.

This rule will report Promise-valued statements that are not treated in one of the following ways:

- Calling its `.then()` with two arguments
- Calling its `.catch()` with one argument
- `await`ing it
- `return`ing it
- `void`ing it

This rule also reports when an Array containing Promises is created and not properly handled. The main way to resolve this is by using one of the Promise concurrency methods to create a single Promise, then handling that according to the procedure above. These methods include:

- `Promise.all()`
- `Promise.allSettled()`
- `Promise.any()`
- `Promise.race()`

**Tip:**
`no-floating-promises` only detects apparently unhandled Promise _statements_.
See `no-misused-promises` for detecting code that provides Promises to _logical_ locations such as if statements.

See _Using promises (error handling) on MDN_ for a detailed writeup on Promise error-handling.

## Examples

**❌ Incorrect**

```ts
const promise = new Promise((resolve, reject) => resolve('value'));
promise;

async function returnsPromise() {
  return 'value';
}
returnsPromise().then(() => {});

Promise.reject('value').catch();

Promise.reject('value').finally();

[1, 2, 3].map(async x => x + 1);
```

**✅ Correct**

```ts
const promise = new Promise((resolve, reject) => resolve('value'));
await promise;

async function returnsPromise() {
  return 'value';
}

void returnsPromise();

returnsPromise().then(
  () => {},
  () => {},
);

Promise.reject('value').catch(() => {});

await Promise.reject('value').finally(() => {});

await Promise.all([1, 2, 3].map(async x => x + 1));
```

## Options

### `checkThenables`

A "Thenable" value is an object which has a `then` method, such as a `Promise`.
Other Thenables include TypeScript's built-in `PromiseLike` interface and any custom object that happens to have a `.then()`.

The `checkThenables` option triggers `no-floating-promises` to also consider all values that satisfy the Thenable shape (a `.then()` method that takes two callback parameters), not just Promises.
This can be useful if your code works with older `Promise` polyfills instead of the native `Promise` class.

**❌ Incorrect**

```ts
declare function createPromiseLike(): PromiseLike<string>;

createPromiseLike();

interface MyThenable {
  then(onFulfilled: () => void, onRejected: () => void): MyThenable;
}

declare function createMyThenable(): MyThenable;

createMyThenable();
```

**✅ Correct**

```ts
declare function createPromiseLike(): PromiseLike<string>;

await createPromiseLike();

interface MyThenable {
  then(onFulfilled: () => void, onRejected: () => void): MyThenable;
}

declare function createMyThenable(): MyThenable;

await createMyThenable();
```

### `ignoreVoid`

Placing the `void` operator in front of a Promise can be a convenient way to explicitly mark that Promise as intentionally not awaited.

**Warning:**
Voiding a Promise doesn't handle it or change the runtime behavior.
The outcome is just ignored, like disabling the rule with an ESLint disable comment.
Such Promise rejections will still be unhandled.

Examples of **correct** code for this rule with `{ ignoreVoid: true }`:

```ts
async function returnsPromise() {
  return 'value';
}
void returnsPromise();

void Promise.reject('value');
```

When this option is set to `true`, if you are using `no-void`, you should turn on the `allowAsStatement` option.

### `ignoreIIFE`

Examples of **correct** code for this rule with `{ ignoreIIFE: true }`:

```ts
await (async function () {
  await res(1);
})();

(async function () {
  await res(1);
})();
```

### `allowForKnownSafePromises`

For example, you may need to do this in the case of libraries whose APIs return Promises whose rejections are safely handled by the library.

This option takes the shared `TypeOrValueSpecifier` format.

Examples of code for this rule with:

```json
{
  "allowForKnownSafePromises": [
    { "from": "file", "name": "SafePromise" },
    { "from": "lib", "name": "PromiseLike" },
    { "from": "package", "name": "Bar", "package": "bar-lib" }
  ]
}
```

**❌ Incorrect**

```ts
let promise: Promise<number> = Promise.resolve(2);
promise;

function returnsPromise(): Promise<number> {
  return Promise.resolve(42);
}

returnsPromise();
```

**✅ Correct**

```ts
// promises can be marked as safe by using branded types
type SafePromise = Promise<number> & { __linterBrands?: string };

let promise: SafePromise = Promise.resolve(2);
promise;

function returnsSafePromise(): SafePromise {
  return Promise.resolve(42);
}

returnsSafePromise();
```

### `allowForKnownSafeCalls`

For example, you may need to do this in the case of libraries whose APIs may be called without handling the resultant Promises.

This option takes the shared `TypeOrValueSpecifier` format.

Examples of code for this rule with:

```json
{
  "allowForKnownSafeCalls": [
    { "from": "file", "name": "safe", "path": "input.ts" }
  ]
}
```

**❌ Incorrect**

```ts
declare function unsafe(...args: unknown[]): Promise<void>;

unsafe('...', () => {});
```

**✅ Correct**

```ts
declare function safe(...args: unknown[]): Promise<void>;

safe('...', () => {});
```

## When Not To Use It

This rule can be difficult to enable on large existing projects that set up many floating Promises.
Alternately, if you're not worried about crashes from floating or misused Promises -such as if you have global unhandled Promise handlers registered- then in some cases it may be safe to not use this rule.
You might consider using `void`s and/or ESLint disable comments for those specific situations instead of completely disabling this rule.

## Related To

- `no-misused-promises`

## Further Reading

- "Using Promises" MDN documentation. Note especially the sections on Promise rejection events and Composition.
