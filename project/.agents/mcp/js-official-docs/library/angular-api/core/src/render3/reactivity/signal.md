# core/src/render3/reactivity/signal

## WritableSignal

```ts
export interface WritableSignal<T> extends Signal<T>
```

A `Signal` with a value that can be mutated via a setter interface.

@publicApi 17.0

## WritableSignal.set

```ts
set(value: T): void
```

Directly set the signal to a new value, and notify any dependents.

## WritableSignal.update

```ts
update(updateFn: (value: T)
```

Update the value of the signal based on its current value, and
notify any dependents.

## WritableSignal.asReadonly

```ts
asReadonly(): Signal<T>
```

Returns a readonly version of this signal. Readonly signals can be accessed to read their value
but can't be changed using set or update methods. The readonly signals do _not_ have
any built-in mechanism that would prevent deep-mutation of their value.