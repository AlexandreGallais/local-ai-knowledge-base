---
title: "RuntimeVisibleAnnotationsAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/RuntimeVisibleAnnotationsAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RuntimeVisibleAnnotationsAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface RuntimeVisibleAnnotationsAttribute extends Attribute<RuntimeVisibleAnnotationsAttribute>, ClassElement, MethodElement, FieldElement permits BoundAttribute.BoundRuntimeVisibleAnnotationsAttribute, UnboundAttribute.UnboundRuntimeVisibleAnnotationsAttribute
```

Models the RuntimeVisibleAnnotations attribute (JVMS ), which stores
declaration annotations on this structure that are visible to both
`class` file consumers and core reflection.

This attribute appears on classes, fields, methods, and record components,
and does not permit multiple instances in one structure.  It has a data dependency on the constant pool.

The attribute was introduced in the Java SE Platform version 5.0, major
version `ClassFile#JAVA_5_VERSION`.

**See also:** Attributes#runtimeVisibleAnnotations()

**See also:** java.compiler/javax.lang.model.element.Element

**See also:** AnnotatedElement

**See also:** ElementType

**See also:** RetentionPolicy#RUNTIME

**jvms:** 4.7.16 The `RuntimeVisibleAnnotations` Attribute

**Since:** 24

## RuntimeVisibleAnnotationsAttribute.annotations()

```java
List<Annotation> annotations()
```

## RuntimeVisibleAnnotationsAttribute.of(List<Annotation>)

```java
static RuntimeVisibleAnnotationsAttribute of(List<Annotation> annotations)
```

Parameters:

- `annotations`: the annotations

## RuntimeVisibleAnnotationsAttribute.of(Annotation...)

```java
static RuntimeVisibleAnnotationsAttribute of(Annotation... annotations)
```

Parameters:

- `annotations`: the annotations
