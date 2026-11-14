---
title: "MethodHandleEntry interface (java.lang.classfile.constantpool)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/constantpool/MethodHandleEntry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodHandleEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface MethodHandleEntry extends LoadableConstantEntry permits AbstractPoolEntry.MethodHandleEntryImpl
```

Models a `CONSTANT_MethodHandle_info` structure, or a symbolic
reference to a method handle, in the constant pool
of a `class` file.  The method handle directly accesses an accessible
method, field, or constructor.

The use of a `MethodHandleEntry` is modeled by a `DirectMethodHandleDesc`.  Conversions are through `ConstantPoolBuilder.methodHandleEntry(DirectMethodHandleDesc)` and `asSymbol()`.

A method handle entry is composite:

where `refKind` is in the range `[1, 9]`.

**See also:** ConstantPoolBuilder#methodHandleEntry
     ConstantPoolBuilder::methodHandleEntry

**jvms:** 4.4.8 The `CONSTANT_MethodHandle_info` Structure

**Since:** 24

## MethodHandleEntry.constantValue()

```java
default ConstantDesc constantValue()
```

(inherited documentation)

This is equivalent to asSymbol().

## MethodHandleEntry.kind()

```java
int kind()
```

**See also:** MethodHandleInfo##refkinds Reference kinds

## MethodHandleEntry.reference()

```java
MemberRefEntry reference()
```

## MethodHandleEntry.asSymbol()

```java
DirectMethodHandleDesc asSymbol()
```

**See also:** ConstantPoolBuilder#methodHandleEntry(DirectMethodHandleDesc)
     ConstantPoolBuilder::methodHandleEntry(DirectMethodHandleDesc)
