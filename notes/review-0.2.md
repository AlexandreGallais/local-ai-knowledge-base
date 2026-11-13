# Review of version 0.2.0

A review of the whole base before the delivery, done on 2026-11-13 after the last feature: names and
paths that the instructions cite, contradictions between documents, versions, instructions a small model
could read two ways, and words that would tell where the base is used. Each finding has its fix or its
reason.

## Found and fixed

| # | Finding | Fix |
| --- | --- | --- |
| 1 | The instructions named the MCP tools sometimes with the server prefix (`work_next_task`), sometimes without (`project_info`, `check_tasks`). OpenCode prefixes every tool with its server: `project_info` would have been `project_project_info`. | The tool of the `project` server is renamed `info`, so the model sees `project_info`; every other tool is named with its prefix. |
| 2 | The skills `start-angular-project` and `start-typescript-library` wrote `.agents/profile.json` by hand, while the welcome forbids it and already writes it. | They read the profile the welcome wrote, and re-apply it with `apply-profile.ts` after `ng new`. |
| 3 | No agent could load the two start skills: the planner and the writing agents had no right to them. | The planner, `component` and `library-function` open them; the planner turns their steps into tasks. |
| 4 | An empty project of an Angular profile got `vitest run` as its test command, since `angular.json` did not exist yet. | The Angular profiles always test with `ng test`. |
| 5 | The format pass sorted a field set by `inject()` after the other fields, then the lint refused it (`@angular-eslint/inject-at-top`). Found by the proof of the evaluation task t10. | The format pass puts the fields set by `inject()` first; a format case guards it. |
| 6 | `notes/mcp-servers.md` counted seven servers and listed six `work` tools. | Eight servers, ten `work` tools, measures taken again. |
| 7 | The README listed a folder `global/profiles/` that does not exist. | The layout lists the real folders. |
| 8 | The base check did not check the evaluation tasks. | `check-base.ts` checks their header, sections and proof file. |

## Kept, with the reason

| # | Point | Reason |
| --- | --- | --- |
| 9 | The compaction keeps its fixed template: no plugin rewrites it. | The `compaction` hook of the plugin API is not verified at 2.2.7. Rules and `AGENTS.md` are loaded again after a compaction, and the `work_resume` tool gives the task to go on with; the trial guide checks it. |
| 10 | The permission rules of the agent files are written as the 2.2.7 documentation shows them, never run on a workstation. | Checked by `scripts/agents.test.ts` against the evaluation order of the notes; the trial guide checks them for real. |
| 11 | Whether a tool refused to an agent still costs its schema in the request. | To measure on the workstation (`notes/mcp-servers.md`). |
| 12 | The symbols "navigation" and "damage" of the list have no card. | Their meaning is a question for the team; a private note records them. |
| 13 | Two equipment terms ("tank cylinder", "two-stage accumulator") and two clutch kinds rest on a reading of this base. | No public source defines them; their cards say "to confirm". |

## Checked without finding

- Every path under `/opt/local-ai-base/` cited by a rule, skill, agent, guide or config exists in `global/`.
- The versions cited outside the library agree: Angular 22, TypeScript 6.0 (never 7 with Angular 22),
  NgRx Signals 22, Vitest 5, ESLint 10.
- `scripts/check-public.ts` finds no private file and no forbidden term, in the files and in the history.
