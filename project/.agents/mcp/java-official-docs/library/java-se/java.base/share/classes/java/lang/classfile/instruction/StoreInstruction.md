---
title: "StoreInstruction interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/StoreInstruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StoreInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface StoreInstruction extends Instruction permits AbstractInstruction.BoundStoreInstruction, AbstractInstruction.UnboundStoreInstruction
```

Models a local variable store instruction in the `code` array of a
`Code` attribute.  Corresponding opcodes have a kind of
`Opcode.Kind.STORE`.  Delivered as a `CodeElement` when
traversing the elements of a `CodeModel`.

A local variable store instruction is composite:

where `TypeKind` is computational, and `slot` is within `[0, 65535]`.

`astore` series of instructions, or `reference` type store
instructions, can also operate on the returnAddress type from discontinued jump subroutine instructions.

**See also:** Opcode.Kind#STORE

**See also:** CodeBuilder#storeLocal CodeBuilder::storeLocal

**Since:** 24

## StoreInstruction.slot()

```java
int slot()
```

The value is within `[0, 65535]`.

## StoreInstruction.typeKind()

```java
TypeKind typeKind()
```

The reference
type store instructions also operate on the `returnAddress` type,
which does not apply to `reference` type load instructions.

## StoreInstruction.of(TypeKind, int)

```java
static StoreInstruction of(TypeKind kind, int slot)
```

`kind` is converted to its
computational type.
`slot` must be within `[0, 65535]`.

Parameters:

- `kind`: the type of the value to be stored
- `slot`: the local variable slot to store to

Throws:

- `IllegalArgumentException`: if `kind` is void or `slot` is out of range

## StoreInstruction.of(Opcode, int)

```java
static StoreInstruction of(Opcode op, int slot)
```

The range of `slot` is restricted by the `op` and its
size:

- If `op` has size 1, `slot` must be exactly the slot value
implied by the opcode.

- If `op` has size 2, `slot` must be within `[0, 255]`.

- If `op` has size 4, `slot` must be within `[0, 65535]`.

Parameters:

- `op`: the opcode for the specific type of store instruction, which must be of kind `Opcode.Kind.STORE`
- `slot`: the local variable slot to store to

**API note:** The explicit `op` argument allows creating `wide` or
regular store instructions when the `slot` can be encoded
with more optimized store instructions.

Throws:

- `IllegalArgumentException`: if the opcode kind is not `Opcode.Kind.STORE` or `slot` is out of range
