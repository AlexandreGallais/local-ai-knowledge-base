# signals/src/with-feature

## withFeature

```ts
export function withFeature< Input extends SignalStoreFeatureResult, Output extends SignalStoreFeatureResult, >( featureFactory: ( store: Prettify< StateSignals<Input['state']> & Input['props'] & Input['methods'] & WritableStateSource<Input['state']> > )
```

@description

Allows passing state signals, properties, and methods from a SignalStore
instance to a custom feature.

@usageNotes

```ts
import { signalStore, withFeature, withMethods } from '@ngrx/signals';

export const UserStore = signalStore(
  withMethods((store) => ({
    loadById(id: number): Promise<User> {
      return Promise.resolve({ id, name: 'John' });
    },
  })),
  withFeature(
    // 👇 Has full access to store members.
    (store) => withEntityLoader((id) => store.loadById(id))
  )
);
```