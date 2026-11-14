---
title: "FieldModel interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/FieldModel.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FieldModel interface (java.lang.classfile)

```java
public sealed interface FieldModel extends CompoundElement<FieldElement>, AttributedElement, ClassElement permits BufferedFieldBuilder.Model, FieldImpl
```

Models a field.  A field can be viewed as a composition of `FieldElement`s, or by random access via accessor
methods if only specific parts of the field is needed.

Fields can be obtained from `ClassModel.fields()`, or in the traversal
of member elements of a class.

ClassDesc, Consumer) is the main way
to construct fields.  `ClassBuilder.transformField` allows creating a
new field by selectively processing the original field elements and directing
the results to a field builder.

All field attributes are accessible as member elements.

**See also:** ClassModel#fields()

**See also:** FieldTransform

**jvms:** 4.5 Fields

**Since:** 24

## FieldModel.flags()

```java
AccessFlags flags()
```

**See also:** AccessFlag.Location#FIELD

## FieldModel.parent()

```java
Optional<ClassModel> parent()
```

## FieldModel.fieldName()

```java
Utf8Entry fieldName()
```

## FieldModel.fieldType()

```java
Utf8Entry fieldType()
```

## FieldModel.fieldTypeSymbol()

```java
default ClassDesc fieldTypeSymbol()
```
