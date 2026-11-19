---
name: data-flow-tracing
description: "Follows one piece of data from the user interface to storage, or back, through every function and boundary, to explain a behaviour. Use when asked where a value comes from or goes, why a field shows a given value, or what happens when a form is submitted."
metadata:
  id: EXP-06
  stars: "3"
  nature: process
  mode: A
  wave: V3
  load: auto
---

# Data flow tracing

**Core rule:** trace with searches and reads of the actual code at each hop, and write the path as a numbered list of file:function steps.

## Procedure

1. Name the data and the start point (a field in a form, an endpoint, a column).
   - Check: one name and one location.
2. Find the next hop: who reads or receives it (`grep` the field name, the endpoint path, the event name).
   - Check: file and function of the next hop.
3. Note each transformation: renamed, converted, validated, filtered, defaulted.
   - Check: each hop lists what happens to the data.
4. Repeat until the end point (storage, display, external call).
   - Check: the path has no gap.
5. Write the path and point out where the observed behaviour comes from.
   - Check: the explanation cites the hop responsible.

## Stop and ask the human if

- The flow crosses a service whose code you do not have.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "The name stays the same along the way." | Fields get renamed at boundaries (camelCase to snake_case, DTOs). Search both forms. |
| "Skip the serialisation step." | Conversions there often cause the bug. |

## Definition of done

- [ ] Numbered path from start to end with file:function and transformations.
