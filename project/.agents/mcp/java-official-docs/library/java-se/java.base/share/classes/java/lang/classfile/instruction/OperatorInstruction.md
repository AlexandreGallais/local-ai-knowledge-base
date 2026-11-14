---
title: "OperatorInstruction interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/OperatorInstruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# OperatorInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface OperatorInstruction extends Instruction permits AbstractInstruction.UnboundOperatorInstruction
```

Models an arithmetic operator instruction in the `code` array of a
`Code` attribute.  Corresponding opcodes have a kind of
`Opcode.Kind.OPERATOR`.  Delivered as a `CodeElement` when
traversing the elements of a `CodeModel`.

An operator instruction is composite:

**See also:** Opcode.Kind#OPERATOR

**Since:** 24

## OperatorInstruction.typeKind()

```java
TypeKind typeKind()
```

This is derived from the opcode.

## OperatorInstruction.of(Opcode)

```java
static OperatorInstruction of(Opcode op)
```

Parameters:

- `op`: the opcode for the specific type of operator instruction, which must be of kind `Opcode.Kind.OPERATOR`

Throws:

- `IllegalArgumentException`: if the opcode kind is not `Opcode.Kind.OPERATOR`.
