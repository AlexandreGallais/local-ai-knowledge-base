---
title: "LoadableConstantEntry interface (java.lang.classfile.constantpool)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/constantpool/LoadableConstantEntry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LoadableConstantEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface LoadableConstantEntry extends PoolEntry permits ClassEntry, ConstantDynamicEntry, ConstantValueEntry, MethodHandleEntry, MethodTypeEntry
```

Marker interface for constant pool entries suitable for loading via the
ldc instructions.

The use of a `LoadableConstantEntry` is modeled by a `ConstantDesc`.
Conversions are through `ConstantPoolBuilder.loadableConstantEntry(ConstantDesc)`
and `constantValue()`.

**See also:** CodeBuilder#ldc(LoadableConstantEntry)

**jvms:** 4.4 The Constant Pool

**sealedGraph:**

**Since:** 24

## LoadableConstantEntry.constantValue()

```java
ConstantDesc constantValue()
```

**See also:** ConstantPoolBuilder#loadableConstantEntry(ConstantDesc)

## LoadableConstantEntry.typeKind()

```java
default TypeKind typeKind()
```

If the data type is of category 2, this
constant must be loaded with ldc2_w; otherwise, the
data type is of category 1, and this constant must be loaded with ldc or ldc_w.
