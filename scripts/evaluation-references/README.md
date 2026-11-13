# Reference solutions of the evaluation tasks

One folder per task of `global/evaluation/tasks/`. They are never exported: the AI under evaluation must
not find them. `scripts/evaluation.test.ts` copies each one in the starting project of its task, then runs
the proof of the task: the proof must pass on the reference and fail on the starting project.

- `copy.json`: files of the base copied into the project, as `"destination": "source"`, both relative
  (the destination to the project, the source to the repository).
- `files/`: files written for the task, at their place in the project.
