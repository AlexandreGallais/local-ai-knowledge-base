---
title: "curly-newline"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/curly-newline/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# curly-newline

A number of style guides require or disallow line breaks inside of block statements and block-like code.

## Rule Details

This rule requires or disallows a line break between `{` and its following token, and between `}` and its preceding token of block-like structures.

## Options

This rule has either a string option:

- `"always"` requires line breaks after opening and before closing braces
- `"never"` disallows line breaks after opening and before closing braces

Or an object option:

- `"multiline": true` requires line breaks if there are line breaks inside properties or between properties. Otherwise, it disallows line breaks.
- `"minElements"` requires line breaks if the number of elements in the block (usually statements) is at least the given integer. If `consistent` is set to `true`, an error will also be reported if a block contains linebreaks and has fewer elements than the given integer.
- `"consistent": true` (default) requires that either both curly braces, or neither, directly enclose newlines. Note that enabling this option will also change the behavior of the `minElements` option. (See `minElements` above for more information)

You can specify different options for different kinds of blocks:

```json
{
    "curly-newline": ["error", {
        "ForInStatement": "always",
        "ForOfStatement": { "multiline": true },
        "ForStatement": "never",
        "WhileStatement": { "multiline": true, "minElements": 3, "consistent": true }
    }]
}
```

- `"IfStatementConsequent"` - An `if` statement body
- `"IfStatementAlternative"` - An `else` statement body
- `"ForStatement"` - A `for` statement body
- `"ForInStatement"` - A `for..in` statement body
- `"ForOfStatement"` - A `for..of` statement body
- `"WhileStatement"` - A `while` statement body
- `"DoWhileStatement"` - A `do..while` statement body
- `"SwitchStatement"` - A `switch` statement body
- `"SwitchCase"` - A `switch` `case` body
- `"TryStatementBlock"` - A `try..catch..finally` statement main body
- `"TryStatementHandler"` - A `try..catch..finally` statement handler body
- `"TryStatementFinalizer"` - A `try..catch..finally` statement finalizer body
- `"BlockStatement"` - A lone block
- `"ArrowFunctionExpression"` - An arrow function expression body
- `"FunctionDeclaration"` - A function declaration body
- `"FunctionExpression"` - A function expression body
- `"Property"` - An object method shorthand body
- `"ClassBody"` - A class body
- `"StaticBlock"` - A static declaration block
- `"WithStatement"` - A with statement body
- `"TSModuleBlock"` - A TypeScript module block

### always

Examples of **incorrect** code for this rule with the `"always"` option:

**Incorrect:**

```js
/* eslint @stylistic/curly-newline: ["error", "always"] */

if (true) {}

if (true) { foo(); }
if (true) { foo(); bar(); }
if (true) { foo();
    bar(); };

if (true) { let a = {
    }; };
```

Examples of **correct** code for this rule with the `"always"` option:

**Correct:**

```js
/* eslint @stylistic/curly-newline: ["error", "always"] */

if (true) {
}
if (true) {
    foo();
}
if (true) {
    foo(); bar();
}
if (true) {
    foo();
    bar();
}
if (true) {
    let a = function() {
        foo();
    }
}
```

### never

Examples of **incorrect** code for this rule with the `"never"` option:

**Incorrect:**

```js
/* eslint @stylistic/curly-newline: ["error", "never"] */

if (true) {
}
if (true) {
    foo();
}
if (true) {
    foo(); bar();
}
if (true) {
    foo();
    bar();
}
if (true) {
    let a = function() {
        foo();
    }
}
```

Examples of **correct** code for this rule with the `"never"` option:

**Correct:**

```js
/* eslint @stylistic/curly-newline: ["error", "never"] */

if (true) {}
if (true) { foo(); }
if (true) { foo(); bar(); }
if (true) { foo();
    bar(); };
if (true) { let a = {
    }; };
```

### multiline

Examples of **incorrect** code for this rule with the `{ "multiline": true }` option:

**Incorrect:**

```js
/* eslint @stylistic/curly-newline: ["error", { "multiline": true }] */

if (true) {
}

if (true) {
    foo();
}
if (true) {
    foo(); bar();
}
if (true) { foo();
    bar(); };

if (true) { let a = {
    }; };
```

Examples of **correct** code for this rule with the `{ "multiline": true }` option:

**Correct:**

```js
/* eslint @stylistic/curly-newline: ["error", { "multiline": true }] */

if (true) {}
if (true) { foo(); }
if (true) { foo(); bar(); }
if (true) {
    foo();
    bar();
}
if (true) {
    let a = {
    };
}
```

### minElements

Examples of **incorrect** code for this rule with the `{ "minElements": 2 }` option:

**Incorrect:**

```js
/* eslint @stylistic/curly-newline: ["error", { "minElements": 2 }] */

if (true) {
}
if (true) {
    foo();
}
if (true) { foo(); bar(); }
if (true) { foo();
    bar(); }
if (true) {
    let a = {
    }
}
```

Examples of **correct** code for this rule with the `{ "minElements": 2 }` option:

**Correct:**

```js
/* eslint @stylistic/curly-newline: ["error", { "minElements": 2 }] */

if (true) {}
if (true) { foo(); }
if (true) {
    foo(); bar();
}
if (true) {
    foo();
    bar();
}
if (true) { var a = {
} }
```

### consistent

Examples of **incorrect** code for this rule with the default `{ "consistent": true }` option:

**Incorrect:**

```js
/* eslint @stylistic/curly-newline: ["error", { "consistent": true }] */

if (true) { foo();
}
if (true) {
foo(); }
if (true) { foo(); bar();
}
if (true) {
foo(); bar(); }
if (true) { var a = {
    }
}
if (true) {
    var a = {
    }}

```

Examples of **correct** code for this rule with the default `{ "consistent": true }` option:

**Correct:**

```js
/* eslint @stylistic/curly-newline: ["error", { "consistent": true }] */

if (true) {}
if (true) {
}
if (true) { foo(); }
if (true) {
    foo();
}
if (true) {
    foo(); bar();
}
if (true) {
    foo();
    bar();
}
```

## When Not To Use It

If you don't want to enforce consistent line breaks after opening and before closing braces, then it's safe to disable this rule.

## Related rules

- block-spacing
- brace-style
- object-curly-newline
- padded-blocks
- space-before-blocks
