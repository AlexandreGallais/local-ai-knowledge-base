---
title: "EnclosingMethodAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/EnclosingMethodAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# EnclosingMethodAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface EnclosingMethodAttribute extends Attribute<EnclosingMethodAttribute>, ClassElement permits BoundAttribute.BoundEnclosingMethodAttribute, UnboundAttribute.UnboundEnclosingMethodAttribute
```

Models the EnclosingMethod attribute
(JVMS ), which indicates that this class is a local or
anonymous class, and indicates the enclosing method or constructor of this
class if this class is enclosed in exactly one method or constructor.

This attribute only appears on classes, and does not permit multiple instances in a class.  It has a
data dependency on the constant pool.

The attribute was introduced in the Java SE Platform version 5.0, major
version `ClassFile#JAVA_5_VERSION`.

**See also:** Attributes#enclosingMethod()

**jvms:** 4.7.7 The `EnclosingMethod` Attribute

**Since:** 24

## EnclosingMethodAttribute.enclosingClass()

```java
ClassEntry enclosingClass()
```

If the `enclosingMethod()` is present, this is the
declaring class of that enclosing method or constructor.

**See also:** Class#getEnclosingClass()

## EnclosingMethodAttribute.enclosingMethod()

```java
Optional<NameAndTypeEntry> enclosingMethod()
```

This may
be empty if the anonymous or local class appears in a field initializer
(JLS ), an instance initializer (JLS ), or a static
initializer (JLS ).  As a result, this never describes a class
initialization method `ConstantDescs#CLASS_INIT_NAME`.

**See also:** Class#getEnclosingMethod()

**See also:** Class#getEnclosingConstructor()

## EnclosingMethodAttribute.enclosingMethodName()

```java
default Optional<Utf8Entry> enclosingMethodName()
```

**See also:** #enclosingMethod()

## EnclosingMethodAttribute.enclosingMethodType()

```java
default Optional<Utf8Entry> enclosingMethodType()
```

**See also:** #enclosingMethod()

## EnclosingMethodAttribute.enclosingMethodTypeSymbol()

```java
default Optional<MethodTypeDesc> enclosingMethodTypeSymbol()
```

**See also:** #enclosingMethod()

## EnclosingMethodAttribute.of(ClassEntry, Optional<NameAndTypeEntry>)

```java
static EnclosingMethodAttribute of(ClassEntry className, Optional<NameAndTypeEntry> method)
```

Parameters:

- `className`: the class name
- `method`: the name and type of the enclosing method or `Optional.empty()` if the class is not immediately enclosed by exactly one method or constructor

## EnclosingMethodAttribute.of(ClassDesc, Optional<String>, Optional<MethodTypeDesc>)

```java
static EnclosingMethodAttribute of(ClassDesc className, Optional<String> methodName, Optional<MethodTypeDesc> methodType)
```

Parameters:

- `className`: the class name
- `methodName`: the name of the enclosing method or `Optional.empty()` if the class is not immediately enclosed by exactly one method or constructor
- `methodType`: the type of the enclosing method or `Optional.empty()` if the class is not immediately enclosed by exactly one method or constructor

Throws:

- `IllegalArgumentException`: if `className` represents a primitive type
