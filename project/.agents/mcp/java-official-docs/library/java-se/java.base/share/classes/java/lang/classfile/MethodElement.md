---
title: "MethodElement interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/MethodElement.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodElement interface (java.lang.classfile)

```java
public sealed interface MethodElement extends ClassFileElement permits AccessFlags, CodeModel, CustomAttribute, AnnotationDefaultAttribute, DeprecatedAttribute, ExceptionsAttribute, MethodParametersAttribute, RuntimeInvisibleAnnotationsAttribute, RuntimeInvisibleParameterAnnotationsAttribute, RuntimeInvisibleTypeAnnotationsAttribute, RuntimeVisibleAnnotationsAttribute, RuntimeVisibleParameterAnnotationsAttribute, RuntimeVisibleTypeAnnotationsAttribute, SignatureAttribute, SyntheticAttribute, UnknownAttribute
```

Marker interface for a member element of a `MethodModel`.  Such an
element can appear when traversing a `MethodModel` unless otherwise
specified, be supplied to a `MethodBuilder`, and be processed by a
`MethodTransform`.

`AccessFlags` is the only member element of a method that appear
exactly once during the traversal of a `MethodModel`.

**See also:** ClassFileElement##membership Membership Elements

**See also:** ClassElement

**See also:** FieldElement

**See also:** CodeElement

**sealedGraph:**

**Since:** 24
