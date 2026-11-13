---
title: "NamedNodeMap: setNamedItem() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/namednodemap/setnameditem/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NamedNodeMap: setNamedItem() method

The **`setNamedItem()`** method of the `NamedNodeMap` interface
puts the `Attr` identified by its name in the map.
If there is already an `Attr` with the same name in the map,
it is _replaced_.

## Syntax

```js
setNamedItem(attr)
```

### Parameters

- `attr`
    the attribute to insert in the map.

### Return value

Returns the old attribute if replaced, or `null` if the attribute is new.

### Exceptions

- `InUseAttributeError` `DOMException`
    Thrown if the attribute is still part of another map.

## Example

```html
<span class="foo" id="bar"></span>
<pre contenteditable></pre>
```

```js
const span = document.querySelector("span");
const pre = document.querySelector("pre");

let result = `The \`<pre>\` element initially contains ${pre.attributes.length} attributes.\n\n`;

result += "We remove `class` from `<span>` and add it to `<pre>`.\n";
const classAttribute = span.attributes.removeNamedItem("class");
pre.attributes.setNamedItem(classAttribute);
result += `The \`<pre>\` element now contains ${pre.attributes.length} attributes.\n\n`;

result += "We get `id` from `<span>` and try to add it to `<pre>`.\n";
const id = span.attributes.getNamedItem("id");
try {
  pre.attributes.setNamedItem(id);
} catch (error) {
  result += `An exception has been raised: ${error.name}: ${error.message}.\n`;
}

pre.textContent = result;
```
