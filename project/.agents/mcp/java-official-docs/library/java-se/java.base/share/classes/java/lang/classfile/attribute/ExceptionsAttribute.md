---
title: "ExceptionsAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/ExceptionsAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ExceptionsAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface ExceptionsAttribute extends Attribute<ExceptionsAttribute>, MethodElement permits BoundAttribute.BoundExceptionsAttribute, UnboundAttribute.UnboundExceptionsAttribute
```

Models the Exceptions attribute (JVMS ), which records the exceptions declared to be thrown by this
method.

This attribute only appears on methods, and does not permit multiple instances in a method.  It has a
data dependency on the constant pool.

The attribute was introduced in the Java Platform version 1.0.2, major
version `ClassFile#JAVA_1_VERSION`.

**API note:** Generic exceptions types thrown by a method and potentially annotated use of
those types are defined by `SignatureAttribute` and `RuntimeVisibleTypeAnnotationsAttribute` respectively, which requires this
attribute to be present.

**See also:** Attributes#exceptions()

**jvms:** 4.7.5 The `Exceptions` Attribute

**Since:** 24

## ExceptionsAttribute.exceptions()

```java
List<ClassEntry> exceptions()
```

**See also:** Executable#getExceptionTypes()

## ExceptionsAttribute.of(List<ClassEntry>)

```java
static ExceptionsAttribute of(List<ClassEntry> exceptions)
```

Parameters:

- `exceptions`: the exceptions that may be thrown from this method

## ExceptionsAttribute.of(ClassEntry...)

```java
static ExceptionsAttribute of(ClassEntry... exceptions)
```

Parameters:

- `exceptions`: the exceptions that may be thrown from this method

## ExceptionsAttribute.ofSymbols(List<ClassDesc>)

```java
static ExceptionsAttribute ofSymbols(List<ClassDesc> exceptions)
```

Parameters:

- `exceptions`: the exceptions that may be thrown from this method

## ExceptionsAttribute.ofSymbols(ClassDesc...)

```java
static ExceptionsAttribute ofSymbols(ClassDesc... exceptions)
```

Parameters:

- `exceptions`: the exceptions that may be thrown from this method
