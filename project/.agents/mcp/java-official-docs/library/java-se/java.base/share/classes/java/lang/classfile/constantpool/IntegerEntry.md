---
title: "IntegerEntry interface (java.lang.classfile.constantpool)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/constantpool/IntegerEntry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IntegerEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface IntegerEntry extends AnnotationConstantValueEntry, ConstantValueEntry permits AbstractPoolEntry.IntegerEntryImpl
```

Models a `CONSTANT_Integer_info` structure, or an `int` constant,
in the constant pool of a `class` file.

The use of a `IntegerEntry` is modeled by an `int`.  Conversions
are through `ConstantPoolBuilder.intEntry(int)` and `intValue()`.

**See also:** ConstantPoolBuilder#intEntry ConstantPoolBuilder::intEntry

**jvms:** 4.4.4 The `CONSTANT_Integer_info` and `CONSTANT_Float_info`
            Structures

**Since:** 24

## IntegerEntry.intValue()

```java
int intValue()
```

**See also:** ConstantPoolBuilder#intEntry(int)
