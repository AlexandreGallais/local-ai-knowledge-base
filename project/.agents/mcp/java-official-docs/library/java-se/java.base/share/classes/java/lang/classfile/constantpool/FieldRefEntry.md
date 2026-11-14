---
title: "FieldRefEntry interface (java.lang.classfile.constantpool)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/constantpool/FieldRefEntry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FieldRefEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface FieldRefEntry extends MemberRefEntry permits AbstractPoolEntry.FieldRefEntryImpl
```

Models a `CONSTANT_Fieldref_info` structure, or a symbolic reference
to a field, in the constant pool of a `class` file.

A field reference constant pool entry is composite:

where the nameAndType.type() represents a field descriptor string.

**See also:** ConstantPoolBuilder#fieldRefEntry ConstantPoolBuilder::fieldRefEntry

**jvms:** 4.4.2 The `CONSTANT_Fieldref_info`, `CONSTANT_Methodref_info`, and `CONSTANT_InterfaceMethodref_info` Structures

**Since:** 24

## FieldRefEntry.typeSymbol()

```java
default ClassDesc typeSymbol()
```
