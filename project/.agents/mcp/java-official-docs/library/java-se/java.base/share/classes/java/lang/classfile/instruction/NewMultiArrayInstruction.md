---
title: "NewMultiArrayInstruction interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/NewMultiArrayInstruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NewMultiArrayInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface NewMultiArrayInstruction extends Instruction permits AbstractInstruction.BoundNewMultidimensionalArrayInstruction, AbstractInstruction.UnboundNewMultidimensionalArrayInstruction
```

Models a multianewarray instruction in the `code`
array of a `Code` attribute.  Delivered as a `CodeElement`
when traversing the elements of a `CodeModel`.

A new multi-dimensional array instruction is composite:

where the `arrayType` is an array class.

**See also:** Opcode.Kind#NEW_MULTI_ARRAY

**See also:** CodeBuilder#multianewarray CodeBuilder::multianewarray

**jvms:** 6.5.multianewarray *multianewarray*

**Since:** 24

## NewMultiArrayInstruction.arrayType()

```java
ClassEntry arrayType()
```

## NewMultiArrayInstruction.dimensions()

```java
int dimensions()
```

## NewMultiArrayInstruction.of(ClassEntry, int)

```java
static NewMultiArrayInstruction of(ClassEntry arrayTypeEntry, int dimensions)
```

Parameters:

- `arrayTypeEntry`: the type of the array
- `dimensions`: the number of dimensions of the array

Throws:

- `IllegalArgumentException`: if `dimensions` is out of range
