---
title: "RuntimeVisibleTypeAnnotationsAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/RuntimeVisibleTypeAnnotationsAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RuntimeVisibleTypeAnnotationsAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface RuntimeVisibleTypeAnnotationsAttribute extends Attribute<RuntimeVisibleTypeAnnotationsAttribute>, ClassElement, MethodElement, FieldElement, CodeElement permits BoundAttribute.BoundRuntimeVisibleTypeAnnotationsAttribute, UnboundAttribute.UnboundRuntimeVisibleTypeAnnotationsAttribute
```

Models the RuntimeVisibleTypeAnnotations attribute (JVMS ), which
stores type-use annotations for the annotated uses of types in this
structure that are visible to both `class` file consumers and
core reflection.  Its delivery in the traversal of
a `CodeModel` may be toggled by `ClassFile.DebugElementsOption`.

This attribute appears on classes, fields, methods, `Code` attributes,
and record components, and does not permit multiple instances in one structure.  It has a
data dependency on arbitrary indices
in the `class` file format, so users must take great care to ensure
this attribute is still correct after a `class` file has been transformed.

The attribute was introduced in the Java SE Platform version 8, major version
`ClassFile#JAVA_8_VERSION`.

**See also:** Attributes#runtimeVisibleTypeAnnotations()

**See also:** java.compiler/javax.lang.model.type.TypeMirror

**See also:** AnnotatedType

**See also:** ElementType#TYPE_PARAMETER

**See also:** ElementType#TYPE_USE

**See also:** RetentionPolicy#RUNTIME

**jvms:** 4.7.20 the `RuntimeVisibleTypeAnnotations` Attribute

**Since:** 24

## RuntimeVisibleTypeAnnotationsAttribute.annotations()

```java
List<TypeAnnotation> annotations()
```

## RuntimeVisibleTypeAnnotationsAttribute.of(List<TypeAnnotation>)

```java
static RuntimeVisibleTypeAnnotationsAttribute of(List<TypeAnnotation> annotations)
```

Parameters:

- `annotations`: the annotations

## RuntimeVisibleTypeAnnotationsAttribute.of(TypeAnnotation...)

```java
static RuntimeVisibleTypeAnnotationsAttribute of(TypeAnnotation... annotations)
```

Parameters:

- `annotations`: the annotations
