# core/src/change_detection/differs/default_iterable_differ

## DefaultIterableDiffer

```ts
export class DefaultIterableDiffer<V> implements IterableDiffer<V>, IterableChanges<V>
```

@deprecated v4.0.0 - Should not be part of public API.
@publicApi

## DefaultIterableDiffer.add

```ts
add(record: IterableChangeRecord_<V>): void
```

Append the record to the list of duplicates.

Note: by design all records in the list of duplicates hold the same value in record.item.

## DefaultIterableDiffer.remove

```ts
remove(record: IterableChangeRecord_<V>): boolean
```

Remove one {@link IterableChangeRecord_} from the list of duplicates.

Returns whether the list of duplicates is empty.

## DefaultIterableDiffer.get

```ts
get(trackById: any, atOrAfterIndex: number | null): IterableChangeRecord_<V> | null
```

Retrieve the `value` using key. Because the IterableChangeRecord_ value may be one which we
have already iterated over, we use the `atOrAfterIndex` to pretend it is not there.

Use case: `[a, b, c, a, a]` if we are at index `3` which is the second `a` then asking if we
have any more `a`s needs to return the second `a`.

## DefaultIterableDiffer.remove

```ts
remove(record: IterableChangeRecord_<V>): IterableChangeRecord_<V>
```

Removes a {@link IterableChangeRecord_} from the list of duplicates.

The list of duplicates also is removed from the map if it gets empty.