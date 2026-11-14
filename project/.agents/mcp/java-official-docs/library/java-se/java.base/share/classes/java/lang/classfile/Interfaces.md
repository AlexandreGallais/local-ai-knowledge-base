---
title: "Interfaces interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/Interfaces.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Interfaces interface (java.lang.classfile)

```java
public sealed interface Interfaces extends ClassElement permits InterfacesImpl
```

Models the interfaces (JVMS ) of a class.  An `Interfaces`
appears at most once in a `ClassModel`: if it does not appear, the
class has no interfaces, which is equivalent to an `Interfaces` whose
`interfaces()` returns an empty list.  A `ClassBuilder` sets
the interfaces to an empty list if the interfaces is not supplied.

**See also:** ClassModel#interfaces()

**See also:** ClassBuilder#withInterfaces

**jvms:** 4.1 The `ClassFile` Structure

**Since:** 24

## Interfaces.interfaces()

```java
List<ClassEntry> interfaces()
```

## Interfaces.of(List<ClassEntry>)

```java
static Interfaces of(List<ClassEntry> interfaces)
```

Parameters:

- `interfaces`: the interfaces

## Interfaces.of(ClassEntry...)

```java
static Interfaces of(ClassEntry... interfaces)
```

Parameters:

- `interfaces`: the interfaces

## Interfaces.ofSymbols(List<ClassDesc>)

```java
static Interfaces ofSymbols(List<ClassDesc> interfaces)
```

Parameters:

- `interfaces`: the interfaces

Throws:

- `IllegalArgumentException`: if any of `interfaces` is primitive

## Interfaces.ofSymbols(ClassDesc...)

```java
static Interfaces ofSymbols(ClassDesc... interfaces)
```

Parameters:

- `interfaces`: the interfaces

Throws:

- `IllegalArgumentException`: if any of `interfaces` is primitive
