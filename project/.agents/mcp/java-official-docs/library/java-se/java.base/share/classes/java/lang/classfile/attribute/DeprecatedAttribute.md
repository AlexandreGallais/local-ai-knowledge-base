---
title: "DeprecatedAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/DeprecatedAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DeprecatedAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface DeprecatedAttribute extends Attribute<DeprecatedAttribute>, ClassElement, MethodElement, FieldElement permits BoundAttribute.BoundDeprecatedAttribute, UnboundAttribute.UnboundDeprecatedAttribute
```

Models the Deprecated attribute (JVMS ), which indicates this structure has been superseded.

This attribute can appear on classes, methods, and fields, and permits
multiple instances in a structure.
It has no data dependency.

This attribute was introduced in the Java SE Platform version 1.1, major
version `ClassFile#JAVA_1_VERSION`.

**API note:** When this attribute is present, the `Deprecated` annotation should
also be present in the RuntimeVisibleAnnotations attribute to provide more obvious alerts.
The reference implementation of the system Java compiler emits this attribute
without the annotation when a `@deprecated` tag is present in the
documentation comments without the annotation.

**See also:** Attributes#deprecated()

**See also:** Deprecated

**jvms:** 4.7.15 The `Deprecated` Attribute

**Since:** 24

## DeprecatedAttribute.of()

```java
static DeprecatedAttribute of()
```
