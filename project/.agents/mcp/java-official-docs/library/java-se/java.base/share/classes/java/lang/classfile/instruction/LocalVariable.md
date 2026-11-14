---
title: "LocalVariable interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/LocalVariable.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LocalVariable interface (java.lang.classfile.instruction)

```java
public sealed interface LocalVariable extends PseudoInstruction permits AbstractPseudoInstruction.UnboundLocalVariable, BoundLocalVariable
```

A pseudo-instruction which models a single entry in the LocalVariableTable attribute.  Delivered as a
`CodeElement` during traversal of the elements of a `CodeModel`,
according to the setting of the `ClassFile.DebugElementsOption` option.

A local variable entry is composite:

Where `slot` is within `[0, 65535]`.

Another model, `LocalVariableInfo`, also models a local variable
entry; it has no dependency on a `CodeModel` and represents of bci
values as `int`s instead of `Label`s, and is used as components
of a `LocalVariableTableAttribute`.

**API note:** `LocalVariable` is used for all local variables in Java source code.
If a local variable has a parameterized type, a type argument, or an array
type of one of the previous types, a `LocalVariableType` should be
created for that local variable as well.

**See also:** LocalVariableInfo

**See also:** CodeBuilder#localVariable CodeBuilder::localVariable

**See also:** ClassFile.DebugElementsOption

**Since:** 24

## LocalVariable.slot()

```java
int slot()
```

The value is within `[0, 65535]`.

## LocalVariable.name()

```java
Utf8Entry name()
```

## LocalVariable.type()

```java
Utf8Entry type()
```

**API note:** A symbolic descriptor for the type of the local variable is available
through typeSymbol().

## LocalVariable.typeSymbol()

```java
default ClassDesc typeSymbol()
```

## LocalVariable.startScope()

```java
Label startScope()
```

## LocalVariable.endScope()

```java
Label endScope()
```

## LocalVariable.of(int, Utf8Entry, Utf8Entry, Label, Label)

```java
static LocalVariable of(int slot, Utf8Entry nameEntry, Utf8Entry descriptorEntry, Label startScope, Label endScope)
```

`slot` must be within `[0, 65535]`.

Parameters:

- `slot`: the local variable slot
- `nameEntry`: the local variable name
- `descriptorEntry`: the local variable descriptor
- `startScope`: the start range of the local variable scope
- `endScope`: the end range of the local variable scope

Throws:

- `IllegalArgumentException`: if `slot` is out of range

## LocalVariable.of(int, String, ClassDesc, Label, Label)

```java
static LocalVariable of(int slot, String name, ClassDesc descriptor, Label startScope, Label endScope)
```

`slot` must be within `[0, 65535]`.

Parameters:

- `slot`: the local variable slot
- `name`: the local variable name
- `descriptor`: the local variable descriptor
- `startScope`: the start range of the local variable scope
- `endScope`: the end range of the local variable scope

Throws:

- `IllegalArgumentException`: if `slot` is out of range
