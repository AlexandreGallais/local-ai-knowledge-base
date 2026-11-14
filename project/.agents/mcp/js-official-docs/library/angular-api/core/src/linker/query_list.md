# core/src/linker/query_list

## QueryList

```ts
export class QueryList<T> implements Iterable<T>
```

An unmodifiable list of items that Angular keeps up to date when the state
of the application changes.

The type of object that {@link ViewChildren}, {@link ContentChildren}, and {@link QueryList}
provide.

Implements an iterable interface, therefore it can be used in both ES6
javascript `for (var i of items)` loops as well as in Angular templates with
`@for(i of myList; track $index)`.

Changes can be observed by subscribing to the `changes` `Observable`.
*
@usageNotes
### Example
```ts
@Component({...})
class Container {
  @ViewChildren(Item) items:QueryList<Item>;
}
```

@publicApi

@see [Using QueryList](guide/components/queries#using-querylist)

## QueryList.changes

```ts
get changes(): Observable<any>
```

Returns `Observable` of `QueryList` notifying the subscriber of changes.

## QueryList.constructor

```ts
constructor(private _emitDistinctChangesOnly: boolean = false) {}
```

@param emitDistinctChangesOnly Whether `QueryList.changes` should fire only when actual change
    has occurred. Or if it should fire when query is recomputed. (recomputing could resolve in
    the same result)

## QueryList.get

```ts
get(index: number): T | undefined
```

Returns the QueryList entry at `index`.

## QueryList.map

```ts
map<U>(fn: (item: T, index: number, array: T[])
```

See
[Array.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

## QueryList.filter

```ts
filter<S extends T>(predicate: (value: T, index: number, array: readonly T[])
```

See
[Array.filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

## QueryList.find

```ts
find(fn: (item: T, index: number, array: T[])
```

See
[Array.find](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

## QueryList.reduce

```ts
reduce<U>(fn: (prevValue: U, curValue: T, curIndex: number, array: T[])
```

See
[Array.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

## QueryList.forEach

```ts
forEach(fn: (item: T, index: number, array: T[])
```

See
[Array.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

## QueryList.some

```ts
some(fn: (value: T, index: number, array: T[])
```

See
[Array.some](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

## QueryList.toArray

```ts
toArray(): T[]
```

Returns a copy of the internal results list as an Array.

## QueryList.reset

```ts
reset(resultsTree: Array<T | any[]>, identityAccessor?: (value: T)
```

Updates the stored data of the query list, and resets the `dirty` flag to `false`, so that
on change detection, it will not notify of changes to the queries, unless a new change
occurs.

@param resultsTree The query results to store
@param identityAccessor Optional function for extracting stable object identity from a value
   in the array. This function is executed for each element of the query result list while
   comparing current query list with the new one (provided as a first argument of the `reset`
   function) to detect if the lists are different. If the function is not provided, elements
   are compared as is (without any pre-processing).

## QueryList.notifyOnChanges

```ts
notifyOnChanges(): void
```

Triggers a change event by emitting on the `changes` {@link EventEmitter}.

## QueryList.setDirty

```ts
setDirty()
```

internal

## QueryList.destroy

```ts
destroy(): void
```

internal