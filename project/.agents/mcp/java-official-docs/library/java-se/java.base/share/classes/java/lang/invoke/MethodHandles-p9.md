---
title: "MethodHandles class (java.lang.invoke) (part 9 of 14)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/MethodHandles.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodHandles class (java.lang.invoke) (part 9 of 14)

## MethodHandles.dropArgumentsToMatch(MethodHandle, int, List<Class<?>>, int)

```java
public static MethodHandle dropArgumentsToMatch(MethodHandle target, int skip, List<Class<?>> newTypes, int pos)
```

Adapts a target method handle to match the given parameter type list. If necessary, adds dummy arguments. Some
leading parameters can be skipped before matching begins. The remaining types in the `target`'s parameter
type list must be a sub-list of the `newTypes` type list at the starting position `pos`. The
resulting handle will have the target handle's parameter type list, with any non-matching parameter types (before
or after the matching sub-list) inserted in corresponding positions of the target's original parameters, as if by
int, Class[]).

The resulting handle will have the same return type as the target handle.

In more formal terms, assume these two type lists:

- The target handle has the parameter type list `S..., M...`, with as many types in `S` as
indicated by `skip`. The `M` types are those that are supposed to match part of the given type list,
`newTypes`.

- The `newTypes` list contains types `P..., M..., A...`, with as many types in `P` as
indicated by `pos`. The `M` types are precisely those that the `M` types in the target handle's
parameter type list are supposed to match. The types in `A` are additional types found after the matching
sub-list.

Given these assumptions, the result of an invocation of `dropArgumentsToMatch` will have the parameter type
list `S..., P..., M..., A...`, with the `P` and `A` types inserted as if by
int, Class[]).

Parameters:

- `target`: the method handle to adapt
- `skip`: number of targets parameters to disregard (they will be unchanged)
- `newTypes`: the list of types to match `target`'s parameter type list to
- `pos`: place in `newTypes` where the non-skipped target parameters must occur

**API note:** Two method handles whose argument lists are "effectively identical" (i.e., identical in a common prefix) may be
mutually converted to a common type by two calls to `dropArgumentsToMatch`, as follows:

**Returns:** a possibly adapted method handle

**Since:** 9

Throws:

- `NullPointerException`: if either argument is null
- `IllegalArgumentException`: if any element of `newTypes` is `void.class`, or if `skip` is negative or greater than the arity of the target, or if `pos` is negative or greater than the newTypes list size, or if `newTypes` does not contain the `target`'s non-skipped parameter types at position `pos`.

## MethodHandles.dropReturn(MethodHandle)

```java
public static MethodHandle dropReturn(MethodHandle target)
```

Drop the return value of the target handle (if any).
The returned method handle will have a `void` return type.

Parameters:

- `target`: the method handle to adapt

**Returns:** a possibly adapted method handle

**Since:** 16

Throws:

- `NullPointerException`: if `target` is null

## MethodHandles.filterArguments(MethodHandle, int, MethodHandle...)

```java
public static MethodHandle filterArguments(MethodHandle target, int pos, MethodHandle... filters)
```

Adapts a target method handle by pre-processing
one or more of its arguments, each with its own unary filter function,
and then calling the target with each pre-processed argument
replaced by the result of its corresponding filter function.

The pre-processing is performed by one or more method handles,
specified in the elements of the `filters` array.
The first element of the filter array corresponds to the `pos`
argument of the target, and so on in sequence.
The filter functions are invoked in left to right order.

Null arguments in the array are treated as identity functions,
and the corresponding arguments left unchanged.
(If there are no non-null elements in the array, the original target is returned.)
Each filter is applied to the corresponding argument of the adapter.

If a filter `F` applies to the `N`th argument of
the target, then `F` must be a method handle which
takes exactly one argument.  The type of `F`'s sole argument
replaces the corresponding argument type of the target
in the resulting adapted method handle.
The return type of `F` must be identical to the corresponding
parameter type of the target.

It is an error if there are elements of `filters`
(null or not)
which do not correspond to argument positions in the target.

**Example:**

Here is pseudocode for the resulting adapter. In the code, `T`
denotes the return type of both the `target` and resulting adapter.
`P`/`p` and `B`/`b` represent the types and values
of the parameters and arguments that precede and follow the filter position
`pos`, respectively. `A[i]`/`a[i]` stand for the types and
values of the filtered parameters and arguments; they also represent the
return types of the `filter[i]` handles. The latter accept arguments
`v[i]` of type `V[i]`, which also appear in the signature of
the resulting adapter.

*Note:* The resulting adapter is never a variable-arity method handle, even if the original target method handle was.

Parameters:

- `target`: the method handle to invoke after arguments are filtered
- `pos`: the position of the first argument to filter
- `filters`: method handles to call initially on filtered arguments

**Returns:** method handle which incorporates the specified argument filtering logic

Throws:

- `NullPointerException`: if the target is null or if the `filters` array is null
- `IllegalArgumentException`: if a non-null element of `filters` does not match a corresponding argument type of target as described above, or if the `pos+filters.length` is greater than `target.type().parameterCount()`, or if the resulting method handle's type would have too many parameters

## MethodHandles.collectArguments(MethodHandle, int, MethodHandle)

```java
public static MethodHandle collectArguments(MethodHandle target, int pos, MethodHandle filter)
```

Adapts a target method handle by pre-processing
a sub-sequence of its arguments with a filter (another method handle).
The pre-processed arguments are replaced by the result (if any) of the
filter function.
The target is then called on the modified (usually shortened) argument list.

If the filter returns a value, the target must accept that value as
its argument in position `pos`, preceded and/or followed by
any arguments not passed to the filter.
If the filter returns void, the target must accept all arguments
not passed to the filter.
No arguments are reordered, and a result returned from the filter
replaces (in order) the whole subsequence of arguments originally
passed to the adapter.

The argument types (if any) of the filter
replace zero or one argument types of the target, at position `pos`,
in the resulting adapted method handle.
The return type of the filter (if any) must be identical to the
argument type of the target at position `pos`, and that target argument
is supplied by the return value of the filter.

In all cases, `pos` must be greater than or equal to zero, and
`pos` must also be less than or equal to the target's arity.

**Example:**

Here is pseudocode for the resulting adapter. In the code, `T`
represents the return type of the `target` and resulting adapter.
`V`/`v` stand for the return type and value of the
`filter`, which are also found in the signature and arguments of
the `target`, respectively, unless `V` is `void`.
`A`/`a` and `C`/`c` represent the parameter types
and values preceding and following the collection position, `pos`,
in the `target`'s signature. They also turn up in the resulting
adapter's signature and arguments, where they surround
`B`/`b`, which represent the parameter types and arguments
to the `filter` (if any).

A collection adapter `collectArguments(mh, 0, coll)` is equivalent to
one which first "folds" the affected arguments, and then drops them, in separate
steps as follows:

If the target method handle consumes no arguments besides than the result
(if any) of the filter `coll`, then `collectArguments(mh, 0, coll)`
is equivalent to `filterReturnValue(coll, mh)`.
If the filter method handle `coll` consumes one argument and produces
a non-void result, then `collectArguments(mh, N, coll)`
is equivalent to `filterArguments(mh, N, coll)`.
Other equivalences are possible but would require argument permutation.

*Note:* The resulting adapter is never a variable-arity method handle, even if the original target method handle was.

Parameters:

- `target`: the method handle to invoke after filtering the subsequence of arguments
- `pos`: the position of the first adapter argument to pass to the filter, and/or the target argument which receives the result of the filter
- `filter`: method handle to call on the subsequence of arguments

**Returns:** method handle which incorporates the specified argument subsequence filtering logic

**See also:** MethodHandles#foldArguments

**See also:** MethodHandles#filterArguments

**See also:** MethodHandles#filterReturnValue

Throws:

- `NullPointerException`: if either argument is null
- `IllegalArgumentException`: if the return type of `filter` is non-void and is not the same as the `pos` argument of the target, or if `pos` is not between 0 and the target's arity, inclusive, or if the resulting method handle's type would have too many parameters

## MethodHandles.filterReturnValue(MethodHandle, MethodHandle)

```java
public static MethodHandle filterReturnValue(MethodHandle target, MethodHandle filter)
```

Adapts a target method handle by post-processing
its return value (if any) with a filter (another method handle).
The result of the filter is returned from the adapter.

If the target returns a value, the filter must accept that value as
its only argument.
If the target returns void, the filter must accept no arguments.

The return type of the filter
replaces the return type of the target
in the resulting adapted method handle.
The argument type of the filter (if any) must be identical to the
return type of the target.

**Example:**

Here is pseudocode for the resulting adapter. In the code,
`T`/`t` represent the result type and value of the
`target`; `V`, the result type of the `filter`; and
`A`/`a`, the types and values of the parameters and arguments
of the `target` as well as the resulting adapter.

*Note:* The resulting adapter is never a variable-arity method handle, even if the original target method handle was.

Parameters:

- `target`: the method handle to invoke before filtering the return value
- `filter`: method handle to call on the return value

**Returns:** method handle which incorporates the specified return value filtering logic

Throws:

- `NullPointerException`: if either argument is null
- `IllegalArgumentException`: if the argument list of `filter` does not match the return type of target as described above

## MethodHandles.foldArguments(MethodHandle, MethodHandle)

```java
public static MethodHandle foldArguments(MethodHandle target, MethodHandle combiner)
```

Adapts a target method handle by pre-processing
some of its arguments, and then calling the target with
the result of the pre-processing, inserted into the original
sequence of arguments.

The pre-processing is performed by `combiner`, a second method handle.
Of the arguments passed to the adapter, the first `N` arguments
are copied to the combiner, which is then called.
(Here, `N` is defined as the parameter count of the combiner.)
After this, control passes to the target, with any result
from the combiner inserted before the original `N` incoming
arguments.

If the combiner returns a value, the first parameter type of the target
must be identical with the return type of the combiner, and the next
`N` parameter types of the target must exactly match the parameters
of the combiner.

If the combiner has a void return, no result will be inserted,
and the first `N` parameter types of the target
must exactly match the parameters of the combiner.

The resulting adapter is the same type as the target, except that the
first parameter type is dropped,
if it corresponds to the result of the combiner.

(Note that dropArguments can be used to remove any arguments
that either the combiner or the target does not wish to receive.
If some of the incoming arguments are destined only for the combiner,
consider using asCollector instead, since those
arguments will not need to be live on the stack on entry to the
target.)

**Example:**

Here is pseudocode for the resulting adapter. In the code, `T`
represents the result type of the `target` and resulting adapter.
`V`/`v` represent the type and value of the parameter and argument
of `target` that precedes the folding position; `V` also is
the result type of the `combiner`. `A`/`a` denote the
types and values of the `N` parameters and arguments at the folding
position. `B`/`b` represent the types and values of the
`target` parameters and arguments that follow the folded parameters
and arguments.

*Note:* The resulting adapter is never a variable-arity method handle, even if the original target method handle was.

Parameters:

- `target`: the method handle to invoke after arguments are combined
- `combiner`: method handle to call initially on the incoming arguments

**Returns:** method handle which incorporates the specified argument folding logic

Throws:

- `NullPointerException`: if either argument is null
- `IllegalArgumentException`: if `combiner`'s return type is non-void and not the same as the first argument type of the target, or if the initial `N` argument types of the target (skipping one matching the `combiner`'s return type) are not identical with the argument types of `combiner`
