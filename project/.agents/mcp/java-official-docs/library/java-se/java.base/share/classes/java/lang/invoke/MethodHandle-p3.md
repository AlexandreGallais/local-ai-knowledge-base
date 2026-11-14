---
title: "MethodHandle class (java.lang.invoke) (part 3 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/MethodHandle.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodHandle class (java.lang.invoke) (part 3 of 4)

## MethodHandle.invokeWithArguments(java.util.List<?>)

```java
public Object invokeWithArguments(java.util.List<?> arguments) throws Throwable
```

Performs a variable arity invocation, passing the arguments in the given list
to the method handle, as if via an inexact invoke from a call site
which mentions only the type `Object`, and whose actual argument count is the length
of the argument list.

This method is also equivalent to the following code:

Jumbo-sized lists are acceptable if this method handle has variable arity.
See `invokeWithArguments(Object[])` for details.

Parameters:

- `arguments`: the arguments to pass to the target

**Returns:** the result returned by the target

Throws:

- `NullPointerException`: if `arguments` is a null reference
- `ClassCastException`: if an argument cannot be converted by reference casting
- `WrongMethodTypeException`: if the target's type cannot be adjusted to take the given number of `Object` arguments
- `Throwable`: anything thrown by the target method invocation

## MethodHandle.asType(MethodType)

```java
public final MethodHandle asType(MethodType newType)
```

Produces an adapter method handle which adapts the type of the
current method handle to a new type.
The resulting method handle is guaranteed to report a type
which is equal to the desired new type.

If the original type and new type are equal, returns `this`.

The new method handle, when invoked, will perform the following
steps:

- Convert the incoming argument list to match the original
    method handle's argument list.

- Invoke the original method handle on the converted argument list.

- Convert any result returned by the original method handle
    to the return type of new method handle.

This method provides the crucial behavioral difference between
invokeExact and plain, inexact invoke.
The two methods
perform the same steps when the caller's type descriptor exactly matches
the callee's, but when the types differ, plain invoke
also calls `asType` (or some internal equivalent) in order
to match up the caller's and callee's types.

If the current method is a variable arity method handle
argument list conversion may involve the conversion and collection
of several arguments into an array, as
described elsewhere.
In every other case, all conversions are applied *pairwise*,
which means that each argument or return value is converted to
exactly one argument or return value (or no return value).
The applied conversions are defined by consulting
the corresponding component types of the old and new
method handle types.

Let *T0* and *T1* be corresponding new and old parameter types,
or old and new return types.  Specifically, for some valid index `i`, let
*T0*`=newType.parameterType(i)` and *T1*`=this.type().parameterType(i)`.
Or else, going the other way for return values, let
*T0*`=this.type().returnType()` and *T1*`=newType.returnType()`.
If the types are the same, the new method handle makes no change
to the corresponding argument or return value (if any).
Otherwise, one of the following conversions is applied
if possible:

- If *T0* and *T1* are references, then a cast to *T1* is applied.
    (The types do not need to be related in any particular way.
    This is because a dynamic value of null can convert to any reference type.)

- If *T0* and *T1* are primitives, then a Java method invocation
    conversion (JLS ) is applied, if one exists.
    (Specifically, *T0* must convert to *T1* by a widening primitive conversion.)

- If *T0* is a primitive and *T1* a reference,
    a Java casting conversion (JLS ) is applied if one exists.
    (Specifically, the value is boxed from *T0* to its wrapper class,
    which is then widened as needed to *T1*.)

- If *T0* is a reference and *T1* a primitive, an unboxing
    conversion will be applied at runtime, possibly followed
    by a Java method invocation conversion (JLS )
    on the primitive value.  (These are the primitive widening conversions.)
    *T0* must be a wrapper class or a supertype of one.
    (In the case where *T0* is Object, these are the conversions
    allowed by java.lang.reflect.Method.invoke.)
    The unboxing conversion must have a possibility of success, which means that
    if *T0* is not itself a wrapper class, there must exist at least one
    wrapper class *TW* which is a subtype of *T0* and whose unboxed
    primitive value can be widened to *T1*.

- If the return type *T1* is marked as void, any returned value is discarded

- If the return type *T0* is void and *T1* a reference, a null value is introduced.

- If the return type *T0* is void and *T1* a primitive,
    a zero value is introduced.

(*Note:* Both *T0* and *T1* may be regarded as static types,
because neither corresponds specifically to the *dynamic type* of any
actual argument or return value.)

The method handle conversion cannot be made if any one of the required
pairwise conversions cannot be made.

At runtime, the conversions applied to reference arguments
or return values may require additional runtime checks which can fail.
An unboxing operation may fail because the original reference is null,
causing a NullPointerException.
An unboxing operation or a reference cast may also fail on a reference
to an object of the wrong type,
causing a ClassCastException.
Although an unboxing operation may accept several kinds of wrappers,
if none are available, a `ClassCastException` will be thrown.

Parameters:

- `newType`: the expected type of the new method handle

**Returns:** a method handle which delegates to `this` after performing
          any necessary argument conversions, and arranges for any
          necessary return value conversions

**See also:** MethodHandles#explicitCastArguments

Throws:

- `NullPointerException`: if `newType` is a null reference
- `WrongMethodTypeException`: if the conversion cannot be made

## MethodHandle.asTypeUncached(MethodType)

```java
/*non-public*/ MethodHandle asTypeUncached(MethodType newType)
```

Override this to change asType behavior.

## MethodHandle.asSpreader(Class<?>, int)

```java
public MethodHandle asSpreader(Class<?> arrayType, int arrayLength)
```

Makes an *array-spreading* method handle, which accepts a trailing array argument
and spreads its elements as positional arguments.
The new method handle adapts, as its *target*,
the current method handle.  The type of the adapter will be
the same as the type of the target, except that the final
`arrayLength` parameters of the target's type are replaced
by a single array parameter of type `arrayType`.

If the array element type differs from any of the corresponding
argument types on the original target,
the original target is adapted to take the array elements directly,
as if by a call to asType.

When called, the adapter replaces a trailing array argument
by the array's elements, each as its own argument to the target.
(The order of the arguments is preserved.)
They are converted pairwise by casting and/or unboxing
to the types of the trailing parameters of the target.
Finally the target is called.
What the target eventually returns is returned unchanged by the adapter.

Before calling the target, the adapter verifies that the array
contains exactly enough elements to provide a correct argument count
to the target method handle.
(The array may also be null when zero elements are required.)

When the adapter is called, the length of the supplied `array`
argument is queried as if by `array.length` or `arraylength`
bytecode. If the adapter accepts a zero-length trailing array argument,
the supplied `array` argument can either be a zero-length array or
`null`; otherwise, the adapter will throw a `NullPointerException`
if the array is `null` and throw an `IllegalArgumentException`
if the array does not have the correct number of elements.

Here are some simple examples of array-spreading method handles:

Parameters:

- `arrayType`: usually `Object[]`, the type of the array argument from which to extract the spread arguments
- `arrayLength`: the number of arguments to spread from an incoming array argument

**Returns:** a new method handle which spreads its final array argument,
        before calling the original method handle

**See also:** #asCollector

Throws:

- `NullPointerException`: if `arrayType` is a null reference
- `IllegalArgumentException`: if `arrayType` is not an array type, or if target does not have at least `arrayLength` parameter types, or if `arrayLength` is negative, or if the resulting method handle's type would have too many parameters
- `WrongMethodTypeException`: if the implied `asType` call fails

## MethodHandle.asSpreader(int, Class<?>, int)

```java
public MethodHandle asSpreader(int spreadArgPos, Class<?> arrayType, int arrayLength)
```

Makes an *array-spreading* method handle, which accepts an array argument at a given position and spreads
its elements as positional arguments in place of the array. The new method handle adapts, as its *target*,
the current method handle. The type of the adapter will be the same as the type of the target, except that the
`arrayLength` parameters of the target's type, starting at the zero-based position `spreadArgPos`,
are replaced by a single array parameter of type `arrayType`.

This method behaves very much like int), but accepts an additional `spreadArgPos`
argument to indicate at which position in the parameter list the spreading should take place.

Parameters:

- `spreadArgPos`: the position (zero-based index) in the argument list at which spreading should start.
- `arrayType`: usually `Object[]`, the type of the array argument from which to extract the spread arguments
- `arrayLength`: the number of arguments to spread from an incoming array argument

**API note:** Example:

**Returns:** a new method handle which spreads an array argument at a given position,
        before calling the original method handle

**See also:** #asSpreader(Class, int)

**Since:** 9

Throws:

- `NullPointerException`: if `arrayType` is a null reference
- `IllegalArgumentException`: if `arrayType` is not an array type, or if target does not have at least `arrayLength` parameter types, or if `arrayLength` is negative, or if `spreadArgPos` has an illegal value (negative, or together with arrayLength exceeding the number of arguments), or if the resulting method handle's type would have too many parameters
- `WrongMethodTypeException`: if the implied `asType` call fails

## MethodHandle.withVarargs(boolean)

```java
public MethodHandle withVarargs(boolean makeVarargs)
```

Adapts this method handle to be variable arity
if the boolean flag is true, else fixed arity.
If the method handle is already of the proper arity mode, it is returned
unchanged.

Parameters:

- `makeVarargs`: true if the return method handle should have variable arity behavior

**API note:** This method is sometimes useful when adapting a method handle that
may be variable arity, to ensure that the resulting adapter is also
variable arity if and only if the original handle was.  For example,
this code changes the first argument of a handle `mh` to `int` without
disturbing its variable arity property:
`mh.asType(mh.type().changeParameterType(0,int.class)) .withVarargs(mh.isVarargsCollector())`

This call is approximately equivalent to the following code:

**Returns:** a method handle of the same type, with possibly adjusted variable arity behavior

**Since:** 9

**See also:** #asVarargsCollector

**See also:** #asFixedArity

Throws:

- `IllegalArgumentException`: if `makeVarargs` is true and this method handle does not have a trailing array parameter

## MethodHandle.asCollector(Class<?>, int)

```java
public MethodHandle asCollector(Class<?> arrayType, int arrayLength)
```

Makes an *array-collecting* method handle, which accepts a given number of trailing
positional arguments and collects them into an array argument.
The new method handle adapts, as its *target*,
the current method handle.  The type of the adapter will be
the same as the type of the target, except that a single trailing
parameter (usually of type `arrayType`) is replaced by
`arrayLength` parameters whose type is element type of `arrayType`.

If the array type differs from the final argument type on the original target,
the original target is adapted to take the array type directly,
as if by a call to asType.

When called, the adapter replaces its trailing `arrayLength`
arguments by a single new array of type `arrayType`, whose elements
comprise (in order) the replaced arguments.
Finally the target is called.
What the target eventually returns is returned unchanged by the adapter.

(The array may also be a shared constant when `arrayLength` is zero.)

(*Note:* The `arrayType` is often identical to the
last parameter type
of the original target.
It is an explicit argument for symmetry with `asSpreader`, and also
to allow the target to use a simple `Object` as its last parameter type.)

In order to create a collecting adapter which is not restricted to a particular
number of collected arguments, use asVarargsCollector
or withVarargs instead.

Here are some examples of array-collecting method handles:

*Note:* The resulting adapter is never a variable-arity method handle, even if the original target method handle was.

Parameters:

- `arrayType`: often `Object[]`, the type of the array argument which will collect the arguments
- `arrayLength`: the number of arguments to collect into a new array argument

**Returns:** a new method handle which collects some trailing argument
        into an array, before calling the original method handle

**See also:** #asSpreader

**See also:** #asVarargsCollector

Throws:

- `NullPointerException`: if `arrayType` is a null reference
- `IllegalArgumentException`: if `arrayType` is not an array type or `arrayType` is not assignable to this method handle's trailing parameter type, or `arrayLength` is not a legal array size, or the resulting method handle's type would have too many parameters
- `WrongMethodTypeException`: if the implied `asType` call fails
