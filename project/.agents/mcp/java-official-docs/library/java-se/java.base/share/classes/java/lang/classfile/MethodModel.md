---
title: "MethodModel interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/MethodModel.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodModel interface (java.lang.classfile)

```java
public sealed interface MethodModel extends CompoundElement<MethodElement>, AttributedElement, ClassElement permits BufferedMethodBuilder.Model, MethodImpl
```

Models a method.  A method can be viewed as a composition of `MethodElement`s, or by random access via accessor
methods if only specific parts of the method is needed.

Methods can be obtained from `ClassModel.methods()`, or in the
traversal of member elements of a class.

MethodTypeDesc, int, Consumer) is the
main way to construct methods.  `ClassBuilder.transformMethod` allows
creating a new method by selectively processing the original method elements
and directing the results to a method builder.

All method attributes are accessible as member elements.

**See also:** ClassModel#methods()

**See also:** MethodTransform

**jvms:** 4.6 Methods

**Since:** 24

## MethodModel.flags()

```java
AccessFlags flags()
```

**See also:** AccessFlag.Location#METHOD

## MethodModel.parent()

```java
Optional<ClassModel> parent()
```

## MethodModel.methodName()

```java
Utf8Entry methodName()
```

## MethodModel.methodType()

```java
Utf8Entry methodType()
```

## MethodModel.methodTypeSymbol()

```java
default MethodTypeDesc methodTypeSymbol()
```

## MethodModel.code()

```java
Optional<CodeModel> code()
```
