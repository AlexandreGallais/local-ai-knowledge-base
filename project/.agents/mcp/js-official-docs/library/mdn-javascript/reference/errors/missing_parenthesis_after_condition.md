---
title: "SyntaxError: missing ) after condition"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/missing_parenthesis_after_condition/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: missing ) after condition

The JavaScript exception "missing ) after condition" occurs when there is an error with
how an
`if`
condition is written. It must appear in parenthesis after the `if` keyword.

## Message

```plain
SyntaxError: missing ) after condition (Firefox)
SyntaxError: Unexpected token '<example-value>'. Expected '<example-value>' to end an '<example-value>' condition. (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

There is an error with how an
`if`
condition is written. In any programming language, code needs to make decisions and
carry out actions accordingly depending on different inputs. The if statement executes a
statement if a specified condition is truthy. In JavaScript, this condition must appear
in parenthesis after the `if` keyword, like this:

```js
if (condition) {
  // do something if the condition is true
}
```

## Examples

### Missing parenthesis

It might just be an oversight, carefully check all you parenthesis in your code.

```js
if (Math.PI < 3 {
  console.log("wait what?");
}

// SyntaxError: missing ) after condition
```

To fix this code, you would need to add a parenthesis that closes the condition.

```js
if (Math.PI < 3) {
  console.log("wait what?");
}
```

### Misused is keyword

If you are coming from another programming language, it is also easy to add keywords
that don't mean the same or have no meaning at all in JavaScript.

```js
if (done is true) {
 console.log("we are done!");
}

// SyntaxError: missing ) after condition
```

Instead you need to use a correct comparison operator.
For example:

```js
if (done === true) {
  console.log("we are done!");
}
```

Or even better:

```js
if (done) {
  console.log("we are done!");
}
```

## See also

- `if...else`
- Relational operators
- Learn: Making decisions in your code — conditionals
