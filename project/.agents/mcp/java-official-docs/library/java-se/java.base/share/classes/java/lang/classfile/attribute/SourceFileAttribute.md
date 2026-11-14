---
title: "SourceFileAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/SourceFileAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SourceFileAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface SourceFileAttribute extends Attribute<SourceFileAttribute>, ClassElement permits BoundAttribute.BoundSourceFileAttribute, UnboundAttribute.UnboundSourceFileAttribute
```

Models the SourceFile attribute (JVMS ), which indicates the name of the source file from which this `class` file was compiled.

This attribute only appears on classes, and does not permit multiple instances in a class.  It has a data
dependency on the constant pool.

The attribute was introduced in the Java SE Platform version 5.0, major
version `ClassFile#JAVA_5_VERSION`.

**See also:** Attributes#sourceFile()

**jvms:** 4.7.10 The `SourceFile` Attribute

**Since:** 24

## SourceFileAttribute.sourceFile()

```java
Utf8Entry sourceFile()
```

## SourceFileAttribute.of(String)

```java
static SourceFileAttribute of(String sourceFile)
```

Parameters:

- `sourceFile`: the source file name

## SourceFileAttribute.of(Utf8Entry)

```java
static SourceFileAttribute of(Utf8Entry sourceFile)
```

Parameters:

- `sourceFile`: the source file name
