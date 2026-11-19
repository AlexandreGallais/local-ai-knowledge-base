# BRIEF: project-memory  (SKL-06, 4 stars, V2)

## Final frontmatter (do not change)

```yaml
name: project-memory
description: "Records traps, workarounds and decisions of this project in a knowledge file of the repository, read at the start of each session. Use when you hit a non-obvious trap, find a workaround, learn why something is done a certain way, or start a session in this project."
metadata:
  id: SKL-06
  stars: "4"
  nature: process
  mode: C
  wave: V2
  load: auto
```

## Goal

A process that keeps a short, factual memory of the project in a file of the repository (one entry per trap or decision, with date and evidence), read at session start, so the agent does not rediscover the same traps.

## Questions the skill must answer

1. Which file and format does the team want (docs/KNOWLEDGE.md by default), and is it committed?
2. What makes an entry worth keeping (non-obvious, verified, likely to recur)?
3. Entry format: date, topic, fact, evidence (command or commit), status (valid or obsolete)?
4. How is the file read at session start without loading it whole when it grows?
5. How are obsolete entries marked or removed?

## Where to look (files, commands, people)

- AGENTS.md and existing docs of the repository
- the human: whether the memory file is committed and who reviews it

## Required sections

- Core rule in the first 10 lines.
- Procedure with an Action and a Check per step, or a reference table with the commands.
- Stop and ask the human if; Common mistakes; Definition of done.

## Acceptance tests

- Trigger: loads on "remember this trap for next time", "we already hit this error last week, note the fix", "start working on this repository"; does not load on "write the README", "explain this function", "run the linter".
- Paired task: a session meets a trap already recorded; with the skill the agent reads the entry and avoids the failed path (fewer failed commands).

## Human input required (yes/no, what)

Yes: the file location, whether it is committed, and who may edit it.
