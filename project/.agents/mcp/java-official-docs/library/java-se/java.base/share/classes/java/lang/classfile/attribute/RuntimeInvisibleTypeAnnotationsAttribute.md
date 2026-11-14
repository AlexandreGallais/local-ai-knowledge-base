---
title: "RuntimeInvisibleTypeAnnotationsAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/RuntimeInvisibleTypeAnnotationsAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RuntimeInvisibleTypeAnnotationsAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface RuntimeInvisibleTypeAnnotationsAttribute extends Attribute<RuntimeInvisibleTypeAnnotationsAttribute>, ClassElement, MethodElement, FieldElement, CodeElement permits BoundAttribute.BoundRuntimeInvisibleTypeAnnotationsAttribute, UnboundAttribute.UnboundRuntimeInvisibleTypeAnnotationsAttribute
```

Models the RuntimeInvisibleTypeAnnotations attribute (JVMS ), which
stores type-use annotations for the annotated uses of types in this
structure that are visible to `class` file consumers but are not
visible to core reflection.  Its delivery in the
traversal of a `CodeModel` may be toggled by `ClassFile.DebugElementsOption`.

This attribute appears on classes, fields, methods, `Code` attributes,
and record components, and does not permit multiple instances in one structure.  It has a
data dependency on arbitrary indices
in the `class` file format, so users must take great care to ensure
this attribute is still correct after a `class` file has been transformed.

The attribute was introduced in the Java SE Platform version 8, major version
`ClassFile#JAVA_8_VERSION`.

**See also:** Attributes#runtimeInvisibleTypeAnnotations()

**See also:** java.compiler/javax.lang.model.type.TypeMirror

**See also:** ElementType#TYPE_PARAMETER

**See also:** ElementType#TYPE_USE

**See also:** RetentionPolicy#CLASS

**jvms:** 4.7.21 The `RuntimeInvisibleTypeAnnotations` Attribute

**Since:** 24

## RuntimeInvisibleTypeAnnotationsAttribute.annotations()

```java
List<TypeAnnotation> annotations()
```

## RuntimeInvisibleTypeAnnotationsAttribute.of(List<TypeAnnotation>)

```java
static RuntimeInvisibleTypeAnnotationsAttribute of(List<TypeAnnotation> annotations)
```

Parameters:

- `annotations`: the annotations

## RuntimeInvisibleTypeAnnotationsAttribute.of(TypeAnnotation...)

```java
static RuntimeInvisibleTypeAnnotationsAttribute of(TypeAnnotation... annotations)
```

Parameters:

- `annotations`: the annotations
