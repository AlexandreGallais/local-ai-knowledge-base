---
title: "DynamicCallSiteDesc class (java.lang.constant)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/constant/DynamicCallSiteDesc.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DynamicCallSiteDesc class (java.lang.constant)

```java
public final class DynamicCallSiteDesc
```

A nominal descriptor for an
`invokedynamic` call site.

A `DynamicCallSiteDesc` is immutable and its behavior does not
rely on object identity.

**Since:** 12

## DynamicCallSiteDesc.of(DirectMethodHandleDesc, String, MethodTypeDesc, ConstantDesc...)

```java
public static DynamicCallSiteDesc of(DirectMethodHandleDesc bootstrapMethod, String invocationName, MethodTypeDesc invocationType, ConstantDesc... bootstrapArgs)
```

Creates a nominal descriptor for an `invokedynamic` call site.

Parameters:

- `bootstrapMethod`: a `DirectMethodHandleDesc` describing the bootstrap method for the `invokedynamic`
- `invocationName`: The unqualified name that would appear in the `NameAndType` operand of the `invokedynamic`
- `invocationType`: a `MethodTypeDesc` describing the invocation type that would appear in the `NameAndType` operand of the `invokedynamic`
- `bootstrapArgs`: `ConstantDesc`s describing the static arguments to the bootstrap, that would appear in the `BootstrapMethods` attribute

**Returns:** the nominal descriptor

**jvms:** 4.2.2 Unqualified Names

Throws:

- `NullPointerException`: if any parameter or its contents are `null`
- `IllegalArgumentException`: if the invocation name has the incorrect format

## DynamicCallSiteDesc.of(DirectMethodHandleDesc, String, MethodTypeDesc)

```java
public static DynamicCallSiteDesc of(DirectMethodHandleDesc bootstrapMethod, String invocationName, MethodTypeDesc invocationType)
```

Creates a nominal descriptor for an `invokedynamic` call site whose
bootstrap method has no static arguments.

Parameters:

- `bootstrapMethod`: The bootstrap method for the `invokedynamic`
- `invocationName`: The invocationName that would appear in the `NameAndType` operand of the `invokedynamic`
- `invocationType`: The invocation invocationType that would appear in the `NameAndType` operand of the `invokedynamic`

**Returns:** the nominal descriptor

Throws:

- `NullPointerException`: if any parameter is null
- `IllegalArgumentException`: if the invocation name has the incorrect format

## DynamicCallSiteDesc.of(DirectMethodHandleDesc, MethodTypeDesc)

```java
public static DynamicCallSiteDesc of(DirectMethodHandleDesc bootstrapMethod, MethodTypeDesc invocationType)
```

Creates a nominal descriptor for an `invokedynamic` call site whose
bootstrap method has no static arguments and for which the name parameter
is `ConstantDescs.DEFAULT_NAME`.

Parameters:

- `bootstrapMethod`: a `DirectMethodHandleDesc` describing the bootstrap method for the `invokedynamic`
- `invocationType`: a `MethodTypeDesc` describing the invocation type that would appear in the `NameAndType` operand of the `invokedynamic`

**Returns:** the nominal descriptor

Throws:

- `NullPointerException`: if any parameter is null

## DynamicCallSiteDesc.withArgs(ConstantDesc...)

```java
public DynamicCallSiteDesc withArgs(ConstantDesc... bootstrapArgs)
```

Returns a nominal descriptor for an `invokedynamic` call site whose
bootstrap method, name, and invocation type are the same as this one, but
with the specified bootstrap arguments.

Parameters:

- `bootstrapArgs`: `ConstantDesc`s describing the static arguments to the bootstrap, that would appear in the `BootstrapMethods` attribute

**Returns:** the nominal descriptor

Throws:

- `NullPointerException`: if the argument or its contents are `null`

## DynamicCallSiteDesc.withNameAndType(String, MethodTypeDesc)

```java
public DynamicCallSiteDesc withNameAndType(String invocationName, MethodTypeDesc invocationType)
```

Returns a nominal descriptor for an `invokedynamic` call site whose
bootstrap and bootstrap arguments are the same as this one, but with the
specified invocationName and invocation invocationType

Parameters:

- `invocationName`: The unqualified name that would appear in the `NameAndType` operand of the `invokedynamic`
- `invocationType`: a `MethodTypeDesc` describing the invocation type that would appear in the `NameAndType` operand of the `invokedynamic`

**Returns:** the nominal descriptor

**jvms:** 4.2.2 Unqualified Names

Throws:

- `NullPointerException`: if any parameter is null
- `IllegalArgumentException`: if the invocation name has the incorrect format

## DynamicCallSiteDesc.invocationName()

```java
public String invocationName()
```

Returns the invocation name that would appear in the `NameAndType`
operand of the `invokedynamic`.

**Returns:** the invocation name

## DynamicCallSiteDesc.invocationType()

```java
public MethodTypeDesc invocationType()
```

Returns a `MethodTypeDesc` describing the invocation type that
would appear in the `NameAndType` operand of the `invokedynamic`.

**Returns:** the invocation type

## DynamicCallSiteDesc.bootstrapMethod()

```java
public MethodHandleDesc bootstrapMethod()
```

Returns a `MethodHandleDesc` describing the bootstrap method for
the `invokedynamic`.

**Returns:** the bootstrap method for the `invokedynamic`

## DynamicCallSiteDesc.bootstrapArgs()

```java
public ConstantDesc[] bootstrapArgs()
```

Returns `ConstantDesc`s describing the bootstrap arguments for the
`invokedynamic`. The returned array is always non-null. A zero
length array is returned if this `DynamicCallSiteDesc` has no
bootstrap arguments.

**Returns:** the bootstrap arguments for the `invokedynamic`

## DynamicCallSiteDesc.resolveCallSiteDesc(MethodHandles.Lookup)

```java
public CallSite resolveCallSiteDesc(MethodHandles.Lookup lookup) throws Throwable
```

Reflectively invokes the bootstrap method with the specified arguments,
and return the resulting `CallSite`

Parameters:

- `lookup`: The `MethodHandles.Lookup` used to resolve class names

**Returns:** the `CallSite`

Throws:

- `Throwable`: if any exception is thrown by the bootstrap method

## DynamicCallSiteDesc.equals(Object)

```java
public final boolean equals(Object o)
```

Compares the specified object with this descriptor for equality.  Returns
`true` if and only if the specified object is also a
`DynamicCallSiteDesc`, and both descriptors have equal
bootstrap methods, bootstrap argument lists, invocation name, and
invocation type.

Parameters:

- `o`: the `DynamicCallSiteDesc` to compare to this `DynamicCallSiteDesc`

**Returns:** `true` if the specified `DynamicCallSiteDesc`
     is equal to this `DynamicCallSiteDesc`.

## DynamicCallSiteDesc.toString()

```java
public String toString()
```

Returns a compact textual description of this call site description,
including the bootstrap method, the invocation name and type, and
the static bootstrap arguments.

**Returns:** A compact textual description of this call site descriptor
