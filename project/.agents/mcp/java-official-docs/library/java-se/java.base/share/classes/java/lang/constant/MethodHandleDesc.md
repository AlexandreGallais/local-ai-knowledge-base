---
title: "MethodHandleDesc interface (java.lang.constant)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/constant/MethodHandleDesc.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodHandleDesc interface (java.lang.constant)

```java
public sealed interface MethodHandleDesc extends ConstantDesc permits AsTypeMethodHandleDesc, DirectMethodHandleDesc
```

A nominal descriptor for a
`MethodHandle` constant.

**sealedGraph:**

**Since:** 12

## MethodHandleDesc.of(DirectMethodHandleDesc.Kind, ClassDesc, String, String)

```java
static DirectMethodHandleDesc of(DirectMethodHandleDesc.Kind kind, ClassDesc owner, String name, String lookupDescriptor)
```

Creates a `MethodHandleDesc` corresponding to an invocation of a
declared method, invocation of a constructor, or access to a field.

The lookup descriptor string has the same format as for the various
variants of `CONSTANT_MethodHandle_info` and for the lookup
methods on `MethodHandles.Lookup`.  For a method or constructor
invocation, it is interpreted as a method type descriptor; for field
access, it is interpreted as a field descriptor.  If `kind` is
`CONSTRUCTOR`, the `name` parameter is ignored and the return
type of the lookup descriptor must be `void`.  If `kind`
corresponds to a virtual method invocation, the lookup type includes the
method parameters but not the receiver type.

Parameters:

- `kind`: The kind of method handle to be described
- `owner`: a `ClassDesc` describing the class containing the method, constructor, or field
- `name`: the unqualified name of the method or field (ignored if `kind` is `CONSTRUCTOR`)
- `lookupDescriptor`: a method descriptor string the lookup type, if the request is for a method invocation, or describing the invocation type, if the request is for a field or constructor

**Returns:** the `MethodHandleDesc`

**jvms:** 4.4.8 The CONSTANT_MethodHandle_info Structure

**jvms:** 4.2.2 Unqualified Names

**jvms:** 4.3.2 Field Descriptors

**jvms:** 4.3.3 Method Descriptors

Throws:

- `NullPointerException`: if any of the non-ignored arguments are null
- `IllegalArgumentException`: if the descriptor string is not a valid method or field descriptor

## MethodHandleDesc.ofMethod(DirectMethodHandleDesc.Kind, ClassDesc, String, MethodTypeDesc)

```java
static DirectMethodHandleDesc ofMethod(DirectMethodHandleDesc.Kind kind, ClassDesc owner, String name, MethodTypeDesc lookupMethodType)
```

Creates a `MethodHandleDesc` corresponding to an invocation of a
declared method or constructor.

The lookup descriptor string has the same format as for the lookup
methods on `MethodHandles.Lookup`.  If `kind` is
`CONSTRUCTOR`, the name is ignored and the return type of the lookup
type must be `void`.  If `kind` corresponds to a virtual method
invocation, the lookup type includes the method parameters but not the
receiver type.

Parameters:

- `kind`: The kind of method handle to be described; must be one of `SPECIAL, VIRTUAL, STATIC, INTERFACE_SPECIAL, INTERFACE_VIRTUAL, INTERFACE_STATIC, CONSTRUCTOR`
- `owner`: a `ClassDesc` describing the class containing the method or constructor
- `name`: the unqualified name of the method (ignored if `kind` is `CONSTRUCTOR`)
- `lookupMethodType`: a `MethodTypeDesc` describing the lookup type

**Returns:** the `MethodHandleDesc`

**jvms:** 4.2.2 Unqualified Names

Throws:

- `NullPointerException`: if any non-ignored arguments are null
- `IllegalArgumentException`: if the `name` has the incorrect format, or the kind is invalid

## MethodHandleDesc.ofField(DirectMethodHandleDesc.Kind, ClassDesc, String, ClassDesc)

```java
static DirectMethodHandleDesc ofField(DirectMethodHandleDesc.Kind kind, ClassDesc owner, String fieldName, ClassDesc fieldType)
```

Creates a `MethodHandleDesc` corresponding to a method handle
that accesses a field.

Parameters:

- `kind`: the kind of the method handle to be described; must be one of `GETTER`, `SETTER`, `STATIC_GETTER`, or `STATIC_SETTER`
- `owner`: a `ClassDesc` describing the class containing the field
- `fieldName`: the unqualified name of the field
- `fieldType`: a `ClassDesc` describing the type of the field

**Returns:** the `MethodHandleDesc`

**jvms:** 4.2.2 Unqualified Names

Throws:

- `NullPointerException`: if any of the arguments are null
- `IllegalArgumentException`: if the `kind` is not one of the valid values or if the field name is not valid

## MethodHandleDesc.ofConstructor(ClassDesc, ClassDesc...)

```java
static DirectMethodHandleDesc ofConstructor(ClassDesc owner, ClassDesc... paramTypes)
```

Returns a `MethodHandleDesc` corresponding to invocation of a constructor

Parameters:

- `owner`: a `ClassDesc` describing the class containing the constructor
- `paramTypes`: `ClassDesc`s describing the parameter types of the constructor

**Returns:** the `MethodHandleDesc`

Throws:

- `NullPointerException`: if any argument or its contents is `null`

## MethodHandleDesc.asType(MethodTypeDesc)

```java
default MethodHandleDesc asType(MethodTypeDesc type)
```

Returns a `MethodHandleDesc` that describes this method handle
adapted to a different type, as if by `MethodHandle.asType(MethodType)`.

Parameters:

- `type`: a `MethodHandleDesc` describing the new method type

**Returns:** a `MethodHandleDesc` for the adapted method handle

Throws:

- `NullPointerException`: if the argument is `null`

## MethodHandleDesc.invocationType()

```java
MethodTypeDesc invocationType()
```

Returns a `MethodTypeDesc` describing the invocation type of the
method handle described by this nominal descriptor.  The invocation type
describes the full set of stack values that are consumed by the invocation
(including the receiver, if any).

**Returns:** a `MethodHandleDesc` describing the method handle type

## MethodHandleDesc.resolveConstantDesc(MethodHandles.Lookup)

```java
MethodHandle resolveConstantDesc(MethodHandles.Lookup lookup) throws ReflectiveOperationException
```

**Since:** 21

## MethodHandleDesc.equals(Object)

```java
boolean equals(Object o)
```

Compares the specified object with this descriptor for equality.  Returns
`true` if and only if the specified object is also a
`MethodHandleDesc`, and both encode the same nominal description
of a method handle.

Parameters:

- `o`: the other object

**Returns:** whether this descriptor is equal to the other object
