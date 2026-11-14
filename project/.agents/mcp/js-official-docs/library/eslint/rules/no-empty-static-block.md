---
title: "no-empty-static-block"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-empty-static-block.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-empty-static-block

Empty static blocks, while not technically errors, usually occur due to refactoring that wasn't completed. They can cause confusion when reading code.

## Rule Details

This rule disallows empty static blocks. This rule ignores static blocks which contain a comment.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-empty-static-block: "error"*/

class Foo {
    static {}
}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-empty-static-block: "error"*/

class Foo {
    static {
        bar();
    }
}

class Bar {
    static {
        // comment
    }
}
```

## Options

This rule has no options.

## When Not To Use It

This rule should not be used in environments prior to ES2022.
