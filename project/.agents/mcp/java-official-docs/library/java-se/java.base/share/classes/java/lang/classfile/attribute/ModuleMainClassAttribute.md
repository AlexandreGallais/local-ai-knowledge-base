---
title: "ModuleMainClassAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/ModuleMainClassAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ModuleMainClassAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface ModuleMainClassAttribute extends Attribute<ModuleMainClassAttribute>, ClassElement permits BoundAttribute.BoundModuleMainClassAttribute, UnboundAttribute.UnboundModuleMainClassAttribute
```

Models the ModuleMainClass attribute
(JVMS ), which appears on classes that represent module descriptors to indicate the main
class of the module.

This attribute only appears on classes, and does not permit multiple instances in a class.  It has a
data dependency on the constant pool.

The attribute was introduced in the Java SE Platform version 9, major version
`ClassFile#JAVA_9_VERSION`.

**See also:** Attributes#moduleMainClass()

**See also:** ModuleDescriptor#mainClass()

**jvms:** 4.7.27 The `ModuleMainClass` Attribute

**Since:** 24

## ModuleMainClassAttribute.mainClass()

```java
ClassEntry mainClass()
```

## ModuleMainClassAttribute.of(ClassEntry)

```java
static ModuleMainClassAttribute of(ClassEntry mainClass)
```

Parameters:

- `mainClass`: the main class

## ModuleMainClassAttribute.of(ClassDesc)

```java
static ModuleMainClassAttribute of(ClassDesc mainClass)
```

Parameters:

- `mainClass`: the main class

Throws:

- `IllegalArgumentException`: if `mainClass` represents a primitive type
