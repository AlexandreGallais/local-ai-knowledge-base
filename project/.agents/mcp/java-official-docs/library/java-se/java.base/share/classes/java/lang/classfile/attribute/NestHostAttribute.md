---
title: "NestHostAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/NestHostAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NestHostAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface NestHostAttribute extends Attribute<NestHostAttribute>, ClassElement permits BoundAttribute.BoundNestHostAttribute, UnboundAttribute.UnboundNestHostAttribute
```

Models the NestHost attribute (JVMS ), which indicates this class is a member of a nest and the host
class of the nest.

This attribute only appears on classes, and does not permit multiple instances in a class.  It has a
data dependency on the constant pool.

The attribute was introduced in the Java SE Platform version 11, major
version `ClassFile#JAVA_11_VERSION`.

**See also:** Attributes#nestHost()

**See also:** NestMembersAttribute

**See also:** Class#getNestHost()

**See also:** Class#isNestmateOf(Class)

**jvms:** 4.7.28 The `NestHost` Attribute

**Since:** 24

## NestHostAttribute.nestHost()

```java
ClassEntry nestHost()
```

**See also:** Class#getNestHost()

## NestHostAttribute.of(ClassEntry)

```java
static NestHostAttribute of(ClassEntry nestHost)
```

Parameters:

- `nestHost`: the host class of the nest

## NestHostAttribute.of(ClassDesc)

```java
static NestHostAttribute of(ClassDesc nestHost)
```

Parameters:

- `nestHost`: the host class of the nest

Throws:

- `IllegalArgumentException`: if `nestHost` represents a primitive type
