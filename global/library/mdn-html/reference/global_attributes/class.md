---
title: "`class` HTML global attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/global_attributes/class/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `class` HTML global attribute

The **`class`** global attribute is a list of the classes of the element, separated by ASCII whitespace.

```html
<p>Narrator: This is the beginning of the play.</p>

<p class="note editorial">Above point sounds a bit obvious. Remove/rewrite?</p>

<p>Narrator: I must warn you now folks that this beginning is very exciting.</p>

<p class="note">[Lights go up and wind blows; Caspian enters stage right]</p>
```

```css
.note {
  font-style: italic;
  font-weight: bold;
}

.editorial {
  background: rgb(255 0 0 / 0.25);
  padding: 10px;
}

.editorial::before {
  content: "Editor: ";
}
```

## Syntax

The `class` attribute is a list of class values separated by ASCII whitespace.

Each class value may contain any Unicode characters (except, of course, ASCII whitespace). However, when used in CSS selectors, either from JavaScript using APIs like `Document.querySelector()` or in CSS stylesheets, class attribute values must be valid CSS identifiers. This means that if a class attribute value is not a valid CSS identifier (for example, `my?class` or `1234`) then it must be escaped before being used in a selector, either using the `CSS.escape()` method or manually.

For this reason, it's recommended that developers choose values for class attributes that are valid CSS identifiers that don't require escaping.

## Description

Classes allow CSS and JavaScript to select and access specific elements via the class selectors or functions like the `document.getElementsByClassName()`.

Though the specification doesn't put requirements on the name of classes, web developers are encouraged to use names that describe the semantic purpose of the element, rather than the presentation of the element. For example, _attribute_ to describe an attribute rather than _italics_, although an element of this class may be presented by _italics_. Semantic names remain logical even if the presentation of the page changes.

## See also

- All global attributes.
- `element.className`
- `element.classList`
- Introduction to CSS
