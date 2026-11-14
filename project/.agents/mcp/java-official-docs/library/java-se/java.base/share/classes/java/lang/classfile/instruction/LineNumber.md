---
title: "LineNumber interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/LineNumber.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LineNumber interface (java.lang.classfile.instruction)

```java
public sealed interface LineNumber extends PseudoInstruction permits LineNumberImpl
```

A pseudo-instruction which indicates the code for a given line number starts
after the current position in a Code attribute.  This
models a single entry in the LineNumberTable
attribute.  Delivered as a `CodeElement` during traversal of the
elements of a `CodeModel`, according to the setting of the `ClassFile.LineNumbersOption` option.

A line number entry is composite:

Another model, `LineNumberInfo`, also models a line number entry; it
has no dependency on a `CodeModel` and represents of bci values as
`int`s instead of order of pseudo-instructions in the elements of a
`CodeModel`, and is used as components of a `LineNumberTableAttribute`.

**API note:** Line numbers are represented with custom pseudo-instructions to avoid using
labels, which usually indicate branching targets for the control flow.

**See also:** LineNumberInfo

**See also:** CodeBuilder#lineNumber CodeBuilder::lineNumber

**See also:** ClassFile.LineNumbersOption

**Since:** 24

## LineNumber.line()

```java
int line()
```

## LineNumber.of(int)

```java
static LineNumber of(int line)
```

Parameters:

- `line`: the line number
