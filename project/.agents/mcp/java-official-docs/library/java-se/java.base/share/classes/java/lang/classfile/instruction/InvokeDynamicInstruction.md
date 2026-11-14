---
title: "InvokeDynamicInstruction interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/InvokeDynamicInstruction.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InvokeDynamicInstruction interface (java.lang.classfile.instruction)

```java
public sealed interface InvokeDynamicInstruction extends Instruction permits AbstractInstruction.BoundInvokeDynamicInstruction, AbstractInstruction.UnboundInvokeDynamicInstruction
```

Models a dynamically-computed call site invocation instruction in the
`code` array of a `Code` attribute.  The corresponding opcode is
invokedynamic.  Delivered as a `CodeElement` when traversing the elements of a `CodeModel`.

A dynamically-computed call site invocation instruction is composite:

**See also:** Opcode.Kind#INVOKE_DYNAMIC

**See also:** CodeBuilder#invokedynamic CodeBuilder::invokedynamic

**jvms:** 6.5.invokedynamic *invokedynamic*

**Since:** 24

## InvokeDynamicInstruction.invokedynamic()

```java
InvokeDynamicEntry invokedynamic()
```

## InvokeDynamicInstruction.name()

```java
default Utf8Entry name()
```

## InvokeDynamicInstruction.type()

```java
default Utf8Entry type()
```

**API note:** A symbolic descriptor for the invocation typeis available through typeSymbol().

## InvokeDynamicInstruction.typeSymbol()

```java
default MethodTypeDesc typeSymbol()
```

## InvokeDynamicInstruction.bootstrapMethod()

```java
default DirectMethodHandleDesc bootstrapMethod()
```

## InvokeDynamicInstruction.bootstrapArgs()

```java
default List<ConstantDesc> bootstrapArgs()
```

## InvokeDynamicInstruction.of(InvokeDynamicEntry)

```java
static InvokeDynamicInstruction of(InvokeDynamicEntry invokedynamic)
```

Parameters:

- `invokedynamic`: the constant pool entry describing the call site
