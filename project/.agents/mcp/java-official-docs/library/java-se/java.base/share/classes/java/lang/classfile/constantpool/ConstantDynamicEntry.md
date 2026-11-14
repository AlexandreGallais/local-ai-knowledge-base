---
title: "ConstantDynamicEntry interface (java.lang.classfile.constantpool)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/constantpool/ConstantDynamicEntry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ConstantDynamicEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface ConstantDynamicEntry extends DynamicConstantPoolEntry, LoadableConstantEntry permits AbstractPoolEntry.ConstantDynamicEntryImpl
```

Models a `CONSTANT_Dynamic_info` structure, representing a , in the constant pool of a `class` file.

The use of a `ConstantDynamicEntry` is modeled by a `DynamicConstantDesc`.  Conversions are through `asSymbol()` and `ConstantPoolBuilder.constantDynamicEntry(DynamicConstantDesc)`.

A dynamic constant entry is composite:

where nameAndType.type() is a field descriptor string.

**API note:** A dynamically-computed constant is frequently called a , or a , from the abbreviation of
"constant dynamic".

**See also:** ConstantPoolBuilder#constantDynamicEntry
     ConstantPoolBuilder::constantDynamicEntry

**See also:** DynamicConstantDesc

**See also:** java.lang.invoke##condycon Dynamically-computed constants

**jvms:** 4.4.10 The `CONSTANT_Dynamic_info` and `CONSTANT_InvokeDynamic_info` Structures

**Since:** 24

## ConstantDynamicEntry.typeSymbol()

```java
default ClassDesc typeSymbol()
```

## ConstantDynamicEntry.constantValue()

```java
default ConstantDesc constantValue()
```

(inherited documentation)

This is equivalent to asSymbol().

## ConstantDynamicEntry.asSymbol()

```java
default DynamicConstantDesc<?> asSymbol()
```

**See also:** ConstantPoolBuilder#constantDynamicEntry(DynamicConstantDesc)
     ConstantPoolBuilder::constantDynamicEntry(DynamicConstantDesc)

## ConstantDynamicEntry.typeKind()

```java
default TypeKind typeKind()
```

(inherited documentation)

**API note:** The data type of a dynamically-computed constant depends on its
descriptor, while the data type of all other
constants can be determined by their constant type.
