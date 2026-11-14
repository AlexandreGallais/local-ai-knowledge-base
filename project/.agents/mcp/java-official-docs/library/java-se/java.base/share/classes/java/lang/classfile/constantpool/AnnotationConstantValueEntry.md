---
title: "AnnotationConstantValueEntry interface (java.lang.classfile.constantpool)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/constantpool/AnnotationConstantValueEntry.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AnnotationConstantValueEntry interface (java.lang.classfile.constantpool)

```java
public sealed interface AnnotationConstantValueEntry extends PoolEntry permits DoubleEntry, FloatEntry, IntegerEntry, LongEntry, Utf8Entry
```

Marker interface for constant pool entries that can represent constant values
associated with elements of annotations.  They are also the only entries that
do not refer to other constant pool entries.

**API note:** An annotation constant value entry alone is not sufficient to determine
the annotation constant; for example, an `IntegerEntry` of `1`
can mean `true` in `AnnotationValue.OfBoolean` or `1`
in `AnnotationValue.OfInt`.

**See also:** AnnotationValue.OfConstant

**jvms:** 4.7.16.1 The `element_value` structure

**sealedGraph:**

**Since:** 24

## AnnotationConstantValueEntry.constantValue()

```java
ConstantDesc constantValue()
```

The constant value will be an `Integer`, `Long`, `Float`, `Double` for the primitive
constants, or `String` for UTF8 constants.
