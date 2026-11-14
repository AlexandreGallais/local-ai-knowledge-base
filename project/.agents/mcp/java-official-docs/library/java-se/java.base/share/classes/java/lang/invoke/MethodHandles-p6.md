---
title: "MethodHandles class (java.lang.invoke) (part 6 of 14)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/MethodHandles.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodHandles class (java.lang.invoke) (part 6 of 14)

## MethodHandles.unreflectGetter(Field)

```java
public MethodHandle unreflectGetter(Field f) throws IllegalAccessException
```

Produces a method handle giving read access to a reflected field.
The type of the method handle will have a return type of the field's
value type.
If the field is `static`, the method handle will take no arguments.
Otherwise, its single argument will be the instance containing
the field.
If the `Field` object's `accessible` flag is not set,
access checking is performed immediately on behalf of the lookup class.

If the field is static, and
if the returned method handle is invoked, the field's class will
be initialized, if it has not already been initialized.

Parameters:

- `f`: the reflected field

**Returns:** a method handle which can load values from the reflected field

Throws:

- `IllegalAccessException`: if access checking fails
- `NullPointerException`: if the argument is null

## MethodHandles.unreflectSetter(Field)

```java
public MethodHandle unreflectSetter(Field f) throws IllegalAccessException
```

Produces a method handle giving write access to a reflected field.
The type of the method handle will have a void return type.
If the field is `static`, the method handle will take a single
argument, of the field's value type, the value to be stored.
Otherwise, the two arguments will be the instance containing
the field, and the value to be stored.
If the `Field` object's `accessible` flag is not set,
access checking is performed immediately on behalf of the lookup class.

If the field is `final`, write access will not be
allowed and access checking will fail, except under certain
narrow circumstances documented for Field.set.
A method handle is returned only if a corresponding call to
the `Field` object's `set` method could return
normally.  In particular, fields which are both `static`
and `final` may never be set.

If the field is `static`, and
if the returned method handle is invoked, the field's class will
be initialized, if it has not already been initialized.

Parameters:

- `f`: the reflected field

**Returns:** a method handle which can store values into the reflected field

Throws:

- `IllegalAccessException`: if access checking fails, or if the field is `final` and write access is not enabled on the `Field` object
- `NullPointerException`: if the argument is null

## MethodHandles.unreflectVarHandle(Field)

```java
public VarHandle unreflectVarHandle(Field f) throws IllegalAccessException
```

Produces a VarHandle giving access to a reflected field `f`
of type `T` declared in a class of type `R`.
The VarHandle's variable type is `T`.
If the field is non-static the VarHandle has one coordinate type,
`R`.  Otherwise, the field is static, and the VarHandle has no
coordinate types.

Access checking is performed immediately on behalf of the lookup
class, regardless of the value of the field's `accessible`
flag.

If the field is static, and if the returned VarHandle is operated
on, the field's declaring class will be initialized, if it has not
already been initialized.

Certain access modes of the returned VarHandle are unsupported under
the following conditions:

- if the field is declared `final`, then the write, atomic
    update, numeric atomic update, and bitwise atomic update access
    modes are unsupported.

- if the field type is anything other than `byte`,
    `short`, `char`, `int`, `long`,
    `float`, or `double` then numeric atomic update
    access modes are unsupported.

- if the field type is anything other than `boolean`,
    `byte`, `short`, `char`, `int` or
    `long` then bitwise atomic update access modes are
    unsupported.

If the field is declared `volatile` then the returned VarHandle
will override access to the field (effectively ignore the
`volatile` declaration) in accordance to its specified
access modes.

If the field type is `float` or `double` then numeric
and atomic update access modes compare values using their bitwise
representation (see `Float.floatToRawIntBits` and
`Double.doubleToRawLongBits`, respectively).

Parameters:

- `f`: the reflected field, with a field of type `T`, and a declaring class of type `R`

**API note:** Bitwise comparison of `float` values or `double` values,
as performed by the numeric and atomic update access modes, differ
from the primitive `==` operator and the `Float.equals`
and `Double.equals` methods, specifically with respect to
comparing NaN values or comparing `-0.0` with `+0.0`.
Care should be taken when performing a compare and set or a compare
and exchange operation with such values since the operation may
unexpectedly fail.
There are many possible NaN values that are considered to be
`NaN` in Java, although no IEEE 754 floating-point operation
provided by Java can distinguish between them.  Operation failure can
occur if the expected or witness value is a NaN value and it is
transformed (perhaps in a platform specific manner) into another NaN
value, and thus has a different bitwise representation (see
`Float.intBitsToFloat` or `Double.longBitsToDouble` for more
details).
The values `-0.0` and `+0.0` have different bitwise
representations but are considered equal when using the primitive
`==` operator.  Operation failure can occur if, for example, a
numeric algorithm computes an expected value to be say `-0.0`
and previously computed the witness value to be say `+0.0`.

**Returns:** a VarHandle giving access to non-static fields or a static
field

**Since:** 9

Throws:

- `IllegalAccessException`: if access checking fails
- `NullPointerException`: if the argument is null

## MethodHandles.revealDirect(MethodHandle)

```java
public MethodHandleInfo revealDirect(MethodHandle target)
```

Cracks a direct method handle
created by this lookup object or a similar one.
Security and access checks are performed to ensure that this lookup object
is capable of reproducing the target method handle.
This means that the cracking may fail if target is a direct method handle
but was created by an unrelated lookup object.
This can happen if the method handle is caller sensitive
and was created by a lookup object for a different class.

Parameters:

- `target`: a direct method handle to crack into symbolic reference components

**Returns:** a symbolic reference which can be used to reconstruct this method handle from this lookup object

**See also:** MethodHandleInfo

**Since:** 1.8

Throws:

- `IllegalArgumentException`: if the target is not a direct method handle or if access checking fails
- `NullPointerException`: if the target is `null`

## MethodHandles.hasPrivateAccess()

```java
public boolean hasPrivateAccess()
```

Returns `true` if this lookup has `PRIVATE` and `MODULE` access.

**Returns:** `true` if this lookup has `PRIVATE` and `MODULE` access.

**Deprecated:** This method was originally designed to test `PRIVATE` access
that implies full privilege access but `MODULE` access has since become
independent of `PRIVATE` access.  It is recommended to call
`hasFullPrivilegeAccess()` instead.

**Since:** 9

## MethodHandles.hasFullPrivilegeAccess()

```java
public boolean hasFullPrivilegeAccess()
```

Returns `true` if this lookup has *full privilege access*,
i.e. `PRIVATE` and `MODULE` access.
A `Lookup` object must have full privilege access in order to
access all members that are allowed to the
lookup class.

**Returns:** `true` if this lookup has full privilege access.

**Since:** 14

**See also:** private and module access

## MethodHandles.linkMethodHandleConstant(byte, Class<?>, String, Object)

```java
/*non-public*/ MethodHandle linkMethodHandleConstant(byte refKind, Class<?> defc, String name, Object type) throws ReflectiveOperationException
```

Hook called from the JVM (via MethodHandleNatives) to link MH constants:

## MethodHandles.arrayConstructor(Class<?>)

```java
public static MethodHandle arrayConstructor(Class<?> arrayClass) throws IllegalArgumentException
```

Produces a method handle constructing arrays of a desired type,
as if by the `anewarray` bytecode.
The return type of the method handle will be the array type.
The type of its sole argument will be `int`, which specifies the size of the array.

 If the returned method handle is invoked with a negative
array size, a `NegativeArraySizeException` will be thrown.

Parameters:

- `arrayClass`: an array type

**Returns:** a method handle which can create arrays of the given type

**See also:** java.lang.reflect.Array#newInstance(Class, int)

**jvms:** 6.5 `anewarray` Instruction

**Since:** 9

Throws:

- `NullPointerException`: if the argument is `null`
- `IllegalArgumentException`: if `arrayClass` is not an array type

## MethodHandles.arrayLength(Class<?>)

```java
public static MethodHandle arrayLength(Class<?> arrayClass) throws IllegalArgumentException
```

Produces a method handle returning the length of an array,
as if by the `arraylength` bytecode.
The type of the method handle will have `int` as return type,
and its sole argument will be the array type.

 If the returned method handle is invoked with a `null`
array reference, a `NullPointerException` will be thrown.

Parameters:

- `arrayClass`: an array type

**Returns:** a method handle which can retrieve the length of an array of the given array type

**jvms:** 6.5 `arraylength` Instruction

**Since:** 9

Throws:

- `NullPointerException`: if the argument is `null`
- `IllegalArgumentException`: if arrayClass is not an array type

## MethodHandles.arrayElementGetter(Class<?>)

```java
public static MethodHandle arrayElementGetter(Class<?> arrayClass) throws IllegalArgumentException
```

Produces a method handle giving read access to elements of an array,
as if by the `aaload` bytecode.
The type of the method handle will have a return type of the array's
element type.  Its first argument will be the array type,
and the second will be `int`.

 When the returned method handle is invoked,
the array reference and array index are checked.
A `NullPointerException` will be thrown if the array reference
is `null` and an `ArrayIndexOutOfBoundsException` will be
thrown if the index is negative or if it is greater than or equal to
the length of the array.

Parameters:

- `arrayClass`: an array type

**Returns:** a method handle which can load values from the given array type

**jvms:** 6.5 `aaload` Instruction

Throws:

- `NullPointerException`: if the argument is null
- `IllegalArgumentException`: if arrayClass is not an array type

## MethodHandles.arrayElementSetter(Class<?>)

```java
public static MethodHandle arrayElementSetter(Class<?> arrayClass) throws IllegalArgumentException
```

Produces a method handle giving write access to elements of an array,
as if by the `astore` bytecode.
The type of the method handle will have a void return type.
Its last argument will be the array's element type.
The first and second arguments will be the array type and int.

 When the returned method handle is invoked,
the array reference and array index are checked.
A `NullPointerException` will be thrown if the array reference
is `null` and an `ArrayIndexOutOfBoundsException` will be
thrown if the index is negative or if it is greater than or equal to
the length of the array.

Parameters:

- `arrayClass`: the class of an array

**Returns:** a method handle which can store values into the array type

**jvms:** 6.5 `aastore` Instruction

Throws:

- `NullPointerException`: if the argument is null
- `IllegalArgumentException`: if arrayClass is not an array type

## MethodHandles.arrayElementVarHandle(Class<?>)

```java
public static VarHandle arrayElementVarHandle(Class<?> arrayClass) throws IllegalArgumentException
```

Produces a VarHandle giving access to elements of an array of type
`arrayClass`.  The VarHandle's variable type is the component type
of `arrayClass` and the list of coordinate types is
`(arrayClass, int)`, where the `int` coordinate type
corresponds to an argument that is an index into an array.

Certain access modes of the returned VarHandle are unsupported under
the following conditions:

- if the component type is anything other than `byte`,
    `short`, `char`, `int`, `long`,
    `float`, or `double` then numeric atomic update access
    modes are unsupported.

- if the component type is anything other than `boolean`,
    `byte`, `short`, `char`, `int` or
    `long` then bitwise atomic update access modes are
    unsupported.

If the component type is `float` or `double` then numeric
and atomic update access modes compare values using their bitwise
representation (see `Float.floatToRawIntBits` and
`Double.doubleToRawLongBits`, respectively).

 When the returned `VarHandle` is invoked,
the array reference and array index are checked.
A `NullPointerException` will be thrown if the array reference
is `null` and an `ArrayIndexOutOfBoundsException` will be
thrown if the index is negative or if it is greater than or equal to
the length of the array.

Parameters:

- `arrayClass`: the class of an array, of type `T[]`

**API note:** Bitwise comparison of `float` values or `double` values,
as performed by the numeric and atomic update access modes, differ
from the primitive `==` operator and the `Float.equals`
and `Double.equals` methods, specifically with respect to
comparing NaN values or comparing `-0.0` with `+0.0`.
Care should be taken when performing a compare and set or a compare
and exchange operation with such values since the operation may
unexpectedly fail.
There are many possible NaN values that are considered to be
`NaN` in Java, although no IEEE 754 floating-point operation
provided by Java can distinguish between them.  Operation failure can
occur if the expected or witness value is a NaN value and it is
transformed (perhaps in a platform specific manner) into another NaN
value, and thus has a different bitwise representation (see
`Float.intBitsToFloat` or `Double.longBitsToDouble` for more
details).
The values `-0.0` and `+0.0` have different bitwise
representations but are considered equal when using the primitive
`==` operator.  Operation failure can occur if, for example, a
numeric algorithm computes an expected value to be say `-0.0`
and previously computed the witness value to be say `+0.0`.

**Returns:** a VarHandle giving access to elements of an array

**Since:** 9

Throws:

- `NullPointerException`: if the arrayClass is null
- `IllegalArgumentException`: if arrayClass is not an array type
