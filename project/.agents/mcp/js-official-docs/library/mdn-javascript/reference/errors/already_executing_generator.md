---
title: "TypeError: already executing generator"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/already_executing_generator/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# TypeError: already executing generator

The JavaScript exception "TypeError: already executing generator" occurs when a generator is continued using one of its methods (such as `next()`) while executing the generator function's body itself.

## Message

```plain
TypeError: Generator is already running (V8-based)
TypeError: already executing generator (Firefox)
TypeError: Generator is executing (Safari)
```

## Error type

`TypeError`

## What went wrong?

The generator's methods, `next()`, `return()`, and `throw()`, are meant to continue the execution of a generator function when it's paused after a `yield` expression or before the first statement. If a call to one of these methods is made while executing the generator function, the error is thrown. If you want to return or throw within the generator function, use the `return` statement or the `throw` statement, respectively.

## Examples

```js
let it;
function* getNumbers(times) {
  if (times <= 0) {
    it.throw(new Error("times must be greater than 0"));
  }
  for (let i = 0; i < times; i++) {
    yield i;
  }
}
it = getNumbers(3);
it.next();
```

```js
let it;
function* getNumbers(times) {
  if (times <= 0) {
    throw new Error("times must be greater than 0");
  }
  for (let i = 0; i < times; i++) {
    yield i;
  }
}
it = getNumbers(3);
it.next(); // { value: 0, done: false }
```

## See also

- Iterators and generators
- Iteration protocols
- `function*`
- `Generator`
