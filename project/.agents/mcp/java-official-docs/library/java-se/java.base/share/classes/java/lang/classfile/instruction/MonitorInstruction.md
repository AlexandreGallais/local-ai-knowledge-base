---
title: "MonitorInstruction interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/MonitorInstruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MonitorInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface MonitorInstruction extends Instruction permits AbstractInstruction.UnboundMonitorInstruction
```

Models a monitorenter or monitorexit instruction in the `code` array of a `Code` attribute.
Corresponding opcodes have a kind of `Opcode.Kind.MONITOR`.  Delivered as a `CodeElement` when traversing the
elements of a `CodeModel`.

A monitor instruction is composite:

**Since:** 24

## MonitorInstruction.of(Opcode)

```java
static MonitorInstruction of(Opcode op)
```

Parameters:

- `op`: the opcode for the specific type of monitor instruction, which must be of kind `Opcode.Kind.MONITOR`

Throws:

- `IllegalArgumentException`: if the opcode kind is not `Opcode.Kind.MONITOR`.
