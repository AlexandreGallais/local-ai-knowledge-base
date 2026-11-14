---
title: "PackageEntry interface (java.lang.classfile.constantpool)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/constantpool/PackageEntry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PackageEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface PackageEntry extends PoolEntry permits AbstractPoolEntry.PackageEntryImpl
```

Models a `CONSTANT_Package_info`, representing a package, in the
constant pool of a `class` file.

The use of a `PackageEntry` is represented by a `PackageDesc`
that does not represent the unnamed package.  Conversions are through
`ConstantPoolBuilder.packageEntry(PackageDesc)` and
`asSymbol()`.

A package entry is composite:

where `name` is the internal form
of a binary package name and is not empty.

**jvms:** 4.4.12 The `CONSTANT_Package_info` Structure

**Since:** 24

## PackageEntry.name()

```java
Utf8Entry name()
```

## PackageEntry.asSymbol()

```java
PackageDesc asSymbol()
```

**API note:** If only symbol equivalence is desired, matches should be used.  It requires reduced parsing and can
improve `class` file reading performance.

## PackageEntry.matches(PackageDesc)

```java
boolean matches(PackageDesc desc)
```

Parameters:

- `desc`: the package descriptor

**Since:** 25
