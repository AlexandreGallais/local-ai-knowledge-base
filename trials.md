# Trial session on the workstation

One ordered plan for every check that only a person can see on the workstation. Each step points
to its detailed guide, `f<n>-…/trial.md`; this file only gives the order, the setup they share, and
the facts to record first. Plan one or two days; stop between steps when you need to.

Keep real files, traces and results with real data out of every Git repository: write them in a
local folder of the workstation.

## 1. On the machine that has this repository

```sh
node scripts/paste-sample.ts paste-sample   # the paste test of F7
node scripts/export.ts --trial              # the base and the trial material, in export/
```

`--trial` adds this file, the trial guides, `samples/`, `evaluation/`, `scripts/fixtures.ts` and
`scripts/evaluation-summary.ts`. Without it, the export holds the base only.

## 2. Carry the base (F7)

1. Play parts 1 and 2 of `f7-exporter-la-base-et-la-recreer/trial.md`: one 476 KB part, pasted at
   once, accepted by the import.
2. Paste `export/import.ts` and every `export/base-<n>.txt` into an empty folder `export/` of the
   workstation. Then, next to it:

```sh
node export/import.ts --from export --to base
node base/scripts/check-base.ts base/code
```

Expected: `Import done: … files written.`, then `Base check passed: … 0 findings.`

## 3. Record the facts first

They decide the next steps. Write them in the results table, then bring them back to the project:
they never go into this repository.

| Fact | How to get it | What it decides |
| --- | --- | --- |
| OpenCode version | `opencode --version` | 1.x: `--opencode 1`; 2.x: `--opencode 2` |
| Open WebUI version | `<instance address>/api/version` | `push.ts` is written for 0.13.3 |
| Context window and maximum output of the model | The model card, or the administrator | The `limit` of the model in the OpenCode configuration of the workstation, never in a project |
| The model calls tools | In OpenCode: "List the files of this folder." | Without tool calls, no skill, no lint loop, no docs server |
| Agent mode | OpenCode lists the agents of `opencode.json` | The agent trials of F17, F18 and F21 |
| apt packages in the dev container | `EXTRACT_TOOLS` left at `"true"` builds or fails | PDF text and OCR (F4) |

## 4. The trial project (once)

```sh
node export/import.ts --from export --to trial --project --opencode 2
```

Use `--opencode 1` for OpenCode 1.x. The project gets `AGENTS.md`, `.agents/`, `docs/`,
`templates/`, the check scripts, `adapters/opencode/`, `adapters/mcp/` and `opencode.json`.

Then prepare its dev container, as part 1 of `f12-conteneurs-dev-containers-et-kubernetes/trial.md`
says: copy `templates/containers/devcontainer/` to `.devcontainer/`, put the check tools and the
Kubernetes schemas in it, set `ASSISTANT_PACKAGE`. Build it. Inside, check:

```sh
node --version
command -v pdftotext tesseract
node scripts/check-base.ts
```

Expected: Node 22.18 or later; two paths, or none if `EXTRACT_TOOLS` is `"false"`; `0 findings`.

Keep a clean copy of `trial/`. The guides of F8 and F9 add their sample project to a copy of it:
skip their part 1 step 1, the import is done.

## 5. The trials, in this order

| Step | Guide | Project criteria | About |
| --- | --- | --- | --- |
| 1 | `f3-le-socle-de-la-base/trial.md`, parts 2 to 4 (skip part 1: use `trial/`) | C2, C5, C6, C28 | 30 min |
| 2 | Part 6 of this file: the OpenCode adapter | C2, C26, C27 | 15 min |
| 3 | `f4-lire-les-fichiers-lourds-sans-les/trial.md`, parts 2 to 5 (skip part 1; the samples: `node ../base/scripts/fixtures.ts samples`) | C17, C18 | 30 min |
| 4 | `f8-lint-et-formatage-typescript-angular/trial.md` | C8, C10 to C13 | 1 h |
| 5 | `f9-analyse-et-formatage-c-net/trial.md` | C9, C10 to C13 | 1 h |
| 6 | `f10-angular-et-typescript-a-la-version/trial.md`, `f11-c-et-net-a-la-version/trial.md` | C14, C24, C25 | 40 min |
| 7 | `f12-conteneurs-dev-containers-et-kubernetes/trial.md`, parts 2 to 4 | C16 | 45 min |
| 8 | `f13-…/trial.md`, `f14-…/trial.md`, `f15-…/trial.md` | C20, C21, C22 | 40 min |
| 9 | `f17-la-simulation-et-l-agent-equipements/trial.md`, `f18-architecture-net-angular-et-revue-de/trial.md`: for "agent mode", call the subagent of `opencode.json` | C19, C26, C27 | 40 min |
| 10 | `f19-lire-du-c-du-c-du/trial.md` | C15 | 20 min |
| 11 | `f6-les-skills-git-et-un-assistant/trial.md` part 2, then `f16-le-profil-chat-dans-open-webui/trial.md`, then `f6-…/trial.md` part 1 in the chat | C29 to C34, C45 | 1 h 30 |
| 12 | Part 7 of this file: the docs server | Decision 0008 | 45 min |
| 13 | `f20-verifier-le-depot-public-et-mesurer/trial.md` part 2: the evaluation, last, as it needs all the rest | C44 | half a day |

## 6. The OpenCode adapter (F21)

In `trial/`, open OpenCode. Ask, one at a time, in a new session each time:

| Ask | Expected |
| --- | --- |
| `Which agents can you call?` | `architecture-review`, `code-review`, `explain-equipment` |
| `Read the file samples/mockup.xd.` (after step 3 made it) | The read tool is refused; the AI loads `read-heavy-file` and runs `extract.ts` |
| Call the agent `code-review` on `src/` of the F8 project, and ask it to fix what it finds | It lists the problems; no file changes (`git status` or a copy comparison) |

## 7. The docs server (F21, decision 0008)

The server is declared in `opencode.json` but off. The base works without it.

1. Check the server alone, without OpenCode, in `trial/`:

```sh
printf '%s\n' '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2025-11-25","capabilities":{},"clientInfo":{"name":"trial","version":"1"}}}' '{"jsonrpc":"2.0","id":2,"method":"tools/call","params":{"name":"search_docs","arguments":{"query":"freeze restore session"}}}' | node adapters/mcp/docs-server.ts
```

   Expected: two JSON lines; the second names `docs/simulation/training-functions.md`.

2. Turn it on: in `opencode.json`, remove `"disabled": true` (OpenCode 2.x) or set `"enabled": true`
   (1.x). Restart OpenCode. Its tools are prefixed with the server name: `docs_search_docs`,
   `docs_read_doc`.
3. Ask these three questions, each in a new session, once with the server off and once on:
   - `Que doit faire un modèle pour supporter le gel et la reprise d'une séance ?`
   - `Quelles propriétés pour une vanne papillon motorisée ?`
   - `Which Kubernetes API versions were removed recently, and what replaces them?`
4. For each run, note: the right document found (yes or no), the tools used, and the tokens of the
   session as OpenCode shows them.
5. Verdict, as decision 0008 says. Keep the server only if all three hold:
   - turning it on took no other step than the line of `opencode.json`;
   - it found the right documents at least as often as the files alone;
   - it used no more tokens.

   Otherwise turn it off again and write "abandoned".

## 8. Results to bring back

Bring back this table, as text, in the project chat. Write nothing real in it: no client name, no
file name of the team, no figure of the infrastructure.

| Step | Result (ok / not ok) | Notes |
| --- | --- | --- |
| Facts: OpenCode version |  |  |
| Facts: Open WebUI version |  |  |
| Facts: context window, maximum output |  |  |
| Facts: tool calls, agent mode |  |  |
| Facts: apt packages in the dev container |  |  |
| 2. Paste and import |  |  |
| 5.1 to 5.13: one line per guide, from its own results table |  |  |
| 6. Agents listed, `.xd` read refused, code review changes no file |  |  |
| 7. Docs server: verdict |  | documents found and tokens, off and on |
