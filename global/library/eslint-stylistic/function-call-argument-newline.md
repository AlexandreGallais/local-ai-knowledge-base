---
title: "function-call-argument-newline"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/function-call-argument-newline/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# function-call-argument-newline

A number of style guides require or disallow line breaks between arguments of a function call.

## Rule Details

This rule enforces line breaks between arguments of a function call.

## Options

This rule has a string option:

- `"always"` (default) requires line breaks between arguments
- `"never"` disallows line breaks between arguments
- `"consistent"` requires consistent usage of line breaks between arguments

### always

Examples of **incorrect** code for this rule with the default `"always"` option:

**Incorrect:**

```js
/* eslint @stylistic/function-call-argument-newline: ["error", "always"] */

foo("one", "two", "three");

bar("one", "two", {
    one: 1,
    two: 2
});

baz("one", "two", (x) => {
    console.log(x);
});
```

Examples of **correct** code for this rule with the default `"always"` option:

**Correct:**

```js
/* eslint @stylistic/function-call-argument-newline: ["error", "always"] */

foo(
    "one",
    "two",
    "three"
);

bar(
    "one",
    "two",
    { one: 1, two: 2 }
);
// or
bar(
    "one",
    "two",
    {
        one: 1,
        two: 2
    }
);

baz(
    "one",
    "two",
    (x) => {
        console.log(x);
    }
);
```

### never

Examples of **incorrect** code for this rule with the `"never"` option:

**Incorrect:**

```js
/* eslint @stylistic/function-call-argument-newline: ["error", "never"] */

foo(
    "one",
    "two", "three"
);

bar(
    "one",
    "two", {
        one: 1,
        two: 2
    }
);

baz(
    "one",
    "two", (x) => {
        console.log(x);
    }
);
```

Examples of **correct** code for this rule with the `"never"` option:

**Correct:**

```js
/* eslint @stylistic/function-call-argument-newline: ["error", "never"] */

foo("one", "two", "three");
// or
foo(
    "one", "two", "three"
);

bar("one", "two", { one: 1, two: 2 });
// or
bar("one", "two", {
    one: 1,
    two: 2
});

baz("one", "two", (x) => {
    console.log(x);
});
```

### consistent

Examples of **incorrect** code for this rule with the `"consistent"` option:

**Incorrect:**

```js
/* eslint @stylistic/function-call-argument-newline: ["error", "consistent"] */

foo("one", "two",
    "three");
//or
foo("one",
    "two", "three");

bar("one", "two",
    { one: 1, two: 2}
);

baz("one", "two",
    (x) => { console.log(x); }
);
```

Examples of **correct** code for this rule with the `"consistent"` option:

**Correct:**

```js
/* eslint @stylistic/function-call-argument-newline: ["error", "consistent"] */

foo("one", "two", "three");
// or
foo(
    "one",
    "two",
    "three"
);

bar("one", "two", {
    one: 1,
    two: 2
});
// or
bar(
    "one",
    "two",
    { one: 1, two: 2 }
);
// or
bar(
    "one",
    "two",
    {
        one: 1,
        two: 2
    }
);

baz("one", "two", (x) => {
    console.log(x);
});
// or
baz(
    "one",
    "two",
    (x) => {
        console.log(x);
    }
);
```

## When Not To Use It

If you don't want to enforce line breaks between arguments, don't enable this rule.
