---
title: "NewPrimitiveArrayInstruction interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/NewPrimitiveArrayInstruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NewPrimitiveArrayInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface NewPrimitiveArrayInstruction extends Instruction permits AbstractInstruction.BoundNewPrimitiveArrayInstruction, AbstractInstruction.UnboundNewPrimitiveArrayInstruction
```

Models a newarray instruction in the `code`
array of a `Code` attribute.  Delivered as a `CodeElement`
when traversing the elements of a `CodeModel`.

A new primitive array instruction is composite:

where `typeKind` is primitive and not `void`.

**See also:** Opcode.Kind#NEW_PRIMITIVE_ARRAY

**See also:** CodeBuilder#newarray CodeBuilder::newarray

**jvms:** 6.5.newarray *newarray*

**Since:** 24

## NewPrimitiveArrayInstruction.typeKind()

```java
TypeKind typeKind()
```

**API note:** The backing array code for this instruction is available through
typeKind().newarrayCode().

## NewPrimitiveArrayInstruction.of(TypeKind)

```java
static NewPrimitiveArrayInstruction of(TypeKind typeKind)
```

Parameters:

- `typeKind`: the component type of the array

**See also:** TypeKind#fromNewarrayCode(int) TypeKind::fromNewarrayCode

Throws:

- `IllegalArgumentException`: when `typeKind` is not primitive or is `void`
