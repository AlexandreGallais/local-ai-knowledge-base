---
title: "guard-for-in"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/guard-for-in.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# guard-for-in

Looping over objects with a `for in` loop will include properties that are inherited through the prototype chain. This behavior can lead to unexpected items in your for loop.

```js
for (key in foo) {
    doSomething(key);
}
```

For codebases that do not support ES2022, `Object.prototype.hasOwnProperty.call(foo, key)` can be used as a check that the property is not inherited.

For codebases that do support ES2022, `Object.hasOwn(foo, key)` can be used as a shorter alternative; see prefer-object-has-own.

Note that simply checking `foo.hasOwnProperty(key)` is likely to cause an error in some cases; see no-prototype-builtins.

## Rule Details

This rule is aimed at preventing unexpected behavior that could arise from using a `for in` loop without filtering the results in the loop. As such, it will warn when `for in` loops do not filter their results with an `if` statement.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint guard-for-in: "error"*/

for (key in foo) {
    doSomething(key);
}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint guard-for-in: "error"*/

for (key in foo) {
    if (Object.hasOwn(foo, key)) {
        doSomething(key);
    }
}

for (key in foo) {
    if (Object.prototype.hasOwnProperty.call(foo, key)) {
        doSomething(key);
    }
}

for (key in foo) {
    if ({}.hasOwnProperty.call(foo, key)) {
        doSomething(key);
    }
}
```

## Options

This rule has no options.
