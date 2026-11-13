# Evaluation of the base

Does the AI succeed more often with the base than without it, with no more tokens? This folder holds
the task set, the protocol and the record format. Run it on the workstation, with the real model.

## How to run the evaluation

1. Prepare two copies of the same trial project: one with the base at its root (`node import.ts
   --project`), one without.
2. For each task of the set, start a new session of the coding assistant in non-interactive mode,
   with the task text as the prompt, in each copy. Repeat each task the number of runs of the table.
3. After each run, judge success with the check of the task, and note the tokens that the assistant
   reports for the run.
4. Write one line per run in `results.csv` (format below), then run
   `node scripts/evaluation-summary.ts evaluation/results.csv`.

A small team can only see large gaps: about 40 runs per condition are needed to see a gap of
30 points. Start with tasks on APIs and versions that a model does not know well: that is where the
base changes the result.

## Task set

Fake data only. Replace or add real tasks of the team, written without real data.

| Id | Task (prompt) | Success check | Runs |
| --- | --- | --- | --- |
| T1 | Add a standalone Angular component that shows a list of valves with their position, in Angular 22. | `npm run check` and `npm run build` at zero errors; no `standalone: true`, no `*ngFor` | 4 |
| T2 | Add an input `tagName` and an output `selected` to the component, with signals. | Same checks; `input()` and `output()` used | 4 |
| T3 | Add a minimal API endpoint `GET /valves/{tagName}` with typed results and validation, in .NET 10. | `dotnet build` at zero errors; `TypedResults` used | 4 |
| T4 | Log the opening of a valve with a structured message. | `dotnet build` at zero errors (CA2254 on) | 4 |
| T5 | Write the Dockerfile of the API project. | `hadolint` clean; two stages; `USER $APP_UID`; port 8080 | 4 |
| T6 | Write the Deployment and Service of the API, for Kubernetes 1.37. | `kubeconform -strict` and `kube-linter` clean | 4 |
| T7 | Give the properties of a motorized butterfly valve, with their units. | Names from the catalog; each number ends with a suffix of the closed list | 4 |
| T8 | Code the synoptic symbol of a pressure transmitter with its alarm limits. | Lint at zero errors; `highLimitBar` and `lowLimitBar`; badge flashes only when unacknowledged | 4 |
| T9 | Explain this C excerpt (an interrupt handler that clears a register bit). | No invented name; "called by the hardware" said | 4 |
| T10 | Read the requirements in `specs.docx` and list them. | The file is read through `.extract/` only, never raw | 4 |

## Record format

`results.csv`, one line per run:

```text
task,condition,run,success,tokens
T1,with,1,1,18250
T1,without,1,0,22410
```

- `condition`: `with` or `without`.
- `success`: `1` or `0`, from the check of the task.
- `tokens`: the total that the assistant reports for the run.

`results.csv` holds measures of the workstation: keep it out of the public repository unless the team
decides otherwise.
