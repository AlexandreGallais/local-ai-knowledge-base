---
title: "HTMLBaseElement: href property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlbaseelement/href/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLBaseElement: href property

The **`href`** property of the `HTMLBaseElement` interface contains a string that is the URL to use as the base for relative URLs.

It reflects the `href` attribute of the `<base>` element.

## Value

A string that contains a URL, or the empty string (`""`) if the corresponding `<base>` element does not include the `href` attribute.

## Examples

### HTML with base URL

This example demonstrates that the `href` attribute in `<base>` is reflected in the `href` property of `HTMLBaseElement`.

```html
<pre id="log"></pre>
```

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = text;
}
```

```css
#log {
  height: 20px;
}
```

#### HTML

```html
<base href="https://developer.mozilla.org/example" />
```

#### JavaScript

```js
const base = document.getElementsByTagName("base")[0];
log(`base.href="${base.href}"`);
```

#### Result
