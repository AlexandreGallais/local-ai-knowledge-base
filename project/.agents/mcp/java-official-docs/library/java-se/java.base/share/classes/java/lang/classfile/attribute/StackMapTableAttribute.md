---
title: "StackMapTableAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/StackMapTableAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StackMapTableAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface StackMapTableAttribute extends Attribute<StackMapTableAttribute>, CodeElement permits BoundAttribute.BoundStackMapTableAttribute, UnboundAttribute.UnboundStackMapTableAttribute
```

Models the StackMapTable attribute (JVMS
), which is used for verification by type checking ().

This attribute is not delivered in the traversal of a `CodeAttribute`,
but instead automatically generated upon `class` file writing.
Advanced users can supply their own stack maps according to the `ClassFile.StackMapsOption`.

This attribute only appears on `Code` attributes, and does not permit
multiple instances in a `Code` attribute.  It has a data dependency on labels in the `code` array.

This attribute was introduced in the Java SE Platform version 6, major
version `ClassFile#JAVA_6_VERSION`.

**See also:** Attributes#stackMapTable()

**See also:** DiscontinuedInstruction.JsrInstruction

**See also:** DiscontinuedInstruction.RetInstruction

**jvms:** 4.7.4 The `StackMapTable` Attribute

**jvms:** 4.10.1 Verification by Type Checking

**Since:** 24

## StackMapTableAttribute.entries()

```java
List<StackMapFrameInfo> entries()
```

## StackMapTableAttribute.of(List<StackMapFrameInfo>)

```java
public static StackMapTableAttribute of(List<StackMapFrameInfo> entries)
```

Parameters:

- `entries`: the stack map frames
