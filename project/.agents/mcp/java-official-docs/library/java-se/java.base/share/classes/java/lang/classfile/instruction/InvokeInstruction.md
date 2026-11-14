---
title: "InvokeInstruction interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/InvokeInstruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InvokeInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface InvokeInstruction extends Instruction permits AbstractInstruction.BoundInvokeInterfaceInstruction, AbstractInstruction.BoundInvokeInstruction, AbstractInstruction.UnboundInvokeInstruction
```

Models a method invocation instruction in the `code` array of a `Code` attribute, other than invokedynamic.
Corresponding opcodes have a kind of `Opcode.Kind.INVOKE`.
Delivered as a `CodeElement` when traversing the elements of a `CodeModel`.

A method invocation instruction is composite:

where `method` must be an `InterfaceMethodRefEntry` for invokeinterface opcode, and must be a `MethodRefEntry` for invokevirtual opcode.
invokestatic and invokespecial can have either type of entry for `method`.

**See also:** Opcode.Kind#INVOKE

**See also:** CodeBuilder#invoke CodeBuilder::invoke

**Since:** 24

## InvokeInstruction.method()

```java
MemberRefEntry method()
```

## InvokeInstruction.isInterface()

```java
boolean isInterface()
```

## InvokeInstruction.count()

```java
int count()
```

For an `invokeinterface` instruction, this value must be equivalent
to the sum of slot sizes of all arguments
plus one, which is equal to the number of operand stack depth consumed by
this interface method invocation instruction.

**jvms:** 6.5.invokeinterface *invokeinterface*

## InvokeInstruction.owner()

```java
default ClassEntry owner()
```

## InvokeInstruction.name()

```java
default Utf8Entry name()
```

## InvokeInstruction.type()

```java
default Utf8Entry type()
```

**API note:** A symbolic descriptor for the type of the method is available through
typeSymbol().

## InvokeInstruction.typeSymbol()

```java
default MethodTypeDesc typeSymbol()
```

## InvokeInstruction.of(Opcode, MemberRefEntry)

```java
static InvokeInstruction of(Opcode op, MemberRefEntry method)
```

Parameters:

- `op`: the opcode for the specific type of invocation instruction, which must be of kind `Opcode.Kind.INVOKE`
- `method`: a constant pool entry describing the method

Throws:

- `IllegalArgumentException`: if the opcode kind is not `Opcode.Kind.INVOKE`

## InvokeInstruction.of(Opcode, ClassEntry, Utf8Entry, Utf8Entry, boolean)

```java
static InvokeInstruction of(Opcode op, ClassEntry owner, Utf8Entry name, Utf8Entry type, boolean isInterface)
```

Parameters:

- `op`: the opcode for the specific type of invocation instruction, which must be of kind `Opcode.Kind.INVOKE`
- `owner`: the class holding the method
- `name`: the name of the method
- `type`: the method descriptor
- `isInterface`: whether the class holding the method is an interface

Throws:

- `IllegalArgumentException`: if the opcode kind is not `Opcode.Kind.INVOKE`

## InvokeInstruction.of(Opcode, ClassEntry, NameAndTypeEntry, boolean)

```java
static InvokeInstruction of(Opcode op, ClassEntry owner, NameAndTypeEntry nameAndType, boolean isInterface)
```

Parameters:

- `op`: the opcode for the specific type of invocation instruction, which must be of kind `Opcode.Kind.INVOKE`
- `owner`: the class holding the method
- `nameAndType`: the name and type of the method
- `isInterface`: whether the class holding the method is an interface

Throws:

- `IllegalArgumentException`: if the opcode kind is not `Opcode.Kind.INVOKE`
