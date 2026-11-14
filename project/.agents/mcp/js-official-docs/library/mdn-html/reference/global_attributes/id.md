---
title: "`id` HTML global attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/global_attributes/id/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `id` HTML global attribute

The **`id`** global attribute defines an identifier (ID) that must be unique within the entire document.

```html
<p>A normal, boring paragraph. Try not to fall asleep.</p>

<p id="exciting">The most exciting paragraph on the page. One of a kind!</p>
```

```css
#exciting {
  background: linear-gradient(to bottom, #ffe8d4, #f69d3c);
  border: 1px solid dimgrey;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 2px 2px 1px black;
}

#exciting::before {
  content: "ℹ️";
  margin-right: 5px;
}
```

## Syntax

An ID attribute's value must not contain ASCII whitespace characters. Browsers treat non-conforming IDs that contain whitespace as if the whitespace is part of the ID. In contrast to the `class` attribute, which allows space-separated values, elements can only have one single ID value.

Technically, the value for an ID attribute may contain any other Unicode character. However, when used in CSS selectors, either from JavaScript using APIs like `Document.querySelector()` or in CSS stylesheets, ID attribute values must be valid CSS identifiers. This means that if an ID attribute value is not a valid CSS identifier (for example, `my?id` or `1234`) then it must be escaped before being used in a selector, either using the `CSS.escape()` method or manually.

For this reason, it's recommended that developers choose values for ID attributes that are valid CSS identifiers that don't require escaping.

Also, not all valid ID attribute values are valid JavaScript identifiers. For example, `1234` is a valid attribute value but not a valid JavaScript identifier. This means that the value is not a valid variable name, so you can't access the element using code like `window.1234`. However, you can access it using `window["1234"]`.

## Description

The purpose of the ID attribute is to identify a single element when linking (using a fragment identifier), scripting, or styling (with CSS).

You can access elements with ID attributes as global properties of the `window` object, where the property name is the ID value, and the property value is the corresponding element. For example, given this markup:

```html
<p id="preamble"></p>
```

You can access this paragraph element in JavaScript using the following code:

```js
const content = window.preamble.textContent;
```

> **Warning:**
> Relying on the `window["id-value"]` or `window.idValue` pattern is dangerous and discouraged because it can lead to unexpected conflicts with existing or future APIs in the browser.
> For example, if a browser introduces a built-in global property named `preamble` in the future, your code may no longer be able to access the HTML element.
> To avoid such conflicts, always use the `Document.getElementById()` or `Document.querySelector()` method to access elements by ID.

## See also

- All global attributes.
- `Element.id` that reflects this attribute.
- The `Document.getElementById` method.
- CSS ID selectors.
