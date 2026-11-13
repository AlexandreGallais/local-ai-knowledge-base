# Evaluation of the base

Does a local model succeed more often with the base 0.2 than with the base 0.1 and than without a base,
with no more tokens per run? Ten front-end tasks answer it, played with OpenCode without interaction.

## Files

- `tasks/<id>/task.md`: the request sent word for word, the starting project, the size, the proof.
- `tasks/<id>/proof.spec.ts`: the proof test, copied into the project only after the run.
- `projects/`: the starting projects (`angular-app`, `ts-lib`, `ts-pure-lib`) and the packages they use.
- `run.ts`: plays the tasks for one condition and appends one JSON line per run to `results.jsonl`.
- `summary.ts`: sums up one or more result files into two short tables and a verdict.

## The tasks

| Id | Size | Project | Result asked |
| --- | --- | --- | --- |
| t01 | small | ts-pure-lib | A linear interpolation function |
| t02 | small | ts-pure-lib | Rounding to decimals as a person expects it |
| t03 | medium | ts-pure-lib | Points at equal distance on a circle |
| t04 | small | ts-pure-lib | A value of one range shown on another |
| t05 | small | ts-lib | A flow rate written for a display |
| t06 | medium | ts-lib | The properties of a motor-operated valve |
| t07 | small | angular-app | A badge component with signal inputs and an output |
| t08 | medium | angular-app | An accessible select box made in-house |
| t09 | medium | angular-app | A store of two sub-domains, one feature per file |
| t10 | large | angular-app | A page of valves with a filter and its store |

## A run succeeds when

1. the format pass of the profile runs, then its lint pass ends with 0 errors;
2. the proof test is copied in, and the project compiles;
3. the proof test passes.

The data of every task is invented. The starting projects are the samples of the base.

## How to play it

See `guides/run-evaluation.md` of the repository of the base. In short:

```sh
cp -r /opt/local-ai-base/evaluation/projects ~/evaluation-projects   # the base is read-only
npm install --prefix ~/evaluation-projects                            # once, agreed by the team
node /opt/local-ai-base/evaluation/run.ts --condition 0.2 --projects ~/evaluation-projects --runs 3 --out results-0.2.jsonl
node /opt/local-ai-base/evaluation/summary.ts results-none.jsonl results-0.1.jsonl results-0.2.jsonl
```

Each run works in a new folder `~/evaluation-projects/zz-run-<task>-<condition>-<n>/`, kept for reading.
