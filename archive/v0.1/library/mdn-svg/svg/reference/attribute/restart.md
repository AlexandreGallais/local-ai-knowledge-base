---
title: "restart"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/restart/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# restart

The **`restart`** attribute specifies whether or not an animation can restart.

You can use this attribute with the following SVG elements:

- `<animate>`
- `<animateMotion>`
- `<animateTransform>`
- `<set>`

## Example

```css
html,
body,
svg {
  height: 100%;
}

a {
  fill: blue;
  text-decoration: underline;
  cursor: pointer;
}
```

```html
<svg viewBox="0 0 220 200" xmlns="http://www.w3.org/2000/svg">
  <rect y="30" width="100" height="100">
    <animate
      attributeType="XML"
      attributeName="y"
      from="30"
      to="100"
      dur="5s"
      repeatCount="1"
      restart="always" />
  </rect>
  <rect x="120" y="30" width="100" height="100">
    <animate
      attributeType="XML"
      attributeName="y"
      from="30"
      to="100"
      dur="5s"
      repeatCount="1"
      restart="whenNotActive" />
  </rect>
  <a id="restart"><text y="20">Restart animation</text></a>
</svg>
```

```js
document.getElementById("restart").addEventListener("click", (evt) => {
  document.querySelectorAll("animate").forEach((element) => {
    element.beginElement();
  });
});
```

## Usage notes

       | Value
       |
        `always` | `whenNotActive` | `never`

       | Default value
       | `always`

       | Animatable
       | No

- `always`
    This value indicates that the animation can be restarted at any time.
- `whenNotActive`
    This value indicates that the animation can only be restarted when it is not active (i.e., after the active end). Attempts to restart the animation during its active duration are ignored.
- `never`
    This value indicates that the animation cannot be restarted.
