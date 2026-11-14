---
title: "BootstrapMethodEntry interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/BootstrapMethodEntry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BootstrapMethodEntry interface (java.lang.classfile)

```java
public sealed interface BootstrapMethodEntry permits BootstrapMethodEntryImpl
```

Models an entry in the bootstrap method table.  The bootstrap method table
is stored in the BootstrapMethods
attribute, but is modeled by the `ConstantPool`, since the bootstrap
method table is logically part of the constant pool.

A bootstrap method entry is composite:

**See also:** ConstantPoolBuilder#bsmEntry ConstantPoolBuilder::bsmEntry

**Since:** 24

## BootstrapMethodEntry.constantPool()

```java
ConstantPool constantPool()
```

**API note:** Given a `ConstantPoolBuilder` `builder` and a `BootstrapMethodEntry` `entry`, use builder.canWriteDirect(entry.constantPool()) instead of object equality
of the constant pool to determine if an entry is compatible.

## BootstrapMethodEntry.bsmIndex()

```java
int bsmIndex()
```

## BootstrapMethodEntry.bootstrapMethod()

```java
MethodHandleEntry bootstrapMethod()
```

## BootstrapMethodEntry.arguments()

```java
List<LoadableConstantEntry> arguments()
```
