---
title: "MemberRefEntry interface (java.lang.classfile.constantpool)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/constantpool/MemberRefEntry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MemberRefEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface MemberRefEntry extends PoolEntry permits FieldRefEntry, InterfaceMethodRefEntry, MethodRefEntry, AbstractPoolEntry.AbstractMemberRefEntry
```

Superinterface modeling symbolic references to a member of a class or interface
in the constant pool of a `class` file, which include references to
fields, class methods,
and interface methods.

Different types of symbolic references to a member of a class or interface
bear structural similarities and share parts of the resolution processes, and
they can sometimes appear in the same locations.  For example, both `MethodRefEntry` and `InterfaceMethodRefEntry` can appear in an invokestatic instruction.

A member reference entry is composite:

**jvms:** 4.4.2 The `CONSTANT_Fieldref_info`, `CONSTANT_Methodref_info`, and `CONSTANT_InterfaceMethodref_info` Structures

**sealedGraph:**

**Since:** 24

## MemberRefEntry.owner()

```java
ClassEntry owner()
```

## MemberRefEntry.nameAndType()

```java
NameAndTypeEntry nameAndType()
```

## MemberRefEntry.name()

```java
default Utf8Entry name()
```

## MemberRefEntry.type()

```java
default Utf8Entry type()
```

This is a field descriptor
string if this entry is a `FieldRefEntry`, or a method descriptor
string if this entry is a `MethodRefEntry` or `InterfaceMethodRefEntry`.

**API note:** Each subinterface defines a `typeSymbol()` accessor for the
symbolic descriptor for the member type.
