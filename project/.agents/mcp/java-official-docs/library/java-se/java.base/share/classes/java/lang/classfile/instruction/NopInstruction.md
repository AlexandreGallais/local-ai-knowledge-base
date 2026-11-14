---
title: "NopInstruction interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/NopInstruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NopInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface NopInstruction extends Instruction permits AbstractInstruction.UnboundNopInstruction
```

Models a nop instruction in the `code`
array of a `Code` attribute.  Delivered as a `CodeElement`
when traversing the elements of a `CodeModel`.

A no-op instruction has no visible state.

**See also:** CodeBuilder#nop CodeBuilder::nop

**jvms:** 6.5.nop *nop*

**Since:** 24

## NopInstruction.of()

```java
static NopInstruction of()
```
