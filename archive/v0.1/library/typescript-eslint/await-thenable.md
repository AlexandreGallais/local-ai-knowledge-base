---
title: "await-thenable"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/await-thenable.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# await-thenable

A "Thenable" value is an object which has a `then` method, such as a Promise.
The `await` keyword is generally used to retrieve the result of calling a Thenable's `then` method.

If the `await` keyword is used on a value that is not a Thenable, the value is directly resolved, but will still pause execution until the next microtask.
While doing so is valid JavaScript, it is often a programmer error, such as forgetting to add parenthesis to call a function that returns a Promise.

## Examples

**❌ Incorrect**

```ts
await 'value';

const createValue = () => 'value';
await createValue();
```

**✅ Correct**

```ts
await Promise.resolve('value');

const createValue = async () => 'value';
await createValue();
```

## Async Iteration (`for await...of` Loops)

This rule also inspects `for await...of` statements, and reports if the value being iterated over is not async-iterable.

**[Why does the rule report on `for await...of` loops used on an array of Promises?]**

While `for await...of` can be used with synchronous iterables, and it will await each promise produced by the iterable, it is inadvisable to do so.
There are some tiny nuances that you may want to consider.

The biggest difference between using `for await...of` and using `for...of` (apart from awaiting each result yourself) is error handling.
When an error occurs within the loop body, `for await...of` does _not_ close the original sync iterable, while `for...of` does.
For detailed examples of this, see the MDN documentation on using `for await...of` with sync-iterables.

Also consider whether you need sequential awaiting at all. Using `for await...of` may obscure potential opportunities for concurrent processing, such as those reported by `no-await-in-loop`. Consider instead using one of the promise concurrency methods for better performance.

### Examples

**❌ Incorrect**

```ts
async function syncIterable() {
  const arrayOfValues = [1, 2, 3];
  for await (const value of arrayOfValues) {
    console.log(value);
  }
}

async function syncIterableOfPromises() {
  const arrayOfPromises = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3),
  ];
  for await (const promisedValue of arrayOfPromises) {
    console.log(promisedValue);
  }
}
```

**✅ Correct**

```ts
async function syncIterable() {
  const arrayOfValues = [1, 2, 3];
  for (const value of arrayOfValues) {
    console.log(value);
  }
}

async function syncIterableOfPromises() {
  const arrayOfPromises = [
    Promise.resolve(1),
    Promise.resolve(2),
    Promise.resolve(3),
  ];
  for (const promisedValue of await Promise.all(arrayOfPromises)) {
    console.log(promisedValue);
  }
}

async function validUseOfForAwaitOnAsyncIterable() {
  async function* yieldThingsAsynchronously() {
    yield 1;
    await new Promise(resolve => setTimeout(resolve, 1000));
    yield 2;
  }

  for await (const promisedValue of yieldThingsAsynchronously()) {
    console.log(promisedValue);
  }
}
```

## Explicit Resource Management (`await using` Statements)

This rule also inspects `await using` statements.
If the disposable being used is not async-disposable, an `await using` statement is unnecessary.

### Examples

**❌ Incorrect**

```ts
function makeSyncDisposable(): Disposable {
  return {
    [Symbol.dispose](): void {
      // Dispose of the resource
    },
  };
}

async function shouldNotAwait() {
  await using resource = makeSyncDisposable();
}
```

**✅ Correct**

```ts
function makeSyncDisposable(): Disposable {
  return {
    [Symbol.dispose](): void {
      // Dispose of the resource
    },
  };
}

async function shouldNotAwait() {
  using resource = makeSyncDisposable();
}

function makeAsyncDisposable(): AsyncDisposable {
  return {
    async [Symbol.asyncDispose](): Promise<void> {
      // Dispose of the resource asynchronously
    },
  };
}

async function shouldAwait() {
  await using resource = makeAsyncDisposable();
}
```

## Options

### `allowMixedPromiseArrays`

By default, this rule reports when a promise aggregator method (such as `Promise.all`) receives an iterable that may contain non-Promise values, since those values are needlessly awaited.

However, it's sometimes reasonable to pass an iterable of values that may or may not be Promises, such as `Array<Promise<T> | T>`.
With this option enabled, the rule only reports when none of the values passed may be a Promise.

**❌ Incorrect**

```ts
declare const numbers: number[];

await Promise.all(numbers);
await Promise.all([1, 2, 3]);
```

**✅ Correct**

```ts
declare const maybePromises: (number | Promise<number>)[];

await Promise.all(maybePromises);
await Promise.all([1, 2, Promise.resolve(3)]);
```

## When Not To Use It

If you want to allow code to `await` non-Promise values.
For example, if your framework is in transition from one style of asynchronous code to another, it may be useful to include `await`s unnecessarily.
This is generally not preferred but can sometimes be useful for visual consistency.
You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.
