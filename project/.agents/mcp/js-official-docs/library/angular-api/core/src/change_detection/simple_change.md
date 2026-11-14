# core/src/change_detection/simple_change

## SimpleChange

```ts
export class SimpleChange<T = any>
```

Represents a basic change from a previous to a new value for a single
property on a directive instance. Passed as a value in a
{@link SimpleChanges} object to the `ngOnChanges` hook.

@see {@link OnChanges}

@publicApi

## SimpleChange.isFirstChange

```ts
isFirstChange(): boolean
```

Check whether the new value is the first value assigned.

## SimpleChanges

```ts
export type SimpleChanges<T = unknown> = T extends object ?
```

A hashtable of changes represented by {@link SimpleChange} objects stored
at the declared property name they belong to on a Directive or Component. This is
the type passed to the `ngOnChanges` hook. Pass the current class or `this` as the
first generic argument for stronger type checking (e.g. `SimpleChanges<YourComponent>`).

@see {@link OnChanges}

@see [Inspecting changes](guide/components/lifecycle#inspecting-changes)

@publicApi