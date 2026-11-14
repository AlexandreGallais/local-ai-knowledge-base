---
title: "Instruction interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/Instruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Instruction interface (java.lang.classfile)

```java
public sealed interface Instruction extends CodeElement permits ArrayLoadInstruction, ArrayStoreInstruction, BranchInstruction, ConstantInstruction, ConvertInstruction, DiscontinuedInstruction, FieldInstruction, InvokeDynamicInstruction, InvokeInstruction, LoadInstruction, StoreInstruction, IncrementInstruction, LookupSwitchInstruction, MonitorInstruction, NewMultiArrayInstruction, NewObjectInstruction, NewPrimitiveArrayInstruction, NewReferenceArrayInstruction, NopInstruction, OperatorInstruction, ReturnInstruction, StackInstruction, TableSwitchInstruction, ThrowInstruction, TypeCheckInstruction, AbstractInstruction
```

Models an executable instruction in the `code` array of the Code attribute of a method.  The order of instructions in
a `CodeModel` is significant.

The opcode identifies the operation of an instruction.
Each kind of opcode has its own modeling interface
for instructions.

**See also:** Opcode

**jvms:** 6.5 Instructions

**sealedGraph:**

**Since:** 24

## Instruction.opcode()

```java
Opcode opcode()
```

## Instruction.sizeInBytes()

```java
int sizeInBytes()
```

This value is equal to opcode().sizeIfFixed() if it is not `-1`.
