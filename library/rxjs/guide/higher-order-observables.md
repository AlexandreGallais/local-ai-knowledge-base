---
title: "Higher-order Observables"
tool: "rxjs"
version: "7.8"
source: "https://github.com/ReactiveX/rxjs/blob/e5351d02e225e275ac0e497c7b66eaa5f0c88791/docs_app/content/guide/higher-order-observables.md"
commit: "e5351d02e225e275ac0e497c7b66eaa5f0c88791"
license: "Apache-2.0"
---

# Higher-order Observables

Observables most commonly emit ordinary values like strings and numbers, but surprisingly often, it is necessary to handle Observables *of* Observables, so-called higher-order Observables. For example, imagine you have an Observable emitting strings that are the URLs of files you want to fetch. The code might look like this:

```ts
const fileObservable = urlObservable.pipe(
   map(url => http.get(url)),
);
```

`http.get()` returns an Observable for each URL. Now you have an Observable *of* Observables, a higher-order Observable.

But how do you work with a higher-order Observable? Typically, by _flattening_: by converting a higher-order Observable into an ordinary Observable. For example:

```ts
const fileObservable = urlObservable.pipe(
   concatMap(url => http.get(url)),
);
```

The Observable returned in the `concatMap` function is usually referred to as a so-called "inner" Observable, while in this context the `urlObservable` is the so-called "outer" Observable.

The `concatMap()` operator subscribes to each "inner" Observable, buffers all further emissions of the "outer" Observable, and copies all the emitted values until the inner Observable completes, and continues processing the values of the "outer Observable". All of the values are in that way concatenated.  Other useful flattening operators are

* `mergeMap()` — subscribes to each inner Observable as it arrives, then emits each value as it arrives
* `switchMap()` — subscribes to the first inner Observable when it arrives, and emits each value as it arrives, but when the next inner Observable arrives, unsubscribes to the previous one, and subscribes to the new one.
* `exhaustMap()` — subscribes to the first inner Observable when it arrives, and emits each value as it arrives, discarding all newly arriving inner Observables until that first one completes, then waits for the next inner Observable.
