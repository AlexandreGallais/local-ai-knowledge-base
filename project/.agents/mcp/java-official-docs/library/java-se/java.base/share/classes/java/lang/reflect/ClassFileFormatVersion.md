---
title: "ClassFileFormatVersion enum (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/ClassFileFormatVersion.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ClassFileFormatVersion enum (java.lang.reflect)

```java
public enum ClassFileFormatVersion
```

Class file format versions of the Java virtual machine.

See the appropriate edition of *The Java Virtual Machine
Specification* for information about a particular class file
format version.

Note that additional class file format version constants will be
added to model future releases of the Java Virtual Machine
Specification.

**API note:** The complete version used in a class file includes a major version
and a minor version; this enum only models the major version. A
Java virtual machine implementation is required to support a range
of major versions; see the corresponding edition of the *The
Java Virtual Machine Specification* for details.

**Since:** 20

**See also:** System#getProperties System property `java.class.version`

**See also:** java.compiler/javax.lang.model.SourceVersion

## ClassFileFormatVersion.latest()

```java
public static ClassFileFormatVersion latest()
```

## ClassFileFormatVersion.major()

```java
public int major()
```

**jvms:** 4.1 The `ClassFile` Structure

## ClassFileFormatVersion.valueOf(Runtime.Version)

```java
public static ClassFileFormatVersion valueOf(Runtime.Version rv)
```

If the runtime version's
feature is greater than
the feature of the runtime version of the latest class file format version, an `IllegalArgumentException` is thrown.

Because the class file format versions of the Java platform
have so far followed a linear progression, only the feature
component of a runtime version is queried to determine the
mapping to a class file format version. If that linearity
changes in the future, other components of the runtime version
may influence the result.

Parameters:

- `rv`: runtime version to map to a class file format version

**API note:** An expression to convert from a string value, for example
`"17"`, to the corresponding class file format version,
`RELEASE_17`, is:

Throws:

- `IllegalArgumentException`: if the feature of version argument is greater than the feature of the platform version.

## ClassFileFormatVersion.runtimeVersion()

```java
public Runtime.Version runtimeVersion()
```

The returned
runtime version has a feature large enough to support this class file format version
and has no other elements set.

Class file format versions greater than or equal to `RELEASE_6` have non-`null` results.

## ClassFileFormatVersion.fromMajor(int)

```java
public static ClassFileFormatVersion fromMajor(int major)
```

Parameters:

- `major`: the major class file version as an integer

Throws:

- `IllegalArgumentException`: if the argument is outside of the range of major class file versions
