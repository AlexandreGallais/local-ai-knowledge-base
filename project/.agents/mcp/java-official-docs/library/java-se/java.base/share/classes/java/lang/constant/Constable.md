---
title: "Constable interface (java.lang.constant)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/constant/Constable.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Constable interface (java.lang.constant)

```java
public interface Constable
```

Represents a type which is *constable*.  A constable type is one whose
values are constants that can be represented in the constant pool of a Java
classfile as described in JVMS , and whose instances can describe themselves
nominally as a `ConstantDesc`.

Some constable types have a native representation in the constant pool:
`String`, `Integer`, `Long`, `Float`,
`Double`, `Class`, `MethodType`, and `MethodHandle`.
The types `String`, `Integer`, `Long`, `Float`,
and `Double` serve as their own nominal descriptors; `Class`,
`MethodType`, and `MethodHandle` have corresponding nominal
descriptors `ClassDesc`, `MethodTypeDesc`, and `MethodHandleDesc`.

Other reference types can be constable if their instances can describe
themselves in nominal form as a `ConstantDesc`. Examples in the Java SE
Platform API are types that support Java language features such as `Enum`,
and runtime support classes such as `VarHandle`.  These are typically
described with a `DynamicConstantDesc`, which describes dynamically
generated constants (JVMS ).

The nominal form of an instance of a constable type is obtained via
`describeConstable()`. A `Constable` need
not be able to (or may choose not to) describe all its instances in the form of
a `ConstantDesc`; this method returns an `Optional` that can be
empty to indicate that a nominal descriptor could not be created for an instance.
(For example, `MethodHandle` will produce nominal descriptors for direct
method handles, but not necessarily those produced by method handle
combinators.)

**jvms:** 4.4 The Constant Pool

**jvms:** 4.4.10 The `CONSTANT_Dynamic_info` and `CONSTANT_InvokeDynamic_info` Structures

**Since:** 12

## Constable.describeConstable()

```java
Optional<? extends ConstantDesc> describeConstable()
```

Returns an `Optional` containing the nominal descriptor for this
instance, if one can be constructed, or an empty `Optional`
if one cannot be constructed.

**Returns:** An `Optional` containing the resulting nominal descriptor,
or an empty `Optional` if one cannot be constructed.
