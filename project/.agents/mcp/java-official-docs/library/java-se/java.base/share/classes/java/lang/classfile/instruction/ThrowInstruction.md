---
title: "ThrowInstruction interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/ThrowInstruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ThrowInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface ThrowInstruction extends Instruction permits AbstractInstruction.UnboundThrowInstruction
```

Models an athrow instruction in the `code` array of a
`Code` attribute.  Delivered as a `CodeElement` when traversing
the elements of a `CodeModel`.

A throw instruction has no visible state.

**See also:** Opcode.Kind#THROW_EXCEPTION

**See also:** CodeBuilder#athrow CodeBuiler::athrow

**Since:** 24

## ThrowInstruction.of()

```java
static ThrowInstruction of()
```
