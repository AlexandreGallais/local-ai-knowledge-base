---
name: other-diagram-formats
description: "Draws diagrams with Graphviz DOT or PlantUML when Mermaid is not enough - large graphs, precise layouts, UML details. Use when a Mermaid diagram becomes unreadable, when the project already uses .dot or .puml files, or when asked for a graph layout Mermaid cannot do."
metadata:
  id: WRT-10
  stars: "1"
  nature: reference
  mode: B
  wave: V4
  load: auto
---

# Other diagram formats

**Core rule:** prefer Mermaid; switch to DOT or PlantUML only for what Mermaid cannot render well, and render the file locally to check it.

## Procedure

1. Choose the format with the table.
   - Check: the reason for leaving Mermaid is written.
2. Write the source file next to the docs (`docs/diagrams/<name>.dot` or `.puml`); look up syntax in `markdown-official-docs` (Graphviz).
   - Check: the file exists.
3. Render it: `dot -Tsvg docs/diagrams/<name>.dot -o docs/diagrams/<name>.svg` (or the PlantUML command installed here).
   - Check: the SVG is written without error.
4. Commit source and rendered file; reference the image from the Markdown.
   - Check: the image shows in the rendered Markdown.

| Need | Format |
| --- | --- |
| Large dependency or call graphs | Graphviz DOT (`dot`, `sfdp`) |
| Detailed UML (deployment, component) | PlantUML, if installed |
| Everything else | Mermaid (`mermaid-diagrams`) |

## This installation

<!-- FILL: what=Graphviz and PlantUML availability; find=command -v dot plantuml and dot -V; verify=a two-node DOT file renders to SVG -->

## Stop and ask the human if

- PlantUML is required but not installed.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Commit only the source." | Readers then need the tool. Commit the SVG too. |
| "Use a remote PlantUML server." | No Internet; render locally. |

## Definition of done

- [ ] Reason for the format written; source and rendered SVG committed and referenced.

## Local completion checklist

- [ ] Graphviz and PlantUML
