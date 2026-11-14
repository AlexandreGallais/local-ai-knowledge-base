---
title: "RecordAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/RecordAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RecordAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface RecordAttribute extends Attribute<RecordAttribute>, ClassElement permits BoundAttribute.BoundRecordAttribute, UnboundAttribute.UnboundRecordAttribute
```

Models the Record attribute (JVMS ),
which indicates that this class is a record class and the record
components.

This attribute only appears on classes, and does not permit multiple instances in a class.  It has a
data dependency on the constant pool.

The attribute was introduced in the Java SE Platform version 16, major
version `ClassFile#JAVA_16_VERSION`.

**See also:** Attributes#record()

**See also:** Class#isRecord()

**See also:** Class#getRecordComponents()

**jvms:** 4.7.30 The `Record` Attribute

**Since:** 24

## RecordAttribute.components()

```java
List<RecordComponentInfo> components()
```

**See also:** Class#getRecordComponents()

## RecordAttribute.of(List<RecordComponentInfo>)

```java
static RecordAttribute of(List<RecordComponentInfo> components)
```

Parameters:

- `components`: the record components

## RecordAttribute.of(RecordComponentInfo...)

```java
static RecordAttribute of(RecordComponentInfo... components)
```

Parameters:

- `components`: the record components
