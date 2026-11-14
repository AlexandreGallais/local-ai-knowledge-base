---
title: "InvokeDynamicEntry interface (java.lang.classfile.constantpool)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/constantpool/InvokeDynamicEntry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InvokeDynamicEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface InvokeDynamicEntry extends DynamicConstantPoolEntry permits AbstractPoolEntry.InvokeDynamicEntryImpl
```

Models a `CONSTANT_InvokeDynamic_info` structure, or the symbolic
reference to a , in the
constant pool of a `class` file.

The use of a `InvokeDynamicEntry` is modeled by a `DynamicCallSiteDesc` symbolic descriptor.  It can be obtained from InvokeDynamicEntry::asSymbol and converted back to a constant
pool entry through ConstantPoolBuilder::invokeDynamicEntry.

An invoke dynamic entry is composite:

where the type in the `nameAndType` is a method descriptor string.

**API note:** A dynamically-computed call site is frequently called a , or an , from the abbreviation of
"invoke dynamic".

**See also:** ConstantPoolBuilder#invokeDynamicEntry
     ConstantPoolBuilder::invokeDynamicEntry

**See also:** DynamicCallSiteDesc

**See also:** java.lang.invoke##indyinsn Dynamically-computed call sites

**jvms:** 4.4.10 The `CONSTANT_Dynamic_info` and `CONSTANT_InvokeDynamic_info` Structures

**Since:** 24

## InvokeDynamicEntry.typeSymbol()

```java
default MethodTypeDesc typeSymbol()
```

## InvokeDynamicEntry.asSymbol()

```java
default DynamicCallSiteDesc asSymbol()
```

**See also:** ConstantPoolBuilder#invokeDynamicEntry(DynamicCallSiteDesc)
     ConstantPoolBuilder::invokeDynamicEntry(DynamicCallSiteDesc)
