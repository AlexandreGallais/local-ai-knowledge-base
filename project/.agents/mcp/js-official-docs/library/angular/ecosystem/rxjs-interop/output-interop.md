---
title: "RxJS interop with component and directive outputs"
tool: "angular"
version: "22.2"
source: "https://github.com/angular/angular/blob/dda2d41d948380d63619d597c9815db0aa77fd1d/adev/src/content/ecosystem/rxjs-interop/output-interop.md"
commit: "dda2d41d948380d63619d597c9815db0aa77fd1d"
license: "CC-BY-4.0"
---

# RxJS interop with component and directive outputs

TIP: This guide assumes you're familiar with component and directive outputs.

The `@angular/core/rxjs-interop` package offers two APIs related to component and directive outputs.

## Creating an output based on an RxJS Observable

The `outputFromObservable` lets you create a component or directive output that emits based on an RxJS observable:

```ts
import {Directive} from '@angular/core';
import {outputFromObservable} from '@angular/core/rxjs-interop';
import {Observable} from 'rxjs';

@Directive(/* ... */)
class Draggable {
  pointerMoves$: Observable<PointerMovements> = listenToPointerMoves();

  // Whenever `pointerMoves$` emits, the `pointerMove` event fires.
  pointerMove = outputFromObservable(this.pointerMoves$);
}
```

The `outputFromObservable` function has special meaning to the Angular compiler. **You may only call `outputFromObservable` in component and directive property initializers.**

When you `subscribe` to the output, Angular automatically forwards the subscription to the underlying observable. Angular stops forwarding values when the component or directive is destroyed.

HELPFUL: Consider using `output()` directly if you can emit values imperatively.

## Creating an RxJS Observable from a component or directive output

The `outputToObservable` function lets you create an RxJS observable from a component output.

```ts
import {outputToObservable} from '@angular/core/rxjs-interop';
import {Component, output} from '@angular/core';

@Component(/*...*/)
class CustomSlider {
    valueChange = output<number>();
}

// Instance reference to `CustomSlider`.
const slider: CustomSlider = createSlider();

outputToObservable(slider.valueChange) // Observable<number>
    .pipe(...)
    .subscribe(...);
```

HELPFUL: Consider using the `subscribe` method on `OutputRef` directly if it meets your needs.
