---
title: "RuntimeInvisibleAnnotationsAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/RuntimeInvisibleAnnotationsAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RuntimeInvisibleAnnotationsAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface RuntimeInvisibleAnnotationsAttribute extends Attribute<RuntimeInvisibleAnnotationsAttribute>, ClassElement, MethodElement, FieldElement permits BoundAttribute.BoundRuntimeInvisibleAnnotationsAttribute, UnboundAttribute.UnboundRuntimeInvisibleAnnotationsAttribute
```

Models the RuntimeInvisibleAnnotations attribute (JVMS ), which stores
declaration annotations on this structure that are visible to `class` file consumers but are not visible to core reflection.

This attribute appears on classes, fields, methods, and record components,
and does not permit multiple instances in one structure.  It has a data dependency on the constant pool.

The attribute was introduced in the Java SE Platform version 5.0, major
version `ClassFile#JAVA_5_VERSION`.

**See also:** Attributes#runtimeInvisibleAnnotations()

**See also:** java.compiler/javax.lang.model.element.Element

**See also:** ElementType

**See also:** RetentionPolicy#CLASS

**jvms:** 4.7.17 The `RuntimeInvisibleAnnotations` Attribute

**Since:** 24

## RuntimeInvisibleAnnotationsAttribute.annotations()

```java
List<Annotation> annotations()
```

## RuntimeInvisibleAnnotationsAttribute.of(List<Annotation>)

```java
static RuntimeInvisibleAnnotationsAttribute of(List<Annotation> annotations)
```

Parameters:

- `annotations`: the annotations

## RuntimeInvisibleAnnotationsAttribute.of(Annotation...)

```java
static RuntimeInvisibleAnnotationsAttribute of(Annotation... annotations)
```

Parameters:

- `annotations`: the annotations
