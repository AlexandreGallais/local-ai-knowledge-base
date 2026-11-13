# F8 trial on the workstation

What to play on the workstation, in the dev container, for the two criteria of F8 that only a
person can see:

- C12: on 5 test tasks, the code the AI writes without running the lint passes `npm run check`.
- C13: after writing code, the AI runs `npm run fix` and `npm run check` by itself and fixes every
  error.

About one hour. Fill the results table at the end.

## 1. Build the trial project

1. Import the base into an empty folder `ts-trial/` with `node import.ts --project` (F7).
2. Copy into `ts-trial/` the example project of the repository: `samples/typescript-angular/`
   (`package.json`, `package-lock.json`, `src/`), and the four files of
   `templates/typescript-angular/` (`eslint.config.mjs`, `eslint.strict-format.mjs`,
   `.prettierrc.json`, `tsconfig.json`).
3. Run `npm ci`, then `npm run fix` and `npm run check`. Expected: no error.
4. Add the types the tasks use, in `src/app/pumps/pump.ts`:

```ts
export interface Pump {
  readonly id: string;
  readonly label: string;
  readonly running: boolean;
}
```

5. Keep a clean copy of `ts-trial/`. Start each run from it.

## 2. The five tasks (C12)

For each task: a new session, the text below alone, no other instruction. Each text ends with "Do
not run any command." Then, yourself: `npm run fix`, `npm run check`, `npm run build`. Note the exit
code of `check`, and the rule names it lists.

Play each task twice: with the base (as built above), and without it (delete `AGENTS.md`,
`.agents/` and `docs/` from the copy).

### Task 1 · Typed HTTP service

> Create `src/app/valves/valve-store.ts`. Export an injectable service `ValveStore` with one method
> `countOpen()`. It calls `GET /api/valves` with `HttpClient` and returns `Promise<number>`, the
> number of open valves. The response body is unknown JSON: check its shape with `isValve` from
> `src/app/valves/valve.ts`. Throw an `Error` when the shape is wrong. Do not run any command.

### Task 2 · Signal component

> Create `src/app/valves/valve-summary.ts` with an inline template. The component `ValveSummary`
> has a required input `valves`, an array of `Valve`, and an output `selected` that emits the valve
> id when the user chooses a valve. Show each valve label in a list, with the CSS class `fault` on a
> valve whose state is 'fault'. Show "No valve" when the list is empty. Do not run any command.

### Task 3 · Rewrite an old component

> Rewrite this component for Angular 22, in `src/app/pumps/pump-panel.ts` with an inline template.
> Keep its behaviour. Do not run any command.
>
> ```ts
> @Component({ selector: 'pump-panel', templateUrl: './pump-panel.component.html', standalone: false })
> export class PumpPanelComponent implements OnInit {
>   @Input() pump: any;
>   @Output() onStop = new EventEmitter<string>();
>   constructor(private http: HttpClient) {}
>   async ngOnInit() { this.pump = await firstValueFrom(this.http.get('/api/pump')); }
>   @HostListener('window:keydown.escape') stop() { this.onStop.emit(this.pump.id); }
> }
> ```
>
> Template: `<div *ngIf="pump" [ngClass]="{ running: pump.running }"><span>{{ pump.label }}</span><button (click)="stop()">Stop</button></div>`

### Task 4 · Save, navigate, end a stream

> Create `src/app/pumps/pump-editor.ts` with an inline template. The component `PumpEditor` saves a
> pump with `HttpClient` (`PUT /api/pumps/:id`), then goes to the route `/pumps` with `Router`.
> When the save fails, it shows the error message from a signal and stays on the page. It also shows
> the last message of an `Observable<string>` named `messages$` of a service `PumpFeed` that you
> create, and ends that subscription when the component is destroyed. Do not run any command.

### Task 5 · Pure function, index and union

> Create `src/app/sensors/sensor-summary.ts`. Export the type `Reading`, a union of
> `{ kind: 'pressure'; bar: number }`, `{ kind: 'temperature'; celsius: number }` and
> `{ kind: 'level'; percent: number; tank?: string }`. Export
> `summarize(readings: readonly Reading[]): string`, one line per reading such as
> `pressure 2.5 bar`, with the tank name of a level reading when it exists, and `no reading` for an
> empty array. Export `first(readings: readonly Reading[])`, the first reading or `undefined`.
> Do not run any command.

## 3. The AI runs the lint by itself (C13)

In a new session on a clean copy, ask task 2 again, without the last sentence "Do not run any
command." Expected in the trace: `npm run fix`, then `npm run check`, then a fix of each error, then
`npm run check` again with no error, and `npm run build`.

## Results

Write the version of the assistant, the model if known, and the date.

| Task | With the base: check exit code, rules listed | Without the base: check exit code, rules listed |
| --- | --- | --- |
| 1 |  |  |
| 2 |  |  |
| 3 |  |  |
| 4 |  |  |
| 5 |  |  |

| C13 | Result (ok / not ok) | Notes |
| --- | --- | --- |
| The AI ran fix, check and build by itself, until zero errors |  |  |
