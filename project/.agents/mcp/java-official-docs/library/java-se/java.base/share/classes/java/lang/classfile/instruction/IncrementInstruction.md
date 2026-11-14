---
title: "IncrementInstruction interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/IncrementInstruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IncrementInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface IncrementInstruction extends Instruction permits AbstractInstruction.BoundIncrementInstruction, AbstractInstruction.UnboundIncrementInstruction
```

Models a local variable increment instruction in the `code` array of a
`Code` attribute.  Corresponding opcodes have a kind of `Opcode.Kind.INCREMENT`.  Delivered as a `CodeElement` when
traversing the elements of a `CodeModel`.

A local variable increment instruction is composite:

where

- `slot` must be within `[0, 65535]`.

- `constant` must be within `[-32768, 32767]`.

**See also:** Opcode.Kind#INCREMENT

**See also:** CodeBuilder#iinc CodeBuilder::iinc

**jvms:** 6.5.iinc *iinc*

**Since:** 24

## IncrementInstruction.slot()

```java
int slot()
```

## IncrementInstruction.constant()

```java
int constant()
```

## IncrementInstruction.of(int, int)

```java
static IncrementInstruction of(int slot, int constant)
```

- `slot` must be within `[0, 65535]`.

- `constant` must be within `[-32768, 32767]`.

Parameters:

- `slot`: the local variable slot to increment
- `constant`: the value to increment by

Throws:

- `IllegalArgumentException`: if `slot` or `constant` is out of range
