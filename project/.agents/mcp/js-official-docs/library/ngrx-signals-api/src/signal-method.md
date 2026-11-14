# signals/src/signal-method

## signalMethod

```ts
export function signalMethod<Input>( processingFn: (value: Input)
```

@description

Creates a method for managing side effects with signals.
The method accepts a signal, a computation function, or a static value.

@usageNotes

```ts
import { Component, signal } from '@angular/core';
import { signalMethod } from '@ngrx/signals';

\@Component(...)
export class Counter {
  readonly count = signal(1);
  readonly logDoubledNumber = signalMethod<number>(
    (num) => console.log(num * 2)
  );

  constructor() {
    this.logDoubledNumber(10); // logs: 20

    this.logDoubledNumber(this.count); // logs: 2
    setTimeout(() => this.count.set(2), 1_000); // logs: 4 (after 1s)
  }
}
```