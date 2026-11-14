---
title: "ExceptionCatch interface (java.lang.classfile.instruction)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/instruction/ExceptionCatch.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ExceptionCatch interface (java.lang.classfile.instruction)

```java
public sealed interface ExceptionCatch extends PseudoInstruction permits AbstractPseudoInstruction.ExceptionCatchImpl
```

A pseudo-instruction modeling an entry in the `exception_table` array
of a Code attribute.  Catch (JVMS ) and
finally (JVMS ) blocks in Java source code compile to exception
table entries.  Delivered as a `CodeElement` when traversing the
contents of a `CodeModel`.

An exception table entry is composite:

**See also:** CodeBuilder#exceptionCatch CodeBuilder::exceptionCatch

**See also:** CodeAttribute#exceptionHandlers()

**jvms:** 4.7.3 The `Code` Attribute

**Since:** 24

## ExceptionCatch.handler()

```java
Label handler()
```

## ExceptionCatch.tryStart()

```java
Label tryStart()
```

## ExceptionCatch.tryEnd()

```java
Label tryEnd()
```

## ExceptionCatch.catchType()

```java
Optional<ClassEntry> catchType()
```

## ExceptionCatch.of(Label, Label, Label, Optional<ClassEntry>)

```java
static ExceptionCatch of(Label handler, Label tryStart, Label tryEnd, Optional<ClassEntry> catchTypeEntry)
```

Parameters:

- `handler`: the handler for the exception
- `tryStart`: the beginning of the instruction range for the guarded instructions
- `tryEnd`: the end of the instruction range for the guarded instructions
- `catchTypeEntry`: the type of exception to catch, or empty if this handler is unconditional

## ExceptionCatch.of(Label, Label, Label)

```java
static ExceptionCatch of(Label handler, Label tryStart, Label tryEnd)
```

Parameters:

- `handler`: the handler for the exception
- `tryStart`: the beginning of the instruction range for the guarded instructions
- `tryEnd`: the end of the instruction range for the guarded instructions
