---
title: "LineNumberInfo interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/LineNumberInfo.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LineNumberInfo interface (java.lang.classfile.attribute)

```java
public sealed interface LineNumberInfo permits UnboundAttribute.UnboundLineNumberInfo
```

Models a single line number entry in the `LineNumberTableAttribute`.

**See also:** LineNumberTableAttribute#lineNumbers()

**See also:** LineNumber

**Since:** 24

## LineNumberInfo.startPc()

```java
int startPc()
```

## LineNumberInfo.lineNumber()

```java
int lineNumber()
```

## LineNumberInfo.of(int, int)

```java
public static LineNumberInfo of(int startPc, int lineNumber)
```

Parameters:

- `startPc`: the starting index of the code array for this line
- `lineNumber`: the line number within the original source file

**API note:** The created entry cannot be written to a `CodeBuilder`.  Call
CodeBuilder::lineNumber in the correct
order instead.
