---
title: "ArrayLoadInstruction interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/ArrayLoadInstruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ArrayLoadInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface ArrayLoadInstruction extends Instruction permits AbstractInstruction.UnboundArrayLoadInstruction
```

Models an array load instruction in the `code` array of a `Code`
attribute.  Corresponding opcodes have a kind
of `Opcode.Kind.ARRAY_LOAD`.  Delivered as a `CodeElement` when
traversing the elements of a `CodeModel`.

An array load instruction is composite:

where `typeKind` is not void, and boolean is converted to byte.

**See also:** Opcode.Kind#ARRAY_LOAD

**See also:** CodeBuilder#arrayLoad CodeBuilder::arrayLoad

**Since:** 24

## ArrayLoadInstruction.typeKind()

```java
TypeKind typeKind()
```

The byte
type load instruction baload also operates on
boolean arrays, so this never returns
`boolean`.

## ArrayLoadInstruction.of(Opcode)

```java
static ArrayLoadInstruction of(Opcode op)
```

Parameters:

- `op`: the opcode for the specific type of array load instruction, which must be of kind `Opcode.Kind.ARRAY_LOAD`

Throws:

- `IllegalArgumentException`: if the opcode kind is not `Opcode.Kind.ARRAY_LOAD`
