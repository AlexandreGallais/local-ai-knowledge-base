---
title: "padding-line-between-statements"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/padding-line-between-statements/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# padding-line-between-statements

This configuration would require blank lines after every sequence of variable declarations, like the newline-after-var rule.

Examples of **incorrect** code for the `[{ blankLine: "always", prev: ["const", "let", "var"], next: "*"}, { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"]}]` configuration:

**Incorrect:**

```js
/* eslint @stylistic/padding-line-between-statements: [
    "error",
    { blankLine: "always", prev: ["const", "let", "var"], next: "*"},
    { blankLine: "any",    prev: ["const", "let", "var"], next: ["const", "let", "var"]}
] */

function foo1() {
    var a = 0;
    bar();
}

function foo2() {
    let a = 0;
    bar();
}

function foo3() {
    const a = 0;
    bar();
}

class C {
    static {
        let a = 0;
        bar();
    }
}
```

Examples of **correct** code for the `[{ blankLine: "always", prev: ["const", "let", "var"], next: "*"}, { blankLine: "any", prev: ["const", "let", "var"], next: ["const", "let", "var"]}]` configuration:

**Correct:**

```js
/* eslint @stylistic/padding-line-between-statements: [
    "error",
    { blankLine: "always", prev: ["const", "let", "var"], next: "*"},
    { blankLine: "any",    prev: ["const", "let", "var"], next: ["const", "let", "var"]}
] */

function foo1() {
    var a = 0;
    var b = 0;

    bar();
}

function foo2() {
    let a = 0;
    const b = 0;

    bar();
}

function foo3() {
    const a = 0;
    const b = 0;

    bar();
}

class C {
    static {
        let a = 0;
        let b = 0;

        bar();
    }
}
```

---

This configuration would require blank lines after all directive prologues, like the lines-around-directive rule.

Examples of **incorrect** code for the `[{ blankLine: "always", prev: "directive", next: "*" }, { blankLine: "any", prev: "directive", next: "directive" }]` configuration:

**Incorrect:**

```js
/* eslint @stylistic/padding-line-between-statements: [
    "error",
    { blankLine: "always", prev: "directive", next: "*" },
    { blankLine: "any",    prev: "directive", next: "directive" }
] */

"use strict";
foo();
```

Examples of **correct** code for the `[{ blankLine: "always", prev: "directive", next: "*" }, { blankLine: "any", prev: "directive", next: "directive" }]` configuration:

**Correct:**

```js
/* eslint @stylistic/padding-line-between-statements: [
    "error",
    { blankLine: "always", prev: "directive", next: "*" },
    { blankLine: "any",    prev: "directive", next: "directive" }
] */

"use strict";
"use asm";

foo();
```

---

This configuration would require blank lines between clauses in `switch` statements.

Examples of **incorrect** code for the `[{ blankLine: "always", prev: ["case", "default"], next: "*" }]` configuration:

**Incorrect:**

```js
/* eslint @stylistic/padding-line-between-statements: [
    "error",
    { blankLine: "always", prev: ["case", "default"], next: "*" }
] */

switch (foo) {
    case 1:
        bar();
        break;
    case 2:
    case 3:
        baz();
        break;
    default:
        quux();
}
```

Examples of **correct** code for the `[{ blankLine: "always", prev: ["case", "default"], next: "*" }]` configuration:

**Correct:**

```js
/* eslint @stylistic/padding-line-between-statements: [
    "error",
    { blankLine: "always", prev: ["case", "default"], next: "*" }
] */

switch (foo) {
    case 1:
        bar();
        break;

    case 2:

    case 3:
        baz();
        break;

    default:
        quux();
}
```

## When Not To Use It

If you don't want to notify warnings about linebreaks, then it's safe to disable this rule.

## Compatibility

- **JSCS:** requirePaddingNewLineAfterVariableDeclaration
- **JSCS:** requirePaddingNewLinesAfterBlocks
- **JSCS:** disallowPaddingNewLinesAfterBlocks
- **JSCS:** requirePaddingNewLinesAfterUseStrict
- **JSCS:** disallowPaddingNewLinesAfterUseStrict
- **JSCS:** requirePaddingNewLinesBeforeExport
- **JSCS:** disallowPaddingNewLinesBeforeExport
- **JSCS:** requirePaddingNewlinesBeforeKeywords
- **JSCS:** disallowPaddingNewlinesBeforeKeywords
