---
name: data-visualization
description: "Draws charts that stay correct and fast on large data - Canvas, SVG or WebGL choice, scales, axes with units, legends, downsampling. Use when adding or fixing a chart, a plot or a gauge in a web UI, when a chart is slow with many points, or when axes and units are wrong."
metadata:
  id: FE-06
  stars: "3"
  nature: reference
  mode: A
  wave: V3
  load: auto
---

# Data visualization

**Core rule:** every chart shows its units and scales honestly, and draws no more points than the screen has pixels.

## Procedure

1. Choose the rendering technique from the table.
   - Check: the choice matches the number of points.
2. Build scales from the data domain to the pixel range; label axes with quantity and unit.
   - Check: axis labels show units; the zero line is visible when values cross it.
3. Downsample for display when points exceed the width (min and max per pixel column, or the library's method).
   - Check: peaks are still visible after downsampling.
4. Add a legend and a readable colour scheme (also usable without colour: shapes or labels).
   - Check: series can be told apart in greyscale.
5. Test with an empty dataset, one point, and the largest expected dataset.
   - Check: no error; render time acceptable.

| Points on screen | Technique |
| --- | --- |
| Under about 1,000 | SVG (easy styling and interaction) |
| 1,000 to about 100,000 | Canvas 2D |
| More, or 3D | WebGL |

## Stop and ask the human if

- The scale choice changes the message (log versus linear, truncated axis).

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Plot every sample." | Hundreds of thousands of SVG nodes freeze the page. |
| "Units are obvious." | Readers misread values without units. |

## Definition of done

- [ ] Technique fits the volume; axes with units; legend; downsampling keeps peaks; edge cases tested.
