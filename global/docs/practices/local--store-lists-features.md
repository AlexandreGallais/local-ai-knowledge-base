---
id: local--store-lists-features
title: "A store lists features, or is a small store"
topic: practices
summary: "A composed store lists only features of sub-domains; a small store without sub-domain keeps its blocks in one file; never both. At most 15 features in a store, 10 in a signalStoreFeature."
rule: "local/store-lists-features"
sample: angular-app
wrong-file: app/zz-wrong.store.ts
right-file: app/zz-right.store.ts
sources: "[S1] NgRx, Custom Store Features, guide v22; [S2] NgRx, signal-store.ts, the overloads of signalStore"
license: MIT, written for this base
---

# A store lists features, or is a small store

Rule: `local/store-lists-features`. A store is one of two forms:

- a composed store: the store file lists features of sub-domains, each in its `*.feature.ts` file, in the
  order of their types;
- a small store without sub-domain: `withState`, `withComputed`, `withMethods` in one file.

Never both in one store. The rule also counts: 15 features at most in `signalStore`, 10 in
`signalStoreFeature` [S2].

## Why

- In a composed store, a block written in the store file belongs to no sub-domain: nobody finds it.
- Over 15 features, TypeScript gives a wrong message about `config`; over 10 in a
  `signalStoreFeature`, a message about `Partial<SignalStoreFeatureResult>`. Group features instead.

## Wrong

```ts
import { signalStore, withState } from '@ngrx/signals';

import { withUsers } from './users.feature';

export const ZzWrongStore = signalStore(
  { providedIn: 'root' },
  withUsers(),
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

- [S1] NgRx Team, 2026, "Custom Store Features", guide Signals v22: in the library of the base,
  `library/ngrx-signals/`; search "signalStoreFeature" with the docs tools.
- [S2] NgRx Team, 2026, `signal-store.ts` of `@ngrx/signals` 22.0.1: the overloads stop at 15 features.
