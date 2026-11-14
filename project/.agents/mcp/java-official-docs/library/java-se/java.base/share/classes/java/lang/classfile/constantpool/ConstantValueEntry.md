---
title: "ConstantValueEntry interface (java.lang.classfile.constantpool)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/constantpool/ConstantValueEntry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ConstantValueEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface ConstantValueEntry extends LoadableConstantEntry permits DoubleEntry, FloatEntry, IntegerEntry, LongEntry, StringEntry
```

Marker interface for constant pool entries that can represent constant values
in the ConstantValue attribute.

**See also:** ConstantPoolBuilder#constantValueEntry
     ConstantPoolBuilder::constantValueEntry

**sealedGraph:**

**Since:** 24

## ConstantValueEntry.constantValue()

```java
ConstantDesc constantValue()
```

The constant value will be an `Integer`, `Long`, `Float`, `Double`, or `String`.

**See also:** ConstantPoolBuilder#constantValueEntry(ConstantDesc)
