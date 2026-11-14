---
title: "PermittedSubclassesAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/PermittedSubclassesAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PermittedSubclassesAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface PermittedSubclassesAttribute extends Attribute<PermittedSubclassesAttribute>, ClassElement permits BoundAttribute.BoundPermittedSubclassesAttribute, UnboundAttribute.UnboundPermittedSubclassesAttribute
```

Models the PermittedSubclasses
attribute (JVMS ), which indicates this class or interface
is sealed,
and which classes or interfaces may extend or implement this class or
interface.

This attribute only appears on classes, and does not permit multiple instances in a class.  It has a
data dependency on the constant pool.

The attribute was introduced in the Java SE Platform version 17, major
version `ClassFile#JAVA_17_VERSION`.

**See also:** Attributes#permittedSubclasses()

**See also:** Class#isSealed()

**See also:** Class#getPermittedSubclasses()

**JLS:** 8.1.1.2 `sealed`, `non-sealed`, and `final` Classes

**JLS:** 9.1.1.4 `sealed` and `non-sealed` Interfaces

**jvms:** 4.7.31 The `PermittedSubclasses` Attribute

**Since:** 24

## PermittedSubclassesAttribute.permittedSubclasses()

```java
List<ClassEntry> permittedSubclasses()
```

**See also:** Class#getPermittedSubclasses()

## PermittedSubclassesAttribute.of(List<ClassEntry>)

```java
static PermittedSubclassesAttribute of(List<ClassEntry> permittedSubclasses)
```

Parameters:

- `permittedSubclasses`: the permitted subclasses or subinterfaces

## PermittedSubclassesAttribute.of(ClassEntry...)

```java
static PermittedSubclassesAttribute of(ClassEntry... permittedSubclasses)
```

Parameters:

- `permittedSubclasses`: the permitted subclasses or subinterfaces

## PermittedSubclassesAttribute.ofSymbols(List<ClassDesc>)

```java
static PermittedSubclassesAttribute ofSymbols(List<ClassDesc> permittedSubclasses)
```

Parameters:

- `permittedSubclasses`: the permitted subclasses or subinterfaces

Throws:

- `IllegalArgumentException`: if any of `permittedSubclasses` is primitive

## PermittedSubclassesAttribute.ofSymbols(ClassDesc...)

```java
static PermittedSubclassesAttribute ofSymbols(ClassDesc... permittedSubclasses)
```

Parameters:

- `permittedSubclasses`: the permitted subclasses or subinterfaces

Throws:

- `IllegalArgumentException`: if any of `permittedSubclasses` is primitive
