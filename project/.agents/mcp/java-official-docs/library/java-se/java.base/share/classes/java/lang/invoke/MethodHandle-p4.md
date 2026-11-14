---
title: "MethodHandle class (java.lang.invoke) (part 4 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/MethodHandle.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodHandle class (java.lang.invoke) (part 4 of 4)

## MethodHandle.asCollector(int, Class<?>, int)

```java
public MethodHandle asCollector(int collectArgPos, Class<?> arrayType, int arrayLength)
```

Makes an *array-collecting* method handle, which accepts a given number of positional arguments starting
at a given position, and collects them into an array argument. The new method handle adapts, as its
*target*, the current method handle. The type of the adapter will be the same as the type of the target,
except that the parameter at the position indicated by `collectArgPos` (usually of type `arrayType`)
is replaced by `arrayLength` parameters whose type is element type of `arrayType`.

This method behaves very much like int), but differs in that its `collectArgPos` argument indicates at which position in the parameter list arguments should be collected. This
index is zero-based.

Parameters:

- `collectArgPos`: the zero-based position in the parameter list at which to start collecting.
- `arrayType`: often `Object[]`, the type of the array argument which will collect the arguments
- `arrayLength`: the number of arguments to collect into a new array argument

**API note:** Examples:

*Note:* The resulting adapter is never a variable-arity method handle, even if the original target method handle was.

**Returns:** a new method handle which collects some arguments
        into an array, before calling the original method handle

**See also:** #asCollector(Class, int)

**Since:** 9

Throws:

- `NullPointerException`: if `arrayType` is a null reference
- `IllegalArgumentException`: if `arrayType` is not an array type or `arrayType` is not assignable to this method handle's array parameter type, or `arrayLength` is not a legal array size, or `collectArgPos` has an illegal value (negative, or greater than the number of arguments), or the resulting method handle's type would have too many parameters
- `WrongMethodTypeException`: if the implied `asType` call fails

## MethodHandle.asCollectorChecks(Class<?>, int, int)

```java
/*non-public*/ boolean asCollectorChecks(Class<?> arrayType, int pos, int arrayLength)
```

See if `asCollector` can be validly called with the given arguments.
Return false if the last parameter is not an exact match to arrayType.

## MethodHandle.asVarargsCollector(Class<?>)

```java
public MethodHandle asVarargsCollector(Class<?> arrayType)
```

Makes a *variable arity* adapter which is able to accept
any number of trailing positional arguments and collect them
into an array argument.

The type and behavior of the adapter will be the same as
the type and behavior of the target, except that certain
`invoke` and `asType` requests can lead to
trailing positional arguments being collected into target's
trailing parameter.
Also, the
last parameter type
of the adapter will be
`arrayType`, even if the target has a different
last parameter type.

This transformation may return `this` if the method handle is
already of variable arity and its trailing parameter type
is identical to `arrayType`.

When called with invokeExact, the adapter invokes
the target with no argument changes.
(*Note:* This behavior is different from a
fixed arity collector,
since it accepts a whole array of indeterminate length,
rather than a fixed number of arguments.)

When called with plain, inexact invoke, if the caller
type is the same as the adapter, the adapter invokes the target as with
`invokeExact`.
(This is the normal behavior for `invoke` when types match.)

Otherwise, if the caller and adapter arity are the same, and the
trailing parameter type of the caller is a reference type identical to
or assignable to the trailing parameter type of the adapter,
the arguments and return values are converted pairwise,
as if by asType on a fixed arity
method handle.

Otherwise, the arities differ, or the adapter's trailing parameter
type is not assignable from the corresponding caller type.
In this case, the adapter replaces all trailing arguments from
the original trailing argument position onward, by
a new array of type `arrayType`, whose elements
comprise (in order) the replaced arguments.

The caller type must provide at least enough arguments,
and of the correct type, to satisfy the target's requirement for
positional arguments before the trailing array argument.
Thus, the caller must supply, at a minimum, `N-1` arguments,
where `N` is the arity of the target.
Also, there must exist conversions from the incoming arguments
to the target's arguments.
As with other uses of plain `invoke`, if these basic
requirements are not fulfilled, a `WrongMethodTypeException`
may be thrown.

In all cases, what the target eventually returns is returned unchanged by the adapter.

In the final case, it is exactly as if the target method handle were
temporarily adapted with a fixed arity collector
to the arity required by the caller type.
(As with `asCollector`, if the array length is zero,
a shared constant may be used instead of a new array.
If the implied call to `asCollector` would throw
an `IllegalArgumentException` or `WrongMethodTypeException`,
the call to the variable arity adapter must throw
`WrongMethodTypeException`.)

The behavior of asType is also specialized for
variable arity adapters, to maintain the invariant that
plain, inexact `invoke` is always equivalent to an `asType`
call to adjust the target type, followed by `invokeExact`.
Therefore, a variable arity adapter responds
to an `asType` request by building a fixed arity collector,
if and only if the adapter and requested type differ either
in arity or trailing argument type.
The resulting fixed arity collector has its type further adjusted
(if necessary) to the requested type by pairwise conversion,
as if by another application of `asType`.

When a method handle is obtained by executing an `ldc` instruction
of a `CONSTANT_MethodHandle` constant, and the target method is marked
as a variable arity method (with the modifier bit `0x0080`),
the method handle will accept multiple arities, as if the method handle
constant were created by means of a call to `asVarargsCollector`.

In order to create a collecting adapter which collects a predetermined
number of arguments, and whose type reflects this predetermined number,
use asCollector instead.

No method handle transformations produce new method handles with
variable arity, unless they are documented as doing so.
Therefore, besides `asVarargsCollector` and `withVarargs`,
all methods in `MethodHandle` and `MethodHandles`
will return a method handle with fixed arity,
except in the cases where they are specified to return their original
operand (e.g., `asType` of the method handle's own type).

Calling `asVarargsCollector` on a method handle which is already
of variable arity will produce a method handle with the same type and behavior.
It may (or may not) return the original variable arity method handle.

Here is an example, of a list-making variable arity method handle:

*Discussion:*
These rules are designed as a dynamically-typed variation
of the Java rules for variable arity methods.
In both cases, callers to a variable arity method or method handle
can either pass zero or more positional arguments, or else pass
pre-collected arrays of any length.  Users should be aware of the
special role of the final argument, and of the effect of a
type match on that final argument, which determines whether
or not a single trailing argument is interpreted as a whole
array or a single element of an array to be collected.
Note that the dynamic type of the trailing argument has no
effect on this decision, only a comparison between the symbolic
type descriptor of the call site and the type descriptor of the method handle.

Parameters:

- `arrayType`: often `Object[]`, the type of the array argument which will collect the arguments

**Returns:** a new method handle which can collect any number of trailing arguments
        into an array, before calling the original method handle

**See also:** #asCollector

**See also:** #isVarargsCollector

**See also:** #withVarargs

**See also:** #asFixedArity

Throws:

- `NullPointerException`: if `arrayType` is a null reference
- `IllegalArgumentException`: if `arrayType` is not an array type or `arrayType` is not assignable to this method handle's trailing parameter type

## MethodHandle.isVarargsCollector()

```java
public boolean isVarargsCollector()
```

Determines if this method handle
supports variable arity calls.
Such method handles arise from the following sources:

- a call to asVarargsCollector

- a call to a lookup method
    which resolves to a variable arity Java method or constructor

- an `ldc` instruction of a `CONSTANT_MethodHandle`
    which resolves to a variable arity Java method or constructor

**Returns:** true if this method handle accepts more than one arity of plain, inexact `invoke` calls

**See also:** #asVarargsCollector

**See also:** #asFixedArity

## MethodHandle.asFixedArity()

```java
public MethodHandle asFixedArity()
```

Makes a *fixed arity* method handle which is otherwise
equivalent to the current method handle.

If the current method handle is not of
variable arity,
the current method handle is returned.
This is true even if the current method handle
could not be a valid input to `asVarargsCollector`.

Otherwise, the resulting fixed-arity method handle has the same
type and behavior of the current method handle,
except that isVarargsCollector
will be false.
The fixed-arity method handle may (or may not) be the
previous argument to `asVarargsCollector`.

Here is an example, of a list-making variable arity method handle:

**Returns:** a new method handle which accepts only a fixed number of arguments

**See also:** #asVarargsCollector

**See also:** #isVarargsCollector

**See also:** #withVarargs

## MethodHandle.bindTo(Object)

```java
public MethodHandle bindTo(Object x)
```

Binds a value `x` to the first argument of a method handle, without invoking it.
The new method handle adapts, as its *target*,
the current method handle by binding it to the given argument.
The type of the bound handle will be
the same as the type of the target, except that a single leading
reference parameter will be omitted.

When called, the bound handle inserts the given value `x`
as a new leading argument to the target.  The other arguments are
also passed unchanged.
What the target eventually returns is returned unchanged by the bound handle.

The reference `x` must be convertible to the first parameter
type of the target.

*Note:*  Because method handles are immutable, the target method handle
retains its original type and behavior.

*Note:* The resulting adapter is never a variable-arity method handle, even if the original target method handle was.

Parameters:

- `x`: the value to bind to the first argument of the target

**Returns:** a new method handle which prepends the given value to the incoming
        argument list, before calling the original method handle

**See also:** MethodHandles#insertArguments

Throws:

- `IllegalArgumentException`: if the target does not have a leading parameter type that is a reference type
- `ClassCastException`: if `x` cannot be converted to the leading parameter type of the target

## MethodHandle.describeConstable()

```java
public Optional<MethodHandleDesc> describeConstable()
```

Return a nominal descriptor for this instance, if one can be
constructed, or an empty `Optional` if one cannot be.

**Returns:** An `Optional` containing the resulting nominal descriptor,
or an empty `Optional` if one cannot be constructed.

**Since:** 12

## MethodHandle.toString()

```java
public String toString()
```

Returns a string representation of the method handle,
starting with the string `"MethodHandle"` and
ending with the string representation of the method handle's type.
In other words, this method returns a string equal to the value of:

(*Note:*  Future releases of this API may add further information
to the string representation.
Therefore, the present syntax should not be parsed by applications.)

**Returns:** a string representation of the method handle

## MethodHandle.customize()

```java
/*non-public*/ void customize()
```

Craft a LambdaForm customized for this particular MethodHandle.

## MethodHandle.updateForm(Function<LambdaForm, LambdaForm>)

```java
/*non-public*/ void updateForm(Function<LambdaForm, LambdaForm> updater)
```

Replace the old lambda form of this method handle with a new one.
The new one must be functionally equivalent to the old one.
Threads may continue running the old form indefinitely,
but it is likely that the new one will be preferred for new executions.
Use with discretion.
