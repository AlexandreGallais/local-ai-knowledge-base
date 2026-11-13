---
title: "no-template-curly-in-string"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-template-curly-in-string.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-template-curly-in-string

ECMAScript 6 allows programmers to create strings containing variable or expressions using template literals, instead of string concatenation, by writing expressions like `${variable}` between two backtick quotes (\`). It can be easy to use the wrong quotes when wanting to use template literals, by writing `"${variable}"`, and end up with the literal value `"${variable}"` instead of a string containing the value of the injected expressions.

## Rule Details

This rule aims to warn when a regular string contains what looks like a template literal placeholder. It will warn when it finds a string containing the template literal placeholder (`${something}`) that uses either `"` or `'` for the quotes.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-template-curly-in-string: "error"*/
"Hello ${name}!";
'Hello ${name}!';
"Time: ${12 * 60 * 60 * 1000}";
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-template-curly-in-string: "error"*/
`Hello ${name}!`;
`Time: ${12 * 60 * 60 * 1000}`;

templateFunction`Hello ${name}`;
```

## Options

This rule has no options.

## When Not To Use It

This rule should not be used in ES3/5 environments.
