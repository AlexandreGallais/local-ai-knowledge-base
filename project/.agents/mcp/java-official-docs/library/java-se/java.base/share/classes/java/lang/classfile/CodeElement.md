---
title: "CodeElement interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/CodeElement.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CodeElement interface (java.lang.classfile)

```java
public sealed interface CodeElement extends ClassFileElement permits Instruction, PseudoInstruction, CustomAttribute, RuntimeVisibleTypeAnnotationsAttribute, RuntimeInvisibleTypeAnnotationsAttribute, StackMapTableAttribute, UnknownAttribute
```

Marker interface for a member element of a `CodeModel`.  Such an
element can appear when traversing a `CodeModel` unless otherwise
specified, be supplied to a `CodeBuilder`, and be processed by a
`CodeTransform`.

Code elements can be categorized into `Instruction`, `PseudoInstruction`, and `Attribute`.  Unlike in other `CompoundElement`, the order of elements for all `Instruction`s and some
`PseudoInstruction`s is significant.

**See also:** ClassFileElement##membership Membership Elements

**See also:** ClassElement

**See also:** MethodElement

**See also:** FieldElement

**sealedGraph:**

**Since:** 24
