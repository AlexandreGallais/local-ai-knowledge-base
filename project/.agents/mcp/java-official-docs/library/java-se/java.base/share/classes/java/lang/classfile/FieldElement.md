---
title: "FieldElement interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/FieldElement.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FieldElement interface (java.lang.classfile)

```java
public sealed interface FieldElement extends ClassFileElement permits AccessFlags, CustomAttribute, ConstantValueAttribute, DeprecatedAttribute, RuntimeInvisibleAnnotationsAttribute, RuntimeInvisibleTypeAnnotationsAttribute, RuntimeVisibleAnnotationsAttribute, RuntimeVisibleTypeAnnotationsAttribute, SignatureAttribute, SyntheticAttribute, UnknownAttribute
```

Marker interface for a member element of a `FieldModel`.  Such an
element can appear when traversing a `FieldModel` unless otherwise
specified, be supplied to a `FieldBuilder`, and be processed by a
`FieldTransform`.

`AccessFlags` is the only member element of a field that appear exactly
once during the traversal of a `FieldModel`.

**See also:** ClassFileElement##membership Membership Elements

**See also:** ClassElement

**See also:** MethodElement

**See also:** CodeElement

**sealedGraph:**

**Since:** 24
