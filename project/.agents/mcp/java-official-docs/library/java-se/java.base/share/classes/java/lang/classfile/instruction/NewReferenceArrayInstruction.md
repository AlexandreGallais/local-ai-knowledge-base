---
title: "NewReferenceArrayInstruction interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/NewReferenceArrayInstruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NewReferenceArrayInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface NewReferenceArrayInstruction extends Instruction permits AbstractInstruction.BoundNewReferenceArrayInstruction, AbstractInstruction.UnboundNewReferenceArrayInstruction
```

Models a anewarray instruction in the `code`
array of a `Code` attribute.  Delivered as a `CodeElement`
when traversing the elements of a `CodeModel`.

A new reference array instruction is composite:

**See also:** Opcode.Kind#NEW_REF_ARRAY

**See also:** CodeBuilder#newarray CodeBuilder::anewarray

**jvms:** 6.5.anewarray *anewarray*

**Since:** 24

## NewReferenceArrayInstruction.componentType()

```java
ClassEntry componentType()
```

## NewReferenceArrayInstruction.of(ClassEntry)

```java
static NewReferenceArrayInstruction of(ClassEntry componentType)
```

Parameters:

- `componentType`: the component type of the array
