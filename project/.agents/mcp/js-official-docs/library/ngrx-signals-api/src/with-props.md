# signals/src/with-props

## withProps

```ts
export function withProps< Input extends SignalStoreFeatureResult, Props extends object, >( propsFactory: ( store: Prettify< StateSignals<Input['state']> & Input['props'] & Input['methods'] & WritableStateSource<Input['state']> > )
```

@description

Adds custom properties to a SignalStore.

@usageNotes

```ts
import { toObservable } from '@angular/core/rxjs-interop';
import { signalStore, withProps, withState } from '@ngrx/signals';

export const TodosStore = signalStore(
  withState({ todos: [] as Todo[], isLoading: false }),
  withProps(({ isLoading }) => ({
    isLoading$: toObservable(isLoading),
  }))
);
```