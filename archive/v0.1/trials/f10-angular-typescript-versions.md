# F10 trial on the workstation

What to play on the workstation for the criterion of F10 that only a person can see: on a test task
in an Angular project, the AI reads the version in `package.json` and writes code at that version.
About 20 minutes.

## 1. Two projects

Use the trial project of F8 (`ts-trial/`, Angular 22). Make a copy `ts-trial-19/` and, in its
`package.json`, set `@angular/core`, `@angular/common`, `@angular/compiler` and `@angular/router` to
`19.2.0`. Do not install it: the AI only reads the version.

## 2. The task

In a new session in each folder, ask:

> Create `src/app/pumps/pump-store.ts`: a service that loads the pumps from `GET /api/pumps` and
> keeps them in a signal. Then create `src/app/pumps/pump-list.ts`, a component that shows them.
> Do not run any command.

Expected:

| Folder | The service | The component |
| --- | --- | --- |
| `ts-trial/` (Angular 22) | `@Service()`, `inject(HttpClient)`, or `httpResource()` | no `standalone`, no `changeDetection`, `@for`, `input()` |
| `ts-trial-19/` (Angular 19) | `@Injectable({ providedIn: 'root' })`, `inject(HttpClient)`, no `@Service()`, no `httpResource()` | no `standalone`, `@for`, `input()` |

In the trace, the AI reads `package.json` before it writes, and opens `docs/angular/old-to-new.md`.

## 3. The version check

```sh
node scripts/check-versions.ts ts-trial
```

Expected: `Versions check passed: no document is behind the project.` Then set `@angular/core` to
`^23.0.0` in a copy and run it again: it lists the two documents of `docs/angular/`.

## Results

| Test | Result (ok / not ok) | Notes |
| --- | --- | --- |
| Angular 22: version read, code at 22 |  |  |
| Angular 19: version read, no API of 20 or later |  |  |
| Version check on the trial project |  |  |
