---
title: "DynamicConstantPoolEntry interface (java.lang.classfile.constantpool)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/constantpool/DynamicConstantPoolEntry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DynamicConstantPoolEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface DynamicConstantPoolEntry extends PoolEntry permits ConstantDynamicEntry, InvokeDynamicEntry
```

Superinterface modeling dynamically-computed constant pool entries, which
include `ConstantDynamicEntry` and `InvokeDynamicEntry`, in the
constant pool of a `class` file.

Different types of dynamically-computed constant pool entries bear structural
similarities, but they appear in distinct locations.  As a result, their uses
are represented by different symbolic descriptors, specific to each subtype.

A dynamic constant entry is composite:

**See also:** java.lang.invoke##jvm_mods Dynamic resolution of call sites and
     constants

**jvms:** 4.4.10 The `CONSTANT_Dynamic_info` and `CONSTANT_InvokeDynamic_info` Structures

**jvms:** 5.4.3.6 Dynamically-Computed Constant and Call Site Resolution

**sealedGraph:**

**Since:** 24

## DynamicConstantPoolEntry.bootstrap()

```java
BootstrapMethodEntry bootstrap()
```

**See also:** java.lang.invoke##bsm Execution of bootstrap methods

**See also:** ConstantPoolBuilder#constantDynamicEntry(BootstrapMethodEntry, NameAndTypeEntry)
     ConstantPoolBuilder::constantDynamicEntry(BootstrapMethodEntry, NameAndTypeEntry)

**See also:** ConstantPoolBuilder#invokeDynamicEntry(BootstrapMethodEntry, NameAndTypeEntry)
     ConstantPoolBuilder::invokeDynamicEntry(BootstrapMethodEntry, NameAndTypeEntry)

## DynamicConstantPoolEntry.bootstrapMethodIndex()

```java
int bootstrapMethodIndex()
```

The return value is equivalent to `bootstrap().bsmIndex()`.

## DynamicConstantPoolEntry.nameAndType()

```java
NameAndTypeEntry nameAndType()
```

**See also:** java.lang.invoke##bsm Execution of bootstrap methods

**See also:** ConstantPoolBuilder#constantDynamicEntry(BootstrapMethodEntry, NameAndTypeEntry)
     ConstantPoolBuilder::constantDynamicEntry(BootstrapMethodEntry, NameAndTypeEntry)

**See also:** ConstantPoolBuilder#invokeDynamicEntry(BootstrapMethodEntry, NameAndTypeEntry)
     ConstantPoolBuilder::invokeDynamicEntry(BootstrapMethodEntry, NameAndTypeEntry)

## DynamicConstantPoolEntry.name()

```java
default Utf8Entry name()
```

## DynamicConstantPoolEntry.type()

```java
default Utf8Entry type()
```

This is a field descriptor string if this entry is a `ConstantDynamicEntry`, or a method descriptor string if this entry is a
`InvokeDynamicEntry`.

**API note:** Each subinterface has its specific accessor named `typeSymbol` for
the symbolic descriptor derived from this descriptor string.
