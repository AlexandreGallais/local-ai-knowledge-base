---
id: placement-example
title: "A complete placement example"
topic: placement
summary: "A dial, its title, eight lamps around it and a chain of three elements: the config, the positions the resolver gives, the SVG, and how to apply it with the DOM API."
tool: svg
version: "2"
checked: 2026-11-13
sources: [S1, S2]
license: MIT, written for this base
---

# A complete placement example

Contents: Complete example · Sources

## 5. Complete example

Config: a dial, a title above it, eight lamps around it, then a chain of three (pump, valve, tag), each placed from the one before. The rules of the chain are written in reverse order on purpose.

```json
{
  "$schema": "placement.schema.json",
  "version": 1,
  "canvas": { "width": 400, "height": 300 },
  "elements": {
    "dial": { "width": 120, "height": 120 },
    "title": { "width": 80, "height": 16 },
    "lamp-1": { "width": 12, "height": 12 },
    "lamp-2": { "width": 12, "height": 12 },
    "lamp-3": { "width": 12, "height": 12 },
    "lamp-4": { "width": 12, "height": 12 },
    "lamp-5": { "width": 12, "height": 12 },
    "lamp-6": { "width": 12, "height": 12 },
    "lamp-7": { "width": 12, "height": 12 },
    "lamp-8": { "width": 12, "height": 12 },
    "valve": { "width": 64, "height": 40, "anchors": { "inlet": { "x": 0, "y": 20 }, "outlet": { "x": 64, "y": 20 } } },
    "pump": { "width": 48, "height": 48, "anchors": { "outlet": { "x": 48, "y": 24 } } },
    "tag": { "width": 40, "height": 12 }
  },
  "rules": [
    { "type": "attach", "element": "tag", "anchor": "top-center", "to": "valve.bottom-center", "dy": 4 },
    { "type": "attach", "element": "valve", "anchor": "inlet", "to": "pump.outlet", "dx": 30 },
    { "type": "attach", "element": "pump", "anchor": "center-left", "to": "dial.center-right", "dx": 60 },
    { "type": "fixed", "element": "dial", "anchor": "center", "x": 100, "y": 150 },
    { "type": "attach", "element": "title", "anchor": "bottom-center", "to": "dial.top-center", "dy": -32 },
    {
      "type": "circle",
      "elements": ["lamp-1", "lamp-2", "lamp-3", "lamp-4", "lamp-5", "lamp-6", "lamp-7", "lamp-8"],
      "around": "dial.center",
      "radius": 80,
      "startAngle": -90
    }
  ]
}
```

Result of `resolvePlacement(config)`. Order of the rules: `[4,3,2,1,5,6]`.

| Element | x | y | centerX | centerY | transform |
| --- | --- | --- | --- | --- | --- |
| dial | 40 | 90 | 100 | 150 | `translate(40 90)` |
| title | 60 | 42 | 100 | 50 | `translate(60 42)` |
| lamp-1 | 94 | 64 | 100 | 70 | `translate(94 64)` |
| lamp-2 | 150.569 | 87.431 | 156.569 | 93.431 | `translate(150.569 87.431)` |
| lamp-3 | 174 | 144 | 180 | 150 | `translate(174 144)` |
| lamp-4 | 150.569 | 200.569 | 156.569 | 206.569 | `translate(150.569 200.569)` |
| lamp-5 | 94 | 224 | 100 | 230 | `translate(94 224)` |
| lamp-6 | 37.431 | 200.569 | 43.431 | 206.569 | `translate(37.431 200.569)` |
| lamp-7 | 14 | 144 | 20 | 150 | `translate(14 144)` |
| lamp-8 | 37.431 | 87.431 | 43.431 | 93.431 | `translate(37.431 87.431)` |
| valve | 298 | 130 | 330 | 150 | `translate(298 130)` |
| pump | 220 | 126 | 244 | 150 | `translate(220 126)` |
| tag | 310 | 174 | 330 | 180 | `translate(310 174)` |

SVG built from the result:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300" fill="none" stroke="#333333">
  <g id="dial" transform="translate(40 90)"><circle cx="60" cy="60" r="60"/></g>
  <g id="title" transform="translate(60 42)"><rect width="80" height="16"/></g>
  <g id="lamp-1" transform="translate(94 64)"><circle cx="6" cy="6" r="6"/></g>
  <g id="lamp-2" transform="translate(150.569 87.431)"><circle cx="6" cy="6" r="6"/></g>
  <g id="lamp-3" transform="translate(174 144)"><circle cx="6" cy="6" r="6"/></g>
  <g id="lamp-4" transform="translate(150.569 200.569)"><circle cx="6" cy="6" r="6"/></g>
  <g id="lamp-5" transform="translate(94 224)"><circle cx="6" cy="6" r="6"/></g>
  <g id="lamp-6" transform="translate(37.431 200.569)"><circle cx="6" cy="6" r="6"/></g>
  <g id="lamp-7" transform="translate(14 144)"><circle cx="6" cy="6" r="6"/></g>
  <g id="lamp-8" transform="translate(37.431 87.431)"><circle cx="6" cy="6" r="6"/></g>
  <g id="valve" transform="translate(298 130)"><rect width="64" height="40"/></g>
  <g id="pump" transform="translate(220 126)"><rect width="48" height="48"/></g>
  <g id="tag" transform="translate(310 174)"><rect width="40" height="12"/></g>
</svg>
```

Apply the result with the DOM API (run in Chromium 153; the `e` and `f` of `getCTM()` equal the `x` and `y` of the table):

```ts
export function applyPlacement(root: SVGElement, placed: Readonly<Record<string, { readonly transform: string }>>): void {
  for (const [id, element] of Object.entries(placed)) {
    const node = root.querySelector(`#${CSS.escape(id)}`);
    if (node instanceof SVGGraphicsElement) {
      node.setAttribute('transform', element.transform);
    }
  }
}
```

## Sources

- [S1] The placement format and its reference resolver, written for this base from the research on SVG geometry (2026-11-13); the resolver passes 12 tests: `node --test scripts/placement.test.ts`.
- [S2] W3C, 2026, "Scalable Vector Graphics (SVG) 2", for user units, transforms and getBBox.
