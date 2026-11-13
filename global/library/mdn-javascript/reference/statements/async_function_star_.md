---
title: "async function*"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/statements/async_function_star_/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# async function*

The **`async function*`** declaration creates a binding of a new async generator function to a given name.

You can also define async generator functions using the `async function*` expression.

```js
async function* foo() {
  yield await Promise.resolve("a");
  yield await Promise.resolve("b");
  yield await Promise.resolve("c");
}

let str = "";

async function generate() {
  for await (const val of foo()) {
    str += val;
  }
  console.log(str);
}

generate();
// Expected output: "abc"
```

## Syntax

```js
async function* name(param0) {
  statements
}
async function* name(param0, param1) {
  statements
}
async function* name(param0, param1, /* …, */ paramN) {
  statements
}
```

> **Note:**
> Async generator functions do not have arrow function counterparts.

> **Note:**
> `function` and `*` are separate tokens, so they can be separated by whitespace or line terminators. However, there cannot be a line terminator between `async` and `function`, otherwise a semicolon is automatically inserted, causing `async` to become an identifier and the rest to become a `function*` declaration.

### Parameters

- `name`
    The function name.
- `param` (optional)
    The name of a formal parameter for the function. For the parameters' syntax, see the Functions reference.
- `statements` (optional)
    The statements comprising the body of the function.

## Description

An `async function*` declaration creates an `AsyncGeneratorFunction` object. Each time when an async generator function is called, it returns a new `AsyncGenerator` object, which conforms to the async iterator protocol. Every call to `next()` returns a `Promise` that resolves to the iterator result object.

An async generator function combines the features of async functions and generator functions. You can use both the `await` and `yield` keywords within the function body. This empowers you to handle asynchronous tasks ergonomically with `await`, while leveraging the lazy nature of generator functions.

When a promise is yielded from an async generator, the iterator result promise's eventual state will match that of the yielded promise. For example:

```js
async function* foo() {
  yield Promise.reject(new Error("failed"));
}

foo()
  .next()
  .catch((e) => console.error(e));
```

`Error: failed` will be logged, because if the yielded promise rejects, the iterator result will reject as well. The `value` property of an async generator's resolved result will not be another promise.

`async function*` declarations behave similar to `function` declarations — they are hoisted to the top of their scope and can be called anywhere in their scope, and they can be redeclared only in certain contexts.

## Examples

### Declaring an async generator function

Async generator functions always produce promises of results — even when each `yield` step is synchronous.

```js
async function* myGenerator(step) {
  await new Promise((resolve) => setTimeout(resolve, 10));
  yield 0;
  yield step;
  yield step * 2;
}

const gen = myGenerator(2);
gen
  .next()
  .then((res) => {
    console.log(res); // { value: 0, done: false }
    return gen.next();
  })
  .then((res) => {
    console.log(res); // { value: 2, done: false }
    return gen.next();
  })
  .then((res) => {
    console.log(res); // { value: 4, done: false }
    return gen.next();
  })
  .then((res) => {
    console.log(res); // { value: undefined, done: true }
    return gen.next();
  });
```

### Using an async generator function to read a series of files

In this example, we read a series of files and only access its content when requested, using Node's `fs/promises` module.

```js
async function* readFiles(directory) {
  const files = await fs.readdir(directory);
  for (const file of files) {
    const stats = await fs.stat(file);
    if (stats.isFile()) {
      yield {
        name: file,
        content: await fs.readFile(file, "utf8"),
      };
    }
  }
}

const files = readFiles(".");
console.log((await files.next()).value);
// Possible output: { name: 'file1.txt', content: '...' }
console.log((await files.next()).value);
// Possible output: { name: 'file2.txt', content: '...' }
```

## See also

- Functions guide
- Iterators and generators guide
- Functions
- `AsyncGeneratorFunction`
- `async function*` expression
- `function`
- `function*`
- `async function`
- Iteration protocols
- `yield`
- `yield*`
- `AsyncGenerator`
