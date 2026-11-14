# core/src/transfer_state

## StateKey

```ts
export type StateKey<T> = string &
```

A type-safe key to use with `TransferState`.

Example:

```ts
const COUNTER_KEY = makeStateKey<number>('counter');
let value = 10;

transferState.set(COUNTER_KEY, value);
```

@publicApi

## makeStateKey

```ts
export function makeStateKey<T = void>(key: string): StateKey<T>
```

Create a `StateKey<T>` that can be used to store value of type T with `TransferState`.

Example:

```ts
const COUNTER_KEY = makeStateKey<number>('counter');
let value = 10;

transferState.set(COUNTER_KEY, value);
```

@publicApi

## TransferState

```ts
export class TransferState
```

A key value store that is transferred from the application on the server side to the application
on the client side.

The `TransferState` is available as an injectable token.
On the client, just inject this token using DI and use it, it will be lazily initialized.

The values in the store are serialized/deserialized using JSON.stringify/JSON.parse. So only
boolean, number, string, null and non-class objects will be serialized and deserialized in a
non-lossy manner.

@publicApi

## TransferState.get

```ts
get<T>(key: StateKey<T>, defaultValue: T): T
```

Get the value corresponding to a key. Return `defaultValue` if key is not found.

## TransferState.set

```ts
set<T>(key: StateKey<T>, value: T): void
```

Set the value corresponding to a key.

## TransferState.remove

```ts
remove<T>(key: StateKey<T>): void
```

Remove a key from the store.

## TransferState.hasKey

```ts
hasKey<T>(key: StateKey<T>): boolean
```

Test whether a key exists in the store.

## TransferState.isEmpty

```ts
get isEmpty(): boolean
```

Indicates whether the state is empty.

## TransferState.onSerialize

```ts
onSerialize<T>(key: StateKey<T>, callback: ()
```

Register a callback to provide the value for a key when `toJson` is called.

## TransferState.toJson

```ts
toJson(): string
```

Serialize the current state of the store to JSON.