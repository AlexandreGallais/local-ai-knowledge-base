---
title: "LongEntry interface (java.lang.classfile.constantpool)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/constantpool/LongEntry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LongEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface LongEntry extends AnnotationConstantValueEntry, ConstantValueEntry permits AbstractPoolEntry.LongEntryImpl
```

Models a `CONSTANT_Long_info` structure, or a `long` constant, in
the constant pool of a `class` file.

The use of a `LongEntry` is modeled by a `long`.  Conversions are
through `ConstantPoolBuilder.longEntry(long)` and `longValue()`.

A long entry has a width of `2`, making its
subsequent constant pool index valid and unusable.

**See also:** ConstantPoolBuilder#longEntry ConstantPoolBuilder::longEntry

**jvms:** 4.4.5 The `CONSTANT_Long_info` and `CONSTANT_Double_info`
            Structures

**Since:** 24

## LongEntry.longValue()

```java
long longValue()
```

**See also:** ConstantPoolBuilder#longEntry(long)
     ConstantPoolBuilder::longEntry(long)

## LongEntry.typeKind()

```java
default TypeKind typeKind()
```
