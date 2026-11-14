---
title: "FieldInstruction interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/FieldInstruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FieldInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface FieldInstruction extends Instruction permits AbstractInstruction.BoundFieldInstruction, AbstractInstruction.UnboundFieldInstruction
```

Models a field access instruction in the `code` array of a `Code`
attribute.  Corresponding opcodes have a kind
of `Opcode.Kind.FIELD_ACCESS`.  Delivered as a `CodeElement` when
traversing the elements of a `CodeModel`.

A field access instruction is composite:

**See also:** Opcode.Kind#FIELD_ACCESS

**See also:** CodeBuilder#fieldAccess CodeBuilder::fieldAccess

**Since:** 24

## FieldInstruction.field()

```java
FieldRefEntry field()
```

## FieldInstruction.owner()

```java
default ClassEntry owner()
```

## FieldInstruction.name()

```java
default Utf8Entry name()
```

## FieldInstruction.type()

```java
default Utf8Entry type()
```

**API note:** A symbolic descriptor for the type of the field is available through
typeSymbol().

## FieldInstruction.typeSymbol()

```java
default ClassDesc typeSymbol()
```

## FieldInstruction.of(Opcode, FieldRefEntry)

```java
static FieldInstruction of(Opcode op, FieldRefEntry field)
```

Parameters:

- `op`: the opcode for the specific type of field access instruction, which must be of kind `Opcode.Kind.FIELD_ACCESS`
- `field`: a constant pool entry describing the field

Throws:

- `IllegalArgumentException`: if the opcode kind is not `Opcode.Kind.FIELD_ACCESS`.

## FieldInstruction.of(Opcode, ClassEntry, Utf8Entry, Utf8Entry)

```java
static FieldInstruction of(Opcode op, ClassEntry owner, Utf8Entry name, Utf8Entry type)
```

Parameters:

- `op`: the opcode for the specific type of field access instruction, which must be of kind `Opcode.Kind.FIELD_ACCESS`
- `owner`: the class holding the field
- `name`: the name of the field
- `type`: the field descriptor

Throws:

- `IllegalArgumentException`: if the opcode kind is not `Opcode.Kind.FIELD_ACCESS`.

## FieldInstruction.of(Opcode, ClassEntry, NameAndTypeEntry)

```java
static FieldInstruction of(Opcode op, ClassEntry owner, NameAndTypeEntry nameAndType)
```

Parameters:

- `op`: the opcode for the specific type of field access instruction, which must be of kind `Opcode.Kind.FIELD_ACCESS`
- `owner`: the class holding the field
- `nameAndType`: the name and field descriptor of the field

Throws:

- `IllegalArgumentException`: if the opcode kind is not `Opcode.Kind.FIELD_ACCESS`.
