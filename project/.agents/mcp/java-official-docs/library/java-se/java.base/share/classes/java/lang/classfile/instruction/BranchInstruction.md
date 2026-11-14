---
title: "BranchInstruction interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/BranchInstruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BranchInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface BranchInstruction extends Instruction permits AbstractInstruction.BoundBranchInstruction, AbstractInstruction.UnboundBranchInstruction
```

Models a branching instruction (conditional or unconditional) in the `code` array of a `Code` attribute.  Corresponding opcodes have a
kind of `Opcode.Kind.BRANCH`.  Delivered as
a `CodeElement` when traversing the elements of a `CodeModel`.

A branch instruction is composite:

Due to physical restrictions, some types of instructions cannot encode labels
too far away in the list of code elements.  In such cases, the `ClassFile.ShortJumpsOption` controls how an invalid branch instruction model
is written by a `CodeBuilder`.

**See also:** Opcode.Kind#BRANCH

**See also:** CodeBuilder#branch CodeBuilder::branch

**See also:** ClassFile.ShortJumpsOption

**Since:** 24

## BranchInstruction.target()

```java
Label target()
```

## BranchInstruction.of(Opcode, Label)

```java
static BranchInstruction of(Opcode op, Label target)
```

Parameters:

- `op`: the opcode for the specific type of branch instruction, which must be of kind `Opcode.Kind.BRANCH`
- `target`: the target of the branch

Throws:

- `IllegalArgumentException`: if the opcode kind is not `Opcode.Kind.BRANCH`
