---
title: "LoadInstruction interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/LoadInstruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LoadInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface LoadInstruction extends Instruction permits AbstractInstruction.BoundLoadInstruction, AbstractInstruction.UnboundLoadInstruction
```

Models a local variable load instruction in the `code` array of a
`Code` attribute.  Corresponding opcodes have a kind of `Opcode.Kind.LOAD`.  Delivered as a `CodeElement` when traversing the elements of a `CodeModel`.

A local variable load instruction is composite:

where `TypeKind` is computational, and `slot` is within `[0, 65535]`.

**See also:** Opcode.Kind#LOAD

**See also:** CodeBuilder#loadLocal CodeBuilder::loadLocal

**Since:** 24

## LoadInstruction.slot()

```java
int slot()
```

The value is within `[0, 65535]`.

## LoadInstruction.typeKind()

```java
TypeKind typeKind()
```

## LoadInstruction.of(TypeKind, int)

```java
static LoadInstruction of(TypeKind kind, int slot)
```

`kind` is converted to its
computational type.
`slot` must be within `[0, 65535]`.

Parameters:

- `kind`: the type of the value to be loaded
- `slot`: the local variable slot to load from

Throws:

- `IllegalArgumentException`: if `kind` is void or `slot` is out of range

## LoadInstruction.of(Opcode, int)

```java
static LoadInstruction of(Opcode op, int slot)
```

The range of `slot` is restricted by the `op` and its
size:

- If `op` has size 1, `slot` must be exactly the slot value
implied by the opcode.

- If `op` has size 2, `slot` must be within `[0, 255]`.

- If `op` has size 4, `slot` must be within `[0, 65535]`.

Parameters:

- `op`: the opcode for the specific type of load instruction, which must be of kind `Opcode.Kind.LOAD`
- `slot`: the local variable slot to load from

**API note:** The explicit `op` argument allows creating `wide` or
regular load instructions when the `slot` can be encoded
with more optimized load instructions.

Throws:

- `IllegalArgumentException`: if the opcode kind is not `Opcode.Kind.LOAD` or `slot` is out of range
