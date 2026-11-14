---
title: "RuntimeInvisibleParameterAnnotationsAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/RuntimeInvisibleParameterAnnotationsAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RuntimeInvisibleParameterAnnotationsAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface RuntimeInvisibleParameterAnnotationsAttribute extends Attribute<RuntimeInvisibleParameterAnnotationsAttribute>, MethodElement permits BoundAttribute.BoundRuntimeInvisibleParameterAnnotationsAttribute, UnboundAttribute.UnboundRuntimeInvisibleParameterAnnotationsAttribute
```

Models the RuntimeInvisibleParameterAnnotations attribute (JVMS ), which
stores declaration annotations on the method parameters of this method
that are visible to `class` file consumers but are not visible to
core reflection.

This attribute only appears on methods, and does not permit multiple instances in a method.  It has a
data dependency on the constant pool.

The attribute was introduced in the Java SE Platform version 5.0, major
version `ClassFile#JAVA_5_VERSION`.

**See also:** Attributes#runtimeInvisibleParameterAnnotations()

**See also:** ElementType#PARAMETER

**See also:** RetentionPolicy#CLASS

**jvms:** 4.7.19 The `RuntimeInvisibleParameterAnnotations` Attribute

**Since:** 24

## RuntimeInvisibleParameterAnnotationsAttribute.parameterAnnotations()

```java
List<List<Annotation>> parameterAnnotations()
```

The element at the i'th index corresponds to the annotations on the i'th
formal parameter, but note that some synthetic or implicit parameters
may be omitted by this list.  If a parameter has no annotations, that
element is left empty, but is not omitted; thus, the list will never be
truncated because trailing parameters are not annotated.

**See also:** java.lang.reflect##LanguageJvmModel Java programming language and
     JVM modeling in core reflection

## RuntimeInvisibleParameterAnnotationsAttribute.of(List<List<Annotation>>)

```java
static RuntimeInvisibleParameterAnnotationsAttribute of(List<List<Annotation>> parameterAnnotations)
```

The `parameterAnnotations` list should not be truncated, and must
have a length equal to the number of formal parameters; elements for
unannotated parameters may be empty, but may not be omitted.  It may omit
some synthetic or implicit parameters.

Parameters:

- `parameterAnnotations`: a list of run-time invisible annotations for each parameter
