---
title: "Element: clientTop property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/clienttop/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: clientTop property

The **`clientTop`** read-only property of the `Element` interface returns the width of the top border of an element in pixels.

All that lies between the `offsetTop` and `clientTop` is the element's border. This is because the `offsetTop` indicates the location of the top of the border (not the margin) while the client area starts immediately below the border, including padding. Therefore, the `clientTop` value is always equal to the `border-top-width`, rounded to integer. For example, if the computed `border-top-width` is zero, then `clientTop` is also zero.

## Value

An integer.

## Examples

In the following example, the client area has a white background and a 24px black `border-top`. The `clientTop` value is the distance from where the margin (yellow) area ends and the padding and content areas (white) begin: that is, 24px.

### HTML

```html
<div id="container">
  <div id="contained">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    </p>
  </div>
</div>
```

### CSS

```css
#container {
  margin: 3rem;
  background-color: rgb(255 255 204);
  border: 4px dashed black;
}

#contained {
  margin: 1rem;
  border-top: 24px black solid;
  padding: 0px 28px;
  overflow: auto;
  background-color: white;
}
```

## See also

- Determining the dimensions of elements
- `HTMLElement.offsetTop`
- `Element.scrollTop`
- `Element.clientHeight`
- `Element.clientWidth`
- `Element.clientLeft`
- `Element.getBoundingClientRect()`
