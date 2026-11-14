---
title: "LocalVariableTypeInfo interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/LocalVariableTypeInfo.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LocalVariableTypeInfo interface (java.lang.classfile.attribute)

```java
public sealed interface LocalVariableTypeInfo permits UnboundAttribute.UnboundLocalVariableTypeInfo, BoundLocalVariableType
```

Models a single local variable in the `LocalVariableTypeTableAttribute`.

**See also:** LocalVariableTypeTableAttribute#localVariableTypes()

**See also:** LocalVariableType

**jvms:** 4.7.14 The `LocalVariableTypeTable` Attribute

**Since:** 24

## LocalVariableTypeInfo.startPc()

```java
int startPc()
```

## LocalVariableTypeInfo.length()

```java
int length()
```

## LocalVariableTypeInfo.name()

```java
Utf8Entry name()
```

## LocalVariableTypeInfo.signature()

```java
Utf8Entry signature()
```

## LocalVariableTypeInfo.slot()

```java
int slot()
```
