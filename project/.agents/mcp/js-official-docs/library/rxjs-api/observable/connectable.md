# src/internal/observable/connectable

## connectable

```ts
export function connectable<T>(source: ObservableInput<T>, config: ConnectableConfig<T> = DEFAULT_CONFIG): Connectable<T>
```

Creates an observable that multicasts once `connect()` is called on it.

@param source The observable source to make connectable.
@param config The configuration object for `connectable`.
@returns A "connectable" observable, that has a `connect()` method, that you must call to
connect the source to all consumers through the subject provided as the connector.