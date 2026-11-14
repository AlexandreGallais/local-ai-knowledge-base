---
title: "stdDeviation"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/attribute/stddeviation/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# stdDeviation

The **`stdDeviation`** attribute defines the standard deviation for the blur operation.

You can use this attribute with the following SVG elements:

- `<feDropShadow>`
- `<feGaussianBlur>`

## Example

```css
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg">
  <filter id="gaussianBlur1">
    <feGaussianBlur stdDeviation="1" />
  </filter>
  <filter id="gaussianBlur2">
    <feGaussianBlur stdDeviation="5" />
  </filter>
  <filter id="gaussianBlur3" x="-30%" y="-30%" width="160%" height="160%">
    <feGaussianBlur stdDeviation="10" />
  </filter>

  <circle cx="100" cy="100" r="50" filter="url(#gaussianBlur1)" />
  <circle cx="240" cy="100" r="50" filter="url(#gaussianBlur2)" />
  <circle cx="380" cy="100" r="50" filter="url(#gaussianBlur3)" />
</svg>
```

## Usage notes

       | Value
       |
        <code
          >&#x3C;number-optional-number></code
        >

       | Default value
       | `0`

       | Animatable
       | Yes

- `<number-optional-number>`
    If two numbers are provided, the first number represents a standard deviation value along the x-axis. The second value represents a standard deviation along the y-axis. If one number is provided, then that value is used for both X and Y.

    A negative value is forbidden. A value of zero disables the effect of the given filter primitive (i.e., the result is the filter input image). If `stdDeviation` is 0 in only one of X or Y, then the effect is that the blur is only applied in the direction that has a non-zero value.
