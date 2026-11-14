---
title: "ConstantValueAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/ConstantValueAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ConstantValueAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface ConstantValueAttribute extends Attribute<ConstantValueAttribute>, FieldElement permits BoundAttribute.BoundConstantValueAttribute, UnboundAttribute.UnboundConstantValueAttribute
```

Models the ConstantValue attribute (JVMS
), which indicates this field's value is a constant and that
constant value.

This attribute only appears on fields, and does not permit multiple instances in a field.  It has a
data dependency on the constant pool.

This attribute was introduced in the Java Platform version 1.0.2, major
version `ClassFile#JAVA_1_VERSION`.

**See also:** Attributes#constantValue()

**jvms:** 4.7.2 The `ConstantValue` Attribute

**Since:** 24

## ConstantValueAttribute.constant()

```java
ConstantValueEntry constant()
```

## ConstantValueAttribute.of(ConstantValueEntry)

```java
static ConstantValueAttribute of(ConstantValueEntry value)
```

Parameters:

- `value`: the constant value

## ConstantValueAttribute.of(ConstantDesc)

```java
static ConstantValueAttribute of(ConstantDesc value)
```

Parameters:

- `value`: the constant value
