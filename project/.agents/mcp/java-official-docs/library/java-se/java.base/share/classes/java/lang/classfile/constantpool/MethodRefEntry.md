---
title: "MethodRefEntry interface (java.lang.classfile.constantpool)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/constantpool/MethodRefEntry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodRefEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface MethodRefEntry extends MemberRefEntry permits AbstractPoolEntry.MethodRefEntryImpl
```

Models a `CONSTANT_MethodRef_info` structure, or a symbolic reference
to a class method, in the constant pool of a `class` file.

A class method reference entry is composite:

where the type in the `NameAndTypeEntry` is a method descriptor string.

**See also:** ConstantPoolBuilder#methodRefEntry ConstantPoolBuilder::methodRefEntry

**jvms:** 4.4.2 The `CONSTANT_Fieldref_info`, `CONSTANT_Methodref_info`, and `CONSTANT_InterfaceMethodref_info` Structures

**Since:** 24

## MethodRefEntry.typeSymbol()

```java
default MethodTypeDesc typeSymbol()
```
