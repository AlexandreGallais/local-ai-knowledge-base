---
title: "PseudoInstruction interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/PseudoInstruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PseudoInstruction interface (java.lang.classfile)

```java
public sealed interface PseudoInstruction extends CodeElement permits CharacterRange, ExceptionCatch, LabelTarget, LineNumber, LocalVariable, LocalVariableType, AbstractPseudoInstruction
```

Models metadata about a `CodeModel`, derived from the Code attribute itself or its attributes.

Order is significant for some pseudo-instructions relative to `Instruction`s, such as `LabelTarget` or `LineNumber`.  Some
pseudo-instructions can be omitted in reading and writing according to
certain `ClassFile.Option`s.  These are specified in the corresponding
modeling interfaces.

**sealedGraph:**

**Since:** 24
