# Run the evaluation on the workstation

The same ten tasks, played in three conditions: without a base, with the base 0.1, with the base 0.2.
The result says whether the 0.2 succeeds more often, with no more tokens per run. Plan half a day: one
condition is about ten runs of 5 to 30 minutes each.

## Before

- OpenCode 2.2.7 and the model of the team, its window declared (`guides/install.md`, part 4).
- The packages of the starting projects, installed once with the agreement of the team:

```sh
cp -r /opt/local-ai-base/evaluation/projects ~/evaluation-projects
npm install --prefix ~/evaluation-projects
```

- One result file per condition; keep them on the workstation.

## 1. Without a base

Use a dev container where `/opt/local-ai-base` is mounted but `/etc/opencode` is not, and where the user
configuration of OpenCode allows file edits. The proof still uses the tools of the base, after the run.

```sh
node /opt/local-ai-base/evaluation/run.ts --condition none --projects ~/evaluation-projects --out ~/results-none.jsonl
```

## 2. With the base 0.1

Paste the export of the 0.1 and unpack its project files in a folder, for example `~/base-0.1/`. Then:

```sh
node /opt/local-ai-base/evaluation/run.ts --condition 0.1 --kit ~/base-0.1 --projects ~/evaluation-projects --out ~/results-0.1.jsonl
```

`--kit` copies that folder into each starting project before the run.

## 3. With the base 0.2

The usual dev container, with `/opt/local-ai-base` and `/etc/opencode` mounted. The project kit is the
`AGENTS.md` and `.agents/` of `import-project.ts`; unpack it once in `~/kit-0.2/`.

```sh
node /opt/local-ai-base/evaluation/run.ts --condition 0.2 --kit ~/kit-0.2 --projects ~/evaluation-projects --out ~/results-0.2.jsonl
```

## 4. Read the result

```sh
node /opt/local-ai-base/evaluation/summary.ts ~/results-none.jsonl ~/results-0.1.jsonl ~/results-0.2.jsonl
```

- [ ] Successes per condition, tokens per run, and the line of each task.
- [ ] The verdict line.
- [ ] For a failed run: its `failedStep` in the result file, and its folder `zz-run-<task>-<condition>-<n>`.

## Notes

- Without `--opencode-arg --auto`, every action that asks for an agreement is refused during the run:
  that is wanted, nothing is installed. Add the argument only if the team agrees.
- One run per task gives a first view; three runs per task and per condition give a steadier one. A gap of
  30 points needs about 40 runs per condition to be sure.
- The data of the tasks is invented; never replace it with real data in a result you share.

## What to send back

The three result files and the output of `summary.ts`. They give the figures of the report of version
0.2.
