---
title: "Label interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/Label.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Label interface (java.lang.classfile)

```java
public sealed interface Label permits LabelImpl
```

A marker for a position within the instructions of a method body.  The
position is a cursor position in the list of instructions, similar to that
of a `ListIterator`.

#### Reading Labels

Labels read from `class` files represent positions in the `code`
array of a Code attribute.  It is associated with a
bci (bytecode index), also known as pc
(program counter), the index into the `code` array; the actual cursor
position is immediately before the given index, so a label at the beginning
of the instructions has bci `0`, and a label at the end of the
instructions has bci codeLength() + 1.  The
bci can be inspected through CodeAttribute::labelToBci.

In generic `CodeModel`s, a label may not have a bci value; the position
of a label can be found by searching for the corresponding `LabelTarget`
within that model.

#### Writing Labels

Many models in `java.lang.classfile` refer to labels.  To write a
label, a label must be obtained, it must be bound to a `CodeBuilder`.

To obtain a label:

- Use a label read from other models.

- Use pre-defined labels from a `CodeBuilder`, such as CodeBuilder::startLabel, CodeBuilder::endLabel, or BlockCodeBuilder::breakLabel.  They are already bound.

- Create labels with CodeBuilder::newLabel or
    CodeBuilder::newBoundLabel.

A label must be bound exactly once in the `CodeBuilder` where it is
used; otherwise, writing fails.  To bind an unbound label:

- Send a read `LabelTarget` to a `CodeBuilder`.

- Use CodeBuilder::labelBinding.

Note that a label read from another model is not automatically bound in a
`CodeBuilder`; they are separate entities and the label is bound to
different positions in them.

**See also:** CodeAttribute#labelToBci CodeAttribute::labelToBci

**See also:** CodeBuilder#newLabel CodeBuilder::newLabel

**See also:** CodeBuilder#labelBinding CodeBuilder::labelBinding

**Since:** 24
