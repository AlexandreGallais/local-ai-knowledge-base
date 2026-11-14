---
title: "ArrayStoreInstruction interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/ArrayStoreInstruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ArrayStoreInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface ArrayStoreInstruction extends Instruction permits AbstractInstruction.UnboundArrayStoreInstruction
```

Models an array store instruction in the `code` array of a `Code`
attribute.  Corresponding opcodes have a kind
of `Opcode.Kind.ARRAY_STORE`.  Delivered as a `CodeElement` when
traversing the elements of a `CodeModel`.

An array store instruction is composite:

where `typeKind` is not void, and boolean is converted to byte.

**See also:** Opcode.Kind#ARRAY_STORE

**See also:** CodeBuilder#arrayStore CodeBuilder::arrayStore

**Since:** 24

## ArrayStoreInstruction.typeKind()

```java
TypeKind typeKind()
```

The byte
type store instruction bastore also operates on
boolean arrays, so this never returns
`boolean`.

## ArrayStoreInstruction.of(Opcode)

```java
static ArrayStoreInstruction of(Opcode op)
```

Parameters:

- `op`: the opcode for the specific type of array store instruction, which must be of kind `Opcode.Kind.ARRAY_STORE`

Throws:

- `IllegalArgumentException`: if the opcode kind is not `Opcode.Kind.ARRAY_STORE`
