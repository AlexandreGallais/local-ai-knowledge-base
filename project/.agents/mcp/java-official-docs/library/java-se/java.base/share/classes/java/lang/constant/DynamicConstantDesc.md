---
title: "DynamicConstantDesc class (java.lang.constant)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/constant/DynamicConstantDesc.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DynamicConstantDesc class (java.lang.constant)

```java
public abstract non-sealed class DynamicConstantDesc<T> implements ConstantDesc
```

A nominal descriptor for a
dynamic constant (one described in the constant pool with
`Constant_Dynamic_info`.)

Concrete subtypes of `DynamicConstantDesc` should be immutable
and their behavior should not rely on object identity.

Parameters:

- `<T>`: the type of the dynamic constant

**Since:** 12

## DynamicConstantDesc.DynamicConstantDesc(DirectMethodHandleDesc, String, ClassDesc, ConstantDesc...)

```java
protected DynamicConstantDesc(DirectMethodHandleDesc bootstrapMethod, String constantName, ClassDesc constantType, ConstantDesc... bootstrapArgs)
```

Creates a nominal descriptor for a dynamic constant.

Parameters:

- `bootstrapMethod`: a `DirectMethodHandleDesc` describing the bootstrap method for the constant
- `constantName`: The unqualified name that would appear in the `NameAndType` operand of the `LDC` for this constant
- `constantType`: a `ClassDesc` describing the type that would appear in the `NameAndType` operand of the `LDC` for this constant
- `bootstrapArgs`: `ConstantDesc`s describing the static arguments to the bootstrap, that would appear in the `BootstrapMethods` attribute

**jvms:** 4.2.2 Unqualified Names

Throws:

- `NullPointerException`: if any argument is null
- `IllegalArgumentException`: if the `name` has the incorrect format

## DynamicConstantDesc.ofCanonical(DirectMethodHandleDesc, String, ClassDesc, ConstantDesc[])

```java
public static<T> ConstantDesc ofCanonical(DirectMethodHandleDesc bootstrapMethod, String constantName, ClassDesc constantType, ConstantDesc[] bootstrapArgs)
```

Returns a nominal descriptor for a dynamic constant, transforming it into
a more specific type if the constant bootstrap is a well-known one and a
more specific nominal descriptor type (e.g., ClassDesc) is available.

Classes whose `Constable.describeConstable()` method produce
a `DynamicConstantDesc` with a well-known bootstrap including
`Class` (for instances describing primitive types), `Enum`,
and `VarHandle`.

Bytecode-reading APIs that process the constant pool and wish to expose
entries as `ConstantDesc` to their callers should generally use this
method in preference to String, ClassDesc, ConstantDesc...)
because this may result in a more specific type that can be provided to
callers.

Parameters:

- `<T>`: the type of the dynamic constant
- `bootstrapMethod`: a `DirectMethodHandleDesc` describing the bootstrap method for the constant
- `constantName`: The unqualified name that would appear in the `NameAndType` operand of the `LDC` for this constant
- `constantType`: a `ClassDesc` describing the type that would appear in the `NameAndType` operand of the `LDC` for this constant
- `bootstrapArgs`: `ConstantDesc`s describing the static arguments to the bootstrap, that would appear in the `BootstrapMethods` attribute

**Returns:** the nominal descriptor

**jvms:** 4.2.2 Unqualified Names

Throws:

- `NullPointerException`: if any argument is null
- `IllegalArgumentException`: if the `name` has the incorrect format

## DynamicConstantDesc.ofNamed(DirectMethodHandleDesc, String, ClassDesc, ConstantDesc...)

```java
public static<T> DynamicConstantDesc<T> ofNamed(DirectMethodHandleDesc bootstrapMethod, String constantName, ClassDesc constantType, ConstantDesc... bootstrapArgs)
```

Returns a nominal descriptor for a dynamic constant.

Parameters:

- `<T>`: the type of the dynamic constant
- `bootstrapMethod`: a `DirectMethodHandleDesc` describing the bootstrap method for the constant
- `constantName`: The unqualified name that would appear in the `NameAndType` operand of the `LDC` for this constant
- `constantType`: a `ClassDesc` describing the type that would appear in the `NameAndType` operand of the `LDC` for this constant
- `bootstrapArgs`: `ConstantDesc`s describing the static arguments to the bootstrap, that would appear in the `BootstrapMethods` attribute

**Returns:** the nominal descriptor

**jvms:** 4.2.2 Unqualified Names

Throws:

- `NullPointerException`: if any argument is null
- `IllegalArgumentException`: if the `name` has the incorrect format

## DynamicConstantDesc.of(DirectMethodHandleDesc, ConstantDesc...)

```java
public static<T> DynamicConstantDesc<T> of(DirectMethodHandleDesc bootstrapMethod, ConstantDesc... bootstrapArgs)
```

Returns a nominal descriptor for a dynamic constant whose name parameter
is `ConstantDescs.DEFAULT_NAME`, and whose type parameter is always
the same as the bootstrap method return type.

Parameters:

- `<T>`: the type of the dynamic constant
- `bootstrapMethod`: a `DirectMethodHandleDesc` describing the bootstrap method for the constant
- `bootstrapArgs`: `ConstantDesc`s describing the static arguments to the bootstrap, that would appear in the `BootstrapMethods` attribute

**Returns:** the nominal descriptor

**jvms:** 4.2.2 Unqualified Names

Throws:

- `NullPointerException`: if any argument is null

## DynamicConstantDesc.of(DirectMethodHandleDesc)

```java
public static<T> DynamicConstantDesc<T> of(DirectMethodHandleDesc bootstrapMethod)
```

Returns a nominal descriptor for a dynamic constant whose bootstrap has
no static arguments, whose name parameter is `ConstantDescs.DEFAULT_NAME`,
and whose type parameter is always the same as the bootstrap method return type.

Parameters:

- `<T>`: the type of the dynamic constant
- `bootstrapMethod`: a `DirectMethodHandleDesc` describing the bootstrap method for the constant

**Returns:** the nominal descriptor

Throws:

- `NullPointerException`: if any argument is null

## DynamicConstantDesc.constantName()

```java
public String constantName()
```

Returns the name that would appear in the `NameAndType` operand
of the `LDC` for this constant.

**Returns:** the constant name

## DynamicConstantDesc.constantType()

```java
public ClassDesc constantType()
```

Returns a `ClassDesc` describing the type that would appear in the
`NameAndType` operand of the `LDC` for this constant.

**Returns:** the constant type

## DynamicConstantDesc.bootstrapMethod()

```java
public DirectMethodHandleDesc bootstrapMethod()
```

Returns a `MethodHandleDesc` describing the bootstrap method for
this constant.

**Returns:** the bootstrap method

## DynamicConstantDesc.bootstrapArgs()

```java
public ConstantDesc[] bootstrapArgs()
```

Returns the bootstrap arguments for this constant.

**Returns:** the bootstrap arguments

## DynamicConstantDesc.bootstrapArgsList()

```java
public List<ConstantDesc> bootstrapArgsList()
```

Returns the bootstrap arguments for this constant as an immutable `List`.

**Returns:** a `List` of the bootstrap arguments

## DynamicConstantDesc.equals(Object)

```java
public final boolean equals(Object o)
```

Compares the specified object with this descriptor for equality.  Returns
`true` if and only if the specified object is also a
`DynamicConstantDesc`, and both descriptors have equal
bootstrap methods, bootstrap argument lists, constant name, and
constant type.

Parameters:

- `o`: the `DynamicConstantDesc` to compare to this `DynamicConstantDesc`

**Returns:** `true` if the specified `DynamicConstantDesc`
     is equal to this `DynamicConstantDesc`.

## DynamicConstantDesc.toString()

```java
public String toString()
```

Returns a compact textual description of this constant description,
including the bootstrap method, the constant name and type, and
the static bootstrap arguments.

**Returns:** A compact textual description of this call site descriptor
