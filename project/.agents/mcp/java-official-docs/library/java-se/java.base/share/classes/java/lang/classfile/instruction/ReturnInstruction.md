---
title: "ReturnInstruction interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/ReturnInstruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ReturnInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface ReturnInstruction extends Instruction permits AbstractInstruction.UnboundReturnInstruction
```

Models a return-from-method instruction in the `code` array of a
`Code` attribute.  Corresponding opcodes have a kind of
`Opcode.Kind.RETURN`.  Delivered as a `CodeElement` when
traversing the elements of a `CodeModel`.

A return-from-method instruction is composite:

where `typeKind` is computational or void.

**See also:** Opcode.Kind#RETURN

**See also:** CodeBuilder#return_(TypeKind) CodeBuilder::return_

**Since:** 24

## ReturnInstruction.typeKind()

```java
TypeKind typeKind()
```

## ReturnInstruction.of(TypeKind)

```java
static ReturnInstruction of(TypeKind typeKind)
```

`typeKind` is converted to its
computational type.

Parameters:

- `typeKind`: the type of the return instruction

## ReturnInstruction.of(Opcode)

```java
static ReturnInstruction of(Opcode op)
```

Parameters:

- `op`: the opcode for the specific type of return instruction, which must be of kind `Opcode.Kind.RETURN`

Throws:

- `IllegalArgumentException`: if the opcode kind is not `Opcode.Kind.RETURN`.
