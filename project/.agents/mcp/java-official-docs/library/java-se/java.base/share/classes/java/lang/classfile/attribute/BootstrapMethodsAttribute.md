---
title: "BootstrapMethodsAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/BootstrapMethodsAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BootstrapMethodsAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface BootstrapMethodsAttribute extends Attribute<BootstrapMethodsAttribute> permits BoundAttribute.BoundBootstrapMethodsAttribute, UnboundAttribute.EmptyBootstrapAttribute
```

Models the BootstrapMethods attribute
(JVMS ), which stores symbolic information for the execution of
bootstrap methods, used by dynamically-computed call sites and constants.
It is logically a part of the constant pool of a `class` file and thus
not delivered in `ClassModel` traversal; its elements are accessible
through `ConstantPool`.

This attribute only appears on classes, and does not permit multiple instances in a class.  It has a
data dependency on the constant pool.

This attribute cannot be constructed directly; its entries can be constructed
through `ConstantPoolBuilder.bsmEntry`, resulting in at most one
attribute instance in the built `class` file.

The attribute was introduced in the Java SE Platform version 7, major version
`ClassFile#JAVA_7_VERSION`.

**See also:** Attributes#bootstrapMethods()

**See also:** java.lang.invoke##bsm Execution of bootstrap methods

**jvms:** 4.7.23 The `BootstrapMethods` Attribute

**Since:** 24

## BootstrapMethodsAttribute.bootstrapMethods()

```java
List<BootstrapMethodEntry> bootstrapMethods()
```

## BootstrapMethodsAttribute.bootstrapMethodsSize()

```java
int bootstrapMethodsSize()
```
