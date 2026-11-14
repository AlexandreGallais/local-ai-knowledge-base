---
title: "MethodHandles class (java.lang.invoke) (part 8 of 14)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/MethodHandles.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodHandles class (java.lang.invoke) (part 8 of 14)

## MethodHandles.explicitCastArguments(MethodHandle, MethodType)

```java
public static MethodHandle explicitCastArguments(MethodHandle target, MethodType newType)
```

Produces a method handle which adapts the type of the
given method handle to a new type by pairwise argument and return type conversion.
The original type and new type must have the same number of arguments.
The resulting method handle is guaranteed to report a type
which is equal to the desired new type.

If the original type and new type are equal, returns target.

The same conversions are allowed as for MethodHandle.asType,
and some additional conversions are also applied if those conversions fail.
Given types *T0*, *T1*, one of the following conversions is applied
if possible, before or instead of any conversions done by `asType`:

- If *T0* and *T1* are references, and *T1* is an interface type,
    then the value of type *T0* is passed as a *T1* without a cast.
    (This treatment of interfaces follows the usage of the bytecode verifier.)

- If *T0* is boolean and *T1* is another primitive,
    the boolean is converted to a byte value, 1 for true, 0 for false.
    (This treatment follows the usage of the bytecode verifier.)

- If *T1* is boolean and *T0* is another primitive,
    *T0* is converted to byte via Java casting conversion (JLS ),
    and the low order bit of the result is tested, as if by `(x & 1) != 0`.

- If *T0* and *T1* are primitives other than boolean,
    then a Java casting conversion (JLS ) is applied.
    (Specifically, *T0* will convert to *T1* by
    widening and/or narrowing.)

- If *T0* is a reference and *T1* a primitive, an unboxing
    conversion will be applied at runtime, possibly followed
    by a Java casting conversion (JLS ) on the primitive value,
    possibly followed by a conversion from byte to boolean by testing
    the low-order bit.

- If *T0* is a reference and *T1* a primitive,
    and if the reference is null at runtime, a zero value is introduced.

Parameters:

- `target`: the method handle to invoke after arguments are retyped
- `newType`: the expected type of the new method handle

**Returns:** a method handle which delegates to the target after performing
          any necessary argument conversions, and arranges for any
          necessary return value conversions

**See also:** MethodHandle#asType

Throws:

- `NullPointerException`: if either argument is null
- `WrongMethodTypeException`: if the conversion cannot be made

## MethodHandles.permuteArguments(MethodHandle, MethodType, int...)

```java
public static MethodHandle permuteArguments(MethodHandle target, MethodType newType, int... reorder)
```

Produces a method handle which adapts the calling sequence of the
given method handle to a new type, by reordering the arguments.
The resulting method handle is guaranteed to report a type
which is equal to the desired new type.

The given array controls the reordering.
Call `#I` the number of incoming parameters (the value
`newType.parameterCount()`, and call `#O` the number
of outgoing parameters (the value `target.type().parameterCount()`).
Then the length of the reordering array must be `#O`,
and each element must be a non-negative number less than `#I`.
For every `N` less than `#O`, the `N`-th
outgoing argument will be taken from the `I`-th incoming
argument, where `I` is `reorder[N]`.

No argument or return value conversions are applied.
The type of each incoming argument, as determined by `newType`,
must be identical to the type of the corresponding outgoing parameter
or parameters in the target method handle.
The return type of `newType` must be identical to the return
type of the original target.

The reordering array need not specify an actual permutation.
An incoming argument will be duplicated if its index appears
more than once in the array, and an incoming argument will be dropped
if its index does not appear in the array.
As in the case of dropArguments,
incoming arguments which are not mentioned in the reordering array
may be of any type, as determined only by `newType`.

*Note:* The resulting adapter is never a variable-arity method handle, even if the original target method handle was.

Parameters:

- `target`: the method handle to invoke after arguments are reordered
- `newType`: the expected type of the new method handle
- `reorder`: an index array which controls the reordering

**Returns:** a method handle which delegates to the target after it
          drops unused arguments and moves and/or duplicates the other arguments

Throws:

- `NullPointerException`: if any argument is null
- `IllegalArgumentException`: if the index array length is not equal to the arity of the target, or if any index array element not a valid index for a parameter of `newType`, or if two corresponding parameter types in `target.type()` and `newType` are not identical,

## MethodHandles.constant(Class<?>, Object)

```java
public static MethodHandle constant(Class<?> type, Object value)
```

Produces a method handle of the requested return type which returns the given
constant value every time it is invoked.

Before the method handle is returned, the passed-in value is converted to the requested type.
If the requested type is primitive, widening primitive conversions are attempted,
else reference conversions are attempted.

The returned method handle is equivalent to `identity(type).bindTo(value)`.

Parameters:

- `type`: the return type of the desired method handle
- `value`: the value to return

**Returns:** a method handle of the given return type and no arguments, which always returns the given value

Throws:

- `NullPointerException`: if the `type` argument is null
- `ClassCastException`: if the value cannot be converted to the required return type
- `IllegalArgumentException`: if the given type is `void.class`

## MethodHandles.identity(Class<?>)

```java
public static MethodHandle identity(Class<?> type)
```

Produces a method handle which returns its sole argument when invoked.

Parameters:

- `type`: the type of the sole parameter and return value of the desired method handle

**Returns:** a unary method handle which accepts and returns the given type

Throws:

- `NullPointerException`: if the argument is null
- `IllegalArgumentException`: if the given type is `void.class`

## MethodHandles.zero(Class<?>)

```java
public static MethodHandle zero(Class<?> type)
```

Produces a constant method handle of the requested return type which
returns the default value for that type every time it is invoked.
The resulting constant method handle will have no side effects.

The returned method handle is equivalent to `empty(methodType(type))`.
It is also equivalent to `explicitCastArguments(constant(Object.class, null), methodType(type))`,
since `explicitCastArguments` converts `null` to default values.

Parameters:

- `type`: the expected return type of the desired method handle

**Returns:** a constant method handle that takes no arguments
        and returns the default value of the given type (or void, if the type is void)

**See also:** MethodHandles#constant

**See also:** MethodHandles#empty

**See also:** MethodHandles#explicitCastArguments

**Since:** 9

Throws:

- `NullPointerException`: if the argument is null

## MethodHandles.empty(MethodType)

```java
public static MethodHandle empty(MethodType type)
```

Produces a method handle of the requested type which ignores any arguments, does nothing,
and returns a suitable default depending on the return type.
That is, it returns a zero primitive value, a `null`, or `void`.

The returned method handle is equivalent to
`dropArguments(zero(type.returnType()), 0, type.parameterList())`.

Parameters:

- `type`: the type of the desired method handle

**API note:** Given a predicate and target, a useful "if-then" construct can be produced as
`guardWithTest(pred, target, empty(target.type())`.

**Returns:** a constant method handle of the given type, which returns a default value of the given return type

**See also:** MethodHandles#zero(Class)

**See also:** MethodHandles#constant

**Since:** 9

Throws:

- `NullPointerException`: if the argument is null

## MethodHandles.insertArguments(MethodHandle, int, Object...)

```java
public static MethodHandle insertArguments(MethodHandle target, int pos, Object... values)
```

Provides a target method handle with one or more *bound arguments*
in advance of the method handle's invocation.
The formal parameters to the target corresponding to the bound
arguments are called *bound parameters*.
Returns a new method handle which saves away the bound arguments.
When it is invoked, it receives arguments for any non-bound parameters,
binds the saved arguments to their corresponding parameters,
and calls the original target.

The type of the new method handle will drop the types for the bound
parameters from the original target type, since the new method handle
will no longer require those arguments to be supplied by its callers.

Each given argument object must match the corresponding bound parameter type.
If a bound parameter type is a primitive, the argument object
must be a wrapper, and will be unboxed to produce the primitive value.

The `pos` argument selects which parameters are to be bound.
It may range between zero and *N-L* (inclusively),
where *N* is the arity of the target method handle
and *L* is the length of the values array.

*Note:* The resulting adapter is never a variable-arity method handle, even if the original target method handle was.

Parameters:

- `target`: the method handle to invoke after the argument is inserted
- `pos`: where to insert the argument (zero for the first)
- `values`: the series of arguments to insert

**Returns:** a method handle which inserts an additional argument,
        before calling the original method handle

**See also:** MethodHandle#bindTo

Throws:

- `NullPointerException`: if the target or the `values` array is null
- `IllegalArgumentException`: if `pos` is less than `0` or greater than `N - L` where `N` is the arity of the target method handle and `L` is the length of the values array.
- `ClassCastException`: if an argument does not match the corresponding bound parameter type.

## MethodHandles.dropArguments(MethodHandle, int, List<Class<?>>)

```java
public static MethodHandle dropArguments(MethodHandle target, int pos, List<Class<?>> valueTypes)
```

Produces a method handle which will discard some dummy arguments
before calling some other specified *target* method handle.
The type of the new method handle will be the same as the target's type,
except it will also include the dummy argument types,
at some given position.

The `pos` argument may range between zero and *N*,
where *N* is the arity of the target.
If `pos` is zero, the dummy arguments will precede
the target's real arguments; if `pos` is *N*
they will come after.

**Example:**

This method is also equivalent to the following code:

```java
{@link #dropArguments(MethodHandle,int,Class...) dropArguments}{@code (target, pos, valueTypes.toArray(new Class[0]))
```

Parameters:

- `target`: the method handle to invoke after the arguments are dropped
- `pos`: position of first argument to drop (zero for the leftmost)
- `valueTypes`: the type(s) of the argument(s) to drop

**Returns:** a method handle which drops arguments of the given types,
        before calling the original method handle

Throws:

- `NullPointerException`: if the target is null, or if the `valueTypes` list or any of its elements is null
- `IllegalArgumentException`: if any element of `valueTypes` is `void.class`, or if `pos` is negative or greater than the arity of the target, or if the new method handle's type would have too many parameters

## MethodHandles.dropArguments(MethodHandle, int, Class<?>...)

```java
public static MethodHandle dropArguments(MethodHandle target, int pos, Class<?>... valueTypes)
```

Produces a method handle which will discard some dummy arguments
before calling some other specified *target* method handle.
The type of the new method handle will be the same as the target's type,
except it will also include the dummy argument types,
at some given position.

The `pos` argument may range between zero and *N*,
where *N* is the arity of the target.
If `pos` is zero, the dummy arguments will precede
the target's real arguments; if `pos` is *N*
they will come after.

Parameters:

- `target`: the method handle to invoke after the arguments are dropped
- `pos`: position of first argument to drop (zero for the leftmost)
- `valueTypes`: the type(s) of the argument(s) to drop

**API note:** This method is also equivalent to the following code:

```java
{@link #dropArguments(MethodHandle,int,List) dropArguments}{@code (target, pos, Arrays.asList(valueTypes))
```

**Returns:** a method handle which drops arguments of the given types,
        before calling the original method handle

Throws:

- `NullPointerException`: if the target is null, or if the `valueTypes` array or any of its elements is null
- `IllegalArgumentException`: if any element of `valueTypes` is `void.class`, or if `pos` is negative or greater than the arity of the target, or if the new method handle's type would have too many parameters
