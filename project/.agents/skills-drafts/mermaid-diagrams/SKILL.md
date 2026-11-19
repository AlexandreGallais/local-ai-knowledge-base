---
name: mermaid-diagrams
description: "Writes Mermaid diagrams that render - sequence, flowchart, class, state, Gantt - and validates their syntax before delivery. Use when asked for a diagram, a flowchart, a sequence diagram or a schema in Markdown, or when a mermaid block fails to render."
metadata:
  id: WRT-04
  stars: "3"
  nature: reference
  mode: B
  wave: V2
  load: auto
---

# Mermaid diagrams

**Core rule:** every Mermaid block is validated by rendering it before delivery; when no renderer is available, keep to the syntax confirmed in `markdown-official-docs`.

## Procedure

1. Pick the diagram type from the table.
   - Check: the type fits the question (flow, sequence, structure, states, timeline).
2. Look up its syntax: `markdown-official-docs_search_docs` with the keyword (`sequenceDiagram`, `flowchart`).
   - Check: you read the section for that type.
3. Write the block: short node IDs, labels in quotes when they hold spaces or symbols, at most about 15 nodes.
   - Check: no reserved word (`end`) used as a node ID.
4. Render it to check: `mmdc -i diagram.mmd -o /tmp/diagram.svg` when the Mermaid CLI is installed.
   - Check: the SVG is written without error.

| Need | Type |
| --- | --- |
| Steps and decisions | `flowchart LR` or `flowchart TD` |
| Messages between parts over time | `sequenceDiagram` |
| Classes and relations | `classDiagram` |
| States and transitions | `stateDiagram-v2` |
| Schedule | `gantt` |
| Data model | `erDiagram` |

## This installation

<!-- FILL: what=Mermaid renderer available (mmdc) and its version; find=command -v mmdc and mmdc --version; verify=mmdc renders a two-node flowchart to SVG -->

<!-- FILL: what=Mermaid version supported by the team's Markdown viewer (GitLab); find=render a test block in a GitLab issue preview or ask the human; verify=the diagram types of the table render there -->

## Stop and ask the human if

- The diagram must render in a tool whose Mermaid version is unknown.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "`end` as a node name." | It closes blocks; rename it. |
| "Labels with parentheses unquoted." | Quote labels with symbols: `A["Load (cache)"]`. |

## Definition of done

- [ ] Each block rendered without error, or written strictly from the documented syntax.

## Local completion checklist

- [ ] Mermaid renderer
- [ ] Mermaid version of the viewer
