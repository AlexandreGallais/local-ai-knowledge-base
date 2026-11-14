---
title: "DiscontinuedInstruction interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/DiscontinuedInstruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DiscontinuedInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface DiscontinuedInstruction extends Instruction
```

Marker interface for instruction discontinued from the `code` array of
a `Code` attribute.  Delivered as a `CodeElement` when traversing
the elements of a `CodeModel`.

**API note:** While most instructions have convenience factory methods in `CodeBuilder`, discontinued instructions can only be supplied to code builders
explicitly with CodeBuilder::with to discourage
their use.

**jvms:** 4.9.1 Static Constraints

**sealedGraph:**

**Since:** 24

## DiscontinuedInstruction.target()

```java
Label target()
```

## DiscontinuedInstruction.of(Opcode, Label)

```java
static JsrInstruction of(Opcode op, Label target)
```

Parameters:

- `op`: the opcode for the specific type of jump subroutine instruction, which must be of kind `Opcode.Kind.DISCONTINUED_JSR`
- `target`: target label of the subroutine

**API note:** The explicit `op` argument allows creating jsr_w instructions to avoid short jumps.

Throws:

- `IllegalArgumentException`: if the opcode kind is not `Opcode.Kind.DISCONTINUED_JSR`.

## DiscontinuedInstruction.of(Label)

```java
static JsrInstruction of(Label target)
```

Parameters:

- `target`: target label of the subroutine

## DiscontinuedInstruction.slot()

```java
int slot()
```

The value is within `[0, 65535]`.

## DiscontinuedInstruction.of(Opcode, int)

```java
static RetInstruction of(Opcode op, int slot)
```

`slot` must be in the closed range of `[0, 255]` for
ret, or within `[0, 65535]` for wide ret.

Parameters:

- `op`: the opcode for the specific type of return from subroutine instruction, which must be of kind `Opcode.Kind.DISCONTINUED_RET`
- `slot`: the local variable slot to load return address from

**API note:** The explicit `op` argument allows creating `wide ret`
instructions with `slot` in the range of regular `ret`
instructions.

Throws:

- `IllegalArgumentException`: if the opcode kind is not `Opcode.Kind.DISCONTINUED_RET` or if `slot` is out of range

## DiscontinuedInstruction.of(int)

```java
static RetInstruction of(int slot)
```

`slot` must be within `[0, 65535]`.

Parameters:

- `slot`: the local variable slot to load return address from

Throws:

- `IllegalArgumentException`: if `slot` is out of range
