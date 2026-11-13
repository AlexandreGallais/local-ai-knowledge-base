---
title: "SyntaxError: missing } after function body"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/missing_curly_after_function_body/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: missing } after function body

The JavaScript exception "missing } after function body" occurs when there is a syntax
mistake when creating a function somewhere. Check if any closing curly braces or
parenthesis are in the correct order.

## Message

```plain
SyntaxError: missing } after function body (Firefox)
```

## Error type

`SyntaxError`

## What went wrong?

There is a syntax mistake when creating a function somewhere. Also check if any closing
curly braces or parenthesis are in the correct order. Indenting or formatting the code
a bit nicer might also help you to see through the jungle.

## Examples

### Forgotten closing curly bracket

Oftentimes, there is a missing curly bracket in your function code:

```js
function charge() {
  if (sunny) {
    useSolarCells();
  } else {
    promptBikeRide();
}
```

Correct would be:

```js
function charge() {
  if (sunny) {
    useSolarCells();
  } else {
    promptBikeRide();
  }
}
```

It can be more obscure when using IIFEs or other constructs that use
a lot of different parenthesis and curly braces, for example.

```js
(function () {
  if (Math.random() < 0.01) {
    doSomething();
  }
)();
```

Oftentimes, indenting differently or double checking indentation helps to spot these
errors.

```js
(function () {
  if (Math.random() < 0.01) {
    doSomething();
  }
})();
```

## See also

- Functions guide
