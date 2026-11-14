# core/src/change_detection/differs/keyvalue_differs

## KeyValueDiffer

```ts
export interface KeyValueDiffer<K, V>
```

A differ that tracks changes made to an object over time.

@publicApi

## KeyValueDiffer.diff

```ts
diff(object: Map<K, V>): KeyValueChanges<K, V> | null
```

Compute a difference between the previous state and the new `object` state.

@param object containing the new value.
@returns an object describing the difference. The return value is only valid until the next
`diff()` invocation.

## KeyValueDiffer.diff

```ts
diff(object: {[key: string]: V}): KeyValueChanges<string, V> | null
```

Compute a difference between the previous state and the new `object` state.

@param object containing the new value.
@returns an object describing the difference. The return value is only valid until the next
`diff()` invocation.

## KeyValueChanges

```ts
export interface KeyValueChanges<K, V>
```

An object describing the changes in the `Map` or `{[k:string]: string}` since last time
`KeyValueDiffer#diff()` was invoked.

@publicApi

## KeyValueChanges.forEachItem

```ts
forEachItem(fn: (r: KeyValueChangeRecord<K, V>)
```

Iterate over all changes. `KeyValueChangeRecord` will contain information about changes
to each item.

## KeyValueChanges.forEachPreviousItem

```ts
forEachPreviousItem(fn: (r: KeyValueChangeRecord<K, V>)
```

Iterate over changes in the order of original Map showing where the original items
have moved.

## KeyValueChanges.forEachChangedItem

```ts
forEachChangedItem(fn: (r: KeyValueChangeRecord<K, V>)
```

Iterate over all keys for which values have changed.

## KeyValueChanges.forEachAddedItem

```ts
forEachAddedItem(fn: (r: KeyValueChangeRecord<K, V>)
```

Iterate over all added items.

## KeyValueChanges.forEachRemovedItem

```ts
forEachRemovedItem(fn: (r: KeyValueChangeRecord<K, V>)
```

Iterate over all removed items.

## KeyValueChangeRecord

```ts
export interface KeyValueChangeRecord<K, V>
```

Record representing the item change information.

@publicApi

## KeyValueChangeRecord.key

```ts
readonly key: K
```

Current key in the Map.

## KeyValueChangeRecord.currentValue

```ts
readonly currentValue: V | null
```

Current value for the key or `null` if removed.

## KeyValueChangeRecord.previousValue

```ts
readonly previousValue: V | null
```

Previous value for the key or `null` if added.

## KeyValueDifferFactory

```ts
export interface KeyValueDifferFactory
```

Provides a factory for {@link KeyValueDiffer}.

@publicApi

## KeyValueDifferFactory.supports

```ts
supports(objects: any): boolean
```

Test to see if the differ knows how to diff this kind of object.

## KeyValueDifferFactory.create

```ts
create<K, V>(): KeyValueDiffer<K, V>
```

Create a `KeyValueDiffer`.

## KeyValueDiffers

```ts
export class KeyValueDiffers
```

A repository of different Map diffing strategies used by NgClass, NgStyle, and others.

@publicApi

## KeyValueDiffers.extend

```ts
static extend(factories: KeyValueDifferFactory[]): StaticProvider
```

Takes an array of {@link KeyValueDifferFactory} and returns a provider used to extend the
inherited {@link KeyValueDiffers} instance with the provided factories and return a new
{@link KeyValueDiffers} instance.

@usageNotes
### Example

The following example shows how to extend an existing list of factories,
which will only be applied to the injector for this component and its children.
This step is all that's required to make a new {@link KeyValueDiffer} available.

```ts
@Component({
  viewProviders: [
    KeyValueDiffers.extend([new ImmutableMapDiffer()])
  ]
})
```