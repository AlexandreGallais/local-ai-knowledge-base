---
title: "TypeCheckInstruction interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/TypeCheckInstruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# TypeCheckInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface TypeCheckInstruction extends Instruction permits AbstractInstruction.BoundTypeCheckInstruction, AbstractInstruction.UnboundTypeCheckInstruction
```

Models an instanceof or a checkcast
instruction in the `code` array of a `Code` attribute.  Corresponding
opcodes have a kind of `Opcode.Kind.TYPE_CHECK`.
Delivered as a `CodeElement` when traversing the elements of a `CodeModel`.

An `instanceof` checks the type and pushes an integer to the operand stack.
A `checkcast` checks the type and throws a `ClassCastException` if
the check fails.  `instanceof` treat the `null` reference as a
failure, while `checkcast` treat the `null` reference as a success.

A type check instruction is composite:

**Since:** 24

## TypeCheckInstruction.type()

```java
ClassEntry type()
```

## TypeCheckInstruction.of(Opcode, ClassEntry)

```java
static TypeCheckInstruction of(Opcode op, ClassEntry type)
```

Parameters:

- `op`: the opcode for the specific type of type check instruction, which must be of kind `Opcode.Kind.TYPE_CHECK`
- `type`: the type against which to check or cast

Throws:

- `IllegalArgumentException`: if the opcode kind is not `Opcode.Kind.TYPE_CHECK`

## TypeCheckInstruction.of(Opcode, ClassDesc)

```java
static TypeCheckInstruction of(Opcode op, ClassDesc type)
```

Parameters:

- `op`: the opcode for the specific type of type check instruction, which must be of kind `Opcode.Kind.TYPE_CHECK`
- `type`: the type against which to check or cast

Throws:

- `IllegalArgumentException`: if the opcode kind is not `Opcode.Kind.TYPE_CHECK`, or if `type` is primitive
