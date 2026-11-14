---
title: "SourceDebugExtensionAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/SourceDebugExtensionAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SourceDebugExtensionAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface SourceDebugExtensionAttribute extends Attribute<SourceDebugExtensionAttribute>, ClassElement permits BoundAttribute.BoundSourceDebugExtensionAttribute, UnboundAttribute.UnboundSourceDebugExtensionAttribute
```

Models the SourceDebugExtension
attribute (JVMS ), which stores arbitrary modified UTF-8 data.

This attribute only appears on classes, and does not permit multiple instances in a class.  It has
no data dependency.

The attribute was introduced in the Java SE Platform version 5.0, major
version `ClassFile#JAVA_5_VERSION`.

**See also:** Attributes#sourceDebugExtension()

**jvms:** 4.7.11 The `SourceDebugExtension` Attribute

**Since:** 24

## SourceDebugExtensionAttribute.contents()

```java
byte[] contents()
```

The payload may denote a string
longer than that which can be represented with a `String`.

## SourceDebugExtensionAttribute.of(byte[])

```java
static SourceDebugExtensionAttribute of(byte[] contents)
```

Parameters:

- `contents`: the extension contents
