---
title: "HTMLBaseElement: target property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlbaseelement/target/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLBaseElement: target property

The `target` property of the `HTMLBaseElement` interface is a string that represents the default target tab to show the resulting output for hyperlinks and form elements.

It reflects the `target` attribute of the `<base>` element.

## Value

A string representing the target. Its value can be:

- The name of a `<frame>`.
- One of the keyword with specific values: `_blank`, `_self`, `_parent`, or `_top`.

## Example

```html
<head>
  <base target="_top" />
</head>
```

```js
const baseElement = document.getElementsByTagName("base")[0];
console.log(baseElement.target); // Output: '_top'
```

## See also

- `HTMLAnchorElement.target` property
- `HTMLAreaElement.target` property
- `HTMLFormElement.target` property
