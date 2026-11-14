---
title: "NewObjectInstruction interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/NewObjectInstruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NewObjectInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface NewObjectInstruction extends Instruction permits AbstractInstruction.BoundNewObjectInstruction, AbstractInstruction.UnboundNewObjectInstruction
```

Models a new instruction in the `code` array of a `Code`
attribute.  Delivered as a `CodeElement` when traversing the elements
of a `CodeModel`.

A new object instruction is composite:

where the `className` is a non-abstract class.

**See also:** Opcode.Kind#NEW_OBJECT

**See also:** CodeBuilder#new_ CodeBuilder::new_

**jvms:** 6.5.new *new*

**Since:** 24

## NewObjectInstruction.className()

```java
ClassEntry className()
```

## NewObjectInstruction.of(ClassEntry)

```java
static NewObjectInstruction of(ClassEntry className)
```

Parameters:

- `className`: the type of object to create
