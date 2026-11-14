---
title: "InterfaceMethodRefEntry interface (java.lang.classfile.constantpool)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/constantpool/InterfaceMethodRefEntry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InterfaceMethodRefEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface InterfaceMethodRefEntry extends MemberRefEntry permits AbstractPoolEntry.InterfaceMethodRefEntryImpl
```

Models a `CONSTANT_InterfaceMethodRef_info` structure, or a symbolic
reference to an interface method, in the constant pool of a `class`
file.

An interface method reference entry is composite:

where the type in the `nameAndType` is a method descriptor string.

**See also:** ConstantPoolBuilder#interfaceMethodRefEntry
     ConstantPoolBuilder::interfaceMethodRefEntry

**jvms:** 4.4.2 The `CONSTANT_Fieldref_info`, `CONSTANT_Methodref_info`, and `CONSTANT_InterfaceMethodref_info` Structures

**Since:** 24

## InterfaceMethodRefEntry.typeSymbol()

```java
default MethodTypeDesc typeSymbol()
```
