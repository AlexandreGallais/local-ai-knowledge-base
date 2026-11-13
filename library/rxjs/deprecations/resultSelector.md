---
title: "ResultSelector Parameter"
tool: "rxjs"
version: "7.8"
source: "https://github.com/ReactiveX/rxjs/blob/e5351d02e225e275ac0e497c7b66eaa5f0c88791/docs_app/content/deprecations/resultSelector.md"
commit: "e5351d02e225e275ac0e497c7b66eaa5f0c88791"
license: "Apache-2.0"
---

# ResultSelector Parameter

Some operator supported a resultSelector argument that acted as mapping function on the result of that operator.
The same behavior can be reproduced with the `map` operator, therefore this argument became deprecated.

        This deprecation was introduced in RxJS 6.0 and will become breaking with RxJS 8.

There were two reasons for actually deprecating those parameters:

1. It increases the bundle size of every operator
2. In some scenarios values had to be retained in memory causing a general memory pressure

## Operators affected by this Change

- concatMap
- concatMapTo
- exhaustMap
- mergeMap
- mergeMapTo
- switchMap
- swithMapTo

## How to Refactor

Instead of using the `resultSelector` Argument, you can leverage the `map` operator on the inner Observable:

```ts
import { fromEvent, switchMap, interval, map } from 'rxjs';

// deprecated
fromEvent(document, 'click').pipe(
  switchMap((x) => interval(1000), (_, x) => x + 1)
);
// suggested change
fromEvent(document, 'click').pipe(
  switchMap((x) => interval(1000).pipe(map((x) => x + 1)))
);
```
