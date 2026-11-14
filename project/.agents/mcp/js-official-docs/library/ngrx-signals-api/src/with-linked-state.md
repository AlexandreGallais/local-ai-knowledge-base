# signals/src/with-linked-state

## withLinkedState

```ts
export function withLinkedState< State extends Record< string | symbol, WritableSignal<unknown> | (()
```

@description

Adds linked state slices to a SignalStore.
Accepts a factory function that returns a dictionary of linked signals or
computation functions.

@usageNotes

### Using a computation function

```ts
import { signalStore, withLinkedState, withState } from '@ngrx/signals';

export const OptionsStore = signalStore(
  withState({ options: [1, 2, 3] }),
  withLinkedState(({ options }) => ({
    selectedOption: () => options()[0],
  }))
);
```

### Using linkedSignal for advanced use cases

```ts
import { linkedSignal } from '@angular/core';
import { signalStore, withLinkedState, withState } from '@ngrx/signals';

type Option = { id: number; label: string };

export const OptionsStore = signalStore(
  withState({ options: [] as Option[] }),
  withLinkedState(({ options }) => ({
    selectedOption: linkedSignal<Option[], Option>({
      source: options,
      computation: (newOptions, previous) => {
        const option = newOptions.find((o) => o.id === previous?.value.id);
        return option ?? newOptions[0];
      },
    }),
  }))
)
```