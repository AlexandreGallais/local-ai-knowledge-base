---
title: "SyntaxError: await/yield expression can't be used in parameter"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/await_yield_in_parameter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: await/yield expression can't be used in parameter

The JavaScript exception "await expression can't be used in parameter" or "yield expression can't be used in parameter" occurs when the default parameter expression contains the `await` or `yield` keyword and has the effect of pausing default parameter evaluation.

## Message

```plain
SyntaxError: Illegal await-expression in formal parameters of async function (V8-based)
SyntaxError: await expression can't be used in parameter (Firefox)
SyntaxError: Cannot use 'await' within a parameter default expression. (Safari)

SyntaxError: Yield expression not allowed in formal parameter (V8-based)
SyntaxError: yield expression can't be used in parameter (Firefox)
SyntaxError: Unexpected keyword 'yield'. Cannot use yield expression within parameters. (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

The default expression must be able to evaluate _synchronously_. If it contains an `await` or `yield` expression, it will pause the evaluation of the default expression, which is not allowed.

> **Note:**
> This error is only generated when `await` or `yield` are valid operators in this function context. Otherwise, `await` or `yield` would be parsed as an identifier, and either not cause an error, or cause an error like "<example-value>", or "<example-value>" if there's an expression following it.

## Examples

### Invalid cases

```js
function *gen(a = yield 1) {}

async function f(a = await Promise.resolve(1)) {}
```

### Valid cases

You can use the nullish coalescing assignment to provide a default value instead. If you want to treat `null` and `undefined` differently, you would need to use a condition.

```js
function* gen(a) {
  a ??= yield 1;
}

async function f(a) {
  a ??= await Promise.resolve(1);
}
```

You are also allowed to use `await` or `yield` if the expression is contained in a function expression of the initializer and would not pause the evaluation of the default expression.

```js
async function f(a = (async () => await Promise.resolve(1))()) {}
```

## See also

- Default parameters
- `await`
- `yield`
