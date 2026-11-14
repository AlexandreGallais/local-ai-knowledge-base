---
title: "MethodHandles class (java.lang.invoke) (part 5 of 14)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/invoke/MethodHandles.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodHandles class (java.lang.invoke) (part 5 of 14)

## MethodHandles.findVarHandle(Class<?>, String, Class<?>)

```java
public VarHandle findVarHandle(Class<?> recv, String name, Class<?> type) throws NoSuchFieldException, IllegalAccessException
```

Produces a VarHandle giving access to a non-static field `name`
of type `type` declared in a class of type `recv`.
The VarHandle's variable type is `type` and it has one
coordinate type, `recv`.

Access checking is performed immediately on behalf of the lookup
class.

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

- `recv`: the receiver class, of type `R`, that declares the non-static field
- `name`: the field's name
- `type`: the field's type, of type `T`

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

**Returns:** a VarHandle giving access to non-static fields.

**Since:** 9

Throws:

- `NoSuchFieldException`: if the field does not exist
- `IllegalAccessException`: if access checking fails, or if the field is `static`
- `NullPointerException`: if any argument is null

## MethodHandles.findStaticGetter(Class<?>, String, Class<?>)

```java
public MethodHandle findStaticGetter(Class<?> refc, String name, Class<?> type) throws NoSuchFieldException, IllegalAccessException
```

Produces a method handle giving read access to a static field.
The type of the method handle will have a return type of the field's
value type.
The method handle will take no arguments.
Access checking is performed immediately on behalf of the lookup class.

If the returned method handle is invoked, the field's class will
be initialized, if it has not already been initialized.

Parameters:

- `refc`: the class or interface from which the method is accessed
- `name`: the field's name
- `type`: the field's type

**Returns:** a method handle which can load values from the field

Throws:

- `NoSuchFieldException`: if the field does not exist
- `IllegalAccessException`: if access checking fails, or if the field is not `static`
- `NullPointerException`: if any argument is null

## MethodHandles.findStaticSetter(Class<?>, String, Class<?>)

```java
public MethodHandle findStaticSetter(Class<?> refc, String name, Class<?> type) throws NoSuchFieldException, IllegalAccessException
```

Produces a method handle giving write access to a static field.
The type of the method handle will have a void return type.
The method handle will take a single
argument, of the field's value type, the value to be stored.
Access checking is performed immediately on behalf of the lookup class.

If the returned method handle is invoked, the field's class will
be initialized, if it has not already been initialized.

Parameters:

- `refc`: the class or interface from which the method is accessed
- `name`: the field's name
- `type`: the field's type

**Returns:** a method handle which can store values into the field

Throws:

- `NoSuchFieldException`: if the field does not exist
- `IllegalAccessException`: if access checking fails, or if the field is not `static` or is `final`
- `NullPointerException`: if any argument is null

## MethodHandles.findStaticVarHandle(Class<?>, String, Class<?>)

```java
public VarHandle findStaticVarHandle(Class<?> decl, String name, Class<?> type) throws NoSuchFieldException, IllegalAccessException
```

Produces a VarHandle giving access to a static field `name` of
type `type` declared in a class of type `decl`.
The VarHandle's variable type is `type` and it has no
coordinate types.

Access checking is performed immediately on behalf of the lookup
class.

If the returned VarHandle is operated on, the declaring class will be
initialized, if it has not already been initialized.

Certain access modes of the returned VarHandle are unsupported under
the following conditions:

- if the field is declared `final`, then the write, atomic
    update, numeric atomic update, and bitwise atomic update access
    modes are unsupported.

- if the field type is anything other than `byte`,
    `short`, `char`, `int`, `long`,
    `float`, or `double`, then numeric atomic update
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

- `decl`: the class that declares the static field
- `name`: the field's name
- `type`: the field's type, of type `T`

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

**Returns:** a VarHandle giving access to a static field

**Since:** 9

Throws:

- `NoSuchFieldException`: if the field does not exist
- `IllegalAccessException`: if access checking fails, or if the field is not `static`
- `NullPointerException`: if any argument is null

## MethodHandles.bind(Object, String, MethodType)

```java
public MethodHandle bind(Object receiver, String name, MethodType type) throws NoSuchMethodException, IllegalAccessException
```

Produces an early-bound method handle for a non-static method.
The receiver must have a supertype `defc` in which a method
of the given name and type is accessible to the lookup class.
The method and all its argument types must be accessible to the lookup object.
The type of the method handle will be that of the method,
without any insertion of an additional receiver parameter.
The given receiver will be bound into the method handle,
so that every call to the method handle will invoke the
requested method on the given receiver.

The returned method handle will have
variable arity if and only if
the method's variable arity modifier bit (`0x0080`) is set
*and* the trailing array argument is not the only argument.
(If the trailing array argument is the only argument,
the given receiver value will be bound to it.)

This is almost equivalent to the following code, with some differences noted below:

where `defc` is either `receiver.getClass()` or a super
type of that class, in which the requested method is accessible
to the lookup class.
(Unlike `bind`, `bindTo` does not preserve variable arity.
Also, `bindTo` may throw a `ClassCastException` in instances where `bind` would
throw an `IllegalAccessException`, as in the case where the member is `protected` and
the receiver is restricted by `findVirtual` to the lookup class.)

Parameters:

- `receiver`: the object from which the method is accessed
- `name`: the name of the method
- `type`: the type of the method, with the receiver argument omitted

**Returns:** the desired method handle

**See also:** MethodHandle#bindTo

**See also:** #findVirtual

Throws:

- `NoSuchMethodException`: if the method does not exist
- `IllegalAccessException`: if access checking fails or if the method's variable arity modifier bit is set and `asVarargsCollector` fails
- `NullPointerException`: if any argument is null

## MethodHandles.unreflect(Method)

```java
public MethodHandle unreflect(Method m) throws IllegalAccessException
```

Makes a direct method handle
to *m*, if the lookup class has permission.
If *m* is non-static, the receiver argument is treated as an initial argument.
If *m* is virtual, overriding is respected on every call.
Unlike the Core Reflection API, exceptions are *not* wrapped.
The type of the method handle will be that of the method,
with the receiver type prepended (but only if it is non-static).
If the method's `accessible` flag is not set,
access checking is performed immediately on behalf of the lookup class.
If *m* is not public, do not share the resulting handle with untrusted parties.

The returned method handle will have
variable arity if and only if
the method's variable arity modifier bit (`0x0080`) is set.

If *m* is static, and
if the returned method handle is invoked, the method's class will
be initialized, if it has not already been initialized.

Parameters:

- `m`: the reflected method

**Returns:** a method handle which can invoke the reflected method

Throws:

- `IllegalAccessException`: if access checking fails or if the method's variable arity modifier bit is set and `asVarargsCollector` fails
- `NullPointerException`: if the argument is null

## MethodHandles.unreflectSpecial(Method, Class<?>)

```java
public MethodHandle unreflectSpecial(Method m, Class<?> specialCaller) throws IllegalAccessException
```

Produces a method handle for a reflected method.
It will bypass <example-value> for overriding methods on the receiver,
as if called from an `invokespecial`
instruction from within the explicitly specified `specialCaller`.
The type of the method handle will be that of the method,
with a suitably restricted receiver type prepended.
(The receiver type will be `specialCaller` or a subtype.)
If the method's `accessible` flag is not set,
access checking is performed immediately on behalf of the lookup class,
as if `invokespecial` instruction were being linked.

Before method resolution,
if the explicitly specified caller class is not identical with the
lookup class, or if this lookup object does not have
private access
privileges, the access fails.

The returned method handle will have
variable arity if and only if
the method's variable arity modifier bit (`0x0080`) is set.

Parameters:

- `m`: the reflected method
- `specialCaller`: the class nominally calling the method

**Returns:** a method handle which can invoke the reflected method

Throws:

- `IllegalAccessException`: if access checking fails, or if the method is `static`, or if the method's variable arity modifier bit is set and `asVarargsCollector` fails
- `NullPointerException`: if any argument is null

## MethodHandles.unreflectConstructor(Constructor<?>)

```java
public MethodHandle unreflectConstructor(Constructor<?> c) throws IllegalAccessException
```

Produces a method handle for a reflected constructor.
The type of the method handle will be that of the constructor,
with the return type changed to the declaring class.
The method handle will perform a `newInstance` operation,
creating a new instance of the constructor's class on the
arguments passed to the method handle.

If the constructor's `accessible` flag is not set,
access checking is performed immediately on behalf of the lookup class.

The returned method handle will have
variable arity if and only if
the constructor's variable arity modifier bit (`0x0080`) is set.

If the returned method handle is invoked, the constructor's class will
be initialized, if it has not already been initialized.

Parameters:

- `c`: the reflected constructor

**Returns:** a method handle which can invoke the reflected constructor

Throws:

- `IllegalAccessException`: if access checking fails or if the method's variable arity modifier bit is set and `asVarargsCollector` fails
- `NullPointerException`: if the argument is null
