---
title: "LineNumberTableAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/LineNumberTableAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LineNumberTableAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface LineNumberTableAttribute extends Attribute<LineNumberTableAttribute> permits BoundAttribute.BoundLineNumberTableAttribute, UnboundAttribute.UnboundLineNumberTableAttribute
```

Models the LineNumberTable attribute
(JVMS ), which records the mapping between indexes into
the `code` array and line numbers in the source file.  Its entries are
delivered as `LineNumber` when traversing the elements of a `CodeModel`, which is toggled by `ClassFile.LineNumbersOption`.

This attribute only appears on `Code` attributes, and permits multiple instances in a `Code`
attribute.  It has a data dependency on labels.

This attribute cannot be sent to a `CodeBuilder`; its entries can be
constructed with `LineNumber`, resulting in at most one attribute
instance in the built `Code` attribute.

The attribute was introduced in the Java Platform version 1.0.2, major
version `ClassFile#JAVA_1_VERSION`.

**See also:** Attributes#lineNumberTable()

**jvms:** 4.7.12 The `LineNumberTable` Attribute

**Since:** 24

## LineNumberTableAttribute.lineNumbers()

```java
List<LineNumberInfo> lineNumbers()
```

## LineNumberTableAttribute.of(List<LineNumberInfo>)

```java
static LineNumberTableAttribute of(List<LineNumberInfo> lines)
```

Parameters:

- `lines`: the line number descriptions

**API note:** The created attribute cannot be written to a `CodeBuilder`.  Call
CodeBuilder::lineNumber in the correct
order instead.
