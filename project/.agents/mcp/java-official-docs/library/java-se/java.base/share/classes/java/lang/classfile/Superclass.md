---
title: "Superclass interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/Superclass.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Superclass interface (java.lang.classfile)

```java
public sealed interface Superclass extends ClassElement permits SuperclassImpl
```

Models the superclass (JVMS ) of a class.  A `Superclass`
appears at most once in a `ClassModel`: it must be absent for
module descriptors or the `Object` class, and must be present otherwise.  A `ClassBuilder` sets
the `Object` class as the superclass if the superclass is not supplied
and the class to build is required to have a superclass.

All interfaces have `Object` as
their superclass.

**See also:** ClassModel#superclass()

**See also:** ClassBuilder#withSuperclass

**jvms:** 4.1 The `ClassFile` Structure

**Since:** 24

## Superclass.superclassEntry()

```java
ClassEntry superclassEntry()
```

## Superclass.of(ClassEntry)

```java
static Superclass of(ClassEntry superclassEntry)
```

Parameters:

- `superclassEntry`: the superclass
