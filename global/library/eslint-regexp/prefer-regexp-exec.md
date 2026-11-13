---
title: "regexp/prefer-regexp-exec"
tool: "eslint-regexp"
version: "3.3"
source: "https://github.com/ota-meshi/eslint-plugin-regexp/blob/8200d2990ca2685610c98ce2d0eefef23e35ed8f/docs/rules/prefer-regexp-exec.md"
commit: "8200d2990ca2685610c98ce2d0eefef23e35ed8f"
license: "MIT"
---

# regexp/prefer-regexp-exec

> enforce that `RegExp#exec` is used instead of `String#match` if no global flag is provided

`RegExp#exec` is faster than `String#match` and both work the same when not using the `/g` flag.

## :book: Rule Details

This rule is aimed at enforcing the more performant way of applying regular expressions on strings.

This rule inspired by @typescript-eslint/prefer-regexp-exec rule.

<eslint-code-block>

```js
/* eslint regexp/prefer-regexp-exec: "error" */

/* ✓ GOOD */
/thing/.exec('something');

'some things are just things'.match(/thing/g);

const text = 'something';
const search = /thing/;
search.exec(text);

/* ✗ BAD */
'something'.match(/thing/);

'some things are just things'.match(/thing/);

text.match(search);
```

</eslint-code-block>

## :wrench: Options

Nothing.

## :books: Further reading

- @typescript-eslint/prefer-regexp-exec

## :rocket: Version

This rule was introduced in eslint-plugin-regexp v0.3.0

## :mag: Implementation

- Rule source
- Test source
