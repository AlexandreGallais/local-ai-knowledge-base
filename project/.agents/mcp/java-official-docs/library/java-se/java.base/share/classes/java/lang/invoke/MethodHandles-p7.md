---
title: "MethodHandles class (java.lang.invoke) (part 7 of 14)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/MethodHandles.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodHandles class (java.lang.invoke) (part 7 of 14)

## MethodHandles.byteArrayViewVarHandle(Class<?>, ByteOrder)

```java
public static VarHandle byteArrayViewVarHandle(Class<?> viewArrayClass, ByteOrder byteOrder) throws IllegalArgumentException
```

Produces a VarHandle giving access to elements of a `byte[]` array
viewed as if it were a different primitive array type, such as
`int[]` or `long[]`.
The VarHandle's variable type is the component type of
`viewArrayClass` and the list of coordinate types is
`(byte[], int)`, where the `int` coordinate type
corresponds to an argument that is an index into a `byte[]` array.
The returned VarHandle accesses bytes at an index in a `byte[]`
array, composing bytes to or from a value of the component type of
`viewArrayClass` according to the given endianness.

The supported component types (variables types) are `short`,
`char`, `int`, `long`, `float` and
`double`.

Access of bytes at a given index will result in an
`ArrayIndexOutOfBoundsException` if the index is less than `0`
or greater than the `byte[]` array length minus the size (in bytes)
of `T`.

Only plain get and set
access modes are supported by the returned var handle. For all other access modes, an
`UnsupportedOperationException` will be thrown.

Parameters:

- `viewArrayClass`: the view array class, with a component type of type `T`
- `byteOrder`: the endianness of the view array elements, as stored in the underlying `byte` array

**API note:** if access modes other than plain access are required, clients should
consider using off-heap memory through
direct byte buffers or
off-heap memory segments,
or memory segments backed by a
{@code long[]},
for which stronger alignment guarantees can be made.

**Returns:** a VarHandle giving access to elements of a `byte[]` array
viewed as if elements corresponding to the components type of the view
array class

**Since:** 9

Throws:

- `NullPointerException`: if viewArrayClass or byteOrder is null
- `IllegalArgumentException`: if viewArrayClass is not an array type
- `UnsupportedOperationException`: if the component type of viewArrayClass is not supported as a variable type

## MethodHandles.byteBufferViewVarHandle(Class<?>, ByteOrder)

```java
public static VarHandle byteBufferViewVarHandle(Class<?> viewArrayClass, ByteOrder byteOrder) throws IllegalArgumentException
```

Produces a VarHandle giving access to elements of a `ByteBuffer`
viewed as if it were an array of elements of a different primitive
component type to that of `byte`, such as `int[]` or
`long[]`.
The VarHandle's variable type is the component type of
`viewArrayClass` and the list of coordinate types is
`(ByteBuffer, int)`, where the `int` coordinate type
corresponds to an argument that is an index into a `byte[]` array.
The returned VarHandle accesses bytes at an index in a
`ByteBuffer`, composing bytes to or from a value of the component
type of `viewArrayClass` according to the given endianness.

The supported component types (variables types) are `short`,
`char`, `int`, `long`, `float` and
`double`.

Access will result in a `ReadOnlyBufferException` for anything
other than the read access modes if the `ByteBuffer` is read-only.

Access of bytes at a given index will result in an
`IndexOutOfBoundsException` if the index is less than `0`
or greater than the `ByteBuffer` limit minus the size (in bytes) of
`T`.

For heap byte buffers, access is always unaligned. As a result, only the plain
get
and set access modes are supported by the
returned var handle. For all other access modes, an `IllegalStateException`
will be thrown.

For direct buffers only, access of bytes at an index may be aligned or misaligned for `T`,
with respect to the underlying memory address, `A` say, associated
with the `ByteBuffer` and index.
If access is misaligned then access for anything other than the
`get` and `set` access modes will result in an
`IllegalStateException`.  In such cases atomic access is only
guaranteed with respect to the largest power of two that divides the GCD
of `A` and the size (in bytes) of `T`.
If access is aligned then following access modes are supported and are
guaranteed to support atomic access:

- read write access modes for all `T`.  Access modes `get`
    and `set` for `long` and `double` are supported but
    have no atomicity guarantee, as described in Section  of
    *The Java Language Specification*.

- atomic update access modes for `int`, `long`,
    `float` or `double`.
    (Future major platform releases of the JDK may support additional
    types for certain currently unsupported access modes.)

- numeric atomic update access modes for `int` and `long`.
    (Future major platform releases of the JDK may support additional
    numeric types for certain currently unsupported access modes.)

- bitwise atomic update access modes for `int` and `long`.
    (Future major platform releases of the JDK may support additional
    numeric types for certain currently unsupported access modes.)

Misaligned access, and therefore atomicity guarantees, may be determined
for a `ByteBuffer`, `bb` (direct or otherwise), an
`index`, `T` and its corresponding boxed type,
`T_BOX`, as follows:

```java
int sizeOfT = T_BOX.BYTES;  // size in bytes of T
ByteBuffer bb = ...
int misalignedAtIndex = bb.alignmentOffset(index, sizeOfT);
boolean isMisaligned = misalignedAtIndex != 0;
```

If the variable type is `float` or `double` then atomic
update access modes compare values using their bitwise representation
(see `Float.floatToRawIntBits` and
`Double.doubleToRawLongBits`, respectively).

Parameters:

- `viewArrayClass`: the view array class, with a component type of type `T`
- `byteOrder`: the endianness of the view array elements, as stored in the underlying `ByteBuffer` (Note this overrides the endianness of a `ByteBuffer`)

**Returns:** a VarHandle giving access to elements of a `ByteBuffer`
viewed as if elements corresponding to the components type of the view
array class

**Since:** 9

Throws:

- `NullPointerException`: if viewArrayClass or byteOrder is null
- `IllegalArgumentException`: if viewArrayClass is not an array type
- `UnsupportedOperationException`: if the component type of viewArrayClass is not supported as a variable type

## MethodHandles.spreadInvoker(MethodType, int)

```java
public static MethodHandle spreadInvoker(MethodType type, int leadingArgCount)
```

Produces a method handle which will invoke any method handle of the
given `type`, with a given number of trailing arguments replaced by
a single trailing `Object[]` array.
The resulting invoker will be a method handle with the following
arguments:

- a single `MethodHandle` target

- zero or more leading values (counted by `leadingArgCount`)

- an `Object[]` array containing trailing arguments

The invoker will invoke its target like a call to invoke with
the indicated `type`.
That is, if the target is exactly of the given `type`, it will behave
like `invokeExact`; otherwise it behave as if asType
is used to convert the target to the required `type`.

The type of the returned invoker will not be the given `type`, but rather
will have all parameters except the first `leadingArgCount`
replaced by a single array of type `Object[]`, which will be
the final parameter.

Before invoking its target, the invoker will spread the final array, apply
reference casts as necessary, and unbox and widen primitive arguments.
If, when the invoker is called, the supplied array argument does
not have the correct number of elements, the invoker will throw
an `IllegalArgumentException` instead of invoking the target.

This method is equivalent to the following code (though it may be more efficient):

This method throws no reflective exceptions.

Parameters:

- `type`: the desired target type
- `leadingArgCount`: number of fixed arguments, to be passed unchanged to the target

**Returns:** a method handle suitable for invoking any method handle of the given type

Throws:

- `NullPointerException`: if `type` is null
- `IllegalArgumentException`: if `leadingArgCount` is not in the range from 0 to `type.parameterCount()` inclusive, or if the resulting method handle's type would have too many parameters

## MethodHandles.exactInvoker(MethodType)

```java
public static MethodHandle exactInvoker(MethodType type)
```

Produces a special *invoker method handle* which can be used to
invoke any method handle of the given type, as if by invokeExact.
The resulting invoker will have a type which is
exactly equal to the desired type, except that it will accept
an additional leading argument of type `MethodHandle`.

This method is equivalent to the following code (though it may be more efficient):
`publicLookup().findVirtual(MethodHandle.class, "invokeExact", type)`

*Discussion:*
Invoker method handles can be useful when working with variable method handles
of unknown types.
For example, to emulate an `invokeExact` call to a variable method
handle `M`, extract its type `T`,
look up the invoker method `X` for `T`,
and call the invoker method, as `X.invoke(T, A...)`.
(It would not work to call `X.invokeExact`, since the type `T`
is unknown.)
If spreading, collecting, or other argument transformations are required,
they can be applied once to the invoker `X` and reused on many `M`
method handle values, as long as they are compatible with the type of `X`.

*(Note:  The invoker method is not available via the Core Reflection API.
An attempt to call java.lang.reflect.Method.invoke
on the declared `invokeExact` or `invoke` method will raise an
UnsupportedOperationException.)*

This method throws no reflective exceptions.

Parameters:

- `type`: the desired target type

**Returns:** a method handle suitable for invoking any method handle of the given type

Throws:

- `IllegalArgumentException`: if the resulting method handle's type would have too many parameters

## MethodHandles.invoker(MethodType)

```java
public static MethodHandle invoker(MethodType type)
```

Produces a special *invoker method handle* which can be used to
invoke any method handle compatible with the given type, as if by invoke.
The resulting invoker will have a type which is
exactly equal to the desired type, except that it will accept
an additional leading argument of type `MethodHandle`.

Before invoking its target, if the target differs from the expected type,
the invoker will apply reference casts as
necessary and box, unbox, or widen primitive values, as if by asType.
Similarly, the return value will be converted as necessary.
If the target is a variable arity method handle,
the required arity conversion will be made, again as if by asType.

This method is equivalent to the following code (though it may be more efficient):
`publicLookup().findVirtual(MethodHandle.class, "invoke", type)`

*Discussion:*
A general method type is one which
mentions only `Object` arguments and return values.
An invoker for such a type is capable of calling any method handle
of the same arity as the general type.

*(Note:  The invoker method is not available via the Core Reflection API.
An attempt to call java.lang.reflect.Method.invoke
on the declared `invokeExact` or `invoke` method will raise an
UnsupportedOperationException.)*

This method throws no reflective exceptions.

Parameters:

- `type`: the desired target type

**Returns:** a method handle suitable for invoking any method handle convertible to the given type

Throws:

- `IllegalArgumentException`: if the resulting method handle's type would have too many parameters

## MethodHandles.varHandleExactInvoker(VarHandle.AccessMode, MethodType)

```java
public static MethodHandle varHandleExactInvoker(VarHandle.AccessMode accessMode, MethodType type)
```

Produces a special *invoker method handle* which can be used to
invoke a signature-polymorphic access mode method on any VarHandle whose
associated access mode type is compatible with the given type.
The resulting invoker will have a type which is exactly equal to the
desired given type, except that it will accept an additional leading
argument of type `VarHandle`.

Parameters:

- `accessMode`: the VarHandle access mode
- `type`: the desired target type

**Returns:** a method handle suitable for invoking an access mode method of
        any VarHandle whose access mode type is of the given type.

**Since:** 9

## MethodHandles.varHandleInvoker(VarHandle.AccessMode, MethodType)

```java
public static MethodHandle varHandleInvoker(VarHandle.AccessMode accessMode, MethodType type)
```

Produces a special *invoker method handle* which can be used to
invoke a signature-polymorphic access mode method on any VarHandle whose
associated access mode type is compatible with the given type.
The resulting invoker will have a type which is exactly equal to the
desired given type, except that it will accept an additional leading
argument of type `VarHandle`.

Before invoking its target, if the access mode type differs from the
desired given type, the invoker will apply reference casts as necessary
and box, unbox, or widen primitive values, as if by
asType.  Similarly, the return value will be
converted as necessary.

This method is equivalent to the following code (though it may be more
efficient): `publicLookup().findVirtual(VarHandle.class, accessMode.name(), type)`

Parameters:

- `accessMode`: the VarHandle access mode
- `type`: the desired target type

**Returns:** a method handle suitable for invoking an access mode method of
        any VarHandle whose access mode type is convertible to the given
        type.

**Since:** 9
