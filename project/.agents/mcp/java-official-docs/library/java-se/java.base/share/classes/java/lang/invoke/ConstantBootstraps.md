---
title: "ConstantBootstraps class (java.lang.invoke)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/ConstantBootstraps.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ConstantBootstraps class (java.lang.invoke)

```java
public final class ConstantBootstraps
```

Bootstrap methods for dynamically-computed constants.

The bootstrap methods in this class will throw a
`NullPointerException` for any reference argument that is `null`,
unless the argument is specified to be unused or specified to accept a
`null` value.

**Since:** 11

## ConstantBootstraps.nullConstant(MethodHandles.Lookup, String, Class<?>)

```java
public static Object nullConstant(MethodHandles.Lookup lookup, String name, Class<?> type)
```

Returns a `null` object reference for the reference type specified
by `type`.

Parameters:

- `lookup`: unused
- `name`: unused
- `type`: a reference type

**Returns:** a `null` value

Throws:

- `IllegalArgumentException`: if `type` is not a reference type

## ConstantBootstraps.primitiveClass(MethodHandles.Lookup, String, Class<?>)

```java
public static Class<?> primitiveClass(MethodHandles.Lookup lookup, String name, Class<?> type)
```

Returns a `Class` mirror for the primitive type whose type
descriptor is specified by `name`.

Parameters:

- `lookup`: unused
- `name`: the descriptor (JVMS ) of the desired primitive type
- `type`: the required result type (must be `Class.class`)

**Returns:** the `Class` mirror

Throws:

- `IllegalArgumentException`: if the name is not a descriptor for a primitive type or the type is not `Class.class`

## ConstantBootstraps.enumConstant(MethodHandles.Lookup, String, Class<E>)

```java
public static <E extends Enum<E>> E enumConstant(MethodHandles.Lookup lookup, String name, Class<E> type)
```

Returns an `enum` constant of the type specified by `type`
with the name specified by `name`.

Parameters:

- `lookup`: the lookup context describing the class performing the operation (normally stacked by the JVM)
- `name`: the name of the constant to return, which must exactly match an enum constant in the specified type.
- `type`: the `Class` object describing the enum type for which a constant is to be returned
- `<E>`: The enum type for which a constant value is to be returned

**Returns:** the enum constant of the specified enum type with the
specified name

**See also:** Enum#valueOf(Class, String)

Throws:

- `IllegalAccessError`: if the declaring class or the field is not accessible to the class performing the operation
- `IllegalArgumentException`: if the specified enum type has no constant with the specified name, or the specified class object does not represent an enum type

## ConstantBootstraps.getStaticFinal(MethodHandles.Lookup, String, Class<?>, Class<?>)

```java
public static Object getStaticFinal(MethodHandles.Lookup lookup, String name, Class<?> type, Class<?> declaringClass)
```

Returns the value of a static final field.

Parameters:

- `lookup`: the lookup context describing the class performing the operation (normally stacked by the JVM)
- `name`: the name of the field
- `type`: the type of the field
- `declaringClass`: the class in which the field is declared

**Returns:** the value of the field

Throws:

- `IllegalAccessError`: if the declaring class or the field is not accessible to the class performing the operation
- `NoSuchFieldError`: if the specified field does not exist
- `IncompatibleClassChangeError`: if the specified field is not `final`

## ConstantBootstraps.getStaticFinal(MethodHandles.Lookup, String, Class<?>)

```java
public static Object getStaticFinal(MethodHandles.Lookup lookup, String name, Class<?> type)
```

Returns the value of a static final field declared in the class which
is the same as the field's type (or, for primitive-valued fields,
declared in the wrapper class.)  This is a simplified form of
String, Class, Class)
for the case where a class declares distinguished constant instances of
itself.

Parameters:

- `lookup`: the lookup context describing the class performing the operation (normally stacked by the JVM)
- `name`: the name of the field
- `type`: the type of the field

**Returns:** the value of the field

**See also:** #getStaticFinal(MethodHandles.Lookup, String, Class, Class)

Throws:

- `IllegalAccessError`: if the declaring class or the field is not accessible to the class performing the operation
- `NoSuchFieldError`: if the specified field does not exist
- `IncompatibleClassChangeError`: if the specified field is not `final`

## ConstantBootstraps.invoke(MethodHandles.Lookup, String, Class<?>, MethodHandle, Object...)

```java
public static Object invoke(MethodHandles.Lookup lookup, String name, Class<?> type, MethodHandle handle, Object... args) throws Throwable
```

Returns the result of invoking a method handle with the provided
arguments.

This method behaves as if the method handle to be invoked is the result
of adapting the given method handle, via `MethodHandle.asType`, to
adjust the return type to the desired type.

Parameters:

- `lookup`: unused
- `name`: unused
- `type`: the desired type of the value to be returned, which must be compatible with the return type of the method handle
- `handle`: the method handle to be invoked
- `args`: the arguments to pass to the method handle, as if with `MethodHandle.invokeWithArguments`. Each argument may be `null`.

**Returns:** the result of invoking the method handle

Throws:

- `WrongMethodTypeException`: if the handle's method type cannot be adjusted to take the given number of arguments, or if the handle's return type cannot be adjusted to the desired type
- `ClassCastException`: if an argument or the result produced by invoking the handle cannot be converted by reference casting
- `Throwable`: anything thrown by the method handle invocation

## ConstantBootstraps.fieldVarHandle(MethodHandles.Lookup, String, Class<VarHandle>, Class<?>, Class<?>)

```java
public static VarHandle fieldVarHandle(MethodHandles.Lookup lookup, String name, Class<VarHandle> type, Class<?> declaringClass, Class<?> fieldType)
```

Finds a `VarHandle` for an instance field.

Parameters:

- `lookup`: the lookup context describing the class performing the operation (normally stacked by the JVM)
- `name`: the name of the field
- `type`: the required result type (must be `Class<VarHandle>`)
- `declaringClass`: the class in which the field is declared
- `fieldType`: the type of the field

**Returns:** the `VarHandle`

Throws:

- `IllegalAccessError`: if the declaring class or the field is not accessible to the class performing the operation
- `NoSuchFieldError`: if the specified field does not exist
- `IllegalArgumentException`: if the type is not `VarHandle`

## ConstantBootstraps.staticFieldVarHandle(MethodHandles.Lookup, String, Class<VarHandle>, Class<?>, Class<?>)

```java
public static VarHandle staticFieldVarHandle(MethodHandles.Lookup lookup, String name, Class<VarHandle> type, Class<?> declaringClass, Class<?> fieldType)
```

Finds a `VarHandle` for a static field.

Parameters:

- `lookup`: the lookup context describing the class performing the operation (normally stacked by the JVM)
- `name`: the name of the field
- `type`: the required result type (must be `Class<VarHandle>`)
- `declaringClass`: the class in which the field is declared
- `fieldType`: the type of the field

**Returns:** the `VarHandle`

Throws:

- `IllegalAccessError`: if the declaring class or the field is not accessible to the class performing the operation
- `NoSuchFieldError`: if the specified field does not exist
- `IllegalArgumentException`: if the type is not `VarHandle`

## ConstantBootstraps.arrayVarHandle(MethodHandles.Lookup, String, Class<VarHandle>, Class<?>)

```java
public static VarHandle arrayVarHandle(MethodHandles.Lookup lookup, String name, Class<VarHandle> type, Class<?> arrayClass)
```

Finds a `VarHandle` for an array type.

Parameters:

- `lookup`: the lookup context describing the class performing the operation (normally stacked by the JVM)
- `name`: unused
- `type`: the required result type (must be `Class<VarHandle>`)
- `arrayClass`: the type of the array

**Returns:** the `VarHandle`

Throws:

- `IllegalAccessError`: if the component type of the array is not accessible to the class performing the operation
- `IllegalArgumentException`: if the type is not `VarHandle`

## ConstantBootstraps.explicitCast(MethodHandles.Lookup, String, Class<?>, Object)

```java
public static Object explicitCast(MethodHandles.Lookup lookup, String name, Class<?> dstType, Object value) throws ClassCastException
```

Applies a conversion from a source type to a destination type.

Given a destination type `dstType` and an input
value `value`, one of the following will happen:

- If `dstType` is `void.class`,
    a `ClassCastException` is thrown.

- If `dstType` is `Object.class`, `value` is returned as is.

Otherwise one of the following conversions is applied to `value`:

- If `dstType` is a reference type, a reference cast
    is applied to `value` as if by calling `dstType.cast(value)`.

- If `dstType` is a primitive type, then, if the runtime type
    of `value` is a primitive wrapper type (such as `Integer`),
    a Java unboxing conversion is applied  followed by a
    Java casting conversion  converting either directly to
    `dstType`, or, if `dstType` is `boolean`,
    to `int`, which is then converted to either `true`
    or `false` depending on whether the least-significant-bit
    is 1 or 0 respectively. If the runtime type of `value` is
    not a primitive wrapper type a `ClassCastException` is thrown.

The result is the same as when using the following code:

```java
MethodHandle id = MethodHandles.identity(dstType);
MethodType mt = MethodType.methodType(dstType, Object.class);
MethodHandle conv = MethodHandles.explicitCastArguments(id, mt);
return conv.invoke(value);
```

Parameters:

- `lookup`: unused
- `name`: unused
- `dstType`: the destination type of the conversion
- `value`: the value to be converted

**Returns:** the converted value

**Since:** 15

Throws:

- `ClassCastException`: when `dstType` is `void`, when a cast per (1) fails, or when `dstType` is a primitive type and the runtime type of `value` is not a primitive wrapper type (such as `Integer`)
