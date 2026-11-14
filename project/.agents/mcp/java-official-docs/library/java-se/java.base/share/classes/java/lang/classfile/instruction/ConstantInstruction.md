---
title: "ConstantInstruction interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/ConstantInstruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ConstantInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface ConstantInstruction extends Instruction
```

Models a constant-load instruction in the `code` array of a `Code` attribute, including "intrinsic", "argument", and
"load" constant instructions.
Corresponding opcodes have a kind of `Opcode.Kind.CONSTANT`.  Delivered as a `CodeElement` when traversing
the elements of a `CodeModel`.

The loaded constant value is symbolically represented as a `ConstantDesc`:

**See also:** Opcode.Kind#CONSTANT

**See also:** CodeBuilder#loadConstant(ConstantDesc) CodeBuilder::loadConstant

**sealedGraph:**

**Since:** 24

## ConstantInstruction.constantValue()

```java
ConstantDesc constantValue()
```

## ConstantInstruction.typeKind()

```java
TypeKind typeKind()
```

This is derived from the constantValue.

## ConstantInstruction.constantEntry()

```java
LoadableConstantEntry constantEntry()
```

## ConstantInstruction.ofIntrinsic(Opcode)

```java
static IntrinsicConstantInstruction ofIntrinsic(Opcode op)
```

Parameters:

- `op`: the opcode for the specific type of intrinsic constant instruction, which must be of kind `Opcode.Kind.CONSTANT`

Throws:

- `IllegalArgumentException`: if the opcode does not represent a constant with implicit value

## ConstantInstruction.ofArgument(Opcode, int)

```java
static ArgumentConstantInstruction ofArgument(Opcode op, int value)
```

`value` must be in the range of `byte`, `[-128, 127]`,
for `Opcode.BIPUSH`, and in the range of `short`, `[-32768, 32767]`, for `Opcode.SIPUSH`.

Parameters:

- `op`: the opcode for the specific type of argument constant instruction, which must be `Opcode.BIPUSH` or `Opcode.SIPUSH`
- `value`: the constant value

Throws:

- `IllegalArgumentException`: if the opcode is not `Opcode.BIPUSH` or `Opcode.SIPUSH`, or if the constant value is out of range for the opcode

## ConstantInstruction.ofLoad(Opcode, LoadableConstantEntry)

```java
static LoadConstantInstruction ofLoad(Opcode op, LoadableConstantEntry constant)
```

Parameters:

- `op`: the opcode for the specific type of load constant instruction, which must be of kind `Opcode.Kind.CONSTANT`
- `constant`: the constant value

Throws:

- `IllegalArgumentException`: if the opcode is not `Opcode.LDC`, `Opcode.LDC_W`, or `Opcode.LDC2_W`
