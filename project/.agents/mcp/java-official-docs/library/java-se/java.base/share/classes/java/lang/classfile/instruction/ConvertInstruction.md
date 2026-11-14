---
title: "ConvertInstruction interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/ConvertInstruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ConvertInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface ConvertInstruction extends Instruction permits AbstractInstruction.UnboundConvertInstruction
```

Models a primitive conversion instruction in the `code` array of a
`Code` attribute, such as i2l.  Corresponding opcodes
have a kind of `Opcode.Kind.CONVERT`.
Delivered as a `CodeElement` when traversing the elements of a `CodeModel`.

A primitive conversion instruction is composite:

where these conversions are valid:

- Between `int`, `long`, `float`, and `double`, where
`fromType != toType`;

- From `int` to `byte`, `char`, and `short`.

**See also:** Opcode.Kind#CONVERT

**See also:** CodeBuilder#conversion CodeBuilder::conversion

**Since:** 24

## ConvertInstruction.fromType()

```java
TypeKind fromType()
```

## ConvertInstruction.toType()

```java
TypeKind toType()
```

## ConvertInstruction.of(TypeKind, TypeKind)

```java
static ConvertInstruction of(TypeKind fromType, TypeKind toType)
```

Valid conversions are:

- Between `int`, `long`, `float`, and `double`,
where `fromType != toType`;

- From `int` to `byte`, `char`, and `short`.

Parameters:

- `fromType`: the type to convert from
- `toType`: the type to convert to

Throws:

- `IllegalArgumentException`: if this is not a valid conversion

## ConvertInstruction.of(Opcode)

```java
static ConvertInstruction of(Opcode op)
```

Parameters:

- `op`: the opcode for the specific type of conversion instruction, which must be of kind `Opcode.Kind.CONVERT`

Throws:

- `IllegalArgumentException`: if the opcode kind is not `Opcode.Kind.CONVERT`.
