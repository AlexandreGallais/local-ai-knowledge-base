---
name: diagram-reading
description: "Reads an architecture, UML or flow diagram from an image and transcribes it into Mermaid or structured text. Use when the user shares a picture of a diagram, a whiteboard photo, a scanned schema, or asks to turn a drawing into Mermaid."
metadata:
  id: MM-03
  stars: "2"
  nature: process
  mode: A
  wave: V3
  load: auto
---

# Diagram reading

**Core rule:** transcribe only what is visible: every box, arrow and label; mark unreadable or ambiguous parts instead of guessing.

## Procedure

1. List the elements: boxes with their exact labels, arrows with direction and labels, groups.
   - Check: the list covers every visible element; unreadable ones marked `[unreadable]`.
2. Identify the diagram type (flow, sequence, class, state, deployment).
   - Check: one type chosen.
3. Write the Mermaid block of that type (`mermaid-diagrams` if present), one line per element.
   - Check: the number of nodes and edges equals the list.
4. Ask the human about ambiguous elements.
   - Check: each ambiguity is answered or left marked.

## Stop and ask the human if

- Arrows or labels cannot be read, or their direction is unclear.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "This arrow probably goes there." | Mark it ambiguous and ask. |
| "Tidy the diagram while transcribing." | Transcribe first; propose changes separately. |

## Definition of done

- [ ] Every visible element transcribed; counts match; ambiguities marked or answered.
