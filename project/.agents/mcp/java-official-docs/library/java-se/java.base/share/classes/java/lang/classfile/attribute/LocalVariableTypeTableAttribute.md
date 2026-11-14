---
title: "LocalVariableTypeTableAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/LocalVariableTypeTableAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LocalVariableTypeTableAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface LocalVariableTypeTableAttribute extends Attribute<LocalVariableTypeTableAttribute> permits BoundAttribute.BoundLocalVariableTypeTableAttribute, UnboundAttribute.UnboundLocalVariableTypeTableAttribute
```

Models the LocalVariableTypeTable
attribute (JVMS ), which records debug information about local
variables with generic types.  Its entries are delivered as `LocalVariableType`s when traversing the elements of a `CodeModel`,
which can be toggled by `ClassFile.DebugElementsOption`.

This attribute only appears on `Code` attributes, and permits multiple instances in a `Code`
attribute.  It has a data dependency on labels.

This attribute cannot be sent to a `CodeBuilder`; its entries can be
constructed with `LocalVariableType`, resulting in at most one attribute
instance in the built `Code` attribute.

The attribute was introduced in the Java SE Platform version 5.0, major
version `ClassFile#JAVA_5_VERSION`.

**API note:** Only local variables that have generic field types need to be described by
this attribute.  If a local variable is described in a `LocalVariableTypeTable` attribute, it must also be described in a LocalVariableTable attribute.

**See also:** Attributes#localVariableTypeTable()

**jvms:** 4.7.14 The `LocalVariableTypeTable` Attribute

**Since:** 24

## LocalVariableTypeTableAttribute.localVariableTypes()

```java
List<LocalVariableTypeInfo> localVariableTypes()
```

## LocalVariableTypeTableAttribute.of(List<LocalVariableTypeInfo>)

```java
static LocalVariableTypeTableAttribute of(List<LocalVariableTypeInfo> locals)
```

Parameters:

- `locals`: the local variable descriptions
