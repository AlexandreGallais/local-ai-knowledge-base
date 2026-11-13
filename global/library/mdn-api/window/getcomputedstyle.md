---
title: "Window: getComputedStyle() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/getcomputedstyle/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: getComputedStyle() method

The **`Window.getComputedStyle()`** method returns a live read-only `CSSStyleProperties` object containing the resolved values of all CSS properties of an element, after applying active stylesheets and resolving any computation those values may contain.

## Syntax

```js
getComputedStyle(element)
getComputedStyle(element, pseudoElt)
```

### Parameters

- `element`
    The `Element` for which to get the computed style.
- `pseudoElt` (optional)
    A string specifying the pseudo-element to match.
    Omitted (or `null`) for real elements.

### Return value

A _live_ `CSSStyleProperties` object, which updates automatically when the element's styles change.

> **Note:**
> Earlier versions of the specification returned a `CSSStyleDeclaration` (from which `CSSStyleProperties` is derived).
> See the browser compatibility table for browser support information.

> **Warning:**
> Returned values are sometimes deliberately inaccurate.
> To avoid the "CSS History Leak" security issue, browsers may lie about the computed styles for a visited link, returning values as if the user never visited the linked URL.
> See Plugging the CSS history leak and Privacy-related changes coming to CSS `:visited` for examples of how this is implemented.

### Exceptions

- `TypeError`
    If the passed object is not an `Element` or the `pseudoElt` is not a valid pseudo-element selector or is `::part()` or `::slotted()`.

    > **Note:**
    > Valid pseudo-element selector refers to syntactic validity, e.g., `::unsupported` is considered valid, even though the pseudo-element itself is not supported.

## Description

The method returns a live read-only `CSSStyleProperties` object containing the resolved values of all CSS properties of an element, after applying active stylesheets and resolving any computation those values may contain.

The returned object can be used to inspect the element's styles — including those set inline, using a `<style>` element, or via an external stylesheet.
Since the object is read-only, you can't use it to set an element's styles.
However, because it is "live", if you update the element styles using another API (such as `HTMLElement.style`), the returned object will be updated with the corresponding resolved value.

The distinction that the object contains resolved values is important.
For most properties, in particular those that don't depend on layout, such as `display`, `font-size`, or `line-height`, the resolved value is the computed value.
For properties that depend on layout, the used value may differ slightly from the computed value, and this is what is returned as the resolved value.
For an animating property value, it will be the computed value at the current point in the animation.

The returned object has dash-named and corresponding camel-case named properties for **all** CSS properties supported by the browser, including both shorthand and longhand properties.

Shorthand CSS properties of the element are expanded to their corresponding long-form properties.
For example, an element with style `"border-top: 1px solid black"` would be represented in the returned object by properties with the names `border-top` and `borderTop`, and the corresponding longhand properties `border-top-color` and `borderTopColor`, `border-top-style` and `borderTopStyle`, and `border-top-width` and `borderTopWidth`.

Note that the returned object is the same type as the object returned from the element's `style` property.
However, the `element.style` object can also be used to **set** styles on that element, and returns just the inline styles or those set via JavaScript.

### Color values

For compatibility reasons, serialized color values specified using the traditional sRGB color space are expressed as `rgb()` colors if the alpha channel value is exactly `1`, and `rgba()` colors otherwise.
The legacy syntax with commas is used, with commas as separators (for example `rgb(255, 0, 0)`).

For other color spaces the values are serialized using the corresponding functional expressions: `lab()`, `lch()` `oklab()`, `oklch()`, `color()`.

## Examples

### Retrieving resolved styles

In this example, we style a `` element, then retrieve those styles using `getComputedStyle()`, and print them into the text content of the ``.

#### HTML

```html
<p>Hello</p>
```

#### CSS

```css
p {
  width: 400px;
  margin: 0 auto;
  padding: 20px;
  font: 2rem/2 sans-serif;
  text-align: center;
  background: purple;
  color: white;
}
```

#### JavaScript

```js
const para = document.querySelector("p");
const compStyles = window.getComputedStyle(para);
para.textContent =
  `My computed font-size is ${compStyles.getPropertyValue("font-size")},\n` +
  `and my computed line-height is ${compStyles.getPropertyValue(
    "line-height",
  )}.`;
```

#### Result

### Use with pseudo-elements

`getComputedStyle()` can pull style info from pseudo-elements, such as `::after`, `::before`, `::marker`, or `::line-marker`.

```html
<h3>Generated content</h3>
```

```css
h3::after {
  content: " rocks!";
}
```

```js
const h3 = document.querySelector("h3");
const result = getComputedStyle(h3, "::after").content;

console.log("the generated content is: ", result); // returns ' rocks!'
```

## See also

- `window.getDefaultComputedStyle()`
- `getPropertyValue()`
- `Element.computedStyleMap()`
- Resolved value
