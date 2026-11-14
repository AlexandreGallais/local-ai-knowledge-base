---
title: "Element: getAttribute() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/getattribute/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: getAttribute() method

The **`getAttribute()`** method of the `Element` interface returns the string value of the specified attribute of the specified element. It returns `null` if the element doesn't have an attribute with the given name.

If you need to inspect the `Attr` node's properties, you can use the `getAttributeNode()` method instead.

## Syntax

```js
getAttribute(attrName)
```

### Parameters

- `attrName`
    A string specifying the name of the attribute. When called on an HTML element in a DOM flagged as an HTML document, the name is normalized to lowercase.

### Return value

A string containing the attribute's value, or `null` if the element doesn't have an attribute with the given name.

## Usage notes

### Decoded character references in attribute values

HTML character references in an attribute's source markup (for example, `<`, `&`, or `&#x3C;`) are decoded by the HTML parser when the document is parsed, so `getAttribute()` returns the decoded value, not the original source.

Given:

```html
<div id="example" data-payload="&lt;b&gt;hi&lt;/b&gt;"></div>
```

calling `document.getElementById("example").getAttribute("data-payload")` returns the string `"hi"`.

Treating the return value from `getAttribute()` as already-escaped HTML is unsafe. If you read an attribute that holds untrusted data and then assign it to `innerHTML` or insert it into the document as markup, any HTML references used to escape special characters will already be decoded, and the result can be exploited for cross-site scripting (XSS).

Use `textContent` (or another text-safe API) for untrusted data instead of `innerHTML`.

### Retrieving nonce values

For security reasons, CSP nonces from non-script sources, such as CSS selectors and `.getAttribute("nonce")` calls, are hidden.

```js
const nonce = script.getAttribute("nonce");
// returns empty string
```

Instead of retrieving the nonce from the content attribute, use the
`nonce` property:

```js
const nonce = script.nonce;
```

## Examples

```html
<!-- example div in an HTML DOC -->
<div id="div1">Hi Champ!</div>
```

```js
const div1 = document.getElementById("div1");
// <div id="div1">Hi Champ!</div>

const exampleAttr = div1.getAttribute("id");
// "div1"

const lang = div1.getAttribute("lang");
// null
```

## See also

- `Element.hasAttribute()`
- `Element.setAttribute()`
- `Element.removeAttribute()`
- `Element.toggleAttribute()`
