---
title: "MethodHandles class (java.lang.invoke) (part 14 of 14)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/MethodHandles.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodHandles class (java.lang.invoke) (part 14 of 14)

## MethodHandles.tableSwitch(MethodHandle, MethodHandle...)

```java
public static MethodHandle tableSwitch(MethodHandle fallback, MethodHandle... targets)
```

Creates a table switch method handle, which can be used to switch over a set of target
method handles, based on a given target index, called selector.

For a selector value of `n`, where `n` falls in the range `[0, N)`,
and where `N` is the number of target method handles, the table switch method
handle will invoke the n-th target method handle from the list of target method handles.

For a selector value that does not fall in the range `[0, N)`, the table switch
method handle will invoke the given fallback method handle.

All method handles passed to this method must have the same type, with the additional
requirement that the leading parameter be of type `int`. The leading parameter
represents the selector.

Any trailing parameters present in the type will appear on the returned table switch
method handle as well. Any arguments assigned to these parameters will be forwarded,
together with the selector value, to the selected method handle when invoking it.

Parameters:

- `fallback`: the fallback method handle that is called when the selector is not within the range `[0, N)`.
- `targets`: array of target method handles.

**API note:** Example:
The cases each drop the `selector` value they are given, and take an additional
`String` argument, which is concatenated (using `String.concat(String)`)
to a specific constant label string for each case:

**Returns:** the table switch method handle.

**Since:** 17

Throws:

- `NullPointerException`: if `fallback`, the `targets` array, or any any of the elements of the `targets` array are `null`.
- `IllegalArgumentException`: if the `targets` array is empty, if the leading parameter of the fallback handle or any of the target handles is not `int`, or if the types of the fallback handle and all of target handles are not the same.

## MethodHandles.filterValue(VarHandle, MethodHandle, MethodHandle)

```java
public static VarHandle filterValue(VarHandle target, MethodHandle filterToTarget, MethodHandle filterFromTarget)
```

Adapts a target var handle by pre-processing incoming and outgoing values using a pair of filter functions.

When calling e.g. `VarHandle.set(Object...)` on the resulting var handle, the incoming value (of type `T`, where
`T` is the *last* parameter type of the first filter function) is processed using the first filter and then passed
to the target var handle.
Conversely, when calling e.g. `VarHandle.get(Object...)` on the resulting var handle, the return value obtained from
the target var handle (of type `T`, where `T` is the *last* parameter type of the second filter function)
is processed using the second filter and returned to the caller. More advanced access mode types, such as
`VarHandle.AccessMode.COMPARE_AND_EXCHANGE` might apply both filters at the same time.

For the boxing and unboxing filters to be well-formed, their types must be of the form `(A... , S) -> T` and
`(A... , T) -> S`, respectively, where `T` is the type of the target var handle. If this is the case,
the resulting var handle will have type `S` and will feature the additional coordinates `A...` (which
will be appended to the coordinates of the target var handle).

If the boxing and unboxing filters throw any checked exceptions when invoked, the resulting var handle will
throw an `IllegalStateException`.

The resulting var handle will feature the same access modes (see `VarHandle.AccessMode`) and
atomic access guarantees as those featured by the target var handle.

Parameters:

- `target`: the target var handle
- `filterToTarget`: a filter to convert some type `S` into the type of `target`
- `filterFromTarget`: a filter to convert the type of `target` to some type `S`

**Returns:** an adapter var handle which accepts a new type, performing the provided boxing/unboxing conversions.

**Since:** 22

Throws:

- `IllegalArgumentException`: if `filterFromTarget` and `filterToTarget` are not well-formed, that is, they have types other than `(A... , S) -> T` and `(A... , T) -> S`, respectively, where `T` is the type of the target var handle, or if it's determined that either `filterFromTarget` or `filterToTarget` throws any checked exceptions.
- `NullPointerException`: if any of the arguments is `null`.

## MethodHandles.filterCoordinates(VarHandle, int, MethodHandle...)

```java
public static VarHandle filterCoordinates(VarHandle target, int pos, MethodHandle... filters)
```

Adapts a target var handle by pre-processing incoming coordinate values using unary filter functions.

When calling e.g. `VarHandle.get(Object...)` on the resulting var handle, the incoming coordinate values
starting at position `pos` (of type `C1, C2 ... Cn`, where `C1, C2 ... Cn` are the return types
of the unary filter functions) are transformed into new values (of type `S1, S2 ... Sn`, where `S1, S2 ... Sn` are the
parameter types of the unary filter functions), and then passed (along with any coordinate that was left unaltered
by the adaptation) to the target var handle.

For the coordinate filters to be well-formed, their types must be of the form `S1 -> T1, S2 -> T1 ... Sn -> Tn`,
where `T1, T2 ... Tn` are the coordinate types starting at position `pos` of the target var handle.

If any of the filters throws a checked exception when invoked, the resulting var handle will
throw an `IllegalStateException`.

The resulting var handle will feature the same access modes (see `VarHandle.AccessMode`) and
atomic access guarantees as those featured by the target var handle.

Parameters:

- `target`: the target var handle
- `pos`: the position of the first coordinate to be transformed
- `filters`: the unary functions which are used to transform coordinates starting at position `pos`

**Returns:** an adapter var handle which accepts new coordinate types, applying the provided transformation
to the new coordinate values.

**Since:** 22

Throws:

- `IllegalArgumentException`: if the handles in `filters` are not well-formed, that is, they have types other than `S1 -> T1, S2 -> T2, ... Sn -> Tn` where `T1, T2 ... Tn` are the coordinate types starting at position `pos` of the target var handle, if `pos` is not between 0 and the target var handle coordinate arity, inclusive, or if more filters are provided than the actual number of coordinate types available starting at `pos`, or if it's determined that any of the filters throws any checked exceptions.
- `NullPointerException`: if any of the arguments is `null` or `filters` contains `null`.

## MethodHandles.insertCoordinates(VarHandle, int, Object...)

```java
public static VarHandle insertCoordinates(VarHandle target, int pos, Object... values)
```

Provides a target var handle with one or more *bound coordinates*
in advance of the var handle's invocation. As a consequence, the resulting var handle will feature less
coordinate types than the target var handle.

When calling e.g. `VarHandle.get(Object...)` on the resulting var handle, incoming coordinate values
are joined with bound coordinate values, and then passed to the target var handle.

For the bound coordinates to be well-formed, their types must be `T1, T2 ... Tn`,
where `T1, T2 ... Tn` are the coordinate types starting at position `pos` of the target var handle.

The resulting var handle will feature the same access modes (see `VarHandle.AccessMode`) and
atomic access guarantees as those featured by the target var handle.

Parameters:

- `target`: the var handle to invoke after the bound coordinates are inserted
- `pos`: the position of the first coordinate to be inserted
- `values`: the series of bound coordinates to insert

**Returns:** an adapter var handle which inserts additional coordinates,
        before calling the target var handle

**Since:** 22

Throws:

- `IllegalArgumentException`: if `pos` is not between 0 and the target var handle coordinate arity, inclusive, or if more values are provided than the actual number of coordinate types available starting at `pos`.
- `ClassCastException`: if the bound coordinates in `values` are not well-formed, that is, they have types other than `T1, T2 ... Tn`, where `T1, T2 ... Tn` are the coordinate types starting at position `pos` of the target var handle.
- `NullPointerException`: if any of the arguments is `null` or `values` contains `null`.

## MethodHandles.permuteCoordinates(VarHandle, List<Class<?>>, int...)

```java
public static VarHandle permuteCoordinates(VarHandle target, List<Class<?>> newCoordinates, int... reorder)
```

Provides a var handle which adapts the coordinate values of the target var handle, by re-arranging them
so that the new coordinates match the provided ones.

The given array controls the reordering.
Call `#I` the number of incoming coordinates (the value
`newCoordinates.size()`), and call `#O` the number
of outgoing coordinates (the number of coordinates associated with the target var handle).
Then the length of the reordering array must be `#O`,
and each element must be a non-negative number less than `#I`.
For every `N` less than `#O`, the `N`-th
outgoing coordinate will be taken from the `I`-th incoming
coordinate, where `I` is `reorder[N]`.

No coordinate value conversions are applied.
The type of each incoming coordinate, as determined by `newCoordinates`,
must be identical to the type of the corresponding outgoing coordinate
in the target var handle.

The reordering array need not specify an actual permutation.
An incoming coordinate will be duplicated if its index appears
more than once in the array, and an incoming coordinate will be dropped
if its index does not appear in the array.

The resulting var handle will feature the same access modes (see `VarHandle.AccessMode`) and
atomic access guarantees as those featured by the target var handle.

Parameters:

- `target`: the var handle to invoke after the coordinates have been reordered
- `newCoordinates`: the new coordinate types
- `reorder`: an index array which controls the reordering

**Returns:** an adapter var handle which re-arranges the incoming coordinate values,
before calling the target var handle

**Since:** 22

Throws:

- `IllegalArgumentException`: if the index array length is not equal to the number of coordinates of the target var handle, or if any index array element is not a valid index for a coordinate of `newCoordinates`, or if two corresponding coordinate types in the target var handle and in `newCoordinates` are not identical.
- `NullPointerException`: if any of the arguments is `null` or `newCoordinates` contains `null`.

## MethodHandles.collectCoordinates(VarHandle, int, MethodHandle)

```java
public static VarHandle collectCoordinates(VarHandle target, int pos, MethodHandle filter)
```

Adapts a target var handle by pre-processing
a sub-sequence of its coordinate values with a filter (a method handle).
The pre-processed coordinates are replaced by the result (if any) of the
filter function and the target var handle is then called on the modified (usually shortened)
coordinate list.

If `R` is the return type of the filter, then:

- if `R` *is not* `void`, the target var handle must have a coordinate of type `R` in
position `pos`. The parameter types of the filter will replace the coordinate type at position `pos`
of the target var handle. When the returned var handle is invoked, it will be as if the filter is invoked first,
and its result is passed in place of the coordinate at position `pos` in a downstream invocation of the
target var handle.

-  if `R` *is* `void`, the parameter types (if any) of the filter will be inserted in the
coordinate type list of the target var handle at position `pos`. In this case, when the returned var handle
is invoked, the filter essentially acts as a side effect, consuming some of the coordinate values, before a
downstream invocation of the target var handle.

If any of the filters throws a checked exception when invoked, the resulting var handle will
throw an `IllegalStateException`.

The resulting var handle will feature the same access modes (see `VarHandle.AccessMode`) and
atomic access guarantees as those featured by the target var handle.

Parameters:

- `target`: the var handle to invoke after the coordinates have been filtered
- `pos`: the position in the coordinate list of the target var handle where the filter is to be inserted
- `filter`: the filter method handle

**Returns:** an adapter var handle which filters the incoming coordinate values,
before calling the target var handle

**Since:** 22

Throws:

- `IllegalArgumentException`: if the return type of `filter` is not void, and it is not the same as the `pos` coordinate of the target var handle, if `pos` is not between 0 and the target var handle coordinate arity, inclusive, if the resulting var handle's type would have too many coordinates, or if it's determined that `filter` throws any checked exceptions.
- `NullPointerException`: if any of the arguments is `null`.

## MethodHandles.dropCoordinates(VarHandle, int, Class<?>...)

```java
public static VarHandle dropCoordinates(VarHandle target, int pos, Class<?>... valueTypes)
```

Returns a var handle which will discard some dummy coordinates before delegating to the
target var handle. As a consequence, the resulting var handle will feature more
coordinate types than the target var handle.

The `pos` argument may range between zero and *N*, where *N* is the arity of the
target var handle's coordinate types. If `pos` is zero, the dummy coordinates will precede
the target's real arguments; if `pos` is *N* they will come after.

The resulting var handle will feature the same access modes (see `VarHandle.AccessMode`) and
atomic access guarantees as those featured by the target var handle.

Parameters:

- `target`: the var handle to invoke after the dummy coordinates are dropped
- `pos`: position of the first coordinate to drop (zero for the leftmost)
- `valueTypes`: the type(s) of the coordinate(s) to drop

**Returns:** an adapter var handle which drops some dummy coordinates,
        before calling the target var handle

**Since:** 22

Throws:

- `IllegalArgumentException`: if `pos` is not between 0 and the target var handle coordinate arity, inclusive.
- `NullPointerException`: if any of the arguments is `null` or `valueTypes` contains `null`.
