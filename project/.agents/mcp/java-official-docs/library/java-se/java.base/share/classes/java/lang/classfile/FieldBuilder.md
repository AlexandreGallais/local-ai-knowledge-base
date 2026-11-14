---
title: "FieldBuilder interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/FieldBuilder.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FieldBuilder interface (java.lang.classfile)

```java
public sealed interface FieldBuilder extends ClassFileBuilder<FieldElement, FieldBuilder> permits TerminalFieldBuilder, ChainedFieldBuilder
```

A builder for fields.  The main way to obtain a field builder is via ClassDesc, Consumer).  The ClassDesc, int) access flag overload is
useful if no attribute needs to be configured, skipping the handler.

Refer to `ClassFileBuilder` for general guidance and caution around
the use of builders for structures in the `class` file format.

**See also:** ClassBuilder#withField(String, ClassDesc, Consumer)

**See also:** FieldModel

**See also:** FieldTransform

**Since:** 24

## FieldBuilder.withFlags(int)

```java
default FieldBuilder withFlags(int flags)
```

Sets the field access flags.

Parameters:

- `flags`: the access flags, as a bit mask

**Returns:** this builder

**See also:** AccessFlags

**See also:** AccessFlag.Location#FIELD

**See also:** ClassBuilder#withField(String, ClassDesc, int)

## FieldBuilder.withFlags(AccessFlag...)

```java
default FieldBuilder withFlags(AccessFlag... flags)
```

Sets the field access flags.

Parameters:

- `flags`: the access flags, as a bit mask

**Returns:** this builder

**See also:** AccessFlags

**See also:** AccessFlag.Location#FIELD

**See also:** ClassBuilder#withField(String, ClassDesc, int)
