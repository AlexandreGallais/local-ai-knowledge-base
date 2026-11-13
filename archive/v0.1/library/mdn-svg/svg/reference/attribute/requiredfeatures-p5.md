---
title: "requiredFeatures (part 5 of 5)"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/requiredfeatures/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# requiredFeatures (part 5 of 5)

```html
  <rect class="ko" x="10" y="1060" height="25" width="430" />
  <rect
    class="ok"
    x="10"
    y="1060"
    height="25"
    width="430"
    requiredFeatures="http://www.w3.org/TR/SVG11/feature#Animation" />
  <text x="20" y="1077">http://www.w3.org/TR/SVG11/feature#Animation</text>

  <!-- Testing : http://www.w3.org/TR/SVG11/feature#Font -->
  <rect class="ko" x="10" y="1085" height="25" width="430" />
  <rect
    class="ok"
    x="10"
    y="1085"
    height="25"
    width="430"
    requiredFeatures="http://www.w3.org/TR/SVG11/feature#Font" />
  <text x="20" y="1102">http://www.w3.org/TR/SVG11/feature#Font</text>

  <!-- Testing : http://www.w3.org/TR/SVG11/feature#BasicFont -->
  <rect class="ko" x="10" y="1110" height="25" width="430" />
  <rect
    class="ok"
    x="10"
    y="1110"
    height="25"
    width="430"
    requiredFeatures="http://www.w3.org/TR/SVG11/feature#BasicFont" />
  <text x="20" y="1127">http://www.w3.org/TR/SVG11/feature#BasicFont</text>

  <!-- Testing : http://www.w3.org/TR/SVG11/feature#Extensibility -->
  <rect class="ko" x="10" y="1135" height="25" width="430" />
  <rect
    class="ok"
    x="10"
    y="1135"
    height="25"
    width="430"
    requiredFeatures="http://www.w3.org/TR/SVG11/feature#Extensibility" />
  <text x="20" y="1152">http://www.w3.org/TR/SVG11/feature#Extensibility</text>
</svg>
```

### CSS

```css
.ko {
  fill: #990000;
}

.ok {
  fill: #006600;
}

rect {
  stroke: black;
  stroke-width: 2px;
}

text {
  fill: white;
  font: 12px sans-serif;
}
```
