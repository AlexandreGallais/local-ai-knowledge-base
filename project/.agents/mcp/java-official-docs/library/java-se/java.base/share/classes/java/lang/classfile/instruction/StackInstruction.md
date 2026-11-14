---
title: "StackInstruction interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/StackInstruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StackInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface StackInstruction extends Instruction permits AbstractInstruction.UnboundStackInstruction
```

Models a stack manipulation instruction in the `code` array of a
`Code` attribute.  Corresponding opcodes have a kind of
`Opcode.Kind.STACK`.  Delivered as a `CodeElement` when
traversing the elements of a `CodeModel`.

A stack manipulation instruction is composite:

**See also:** Opcode.Kind#STACK

**Since:** 24

## StackInstruction.of(Opcode)

```java
static StackInstruction of(Opcode op)
```

Parameters:

- `op`: the opcode for the specific type of stack instruction, which must be of kind `Opcode.Kind.STACK`

Throws:

- `IllegalArgumentException`: if the opcode kind is not `Opcode.Kind.STACK`.
