---
name: uncertainty-labeling
description: "Labels each technical claim as verified (with its source or command), assumed or unknown. Use when stating how an API, option, version, command or behaviour works, when explaining a cause, when reporting results, and when unsure whether you remember correctly."
metadata:
  id: MET-09
  stars: "4"
  nature: guardrail
  mode: A
  wave: V1
  load: always
---

# Uncertainty labeling

**Core rule:** every technical claim carries its status: verified (with source), assumed, or unknown.

## Labels

| Label | Use when | Form |
| --- | --- | --- |
| Verified | A command output, a test, a file or a documentation page shows it now | `Verified (npm test, 12/12 pass)`, `Verified (doc: js-official-docs, Array.prototype.at)` |
| Assumed | It comes from memory or inference, not checked | `Assumed: the API returns ISO dates.` |
| Unknown | Nothing tells you | `Unknown: the timeout of the proxy.` |

## Procedure

1. Before stating a fact about code, an API or the environment, ask: did I check it in this session?
   - Check: yes gives Verified with its source; no gives Assumed or Unknown.
2. Turn important assumptions into checks when one command or one doc lookup can settle them.
   - Check: the label became Verified, or you say why it could not.
3. In reports, group assumptions and unknowns in their own list.
   - Check: the reader sees them without searching.

## Example

Bad: "The `--fix` flag also sorts imports."

Good: "Assumed: `--fix` also sorts imports (not checked; the import-order rule must be enabled)."

## Stop and ask the human if

- An unknown blocks the task and no command or document can settle it.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "I am confident, so it is verified." | Confidence is not a source. |
| "Labels clutter the reply." | One word per claim; wrong certainty costs more. |

## Definition of done

- [ ] Each technical claim in the reply has its label.
- [ ] Verified claims name their source or command.
