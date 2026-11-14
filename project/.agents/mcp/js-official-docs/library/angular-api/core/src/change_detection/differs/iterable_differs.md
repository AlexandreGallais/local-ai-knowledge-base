# core/src/change_detection/differs/iterable_differs

## NgIterable

```ts
export type NgIterable<T> = Array<T> | Iterable<T>
```

A type describing supported iterable types.

@publicApi

## IterableDiffer

```ts
export interface IterableDiffer<V>
```

A strategy for tracking changes over time to an iterable. Used by {@link /api/common/NgForOf NgForOf} to
respond to changes in an iterable by effecting equivalent changes in the DOM.

@publicApi

## IterableDiffer.diff

```ts
diff(object: NgIterable<V> | undefined | null): IterableChanges<V> | null
```

Compute a difference between the previous state and the new `object` state.

@param object containing the new value.
@returns an object describing the difference. The return value is only valid until the next
`diff()` invocation.

## IterableChanges

```ts
export interface IterableChanges<V>
```

An object describing the changes in the `Iterable` collection since last time
`IterableDiffer#diff()` was invoked.

@publicApi

## IterableChanges.forEachItem

```ts
forEachItem(fn: (record: IterableChangeRecord<V>)
```

Iterate over all changes. `IterableChangeRecord` will contain information about changes
to each item.

## IterableChanges.forEachOperation

```ts
forEachOperation( fn: ( record: IterableChangeRecord<V>, previousIndex: number | null, currentIndex: number | null, )
```

Iterate over a set of operations which when applied to the original `Iterable` will produce the
new `Iterable`.

NOTE: These are not necessarily the actual operations which were applied to the original
`Iterable`, rather these are a set of computed operations which may not be the same as the
ones applied.

@param record A change which needs to be applied
@param previousIndex The `IterableChangeRecord#previousIndex` of the `record` refers to the
       original `Iterable` location, where as `previousIndex` refers to the transient location
       of the item, after applying the operations up to this point.
@param currentIndex The `IterableChangeRecord#currentIndex` of the `record` refers to the
       original `Iterable` location, where as `currentIndex` refers to the transient location
       of the item, after applying the operations up to this point.

## IterableChanges.forEachPreviousItem

```ts
forEachPreviousItem(fn: (record: IterableChangeRecord<V>)
```

Iterate over changes in the order of original `Iterable` showing where the original items
have moved.

## IterableChanges.forEachAddedItem

```ts
forEachAddedItem(fn: (record: IterableChangeRecord<V>)
```

Iterate over all added items.

## IterableChanges.forEachMovedItem

```ts
forEachMovedItem(fn: (record: IterableChangeRecord<V>)
```

Iterate over all moved items.

## IterableChanges.forEachRemovedItem

```ts
forEachRemovedItem(fn: (record: IterableChangeRecord<V>)
```

Iterate over all removed items.

## IterableChanges.forEachIdentityChange

```ts
forEachIdentityChange(fn: (record: IterableChangeRecord<V>)
```

Iterate over all items which had their identity (as computed by the `TrackByFunction`)
changed.

## IterableChangeRecord

```ts
export interface IterableChangeRecord<V>
```

Record representing the item change information.

@publicApi

## IterableChangeRecord.currentIndex

```ts
readonly currentIndex: number | null
```

Current index of the item in `Iterable` or null if removed.

## IterableChangeRecord.previousIndex

```ts
readonly previousIndex: number | null
```

Previous index of the item in `Iterable` or null if added.

## IterableChangeRecord.item

```ts
readonly item: V
```

The item.

## IterableChangeRecord.trackById

```ts
readonly trackById: any
```

Track by identity as computed by the `TrackByFunction`.

## TrackByFunction

```ts
export interface TrackByFunction<T>
```

A function optionally passed into the `NgForOf` directive to customize how `NgForOf` uniquely
identifies items in an iterable.

`NgForOf` needs to uniquely identify items in the iterable to correctly perform DOM updates
when items in the iterable are reordered, new items are added, or existing items are removed.


In all of these scenarios it is usually desirable to only update the DOM elements associated
with the items affected by the change. This behavior is important to:

- preserve any DOM-specific UI state (like cursor position, focus, text selection) when the
  iterable is modified
- enable animation of item addition, removal, and iterable reordering
- preserve the value of the `<select>` element when nested `<option>` elements are dynamically
  populated using `NgForOf` and the bound iterable is updated

A common use for custom `trackBy` functions is when the model that `NgForOf` iterates over
contains a property with a unique identifier. For example, given a model:

```ts
class User {
  id: number;
  name: string;
  ...
}
```
a custom `trackBy` function could look like the following:
```ts
function userTrackBy(index, user) {
  return user.id;
}
```

A custom `trackBy` function must have several properties:

- be [idempotent](https://en.wikipedia.org/wiki/Idempotence) (be without side effects, and always
return the same value for a given input)
- return unique value for all unique inputs
- be fast

@see [`NgForOf#ngForTrackBy`](api/common/NgForOf#ngForTrackBy)
@publicApi

## IterableDifferFactory

```ts
export interface IterableDifferFactory
```

Provides a factory for {@link IterableDiffer}.

@publicApi

## IterableDiffers

```ts
export class IterableDiffers
```

A repository of different iterable diffing strategies used by NgFor, NgClass, and others.

@publicApi

## IterableDiffers.extend

```ts
static extend(factories: IterableDifferFactory[]): StaticProvider
```

Takes an array of {@link IterableDifferFactory} and returns a provider used to extend the
inherited {@link IterableDiffers} instance with the provided factories and return a new
{@link IterableDiffers} instance.

@usageNotes
### Example

The following example shows how to extend an existing list of factories,
which will only be applied to the injector for this component and its children.
This step is all that's required to make a new {@link IterableDiffer} available.

```ts
@Component({
  viewProviders: [
    IterableDiffers.extend([new ImmutableListDiffer()])
  ]
})
```