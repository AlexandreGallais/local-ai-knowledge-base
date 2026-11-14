---
title: "NestMembersAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/NestMembersAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NestMembersAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface NestMembersAttribute extends Attribute<NestMembersAttribute>, ClassElement permits BoundAttribute.BoundNestMembersAttribute, UnboundAttribute.UnboundNestMembersAttribute
```

Models the NestMembers attribute (JVMS
), which indicates that this class is the host of a nest
and the other nest members.

This attribute only appears on classes, and does not permit multiple instances in a class.  It has a
data dependency on the constant pool.

The attribute was introduced in the Java SE Platform version 11, major
version `ClassFile#JAVA_11_VERSION`.

**See also:** Attributes#nestMembers()

**See also:** NestHostAttribute

**See also:** Class#getNestMembers()

**See also:** Class#isNestmateOf(Class)

**jvms:** 4.7.29 The `NestMembers` Attribute

**Since:** 24

## NestMembersAttribute.nestMembers()

```java
List<ClassEntry> nestMembers()
```

**See also:** Class#getNestMembers()

## NestMembersAttribute.of(List<ClassEntry>)

```java
static NestMembersAttribute of(List<ClassEntry> nestMembers)
```

Parameters:

- `nestMembers`: the member classes of the nest

## NestMembersAttribute.of(ClassEntry...)

```java
static NestMembersAttribute of(ClassEntry... nestMembers)
```

Parameters:

- `nestMembers`: the member classes of the nest

## NestMembersAttribute.ofSymbols(List<ClassDesc>)

```java
static NestMembersAttribute ofSymbols(List<ClassDesc> nestMembers)
```

Parameters:

- `nestMembers`: the member classes of the nest

Throws:

- `IllegalArgumentException`: if any of `nestMembers` is primitive

## NestMembersAttribute.ofSymbols(ClassDesc...)

```java
static NestMembersAttribute ofSymbols(ClassDesc... nestMembers)
```

Parameters:

- `nestMembers`: the member classes of the nest

Throws:

- `IllegalArgumentException`: if any of `nestMembers` is primitive
