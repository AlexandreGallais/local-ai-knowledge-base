# Try the brief, the plan and the sub-agents on the workstation

A new session starts with the agent `orchestrator`. For a request that changes code, it has a brief
written, asks its questions, has the work cut into tasks, then hands each task to one fresh sub-agent,
one at a time, on the current branch. It says "done" only after the final check. This guide checks it on
the Angular sample. It takes about 45 minutes.

## Before

- The global base is installed (`guides/install.md`), OpenCode is 2.2.7, the project is equipped.
- Use a copy of the `samples/angular-app` project, or a real project on a branch you can drop.
- Note the branch: `git branch --show-current`.

## 1. Agents and tools are there

```sh
opencode debug agents
```

- [ ] `orchestrator` is the primary agent; `brief`, `planner`, `checker`, `component`, `store`,
  `service`, `html-css`, `library-function`, `tests`, `svg-geometry`, `docs-writer`, `reviewer` are
  sub-agents; `general` and `explore` are not listed.

## 2. A request of medium size

Open OpenCode at the root of the project and send, word for word:

> Add a page that lists the valves of a circuit, with a filter on the state (open, closed, fault),
> a store with two sub-domains (valves and filter), and the tests.

Note:

- [ ] The sub-agent `brief` runs first; `.agents/work/<subject>/brief.md` exists and says more than the
  request: goal, facts found with their paths, requirements, out of scope, assumptions.
- [ ] The orchestrator asks its questions with choices before any code is written.
- [ ] After your answers, `brief.md` has its `Answers` and a summary of 12 lines at most.
- [ ] `tasks.md` gives, for each task, its files, its agent, its check command and its `Done when`;
  the last task is `Final check`, agent `checker`.
- [ ] `node /opt/local-ai-base/tools/work-files.ts .agents/work/<subject>` says "Work files are well formed."
- [ ] Each task runs in a new sub-agent, one at a time: never two sub-agents at once in the session.
- [ ] Each sub-agent leaves `reports/T0n.md` with `STATUS`, `CHECK` at 0 errors and `EVIDENCE`.
- [ ] The orchestrator writes no file outside `.agents/work/`: `git status --short` shows only the
  files of the tasks.
- [ ] "Done" comes after the report of `checker`, with the four check commands at 0 errors.
- [ ] `git branch --show-current` gives the same branch as before; `git worktree list` shows one line.

## 3. A break in the middle

Send the request of part 2 again in a new subject, then quit OpenCode while the second task runs.
Open a new session and send: "Go on."

- [ ] The orchestrator calls `work_resume` first, without reading the old conversation.
- [ ] It names the subject and the task that was running, reads its report, then goes on from it.

## 4. A task no document covers

Send a request that depends on a rule of the team, for example: "Number the new alarms of the valve
page like the other alarms of the project."

- [ ] The AI asks how to do it, with choices, instead of guessing.
- [ ] After your answer, `.agents/skills/<name>/SKILL.md` exists, and
  `node /opt/local-ai-base/tools/check-skill.ts .agents/skills/<name>` ends with "0 findings.".
- [ ] In a new session, the same kind of request uses that skill without asking again.

## 5. Tokens

```sh
opencode run --format json "Plan a small change: rename the title of the valve page." > run.jsonl
```

- [ ] Sum of the `tokens` of the `step_finish` events, and number of sub-agents launched.

## To try, not proven yet

- The permission rules of an agent file are read as written in `agents/*.md`.
- A sub-agent ends within its `steps` (20 to 40) on an ordinary task.
- The model writes the statuses in capitals, without tags around them.

## What to send back

The ticked boxes, the tokens of part 5, and for a box not ticked: the subject folder (`brief.md`,
`tasks.md`, `reports/`), without internal names, so that the agents can be corrected.
