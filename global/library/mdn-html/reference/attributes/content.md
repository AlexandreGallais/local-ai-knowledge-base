---
title: "`content` HTML attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/attributes/content/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `content` HTML attribute

The **`content`** attribute specifies the value of a metadata name defined by the `<meta>` `name` attribute.
It takes a string as its value, and the expected syntax varies depending on the `name` value used.

## Value

The types of values that a `content` attribute accepts depends on the `name` value.
For details on specific formats and types, see the `<meta>` `name` attribute page.

## Examples

### Setting a document meta description

The following `<meta>` tag uses `name=description` to set a "meta description" for a document.
The `content` attribute provides the value for the metadata:

```html
<meta
  name="description"
  content="The HTML reference describes all elements and attributes of HTML, including global attributes that apply to all elements." />
```

## See also

- `<meta>` `name` attribute
