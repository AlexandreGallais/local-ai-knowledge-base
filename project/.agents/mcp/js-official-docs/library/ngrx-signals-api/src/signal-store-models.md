# signals/src/signal-store-models

## SignalStoreFeatureType

```ts
export type SignalStoreFeatureType< Feature extends (...params: never[])
```

@description

Extracts the state and members from a feature factory, allowing
them to be reused as input in another `signalStoreFeature`.

@usageNotes

```ts
function withFeatureA() {
  return signalStoreFeature(withState({ foo: 'bar' }));
}

type FeatureA = SignalStoreFeatureType<typeof withFeatureA>;

function withFeatureB() {
  return signalStoreFeature(
    type<FeatureA>(),
    withMethods(({ foo }) => ({
      logFoo(): void {
        console.log(foo());
      },
    }))
  );
}
```