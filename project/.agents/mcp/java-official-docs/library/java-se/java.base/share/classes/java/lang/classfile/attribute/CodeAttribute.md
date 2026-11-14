---
title: "CodeAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/CodeAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CodeAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface CodeAttribute extends Attribute<CodeAttribute>, CodeModel permits BoundAttribute.BoundCodeAttribute
```

Models the Code attribute (JVMS ),
which contains the bytecode of this method.

This attribute only appears on methods, and does not permit multiple instances in a method.  It has a
data dependency on the constant pool.

This attribute was introduced in the Java Platform version 1.0.2, major
version `ClassFile#JAVA_1_VERSION`.

**API note:** `CodeAttribute` models properties of a `Code` attribute read
from `class` files.  General `class` file transformation should
process and traverse a `CodeModel` in the traversal of a `MethodModel`, to support transformation of `Code` attributes currently
being built.

**See also:** Attributes#code()

**See also:** CodeModel

**jvms:** 4.7.3 The `Code` Attribute

**Since:** 24

## CodeAttribute.maxLocals()

```java
int maxLocals()
```

## CodeAttribute.maxStack()

```java
int maxStack()
```

## CodeAttribute.codeLength()

```java
int codeLength()
```

## CodeAttribute.codeArray()

```java
byte[] codeArray()
```

## CodeAttribute.labelToBci(Label)

```java
int labelToBci(Label label)
```

The label represents a cursor pointing at immediately before the returned
index into the `code` array.

Parameters:

- `label`: a marker for a position within this `CodeAttribute`

Throws:

- `IllegalArgumentException`: if the `label` is not from this attribute
