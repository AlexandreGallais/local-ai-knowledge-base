---
title: "UnknownAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/UnknownAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# UnknownAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface UnknownAttribute extends Attribute<UnknownAttribute>, ClassElement, MethodElement, FieldElement, CodeElement permits BoundAttribute.BoundUnknownAttribute
```

Models an unknown attribute read from a `class` file.  An attribute is
unknown if it is not recognized by one of the mappers in `Attributes`
and is not recognized by the `ClassFile.AttributesProcessingOption`.

An unknown attribute may appear anywhere where an attribute may appear, and
has an unknown data dependency.

**See also:** CustomAttribute

**Since:** 24

## UnknownAttribute.contents()

```java
byte[] contents()
```
