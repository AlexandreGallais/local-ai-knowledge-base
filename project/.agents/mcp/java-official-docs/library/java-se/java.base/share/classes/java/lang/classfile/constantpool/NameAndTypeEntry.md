---
title: "NameAndTypeEntry interface (java.lang.classfile.constantpool)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/constantpool/NameAndTypeEntry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NameAndTypeEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface NameAndTypeEntry extends PoolEntry permits AbstractPoolEntry.NameAndTypeEntryImpl
```

Models a `CONSTANT_NameAndType_info` structure, representing a field or
method, in the constant pool of a `class` file.

The use of a `NameAndTypeEntry` is symbolically represented as a
`String name`, and a ClassDesc) ClassDesc or a MethodTypeDesc) MethodTypeDesc `type`, depending on where this `NameAndTypeEntry` appears.  The accessors to the symbolic descriptors for the
`type` is defined on a per-use-site basis, such as `FieldRefEntry.typeSymbol()` returning a `ClassDesc`, and `MethodRefEntry.typeSymbol()` returning a `MethodTypeDesc`.

A name and type entry is composite:

where `name` is an unqualified name, and `type` is a field or
method descriptor string.

**jvms:** 4.4.6 The `CONSTANT_NameAndType_info` Structure

**Since:** 24

## NameAndTypeEntry.name()

```java
Utf8Entry name()
```

## NameAndTypeEntry.type()

```java
Utf8Entry type()
```

It is a method descriptor strings if it starts with `(`.
Otherwise, it is a field descriptor string, and must start with one of
the `BCDFIJSZL[` characters.
