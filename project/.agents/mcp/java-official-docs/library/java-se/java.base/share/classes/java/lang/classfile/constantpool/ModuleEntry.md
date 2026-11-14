---
title: "ModuleEntry interface (java.lang.classfile.constantpool)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/constantpool/ModuleEntry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ModuleEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface ModuleEntry extends PoolEntry permits AbstractPoolEntry.ModuleEntryImpl
```

Models a `CONSTANT_Module_info` structure, denoting a module, in the
constant pool of a `class` file.

The use of a `ModuleEntry` is modeled by a `ModuleDesc`.
Conversions are through `ConstantPoolBuilder.moduleEntry(ModuleDesc)`
and `asSymbol()`.

A module entry is composite:

where `name` is a module name.

**jvms:** 4.4.11 The `CONSTANT_Module_info` Structure

**Since:** 24

## ModuleEntry.name()

```java
Utf8Entry name()
```

## ModuleEntry.asSymbol()

```java
ModuleDesc asSymbol()
```

**API note:** If only symbol equivalence is desired, matches should be used.  It requires reduced parsing and can
improve `class` file reading performance.

## ModuleEntry.matches(ModuleDesc)

```java
boolean matches(ModuleDesc desc)
```

Parameters:

- `desc`: the module descriptor

**Since:** 25
