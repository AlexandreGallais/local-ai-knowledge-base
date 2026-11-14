---
title: "semi-style"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/semi-style/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# semi-style

Generally, semicolons are at the end of lines. However, in semicolon-less style, semicolons are at the beginning of lines. This rule enforces that semicolons are at the configured location.

## Rule Details

This rule reports line terminators around semicolons.

## Options

This rule has an option.

```json
{
    "semi-style": ["error", "last"],
}
```

- `"last"` (Default) enforces that semicolons are at the end of statements.
- `"first"` enforces that semicolons are at the beginning of statements. Semicolons of `for` loop heads (`for(a;b;c){}`) should be at the end of lines even if you use this option.

### last

Examples of **incorrect** code for this rule with `"last"` option:

**Incorrect:**

```js
/* eslint @stylistic/semi-style: ["error", "last"] */

foo()
;[1, 2, 3].forEach(bar)

for (
    var i = 0
    ; i < 10
    ; ++i
) {
    foo()
}

class C {
    static {
        foo()
        ;bar()
    }
}
```

Examples of **correct** code for this rule with `"last"` option:

**Correct:**

```js
/* eslint @stylistic/semi-style: ["error", "last"] */

foo();
[1, 2, 3].forEach(bar)

for (
    var i = 0;
    i < 10;
    ++i
) {
    foo()
}

class C {
    static {
        foo();
        bar()
    }
}
```

### first

Examples of **incorrect** code for this rule with `"first"` option:

**Incorrect:**

```js
/* eslint @stylistic/semi-style: ["error", "first"] */

foo();
[1, 2, 3].forEach(bar)

for (
    var i = 0
    ; i < 10
    ; ++i
) {
    foo()
}

class C {
    static {
        foo();
        bar()
    }
}
```

Examples of **correct** code for this rule with `"first"` option:

**Correct:**

```js
/* eslint @stylistic/semi-style: ["error", "first"] */

foo()
;[1, 2, 3].forEach(bar)

for (
    var i = 0;
    i < 10;
    ++i
) {
    foo()
}

class C {
    static {
        foo()
        ;bar()
    }
}
```

## When Not To Use It

If you don't want to notify the location of semicolons, then it's safe to disable this rule.
