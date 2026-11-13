---
title: "no-alert"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-alert.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-alert

JavaScript's `alert`, `confirm`, and `prompt` functions are widely considered to be obtrusive as UI elements and should be replaced by a more appropriate custom UI implementation. Furthermore, `alert` is often used while debugging code, which should be removed before deployment to production.

```js
alert("here!");
```

## Rule Details

This rule is aimed at catching debugging code that should be removed and popup UI elements that should be replaced with less obtrusive, custom UIs. As such, it will warn when it encounters `alert`, `prompt`, and `confirm` function calls which are not shadowed.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-alert: "error"*/

alert("here!");

confirm("Are you sure?");

prompt("What's your name?", "John Doe");
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-alert: "error"*/

customAlert("Something happened!");

customConfirm("Are you sure?");

customPrompt("Who are you?");

function foo() {
    const alert = myCustomLib.customAlert;
    alert();
}
```

## Options

This rule has no options.
