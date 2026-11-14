---
title: "InnerClassesAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/InnerClassesAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InnerClassesAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface InnerClassesAttribute extends Attribute<InnerClassesAttribute>, ClassElement permits BoundAttribute.BoundInnerClassesAttribute, UnboundAttribute.UnboundInnerClassesAttribute
```

Models the InnerClasses attribute (JVMS
), which records which classes referenced by this `class`
file are nested classes.

This attribute only appears on classes, and does not permit multiple instances in a class.  It has a
data dependency on the constant pool.

The attribute was introduced in the Java SE Platform version 1.1, major
version `ClassFile#JAVA_1_VERSION`.

**See also:** Attributes#innerClasses()

**jvms:** 4.7.6 The `InnerClasses` Attribute

**Since:** 24

## InnerClassesAttribute.classes()

```java
List<InnerClassInfo> classes()
```

## InnerClassesAttribute.of(List<InnerClassInfo>)

```java
static InnerClassesAttribute of(List<InnerClassInfo> innerClasses)
```

Parameters:

- `innerClasses`: descriptions of the nested classes

## InnerClassesAttribute.of(InnerClassInfo...)

```java
static InnerClassesAttribute of(InnerClassInfo... innerClasses)
```

Parameters:

- `innerClasses`: descriptions of the nested classes
