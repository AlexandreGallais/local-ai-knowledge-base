---
title: "no-return-await"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-return-await.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-return-await

It is NOT recommended to use the `no-return-await` rule anymore because:

* `return await` on a promise will not result in an extra microtask.
* `return await` yields a better stack trace for debugging.

Historical context: When promises were first introduced, calling `return await` introduced an additional microtask, one for the `await` and one for the return value of the async function. Each extra microtask delays the computation of a result and so this rule was added to help avoid this performance trap. Later, ECMA-262 changed the way `return await` worked so it would create a single microtask, which means this rule is no longer necessary.

## Rule Details

This rule warns on any usage of `return await` except in `try` blocks.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-return-await: "error"*/

async function foo() {
    return await bar();
}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-return-await: "error"*/

async function foo1() {
    return bar();
}

async function foo2() {
    await bar();
    return;
}

// This is essentially the same as `return await bar();`, but the rule checks only `await` in `return` statements
async function foo3() {
    const x = await bar();
    return x;
}

// In this example the `await` is necessary to be able to catch errors thrown from `bar()`
async function foo4() {
    try {
        return await bar();
    } catch (error) {}
}
```

## When Not To Use It

You should not use this rule. There is no reason to avoid `return await`.
