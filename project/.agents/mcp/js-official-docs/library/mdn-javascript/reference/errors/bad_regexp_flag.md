---
title: "SyntaxError: invalid regular expression flag \"x\""
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/bad_regexp_flag/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: invalid regular expression flag "x"

The JavaScript exception "invalid regular expression flag" occurs when the flags in a regular expression contain any flag that is not one of: `d`, `g`, `i`, `m`, `s`, `u`, `v`, or `y`. It may also be raised if the expression contains more than one instance of a valid flag, or when the `u` and `v` flags are used together.

## Message

```plain
SyntaxError: Invalid flags supplied to RegExp constructor 'x' (V8-based)
SyntaxError: Invalid regular expression flags (V8-based)
SyntaxError: invalid regular expression flag x (Firefox)
SyntaxError: Invalid flags supplied to RegExp constructor. (Safari)
SyntaxError: Invalid regular expression: invalid flags (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

The regular expression contains invalid flags, or valid flags have been used more than once in the expression.

The valid (allowed) flags are `d`, `g`, `i`, `m`, `s`, `u`, `v`, and `y`. They are introduced in more detail in Regular expressions > Advanced searching with flags.

The `u` and `v` flags are mutually exclusive, so they cannot be used together. You can read the references to understand what their behavior differences are.

## Examples

In a regular expression literal, which consists of a pattern enclosed between slashes, the flags are defined after the second slash.
Regular expression flags can be used separately or together in any order.
This syntax shows how to declare the flags using the regular expression literal:

```js
const re = /pattern/flags;
```

They can also be defined in the constructor function of the `RegExp` object (second parameter):

```js
const re = new RegExp("pattern", "flags");
```

Here is an example showing use of only correct flags.

```js
/foo/g;
/foo/gims;
/foo/uy;
```

Below is an example showing the use of some invalid flags `b`, `a` and `r`:

```js
/foo/bar;

// SyntaxError: invalid regular expression flag "b"
```

The code below is incorrect, because `W`, `e` and `b` are not valid flags.

```js
const obj = {
  url: /docs/Web,
};

// SyntaxError: invalid regular expression flag "W"
```

An expression containing two slashes is interpreted as a regular expression literal.
Most likely the intent was to create a string literal, using single or double quotes as shown below:

```js
const obj = {
  url: "/docs/Web",
};
```

## See also

- Regular expressions guide
