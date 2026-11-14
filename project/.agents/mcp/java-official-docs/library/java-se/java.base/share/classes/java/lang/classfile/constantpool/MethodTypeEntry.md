---
title: "MethodTypeEntry interface (java.lang.classfile.constantpool)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/constantpool/MethodTypeEntry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodTypeEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface MethodTypeEntry extends LoadableConstantEntry permits AbstractPoolEntry.MethodTypeEntryImpl
```

Models a `CONSTANT_MethodType_info` structure, or a symbolic reference
to a method type, in the constant pool of a `class` file.

The use of a `MethodTypeEntry` is modeled by a `MethodTypeDesc`.
Conversions are through `ConstantPoolBuilder.methodTypeEntry(MethodTypeDesc)`
and `asSymbol()`.

A method type entry is composite:

where `descriptor` is a method descriptor
string.

**jvms:** 4.4.9 The `CONSTANT_MethodType_info` Structure

**Since:** 24

## MethodTypeEntry.constantValue()

```java
default ConstantDesc constantValue()
```

(inherited documentation)

This is equivalent to asSymbol().

## MethodTypeEntry.descriptor()

```java
Utf8Entry descriptor()
```

## MethodTypeEntry.asSymbol()

```java
MethodTypeDesc asSymbol()
```

**API note:** If only symbol equivalence is desired, matches should be used.  It requires reduced parsing and can
improve `class` file reading performance.

## MethodTypeEntry.matches(MethodTypeDesc)

```java
boolean matches(MethodTypeDesc desc)
```

Parameters:

- `desc`: the method type descriptor

**Since:** 25
