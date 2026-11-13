---
id: local--store-lists-features
title: "A composed store only lists features"
topic: practices
summary: "The store file calls signalStore with features only; state, computed and methods live in feature files."
rule: "local/store-lists-features"
sample: angular-app
wrong-file: app/zz-wrong.store.ts
right-file: app/zz-right.store.ts
sources: "[S1] The official page of the rule, in the library of the base"
license: MIT, written for this base
---

# A composed store only lists features

Rule: `local/store-lists-features`. The store file calls signalStore with features only; state, computed and methods live in feature files.

## Why

Each sub-domain lives in its feature file, in the order of their types; the store file stays a list a person reads at once.

## Wrong

```ts
import { signalStore, withState } from '@ngrx/signals';

export const ZzWrongStore = signalStore(
  { providedIn: 'root' },
  withState({ count: 0 }),
);
```

## Right

```ts
import { signalStore } from '@ngrx/signals';

import { withUsers } from './users.feature';

export const ZzRightStore = signalStore(
  { providedIn: 'root' },
  withUsers(),
);
```

## Sources

- [S1] The official page of the rule: call the rule tool of the practices server, or search it with the docs tools.
