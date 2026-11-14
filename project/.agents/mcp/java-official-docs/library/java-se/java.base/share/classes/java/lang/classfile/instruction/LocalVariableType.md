---
title: "LocalVariableType interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/LocalVariableType.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LocalVariableType interface (java.lang.classfile.instruction)

```java
public sealed interface LocalVariableType extends PseudoInstruction permits AbstractPseudoInstruction.UnboundLocalVariableType, BoundLocalVariableType
```

A pseudo-instruction which models a single entry in the LocalVariableTypeTable attribute.  Delivered
as a `CodeElement` during traversal of the elements of a `CodeModel`,
according to the setting of the `ClassFile.DebugElementsOption` option.

A local variable type entry is composite:

Where `slot` is within `[0, 65535]`.

Another model, `LocalVariableTypeInfo`, also models a local variable
type entry; it has no dependency on a `CodeModel` and represents of bci
values as `int`s instead of `Label`s, and is used as components
of a `LocalVariableTypeTableAttribute`.

**API note:** `LocalVariableType` is used if a local variable has a parameterized
type, a type argument, or an array type of one of the previous types as its
type.  A `LocalVariable` with the erased type should still be created
for that local variable.

**See also:** LocalVariableTypeInfo

**See also:** CodeBuilder#localVariableType CodeBuilder::localVariableType

**See also:** ClassFile.DebugElementsOption

**Since:** 24

## LocalVariableType.slot()

```java
int slot()
```

The value is within `[0, 65535]`.

## LocalVariableType.name()

```java
Utf8Entry name()
```

## LocalVariableType.signature()

```java
Utf8Entry signature()
```

**API note:** A symbolic generic signature of the local variable is available
through signatureSymbol().

## LocalVariableType.signatureSymbol()

```java
default Signature signatureSymbol()
```

## LocalVariableType.startScope()

```java
Label startScope()
```

## LocalVariableType.endScope()

```java
Label endScope()
```

## LocalVariableType.of(int, Utf8Entry, Utf8Entry, Label, Label)

```java
static LocalVariableType of(int slot, Utf8Entry nameEntry, Utf8Entry signatureEntry, Label startScope, Label endScope)
```

`slot` must be within `[0, 65535]`.

Parameters:

- `slot`: the local variable slot
- `nameEntry`: the local variable name
- `signatureEntry`: the local variable signature
- `startScope`: the start range of the local variable scope
- `endScope`: the end range of the local variable scope

Throws:

- `IllegalArgumentException`: if `slot` is out of range

## LocalVariableType.of(int, String, Signature, Label, Label)

```java
static LocalVariableType of(int slot, String name, Signature signature, Label startScope, Label endScope)
```

`slot` must be within `[0, 65535]`.

Parameters:

- `slot`: the local variable slot
- `name`: the local variable name
- `signature`: the local variable signature
- `startScope`: the start range of the local variable scope
- `endScope`: the end range of the local variable scope

Throws:

- `IllegalArgumentException`: if `slot` is out of range
