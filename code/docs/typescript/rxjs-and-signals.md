---
id: typescript-rxjs-and-signals
title: RxJS 7 and Angular signals
topic: typescript
summary: RxJS 7 deprecations, the bridge between signals and observables, and when to use each. RxJS 7.
tool: rxjs
version: "7.8"
checked: 2026-11-13
sources: [S1, S2, S3]
license: MIT, written for this base; facts summarized from the RxJS types (Apache 2.0) and the Angular documentation (CC BY 4.0)
variant: files
---

# RxJS 7 and Angular signals

Contents: 1. RxJS stays at 7 · 2. Deprecated in RxJS 7 · 3. Signals and observables · 4. The bridge · Sources

## 1. RxJS stays at 7 (RxJS versions)

The current version is 7.8.2. Version 8 is paused, with no release date: write RxJS 7 code. Angular 16 to 22 accept `^6.5.3 || ^7.4.0`. [S1] [S2]

## 2. Deprecated in RxJS 7 (RxJS 7 deprecations)

| Old pattern | Write instead |
| --- | --- |
| `source$.toPromise()` | `await firstValueFrom(source$)` or `await lastValueFrom(source$)` |
| `subscribe(next, error, complete)` | `subscribe({ next, error, complete })` |
| `Observable.create(…)` | `new Observable(…)` |

[S1]

Wrong:

```ts
const valves = await this.http.get<unknown>('/api/valves').toPromise();
```

Right:

```ts
const valves = await firstValueFrom(this.http.get<unknown>('/api/valves'));
```

## 3. Signals for state, observables for streams (Angular signals and RxJS)

- State of a component, and values derived from it: signals (`signal`, `computed`). [S3]
- Events over time, cancellation, combination of streams (messages, timers, sockets): observables. [S3]
- An observable in a template: the `async` pipe, or `toSignal()` in the component.
- A simple HTTP request, from Angular 22: `httpResource()`. Before 22: `HttpClient`.

## 4. The bridge between signals and observables (rxjs-interop)

| API, from `@angular/core/rxjs-interop` | Role | To know |
| --- | --- | --- |
| `toSignal(obs$, { initialValue })` | Observable to signal | Subscribes at once; needs the injection context, so call it in a field; without `initialValue`, gives `undefined` until the first value |
| `toObservable(signal)` | Signal to observable | Several synchronous writes give one value only |
| `rxResource({ params, stream })` | Resource fed by an observable | Same state signals as `resource` |
| `takeUntilDestroyed()` | End a subscription with the component | Without an argument, only in a field or the constructor |

[S3]

## Sources

- [S1] RxJS, types of the package `rxjs` 7.8.2 (`@deprecated` tags), <https://github.com/ReactiveX/rxjs>, read 2026-11-12, Apache 2.0, summarized.
- [S2] Angular Team, "Version compatibility", v22, <https://angular.dev/reference/versions>, read 2026-11-12, CC BY 4.0, summarized.
- [S3] Angular Team, "RxJS interop with Angular signals", v22, <https://angular.dev/ecosystem/rxjs-interop>, read 2026-11-12, CC BY 4.0, summarized.
