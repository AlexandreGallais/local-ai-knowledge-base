---
title: "LabelTarget interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/LabelTarget.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LabelTarget interface (java.lang.classfile.instruction)

```java
public sealed interface LabelTarget extends PseudoInstruction permits LabelImpl
```

A pseudo-instruction which indicates that the specified label corresponds to
the current position in the `Code` attribute.  Delivered as a `CodeElement` during traversal of the elements of a `CodeModel`.

This can be used to inspect the target position of labels across transformations, as bci
is not stable.

When passed to a `CodeBuilder`, this pseudo-instruction sets the
specified label to be bound at the current position in the builder.

By design, `LabelTarget` cannot be created by users and can only be
read from a code model.  Use CodeBuilder::labelBinding to bind arbitrary labels to a `CodeBuilder`.

For a `CodeBuilder cob`, a `LabelTarget lt`, these two calls are
equivalent:

**See also:** Label

**See also:** CodeBuilder#labelBinding CodeBuilder::labelBinding

**Since:** 24

## LabelTarget.label()

```java
Label label()
```
