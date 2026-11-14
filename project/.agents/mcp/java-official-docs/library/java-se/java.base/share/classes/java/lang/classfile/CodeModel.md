---
title: "CodeModel interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/CodeModel.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CodeModel interface (java.lang.classfile)

```java
public sealed interface CodeModel extends CompoundElement<CodeElement>, AttributedElement, MethodElement permits CodeAttribute, BufferedCodeBuilder.Model
```

Models the body of a method (the `Code` attribute).  A `Code`
attribute is viewed as a composition of `CodeElement`s, which is the only way to access `Instruction`s; the
order of elements of a code model is significant.

A `CodeModel` is obtained from `MethodModel.code()`, or in the
traversal of the member elements of a method.

`MethodBuilder.withCode` is the main way to build code models.  `MethodBuilder.transformCode` and `CodeBuilder.transforming` allow
creating new `Code` attributes by selectively processing the original
code elements and directing the results to a code builder.

A `Code` attribute holds attributes, but they are usually not member
elements, but are decomposed to `PseudoInstruction`, accessible
according to `DeadLabelsOption`, `DebugElementsOption`, and
`LineNumbersOption`.  `StackMapTableAttribute` can only be
accessed via explicit attribute reading, as it
is considered a derived property from the code body.

**See also:** MethodModel#code()

**See also:** CodeTransform

**See also:** CodeAttribute

**jvms:** 4.7.3 The `Code` Attribute

**Since:** 24

## CodeModel.parent()

```java
Optional<MethodModel> parent()
```

## CodeModel.exceptionHandlers()

```java
List<ExceptionCatch> exceptionHandlers()
```

The exception table is also
modeled by `ExceptionCatch` elements in the streaming view.
