# SEED: scientific-python  (SCI-03, 3 stars, V2)

## Final frontmatter (do not change)

```yaml
name: scientific-python
description: "Uses NumPy, SciPy, pandas and matplotlib correctly - vectorisation, dtypes, broadcasting, common pitfalls. Use when writing numerical or data code in Python, when a loop over arrays is slow, when results are off because of dtypes or broadcasting, or when plotting data."
metadata:
  id: SCI-03
  stars: "3"
  nature: reference
  mode: D
  wave: V2
  load: auto
```

## Family template

`.agents/skills/_templates/tool-reference.md`. Document only the versions installed here; run every command before writing it.

## Topics checklist

- [ ] Installed versions of numpy, scipy, pandas, matplotlib.
- [ ] Vectorisation and broadcasting rules.
- [ ] dtype choices and overflow.
- [ ] pandas indexing (loc, iloc) and copies.
- [ ] Saving plots without a display (Agg backend).

## Known pitfalls to confirm or drop

- Chained assignment in pandas modifies a copy.
- Integer arrays overflow silently.
- plt.show() blocks or fails without a display.

## MCP servers and example queries

- python-official-docs: numpy broadcasting, pandas loc, matplotlib backend Agg
