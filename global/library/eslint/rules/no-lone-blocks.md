---
title: "no-lone-blocks"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-lone-blocks.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-lone-blocks

In JavaScript, prior to ES6, standalone code blocks delimited by curly braces do not create a new scope and have no use. For example, these curly braces do nothing to `foo`:

```js
{
    var foo = bar();
}
```

In ES6, code blocks may create a new scope if a block-level binding (`let` and `const`), a class declaration or a function declaration (in strict mode) are present. A block is not considered redundant in these cases.

## Rule Details

This rule aims to eliminate unnecessary and potentially confusing blocks at the top level of a script or within other blocks.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-lone-blocks: "error"*/

{}

if (foo) {
    bar();
    {
        baz();
    }
}

function bar() {
    {
        baz();
    }
}

{
    function foo() {}
}

{
    aLabel: {
    }
}

class C {
    static {
        {
            foo();
        }
    }
}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-lone-blocks: "error"*/

while (foo) {
    bar();
}

if (foo) {
    if (bar) {
        baz();
    }
}

function bar() {
    baz();
}

{
    let x = 1;
}

{
    const y = 1;
}

{
    class Foo {}
}

aLabel: {
}

class C {
    static {
        lbl: {
            if (something) {
                break lbl;
            }

            foo();
        }
    }
}
```

Examples of **correct** code for this rule with ES6 environment and strict mode via `"languageOptions": { "sourceType": "module" }` in the ESLint configuration or `"use strict"` directive in the code:

**Correct:**

```js
/*eslint no-lone-blocks: "error"*/

"use strict";

{
    function foo() {}
}
```

## Options

This rule has no options.
