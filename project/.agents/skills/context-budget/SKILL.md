---
name: context-budget
description: "Saves the context window - targeted reads, filtered and truncated outputs, short intermediate summaries. Use when about to read a file over 300 lines, list a large folder, print a long log, run a verbose command, or when the conversation has grown long."
metadata:
  id: MET-06
  stars: "5"
  nature: guardrail
  mode: A
  wave: V1
  load: always
---

# Context budget

**Core rule:** read only the lines you need: search first, then read a line range; never load a big file, folder or log whole.

## Rules

| Need | Do | Not |
|---|---|---|
| Find where something is | `grep` with a precise pattern, `glob` with a narrow path | `read` of whole files one by one |
| Read part of a file | `read` with an offset and a limit around the match | `read` of a 2,000-line file |
| Size of a file | `wc -l <file>` | opening it to see |
| Long command output | `<cmd> 2>&1 \| tail -n 40`, or `> /tmp/out.log` then `grep` in it | printing everything |
| Test failures only | the runner's option for failures only, or `grep -n -E 'FAIL\|Error'` on the log | the full report |
| A folder | `ls`, or `find <dir> -maxdepth 2 -type f \| head -n 50` | recursive listing of `node_modules` |
| Binary or heavy file (pdf, images, archives, office files) | a tool that extracts text, or ask | `read` on the raw file |

## Procedure

1. Before reading, ask: which lines do I need? Search for them first.
   - Check: the `read` call has an offset and a limit, or the file is under 300 lines.
2. After a long investigation, write a 5-line summary of what you learned, then continue from the summary.
   - Check: the summary names files, lines and facts.

## Stop and ask the human if

- The task truly needs a full large file: say its size and ask.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "Reading the whole file is safer." | It pushes out what you need later and costs every following step. |
| "I need all the logs." | You need the first error and its context. |

## Definition of done

- [ ] No whole read of a file over 300 lines without a reason.
- [ ] Long outputs were filtered or truncated.
