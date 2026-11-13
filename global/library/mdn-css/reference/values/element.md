---
title: "`element()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/element/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `element()` CSS function

The **`element()`** CSS function defines an `image` value generated from an arbitrary HTML element. This image is live, meaning that if the HTML element is changed, the CSS properties using the resulting value are automatically updated.

A particularly useful scenario for using this would be to render an image in an HTML `<canvas>` element, then use that as a background.

On Gecko browsers, you can use the non-standard `document.mozSetImageElement()` method to change the element being used as the background for a given CSS background element.

## Syntax

```css
element(id)
```

where:

- _id_
    The ID of an element to use as the background, specified using the HTML attribute #_id_ on the element.

## Examples

These examples work in builds of Firefox that support `-moz-element()`.

### A somewhat realistic example

This example uses a hidden `` as a background. The background element uses a gradient, but also includes text that is rendered as part of the background.

```html
<div id="target-box">
  <p>This box uses the element with the #my-background ID as its background!</p>
</div>

<div id="background-container">
  <div id="my-background">
    <p>This text is part of the background. Cool, huh?</p>
  </div>
</div>
```

```css
#target-box {
  width: 400px;
  height: 400px;
  background: -moz-element(#my-background) no-repeat;
}

#background-container {
  overflow: hidden;
  height: 0;
}

#my-background {
  width: 1024px;
  height: 1024px;
  background-image: linear-gradient(to right, red, orange, yellow, white);
}

#my-background p {
  transform-origin: 0 0;
  rotate: 45deg;
  color: white;
}
```

The `` element with the ID "my-background" is used as the background for the content including the paragraph "This box uses the element with the #my-background ID as its background!".

### Page Preview

This example based on Vincent De Oliveira's creates a preview of the `` inside ``.

#### HTML

```html
<div id="css-source">
  <h1>Page Preview</h1>
</div>
<div id="css-result"></div>
```

#### CSS

```css
#css-result {
  background: -moz-element(#css-source) no-repeat;
  width: 256px;
  height: 32px;
  background-size: 80%;
  border: dashed;
}
```

#### Result

## See also

- `image()`
- `image-set()`
- `image`
- `gradient`
- `cross-fade()`
- `document.mozSetImageElement()`
