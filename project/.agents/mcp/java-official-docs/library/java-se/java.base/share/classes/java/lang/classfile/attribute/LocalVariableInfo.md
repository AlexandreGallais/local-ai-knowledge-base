---
title: "LocalVariableInfo interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/LocalVariableInfo.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LocalVariableInfo interface (java.lang.classfile.attribute)

```java
public sealed interface LocalVariableInfo permits UnboundAttribute.UnboundLocalVariableInfo, BoundLocalVariable
```

Models a single local variable in the `LocalVariableTableAttribute`.

**See also:** LocalVariableTableAttribute#localVariables()

**See also:** LocalVariable

**jvms:** 4.7.13 The `LocalVaribleTable` Attribute

**Since:** 24

## LocalVariableInfo.startPc()

```java
int startPc()
```

## LocalVariableInfo.length()

```java
int length()
```

## LocalVariableInfo.name()

```java
Utf8Entry name()
```

## LocalVariableInfo.type()

```java
Utf8Entry type()
```

## LocalVariableInfo.typeSymbol()

```java
default ClassDesc typeSymbol()
```

## LocalVariableInfo.slot()

```java
int slot()
```
