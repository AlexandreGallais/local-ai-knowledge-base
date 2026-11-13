---
title: "DocumentFragment: querySelector() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/documentfragment/queryselector/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DocumentFragment: querySelector() method

The **`DocumentFragment.querySelector()`** method returns the
first element, or `null` if no matches are found, within the
`DocumentFragment` (using depth-first pre-order traversal of the
document's nodes) that matches the specified group of selectors.

If the selector matches an ID and this ID is erroneously used several times in the
document, it returns the first matching element.

If the selectors specified in parameter are invalid a `DOMException` with
a `SYNTAX_ERR` value is raised.

## Syntax

```js
querySelector(selectors)
```

### Parameters

- `selectors`
    A string containing one or more CSS selectors separated by
    commas.

### Return value

An `Element` object representing the first element in the document
that matches the specified set of CSS selectors, or `null` is returned if there are no matches.

## Examples

### Basic <example-value>

In this basic <example-value>, the first element in the `DocumentFragment` with
the class `myclass` is returned:

```js
const el = documentfragment.querySelector(".myclass");
```

### CSS syntax and the method's argument

The string argument pass to `querySelector` must follow the CSS syntax. To
match ID or selectors that do not follow the CSS syntax (by using semicolon or space
inappropriately for example), it's mandatory to escape the wrong character with a
double back slash:

```html
<div id="foo\bar"></div>
<div id="foo:bar"></div>
```

```js
document.querySelector("#foo\bar"); // Does not match anything
document.querySelector("#foo\\\\bar"); // Match the first div
document.querySelector("#foo:bar"); // Does not match anything
document.querySelector("#foo\\:bar"); // Match the second div
```

## See also

- The `DocumentFragment` interface it belongs to.
