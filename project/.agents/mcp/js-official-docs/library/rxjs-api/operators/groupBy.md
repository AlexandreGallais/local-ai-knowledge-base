# src/internal/operators/groupBy

## groupBy

```ts
export function groupBy<T, K>( key: (value: T)
```

@deprecated use the options parameter instead.

## groupBy

```ts
export function groupBy<T, K, R>( key: (value: T)
```

@deprecated use the options parameter instead.

## groupBy

```ts
export function groupBy<T, K, R>( key: (value: T)
```

Groups the items emitted by an Observable according to a specified criterion,
and emits these grouped items as `GroupedObservables`, one
{@link GroupedObservable} per group.

![](groupBy.png)

When the Observable emits an item, a key is computed for this item with the key function.

If a {@link GroupedObservable} for this key exists, this {@link GroupedObservable} emits. Otherwise, a new
{@link GroupedObservable} for this key is created and emits.

A {@link GroupedObservable} represents values belonging to the same group represented by a common key. The common
key is available as the `key` field of a {@link GroupedObservable} instance.

The elements emitted by {@link GroupedObservable}s are by default the items emitted by the Observable, or elements
returned by the element function.

## Examples

Group objects by `id` and return as array

```ts
import { of, groupBy, mergeMap, reduce } from 'rxjs';

of(
  { id: 1, name: 'JavaScript' },
  { id: 2, name: 'Parcel' },
  { id: 2, name: 'webpack' },
  { id: 1, name: 'TypeScript' },
  { id: 3, name: 'TSLint' }
).pipe(
  groupBy(p => p.id),
  mergeMap(group$ => group$.pipe(reduce((acc, cur) => [...acc, cur], [])))
)
.subscribe(p => console.log(p));

// displays:
// [{ id: 1, name: 'JavaScript' }, { id: 1, name: 'TypeScript'}]
// [{ id: 2, name: 'Parcel' }, { id: 2, name: 'webpack'}]
// [{ id: 3, name: 'TSLint' }]
```

Pivot data on the `id` field

```ts
import { of, groupBy, mergeMap, reduce, map } from 'rxjs';

of(
  { id: 1, name: 'JavaScript' },
  { id: 2, name: 'Parcel' },
  { id: 2, name: 'webpack' },
  { id: 1, name: 'TypeScript' },
  { id: 3, name: 'TSLint' }
).pipe(
  groupBy(p => p.id, { element: p => p.name }),
  mergeMap(group$ => group$.pipe(reduce((acc, cur) => [...acc, cur], [`${ group$.key }`]))),
  map(arr => ({ id: parseInt(arr[0], 10), values: arr.slice(1) }))
)
.subscribe(p => console.log(p));

// displays:
// { id: 1, values: [ 'JavaScript', 'TypeScript' ] }
// { id: 2, values: [ 'Parcel', 'webpack' ] }
// { id: 3, values: [ 'TSLint' ] }
```

@param key A function that extracts the key
for each item.
@param element A function that extracts the
return element for each item.
@param duration
A function that returns an Observable to determine how long each group should
exist.
@param connector Factory function to create an
intermediate Subject through which grouped elements are emitted.
@return A function that returns an Observable that emits GroupedObservables,
each of which corresponds to a unique key value and each of which emits
those items from the source Observable that share that key value.

@deprecated Use the options parameter instead.

## GroupedObservable

```ts
export interface GroupedObservable<K, T> extends Observable<T>
```

An observable of values that is the emitted by the result of a {@link groupBy} operator,
contains a `key` property for the grouping.

## GroupedObservable.key

```ts
readonly key: K
```

The key value for the grouped notifications.