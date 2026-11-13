---
title: "max-depth"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/max-depth.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# max-depth

Many developers consider code difficult to read if blocks are nested beyond a certain depth.

## Rule Details

This rule enforces a maximum depth that blocks can be nested to reduce code complexity.

## Options

This rule has a number or object option:

* `"max"` (default `4`) enforces a maximum depth that blocks can be nested

**Deprecated:** The object property `maximum` is deprecated; please use the object property `max` instead.

### max

Examples of **incorrect** code for this rule with the default `{ "max": 4 }` option:

**Incorrect:**

```js
/*eslint max-depth: ["error", 4]*/

function foo() {
    for (;;) { // Nested 1 deep
        while (true) { // Nested 2 deep
            if (true) { // Nested 3 deep
                if (true) { // Nested 4 deep
                    if (true) { // Nested 5 deep
                    }
                }
            }
        }
    }
}
```

Examples of **correct** code for this rule with the default `{ "max": 4 }` option:

**Correct:**

```js
/*eslint max-depth: ["error", 4]*/

function foo() {
    for (;;) { // Nested 1 deep
        while (true) { // Nested 2 deep
            if (true) { // Nested 3 deep
                if (true) { // Nested 4 deep
                }
            }
        }
    }
}
```

Note that class static blocks do not count as nested blocks, and that the depth in them is calculated separately from the enclosing context.

Examples of **incorrect** code for this rule with `{ "max": 2 }` option:

**Incorrect:**

```js
/*eslint max-depth: ["error", 2]*/

function foo() {
    if (true) { // Nested 1 deep
        class C {
            static {
                if (true) { // Nested 1 deep
                    if (true) { // Nested 2 deep
                        if (true) { // Nested 3 deep
                        }
                    }
                }
            }
        }
    }
}
```

Examples of **correct** code for this rule with `{ "max": 2 }` option:

**Correct:**

```js
/*eslint max-depth: ["error", 2]*/

function foo() {
    if (true) { // Nested 1 deep
        class C {
            static {
                if (true) { // Nested 1 deep
                    if (true) { // Nested 2 deep
                    }
                }
            }
        }
    }
}
```
