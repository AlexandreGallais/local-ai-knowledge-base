---
title: "FloatEntry interface (java.lang.classfile.constantpool)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/constantpool/FloatEntry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FloatEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface FloatEntry extends AnnotationConstantValueEntry, ConstantValueEntry permits AbstractPoolEntry.FloatEntryImpl
```

Models a `CONSTANT_Float_info` structure, or a `float` constant,
in the constant pool of a `class` file.

The use of a `FloatEntry` is modeled by a `float`.  Conversions
are through `ConstantPoolBuilder.floatEntry` and `floatValue()`.
In the conversions, all NaN values of the `float` may or may not be
collapsed into a single "canonical" NaN value.

**See also:** ConstantPoolBuilder#floatEntry ConstantPoolBuilder::floatEntry

**jvms:** 4.4.4 The `CONSTANT_Integer_info` and `CONSTANT_Float_info`
            Structures

**Since:** 24

## FloatEntry.floatValue()

```java
float floatValue()
```

**See also:** ConstantPoolBuilder#floatEntry(float)
