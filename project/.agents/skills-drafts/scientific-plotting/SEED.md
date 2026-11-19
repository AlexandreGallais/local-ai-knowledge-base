# SEED: scientific-plotting  (SCI-09, 2 stars, V3)

## Final frontmatter (do not change)

```yaml
name: scientific-plotting
description: "Makes readable scientific plots - axes with units, log scales, legends, export to PNG, SVG or PDF - with matplotlib or Octave. Use when plotting simulation or measurement results, preparing figures for a report, or when a plot is unreadable or misleading."
metadata:
  id: SCI-09
  stars: "2"
  nature: reference
  mode: D
  wave: V3
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Plotting tools installed (matplotlib, Octave, gnuplot).
- [ ] Axes labels with units, scales, legends, figure size and resolution.
- [ ] Non-interactive export without a display.

## Known pitfalls to confirm or drop

- plt.show without a display blocks or fails; use savefig.

## MCP servers and example queries

- python-official-docs: matplotlib savefig Agg
- simulation-official-docs: Octave print figure
