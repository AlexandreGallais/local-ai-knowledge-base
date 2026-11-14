---
title: "HTMLElement: outerText property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlelement/outertext/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLElement: outerText property

The **`outerText`** property of the `HTMLElement` interface returns the same value as `HTMLElement.innerText`.
When used as a setter it replaces the whole current node with the given text (this differs from `innerText`, which replaces the content _inside_ the current node).

See `HTMLElement.innerText` for more information and examples showing how both properties are used as getters.

## Value

A string representing the rendered text content of an element and its descendants.

If the element itself is not being rendered (for example, is detached from the document or is hidden from view), the returned value is the same as the `Node.textContent` property.

When used as a setter it replaces the current node with the given text, converting any line breaks into `` elements.

## Examples

This example highlights the fundamental difference between `outerText` and `innerText` when used as setters (they are the same when used by getters).

> **Note:**
> The example is a modified version of What is the difference between innerText and outerText? (Stack overflow) by codingintrigue, is licensed under CC BY-SA 3.0.

Consider a page that contains the following HTML:

```html
<div>
  <p>Original content</p>
</div>
```

`outerText` replaces the whole selected element, so the JavaScript `p.outerText = "Whole element replaced"` replaces the whole selected `p` element:

```html
<div>Whole element replaced</div>
```

By contrast, `p.innerText = "Content inside element replaced"` replaces the content _inside_ the selected `p` element:

```html
<div>
  <p>Content inside element replaced</p>
</div>
```

## See also

- `HTMLElement.innerText`
- `Element.outerHTML`
