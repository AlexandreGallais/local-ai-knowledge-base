---
title: "Element: className property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/classname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: className property

The **`className`** property of the `Element` interface reflects the element's `class` content attribute.

## Value

A string representing the class or space-separated classes of the current element.

## Examples

```js
const el = document.getElementById("item");
el.className = el.className === "active" ? "inactive" : "active";
```

## Notes

The name `className` is used for this property instead of `class`
because of conflicts with the "class" keyword in many languages which are used to
manipulate the DOM.

`className` can also be an instance of `SVGAnimatedString` if
the `element` is an `SVGElement`. It is easier to get/set the
`class` attribute of an element using `Element.getAttribute` and
`Element.setAttribute` if you are dealing with SVG elements. However, take
into account that `Element.getAttribute` returns
`null`
instead of `""` if the `element` has an empty `class` attribute.

```js
elm.setAttribute("class", "my-class");
const myClass = elm.getAttribute("class");
```

> **Note:**
> `class` is the name of an **HTML Attribute**, while
> `className` is the name of a **DOM Property**.

## See also

- `element.classList`
