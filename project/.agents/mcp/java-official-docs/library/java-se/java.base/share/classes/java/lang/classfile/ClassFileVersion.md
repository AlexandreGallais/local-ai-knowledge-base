---
title: "ClassFileVersion interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/ClassFileVersion.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ClassFileVersion interface (java.lang.classfile)

```java
public sealed interface ClassFileVersion extends ClassElement permits ClassFileVersionImpl
```

Models the minor and major version numbers of a `class` file (JVMS
).  The `class` file version appears exactly once in each
class, and is set to an unspecified default value if not explicitly provided.

The major versions of `class` file format begins at `ClassFile#JAVA_1_VERSION` for Java Platform version 1.0.2, and is continuous
up to `ClassFile.latestMajorVersion()`.  In general, each major version
defines a new supported `class` file format, modeled by `ClassFileFormatVersion`, and supports all previous formats.

For major versions up to `ClassFile#JAVA_11_VERSION` for Java SE
Platform 11, the minor version of any value is supported.  For major versions
`ClassFile#JAVA_12_VERSION` for Java SE Platform version 12 and above,
the minor version must be `0` or `ClassFile#PREVIEW_MINOR_VERSION`.
The minor version `0` is always supported, and represents the format
modeled by `ClassFileFormatVersion`.  The minor version `65535`
indicates the `class` file uses preview features of the Java SE
Platform release represented by the major version.  A Java Virtual Machine
can only load such a `class` file if it has the same Java SE Platform
version and the JVM has preview features enabled.

**See also:** ClassModel#majorVersion()

**See also:** ClassModel#minorVersion()

**See also:** ClassFileFormatVersion

**jvms:** 4.1 The `ClassFile` Structure

**Since:** 24

## ClassFileVersion.majorVersion()

```java
int majorVersion()
```

It is in the range of unsigned short, `[0, 65535]`.

**API note:** Constants in `ClassFile` named `Java_#_VERSION`, where # is
a release number, such as `ClassFile.JAVA_21_VERSION`, describe the
class major versions of the Java Platform SE.

## ClassFileVersion.minorVersion()

```java
int minorVersion()
```

It is in the range of unsigned short, `[0, 65535]`.

## ClassFileVersion.of(int, int)

```java
static ClassFileVersion of(int majorVersion, int minorVersion)
```

Parameters:

- `majorVersion`: the major version
- `minorVersion`: the minor version
