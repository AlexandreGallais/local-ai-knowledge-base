# F20 trial

## 1. Before each push to a public repository

1. Write the list of forbidden terms in a local file outside the repository, one term per line:
   every name, figure or detail specific to your organisation that must stay private.
2. Run, from the root of this repository:

   ```sh
   node scripts/check-public.ts . --terms-file <local file>
   ```

3. Expected: `Public check passed`. Any finding names the file or the commit, and the term by its
   number only. A term found in the history needs a rewrite of the history before the next push.

## 2. The evaluation on the workstation

Follow `evaluation/README.md`: two copies of a trial project, ten tasks, four runs each, with
and without the base, in non-interactive mode. Then:

```sh
node scripts/evaluation-summary.ts evaluation/results.csv
```

Expected: `Evaluation passed: better with the base, with no more tokens.` If not, note which tasks
fail with the base and which documents the AI opened: they say what to change in the base.

## Results

| Test | Result | Notes |
| --- | --- | --- |
| Public check with the final list |  |  |
| Evaluation: successes with / without |  |  |
| Evaluation: tokens with / without |  |  |
