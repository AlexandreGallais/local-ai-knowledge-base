---
title: "require-await"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/require-await.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# require-await

Asynchronous functions in JavaScript behave differently than other functions in two important ways:

1. The return value is always a `Promise`.
2. You can use the `await` operator inside of them.

The primary reason to use asynchronous functions is typically to use the `await` operator, such as this:

```js
async function fetchData(processDataItem) {
    const response = await fetch(DATA_URL);
    const data = await response.json();

    return data.map(processDataItem);
}
```

Asynchronous functions that don't use `await` might not need to be asynchronous functions and could be the unintentional result of refactoring.

Note: this rule ignores async generator functions. This is because generators yield rather than return a value and async generators might yield all the values of another async generator without ever actually needing to use await.

## Rule Details

This rule warns async functions which have no `await` expression.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint require-await: "error"*/

async function foo() {
    doSomething();
}

bar(async () => {
    doSomething();
});
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint require-await: "error"*/

async function foo() {
    await doSomething();
}

bar(async () => {
    await doSomething();
});

function baz() {
    doSomething();
}

bar(() => {
    doSomething();
});

async function resourceManagement() {
    await using resource = getAsyncResource();
    resource.use();
}

// Allow empty functions.
async function noop() {}
```

## Options

This rule has no options.

## When Not To Use It

Asynchronous functions are designed to work with promises such that throwing an error will cause a promise's rejection handler (such as `catch()`) to be called. For example:

```js
async function fail() {
    throw new Error("Failure!");
}

fail().catch(error => {
    console.log(error.message);
});
```

In this case, the `fail()` function throws an error that is intended to be caught by the `catch()` handler assigned later. Converting the `fail()` function into a synchronous function would require the call to `fail()` to be refactored to use a `try-catch` statement instead of a promise.

If you are throwing an error inside of an asynchronous function for this purpose, then you may want to disable this rule.
