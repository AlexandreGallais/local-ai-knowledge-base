---
id: typescript-lint-angular-rxjs
title: Angular and RxJS
topic: typescript-lint
summary: Rules to end subscriptions with the component and to turn streams into signals. Angular 22, RxJS 7.
tool: angular-eslint
version: "22.6"
checked: 2026-11-13
sources: [S1, S2]
license: MIT, examples written for this base
variant: files
---

# Angular and RxJS

Contents: 1. Streams as signals · 2. takeUntilDestroyed · 3. Pitfalls · Sources

## 1. Turn a stream into a signal (angular-eslint no-implicit-take-until-destroyed)

To show the last value of a stream, use `toSignal()` in a field. It ends the subscription with the component. [S2]

Why: `takeUntilDestroyed()` without an argument works only during the creation of the component. Called in `ngOnInit` or in a method, it throws an error.

Wrong:

```ts
@Component({ selector: 'app-alarm-banner', template: '{{ last() }}' })
export class AlarmBanner implements OnInit {
  protected readonly last = signal('');
  private readonly alarms = inject(AlarmFeed);

  public ngOnInit(): void {
    this.alarms.messages$.pipe(takeUntilDestroyed()).subscribe((message) => {
      this.last.set(message);
    });
  }
}
```

Right:

```ts
@Component({ selector: 'app-alarm-banner', template: '{{ last() }}' })
export class AlarmBanner {
  private readonly alarms = inject(AlarmFeed);
  protected readonly last = toSignal(this.alarms.messages$, { initialValue: '' });
}
```

## 2. Subscribe in a field when you must (angular-eslint no-implicit-take-until-destroyed)

When a stream must run code, subscribe while the component is created: in a field or the constructor, with `takeUntilDestroyed()`. [S1] [S2]

Wrong:

```ts
@Component({ selector: 'app-alarm-sound', template: '' })
export class AlarmSound {
  private readonly alarms = inject(AlarmFeed);

  public start(): void {
    this.alarms.messages$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.ring();
    });
  }

  private ring(): void {
    this.rang.set(true);
  }

  private readonly rang = signal(false);
}
```

Right:

```ts
@Component({ selector: 'app-alarm-sound', template: '' })
export class AlarmSound {
  private readonly alarms = inject(AlarmFeed);
  private readonly rang = signal(false);

  public constructor() {
    this.alarms.messages$.pipe(takeUntilDestroyed()).subscribe(() => {
      this.rang.set(true);
    });
  }
}
```

## 3. Pitfalls (RxJS in Angular)

- A `subscribe()` inside another `subscribe()`: no lint rule catches it. Chain the streams with `switchMap` instead.
- `toPromise()` is deprecated in RxJS 7: use `firstValueFrom()` or `lastValueFrom()`.
- Keep state in signals; keep streams for events that happen over time (messages, timers, sockets).

## Sources

- [S1] angular-eslint, "no-implicit-take-until-destroyed", version 22.6, <https://github.com/angular-eslint/angular-eslint/blob/main/packages/eslint-plugin/docs/rules/no-implicit-take-until-destroyed.md>, read 2026-11-13, MIT, summarized.
- [S2] Google, "RxJS interop with Angular signals", Angular 22, <https://angular.dev/ecosystem/rxjs-interop>, read 2026-11-13, CC BY 4.0, summarized.
