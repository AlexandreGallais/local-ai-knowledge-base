---
title: "LocalVariableTableAttribute interface (java.lang.classfile.attribute)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/attribute/LocalVariableTableAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LocalVariableTableAttribute interface (java.lang.classfile.attribute)

```java
public sealed interface LocalVariableTableAttribute extends Attribute<LocalVariableTableAttribute> permits BoundAttribute.BoundLocalVariableTableAttribute, UnboundAttribute.UnboundLocalVariableTableAttribute
```

Models the LocalVariableTable
attribute (JVMS ), which records debug information about local
variables.  Its entries are delivered as `LocalVariable`s when
traversing the elements of a `CodeModel`, which is toggled by `ClassFile.DebugElementsOption`.

This attribute only appears on `Code` attributes, and permits multiple instances in a `Code`
attribute.  It has a data dependency on labels.

This attribute cannot be sent to a `CodeBuilder`; its entries can be
constructed with `LocalVariable`, resulting in at most one attribute
instance in the built `Code` attribute.

The attribute was introduced in the Java Platform version 1.0.2, major
version `ClassFile#JAVA_1_VERSION`.

**API note:** Generic local variable types and potentially annotated use of those types are
defined by `LocalVariableTypeTableAttribute` and `RuntimeVisibleTypeAnnotationsAttribute` respectively, which requires this
attribute to be present.

**See also:** Attributes#localVariableTable()

**jvms:** 4.7.13 The `LocalVaribleTable` Attribute

**Since:** 24

## LocalVariableTableAttribute.localVariables()

```java
List<LocalVariableInfo> localVariables()
```

## LocalVariableTableAttribute.of(List<LocalVariableInfo>)

```java
static LocalVariableTableAttribute of(List<LocalVariableInfo> locals)
```

Parameters:

- `locals`: the local variable descriptions

**API note:** The created attribute cannot be written to a `CodeBuilder`.  Use
CodeBuilder::localVariable instead.
