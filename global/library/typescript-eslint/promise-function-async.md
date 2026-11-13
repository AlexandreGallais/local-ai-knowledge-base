---
title: "promise-function-async"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/promise-function-async.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# promise-function-async

Ensures that each function is only capable of:

- returning a rejected promise, or
- throwing an Error object.

In contrast, non-`async`, `Promise`-returning functions are technically capable of either.
Code that handles the results of those functions will often need to handle both cases, which can get complex.
This rule's practice removes a requirement for creating code to handle both cases.

> When functions return unions of `Promise` and non-`Promise` types implicitly, it is usually a mistake—this rule flags those cases. If it is intentional, make the return type explicitly to allow the rule to pass.

## Examples

Examples of code for this rule

**❌ Incorrect**

```ts
const arrowFunctionReturnsPromise = () => Promise.resolve('value');

function functionReturnsPromise() {
  return Promise.resolve('value');
}

function functionReturnsUnionWithPromiseImplicitly(p: boolean) {
  return p ? 'value' : Promise.resolve('value');
}
```

**✅ Correct**

```ts
const arrowFunctionReturnsPromise = async () => Promise.resolve('value');

async function functionReturnsPromise() {
  return Promise.resolve('value');
}

// An explicit return type that is not Promise means this function cannot be made async, so it is ignored by the rule
function functionReturnsUnionWithPromiseExplicitly(
  p: boolean,
): string | Promise<string> {
  return p ? 'value' : Promise.resolve('value');
}

async function functionReturnsUnionWithPromiseImplicitly(p: boolean) {
  return p ? 'value' : Promise.resolve('value');
}
```

## Options

### `allowAny`

If you want additional safety, consider turning this option off, as it makes the rule less able to catch incorrect Promise behaviors.

Examples of code with `{ "allowAny": false }`:

**❌ Incorrect**

```ts
const returnsAny = () => ({}) as any;
```

**✅ Correct**

```ts
const returnsAny = async () => ({}) as any;
```

### `allowedPromiseNames`

For projects that use constructs other than the global built-in `Promise` for asynchronous code.
This option allows specifying string names of classes or interfaces that cause a function to be checked as well.

Examples of code with `{ "allowedPromiseNames": ["Bluebird"] }`:

**❌ Incorrect**

```ts
class Bluebird {}

const returnsBluebird = () => new Bluebird(() => {});
```

**✅ Correct**

```ts
class Bluebird {}

const returnsBluebird = async () => new Bluebird(() => {});
```

## When Not To Use It

This rule can be difficult to enable on projects that use APIs which require functions to always be `async`.
You might consider using ESLint disable comments along with filing issues on your dependencies for those specific situations instead of completely disabling this rule.
