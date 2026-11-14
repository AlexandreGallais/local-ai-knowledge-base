---
title: "AnnotationDefaultAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/AnnotationDefaultAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AnnotationDefaultAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface AnnotationDefaultAttribute extends Attribute<AnnotationDefaultAttribute>, MethodElement permits BoundAttribute.BoundAnnotationDefaultAttr, UnboundAttribute.UnboundAnnotationDefaultAttribute
```

Models the AnnotationDefault attribute
(JVMS ), which records the default value (JLS ) for
the annotation interface element defined by this method.

This attribute only appears on methods, and does not permit multiple instances in a method.  It has a
data dependency on the constant pool.

This attribute was introduced in the Java SE Platform version 5.0, major
version `ClassFile#JAVA_5_VERSION`.

**See also:** Attributes#annotationDefault()

**JLS:** 9.6.2 Defaults for Annotation Interface Elements

**jvms:** 4.7.22 The `AnnotationDefault` Attribute

**Since:** 24

## AnnotationDefaultAttribute.defaultValue()

```java
AnnotationValue defaultValue()
```

**See also:** Method#getDefaultValue()

## AnnotationDefaultAttribute.of(AnnotationValue)

```java
static AnnotationDefaultAttribute of(AnnotationValue annotationDefault)
```

Parameters:

- `annotationDefault`: the default value of the annotation interface element
