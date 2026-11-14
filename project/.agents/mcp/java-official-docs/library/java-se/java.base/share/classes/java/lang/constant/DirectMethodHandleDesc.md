---
title: "DirectMethodHandleDesc interface (java.lang.constant)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/constant/DirectMethodHandleDesc.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DirectMethodHandleDesc interface (java.lang.constant)

```java
public sealed interface DirectMethodHandleDesc extends MethodHandleDesc permits DirectMethodHandleDescImpl
```

A nominal descriptor for a direct
`MethodHandle`.  A `DirectMethodHandleDesc` corresponds to
a `Constant_MethodHandle_info` entry in the constant pool of a classfile.

**Since:** 12

## DirectMethodHandleDesc.STATIC(REF_invokeStatic)

```java
STATIC(REF_invokeStatic), /** A method handle for a method invoked as with
```

A method handle for a method invoked as with `invokestatic`

## DirectMethodHandleDesc.INTERFACE_STATIC(REF_invokeStatic, true)

```java
INTERFACE_STATIC(REF_invokeStatic, true), /** A method handle for a method invoked as with
```

A method handle for a method invoked as with `invokestatic`

## DirectMethodHandleDesc.VIRTUAL(REF_invokeVirtual)

```java
VIRTUAL(REF_invokeVirtual), /** A method handle for a method invoked as with
```

A method handle for a method invoked as with `invokevirtual`

## DirectMethodHandleDesc.INTERFACE_VIRTUAL(REF_invokeInterface, true)

```java
INTERFACE_VIRTUAL(REF_invokeInterface, true), /** A method handle for a method invoked as with
```

A method handle for a method invoked as with `invokeinterface`

## DirectMethodHandleDesc.INTERFACE_SPECIAL(REF_invokeSpecial, true), /** A method handle for a constructor */ CONSTRUCTOR(REF_newInvokeSpecial), /** A method handle for a read accessor for an instance field */ GETTER(REF_getField), /** A method handle for a write accessor for an instance field */ SETTER(REF_putField), /** A method handle for a read accessor for a static field */ STATIC_GETTER(REF_getStatic), /** A method handle for a write accessor for a static field */ STATIC_SETTER(REF_putStatic)

```java
INTERFACE_SPECIAL(REF_invokeSpecial, true), /** A method handle for a constructor */ CONSTRUCTOR(REF_newInvokeSpecial), /** A method handle for a read accessor for an instance field */ GETTER(REF_getField), /** A method handle for a write accessor for an instance field */ SETTER(REF_putField), /** A method handle for a read accessor for a static field */ STATIC_GETTER(REF_getStatic), /** A method handle for a write accessor for a static field */ STATIC_SETTER(REF_putStatic)
```

A method handle for an interface method invoked as with `invokespecial`

## DirectMethodHandleDesc.CONSTRUCTOR(REF_newInvokeSpecial), /** A method handle for a read accessor for an instance field */ GETTER(REF_getField), /** A method handle for a write accessor for an instance field */ SETTER(REF_putField), /** A method handle for a read accessor for a static field */ STATIC_GETTER(REF_getStatic), /** A method handle for a write accessor for a static field */ STATIC_SETTER(REF_putStatic)

```java
CONSTRUCTOR(REF_newInvokeSpecial), /** A method handle for a read accessor for an instance field */ GETTER(REF_getField), /** A method handle for a write accessor for an instance field */ SETTER(REF_putField), /** A method handle for a read accessor for a static field */ STATIC_GETTER(REF_getStatic), /** A method handle for a write accessor for a static field */ STATIC_SETTER(REF_putStatic)
```

A method handle for a constructor

## DirectMethodHandleDesc.GETTER(REF_getField), /** A method handle for a write accessor for an instance field */ SETTER(REF_putField), /** A method handle for a read accessor for a static field */ STATIC_GETTER(REF_getStatic), /** A method handle for a write accessor for a static field */ STATIC_SETTER(REF_putStatic)

```java
GETTER(REF_getField), /** A method handle for a write accessor for an instance field */ SETTER(REF_putField), /** A method handle for a read accessor for a static field */ STATIC_GETTER(REF_getStatic), /** A method handle for a write accessor for a static field */ STATIC_SETTER(REF_putStatic)
```

A method handle for a read accessor for an instance field

## DirectMethodHandleDesc.SETTER(REF_putField), /** A method handle for a read accessor for a static field */ STATIC_GETTER(REF_getStatic), /** A method handle for a write accessor for a static field */ STATIC_SETTER(REF_putStatic)

```java
SETTER(REF_putField), /** A method handle for a read accessor for a static field */ STATIC_GETTER(REF_getStatic), /** A method handle for a write accessor for a static field */ STATIC_SETTER(REF_putStatic)
```

A method handle for a write accessor for an instance field

## DirectMethodHandleDesc.STATIC_GETTER(REF_getStatic), /** A method handle for a write accessor for a static field */ STATIC_SETTER(REF_putStatic)

```java
STATIC_GETTER(REF_getStatic), /** A method handle for a write accessor for a static field */ STATIC_SETTER(REF_putStatic)
```

A method handle for a read accessor for a static field

## DirectMethodHandleDesc.STATIC_SETTER(REF_putStatic)

```java
STATIC_SETTER(REF_putStatic)
```

A method handle for a write accessor for a static field

## DirectMethodHandleDesc.refKind

```java
public final int refKind
```

The corresponding `refKind` value for this kind of method handle,
as defined by `MethodHandleInfo`

## DirectMethodHandleDesc.isInterface

```java
public final boolean isInterface
```

Is this an interface

## DirectMethodHandleDesc.valueOf(int)

```java
public static Kind valueOf(int refKind)
```

Returns the enumeration member with the given `refKind` field.
Behaves as if `valueOf(refKind, false)`.  As a special case,
if `refKind` is `REF_invokeInterface` (9) then the
`isInterface` field will be true.

Parameters:

- `refKind`: refKind of desired member

**Returns:** the matching enumeration member

Throws:

- `IllegalArgumentException`: if there is no such member

## DirectMethodHandleDesc.valueOf(int, boolean)

```java
public static Kind valueOf(int refKind, boolean isInterface)
```

Returns the enumeration member with the given the `refKind` and
`isInterface` arguments.
For most values of `refKind` there is an exact match regardless of the value of `isInterface`.
These are:

- `REF_invokeVirtual` which matches to `VIRTUAL`

- `REF_invokeInterface` which matches to `INTERFACE_VIRTUAL`

- `REF_newInvokeSpecial` which matches to `CONSTRUCTOR`

- `REF_getField` which matches to `GETTER`

- `REF_putField` which matches to `SETTER`

- `REF_getStatic` which matches to `STATIC_GETTER`

- `REF_putStatic` which matches to `STATIC_SETTER`

As for the rest, the returned kind will depend on the value (false or true accordingly) of `isInterface`:

- `REF_invokeStatic` which matches to `STATIC` or `INTERFACE_STATIC`

- `REF_invokeSpecial` which matches to `SPECIAL` or `INTERFACE_SPECIAL`

Parameters:

- `refKind`: refKind of desired member
- `isInterface`: whether desired member is for interface methods

**Returns:** the matching enumeration member

Throws:

- `IllegalArgumentException`: if there is no such member

## DirectMethodHandleDesc.kind()

```java
Kind kind()
```

Returns the `kind` of the method handle described by this nominal
descriptor.

**Returns:** the `Kind`

## DirectMethodHandleDesc.refKind()

```java
int refKind()
```

Returns the `refKind` of the method handle described by this nominal
reference, as defined by `MethodHandleInfo`.

**Returns:** the reference kind

## DirectMethodHandleDesc.isOwnerInterface()

```java
boolean isOwnerInterface()
```

Indicates if the method is declared by an interface

**Returns:** true if the method is declared by an interface

## DirectMethodHandleDesc.owner()

```java
ClassDesc owner()
```

Returns a `ClassDesc` describing the class declaring the
method or field described by this nominal descriptor.

**Returns:** the class declaring the method or field

## DirectMethodHandleDesc.methodName()

```java
String methodName()
```

Returns the name of the method or field described by this nominal descriptor.
For constructors, returns the reserved name `ConstantDescs#INIT_NAME`.

**Returns:** the name of the method or field

## DirectMethodHandleDesc.lookupDescriptor()

```java
String lookupDescriptor()
```

Returns the lookup descriptor of the method handle described by this descriptor,
after adjusting for the invocation mode.  This will correspond to either
a method type descriptor string (for methods and constructors), or a field
descriptor string (for field access method handles).  The lookup descriptor
string is in the same format as accepted by ClassDesc, String, String).

**Returns:** the lookup descriptor string
