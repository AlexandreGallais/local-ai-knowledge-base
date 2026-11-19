---
name: text-processing-pipelines
description: "Analyses logs and lists with sort, uniq, cut, comm, join and awk pipelines - counts, top values, differences between two lists. Use when counting occurrences in a log, finding the most frequent errors, comparing two lists of names, or extracting columns from text output."
metadata:
  id: LNX-10
  stars: "2"
  nature: reference
  mode: A
  wave: V3
  load: auto
---

# Text processing pipelines

**Core rule:** build the pipeline step by step, checking the output of each stage on a few lines with `head` before adding the next.

## Procedure

1. Extract the field you need from a sample: `head -n 5 <file> | cut -d' ' -f3` or `awk '{print $3}'`.
   - Check: the sample shows only the field.
2. Add the next stage and check again with `head`.
   - Check: each stage's output is what you expect.
3. Run on the full input, with a final `head` to keep the output short.
   - Check: the result fits on one screen.

| Need | Pipeline |
| --- | --- |
| Top 10 error messages | `grep -i error app.log \| sort \| uniq -c \| sort -rn \| head` |
| Unique values of column 2 (CSV) | `cut -d, -f2 data.csv \| sort -u` |
| Lines only in list A | `comm -23 <(sort a.txt) <(sort b.txt)` |
| Lines in both lists | `comm -12 <(sort a.txt) <(sort b.txt)` |
| Sum of column 3 | `awk '{s += $3} END {print s}' file` |
| Count per hour (ISO timestamps) | `cut -c1-13 app.log \| sort \| uniq -c` |

## Stop and ask the human if

- The data holds personal information you would need to show.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "`uniq` removes all duplicates." | Only adjacent ones; sort first. |
| "`comm` works on unsorted files." | Both inputs must be sorted. |

## Definition of done

- [ ] Pipeline built stage by stage; final output short and checked.
