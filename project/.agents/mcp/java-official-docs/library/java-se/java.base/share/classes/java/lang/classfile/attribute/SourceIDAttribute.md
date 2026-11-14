---
title: "SourceIDAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/SourceIDAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SourceIDAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface SourceIDAttribute extends Attribute<SourceIDAttribute>, ClassElement permits BoundAttribute.BoundSourceIDAttribute, UnboundAttribute.UnboundSourceIDAttribute
```

Models the SourceID attribute, which records
the last modified time of the source file from which this `class` file
was compiled.

This attribute only appears on classes, and does not permit multiple instances in a class.  It has a
data dependency on the constant pool.

This attribute is not predefined in the Java SE Platform.  This is a
JDK-specific nonstandard attribute produced by the reference implementation
of the system Java compiler, defined by the `jdk.compiler` module.

**See also:** Attributes#sourceId()

**See also:** CompilationIDAttribute

**See also:** CharacterRangeTableAttribute

**Since:** 24

## SourceIDAttribute.sourceId()

```java
Utf8Entry sourceId()
```

The source id is the last modified time of the
source file (as reported by the file system, in milliseconds) when this
`class` file is compiled.

## SourceIDAttribute.of(Utf8Entry)

```java
static SourceIDAttribute of(Utf8Entry sourceId)
```

Parameters:

- `sourceId`: the source id

## SourceIDAttribute.of(String)

```java
static SourceIDAttribute of(String sourceId)
```

Parameters:

- `sourceId`: the source id
