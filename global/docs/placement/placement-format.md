---
id: placement-format
title: "Place SVG elements from a config"
topic: placement
summary: "The placement config: elements, anchors and references, the seven rules, the errors, how the resolver orders the rules, and its limits."
tool: svg
version: "2"
checked: 2026-11-13
sources: [S1, S2]
license: MIT, written for this base
---

# Place SVG elements from a config

Contents: Purpose · Structure · Anchors · Rules · Errors · Resolution · Limits · In the base · Sources

## 1. Purpose and conventions

- The config places SVG elements from rules. Each rule places one or several elements from fixed numbers or from elements that are already placed.
- The rules are one-way: a rule reads the position of its reference and never moves it.
- The resolver is a pure function: the same config always gives the same positions. It needs no DOM.
- Units: SVG user units. Angles: degrees, 0 on the +x axis, positive clockwise on screen.
- The position of an element is the top-left corner of its box (`x`, `y`). Its rotation turns it about the centre of its box.
- Give the size of every element in the config. Take it from the `viewBox` of the symbol, or measure it once in a browser with `getBBox()`. The resolver never measures.

## 2. Structure

```json
{
  "version": 1,
  "canvas": { "width": 400, "height": 300 },
  "elements": {
    "dial": { "width": 120, "height": 120 },
    "valve": { "width": 64, "height": 40, "anchors": { "inlet": { "x": 0, "y": 20 } } }
  },
  "rules": [
    { "type": "fixed", "element": "dial", "anchor": "center", "x": 100, "y": 150 }
  ]
}
```

- `elements`: one entry per element. The key is the id: lower case letters, digits and hyphens, starting with a letter.
- `anchors`: optional named points of an element, in its own coordinates (0, 0 is its top-left corner). Use them for the connection points of a symbol.
- `canvas`: optional. When present, the id `canvas` can be used as a reference; its box is (0, 0, width, height). No rule can place `canvas`.
- `rules`: a list. The order of the list does not change the result.

## 3. Anchors and references

- Every element has nine box anchors: `top-left`, `top-center`, `top-right`, `center-left`, `center`, `center-right`, `bottom-left`, `bottom-center`, `bottom-right`.
- A reference is a string: `"dial"` (the centre of `dial`) or `"dial.top-center"` (an anchor of `dial`).
- A point is a reference or fixed coordinates: `"dial.center"` or `{ "x": 100, "y": 150 }`.
- The anchors are taken on the box before rotation. A rotation never moves an anchor.

## 4. The seven rules

| Rule | What it does | Sets | Reads | Fields (defaults) |
| --- | --- | --- | --- | --- |
| `fixed` | Puts an anchor of the element at fixed coordinates. | x and y | nothing | `element`, `x`, `y`, `anchor` (`top-left`) |
| `attach` | Puts an anchor of the element on an anchor of another element, plus an offset. | x and y | x and y of `to` | `element`, `to`, `anchor` (`center`), `dx` (0), `dy` (0) |
| `align` | Gives several elements the same edge as another element. | one axis | the same axis of `to` | `elements`, `edge` (`left`, `center-x`, `right`, `top`, `center-y`, `bottom`), `to`, `offset` (0) |
| `distribute` | Spreads elements along one axis, in the listed order. | one axis | the same axis of `start` and `end` | `elements`, `axis`, `mode` (`space-between`, `space-around`, `space-evenly`, `gap`), `start`, `end`, `gap` |
| `circle` | Puts the centres of the elements on a circle or on an arc. | x and y; rotation when `rotate` is not `none` | x and y of `around` | `elements`, `around`, `radius`, `startAngle` (0), `endAngle`, `rotate` (`none`) |
| `grid` | Puts each element at the centre of a grid cell, row by row. | x and y | x and y of `origin` | `elements`, `origin`, `columns`, `cellWidth`, `cellHeight`, `gapX` (0), `gapY` (0) |
| `rotate` | Turns the element about its centre. | rotation | x and y of the element and of `toward` | `element`, and `angle` or `toward` |

Details:

- `attach`: the anchor of the element lands on the anchor of `to`, moved by (`dx`, `dy`). To put B to the right of A with a gap of 8: `{ "type": "attach", "element": "b", "anchor": "center-left", "to": "a.center-right", "dx": 8 }`.
- `align` sets one axis only. The element needs another rule for the other axis.
- `distribute` with `space-between`, `space-around` or `space-evenly` needs `start` and `end`. With `gap` it needs `start` and `gap`, and stacks the elements one after the other.
- `distribute`: `start` and `end` are numbers or references. A reference gives its coordinate on the axis.
- `circle` without `endAngle`: full circle, step = 360 / count. With `endAngle`: the first element is on `startAngle`, the last on `endAngle`. A dial that starts at 12 o'clock uses `"startAngle": -90`.
- `circle` with `"rotate": "radial"`: the +x axis of each element points away from the centre. With `"tangent"`: it follows the circle.
- `rotate` with `toward`: the +x axis of the element points to the reference.

## 6. Errors

The resolver returns `{ ok: false, errors }`. Each error has a code and a one-line message. The checks of step 3 below are all reported together.

| Code | When | Message of the reference resolver |
| --- | --- | --- |
| `CYCLE` | Elements depend on each other in a loop. | `a -> b -> c -> a (rules #1, #2, #3). Each element is placed from the one before it. Break the loop with a "fixed" rule.` |
| `CONFLICT` | Two rules set the same axis, or the rotation, of one element. | `"b" x is set by rule #2 (attach) and by rule #3 (align). Keep one.` |
| `UNPLACED` | No rule sets the x or the y of an element. | `"b" has no rule for y. Add a rule that sets it.` |
| `UNKNOWN_ELEMENT` | A rule names an element that is not declared. | `rule #2 (attach) refers to "dail", which is not in "elements".` |
| `UNKNOWN_ANCHOR` | A rule names an anchor the element does not have. | `rule #3 (attach) uses anchor "top" on "a". Use one of top-left, top-center, top-right, center-left, center, center-right, bottom-left, bottom-center, bottom-right, or an anchor declared on the element.` |
| `DOES_NOT_FIT` | The elements of a `distribute` rule are wider than the space between `start` and `end`. | `rule #1 (distribute): the elements need 30 but only 20 is available.` |
| `INVALID_VALUE` | A value the schema cannot check alone, for example a `rotate` rule with both `angle` and `toward`. | `rule #2 (rotate) needs exactly one of "angle" or "toward".` |

## 7. Resolution

1. Check the config against the JSON Schema. If the schema refuses the config, return its errors and stop.
2. For each rule, list the slots it writes and the slots it reads. A slot is one axis of one element: `dial.x`, `dial.y`, or its rotation `dial.r`.
3. Refuse an unknown element or anchor. Refuse a slot written by two rules (`CONFLICT`). Refuse an element whose x or y is written by no rule (`UNPLACED`). Report all of these at once.
4. Build the dependency graph: rule A comes before rule B when B reads a slot that A writes.
5. Sort the rules with Kahn's algorithm. When several rules are ready, take the lowest rule number first: the order is then always the same.
6. When some rules cannot be sorted, there is a loop. Start from the lowest remaining rule, walk back through the rules it reads, and stop when a rule comes back. Name the elements of the loop (`CYCLE`).
7. Run the rules in the sorted order. Each rule reads positions that are already known.
8. Return, for every element: `x`, `y`, `rotation`, `centerX`, `centerY`, and `transform` = `translate(x y)`, followed by `rotate(angle width/2 height/2)` when the angle is not 0.

Why the result is unique: each slot has exactly one writer, and each writer runs after everything it reads.

## 8. Limits

- No rule changes a size. No rule keeps two elements from overlapping.
- No inequality ("at least 8 apart") and no priority between rules: two rules on the same slot are an error, not a choice.
- Two elements cannot depend on each other. Place one of them with a `fixed` rule.
- The box of an element is the box before rotation. An anchor on a rotated element is not turned.
- The size of a text is not known without a browser. Give it in the config.
- A rotation turns the whole element. To keep a label horizontal, make the label its own element and attach it.

## 10. In the base

- The resolver: `tools/placement.ts`, `resolvePlacement(config)`. Call it through the geometry tools (`resolve_placement`) rather than placing by hand.
- The schema: `docs/placement/placement.schema.json`. The example: `docs/placement/example.placement.json` and `example.svg`.
- The functions it uses are in the kit: `polarToCartesian`, `distributeSizes`, `stackSizes`, `gridCellRect`, `angleBetweenPoints`.

## Sources

- [S1] The placement format and its reference resolver, written for this base from the research on SVG geometry (2026-11-13); the resolver passes 12 tests: `node --test scripts/placement.test.ts`.
- [S2] W3C, 2026, "Scalable Vector Graphics (SVG) 2", for user units, transforms and getBBox.
