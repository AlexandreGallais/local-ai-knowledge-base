---
title: "Array Arguments"
tool: "rxjs"
version: "7.8"
source: "https://github.com/ReactiveX/rxjs/blob/e5351d02e225e275ac0e497c7b66eaa5f0c88791/docs_app/content/deprecations/array-argument.md"
commit: "e5351d02e225e275ac0e497c7b66eaa5f0c88791"
license: "Apache-2.0"
---

# Array Arguments

To unify the API surface of `forkJoin` and `combineLatest` we deprecated some signatures.
Since that it is recommended to either pass an Object or an Array to these operators.

        This deprecation was introduced in RxJS 6.5.

## Operators affected by this Change

- combineLatest
- forkJoin

## How to Refactor

We deprecated the signatures, where just pass all Observables directly as parameters to these operators.

```ts
import {forkJoin, from} from 'rxjs';

const odd$ = from([1,3,5]);
const even$ = from([2,4,6]);

// deprecated
forkJoin(odd$, even$);
// suggested change
forkJoin([odd$, even$]);
// or
forkJoin({odd: odd$, even: even$})
```
