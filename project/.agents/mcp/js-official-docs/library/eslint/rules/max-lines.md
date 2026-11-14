---
title: "max-lines"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/max-lines.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# max-lines

Some people consider large files a code smell. Large files tend to do a lot of things and can make it hard following what's going. While there is not an objective maximum number of lines considered acceptable in a file, most people would agree it should not be in the thousands. Recommendations usually range from 100 to 500 lines.

## Rule Details

This rule enforces a maximum number of lines per file, in order to aid in maintainability and reduce complexity.

Please note that most editors show an additional empty line at the end if the file ends with a line break. This rule does not count that extra line.

## Options

This rule has a number or object option:

* `"max"` (default `300`) enforces a maximum number of lines in a file.

* `"skipBlankLines": true` ignore lines made up purely of whitespace.

* `"skipComments": true` ignore lines containing just comments.

### max

Examples of **incorrect** code for this rule with a max value of `3`:

**Incorrect:**

```js
/*eslint max-lines: ["error", 3]*/
let a,
    b,
    c;
```

**Incorrect:**

```js
/*eslint max-lines: ["error", 3]*/

let a,
    b,c;
```

**Incorrect:**

```js
/*eslint max-lines: ["error", 3]*/
// a comment
let a,
    b,c;
```

Examples of **correct** code for this rule with a max value of `3`:

**Correct:**

```js
/*eslint max-lines: ["error", 3]*/
let a,
    b, c;
```

**Correct:**

```js
/*eslint max-lines: ["error", 3]*/

let a, b, c;
```

**Correct:**

```js
/*eslint max-lines: ["error", 3]*/
// a comment
let a, b, c;
```

### skipBlankLines

Examples of **incorrect** code for this rule with the `{ "skipBlankLines": true }` option:

**Incorrect:**

```js
/*eslint max-lines: ["error", {"max": 3, "skipBlankLines": true}]*/

let a,
    b,
    c;
```

Examples of **correct** code for this rule with the `{ "skipBlankLines": true }` option:

**Correct:**

```js
/*eslint max-lines: ["error", {"max": 3, "skipBlankLines": true}]*/

let a,
    b, c;
```

### skipComments

Examples of **incorrect** code for this rule with the `{ "skipComments": true }` option:

**Incorrect:**

```js
/*eslint max-lines: ["error", {"max": 2, "skipComments": true}]*/
// a comment
let a,
    b,
    c;
```

Examples of **correct** code for this rule with the `{ "skipComments": true }` option:

**Correct:**

```js
/*eslint max-lines: ["error", {"max": 2, "skipComments": true}]*/
// a comment
let a,
    b, c;
```

## When Not To Use It

You can turn this rule off if you are not concerned with the number of lines in your files.

## Compatibility

* **JSCS**: maximumNumberOfLines
