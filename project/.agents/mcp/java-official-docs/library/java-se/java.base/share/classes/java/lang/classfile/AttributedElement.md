---
title: "AttributedElement interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/AttributedElement.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AttributedElement interface (java.lang.classfile)

```java
public sealed interface AttributedElement extends ClassFileElement permits ClassModel, CodeModel, FieldModel, MethodModel, RecordComponentInfo, AbstractUnboundModel
```

A `ClassFileElement` describing a `class` file structure that has
attributes, such as a `class` file, a field, a method, a Code attribute, or a record component.

Unless otherwise specified, most attributes that can be discovered in a
`CompoundElement` implements the corresponding membership subinterface of `ClassFileElement`, and can be sent to a `ClassFileBuilder` to be
integrated into the built structure.

**See also:** java.lang.classfile.attribute

**jvms:** 4.7 Attributes

**sealedGraph:**

**Since:** 24

## AttributedElement.attributes()

```java
List<Attribute<?>> attributes()
```

## AttributedElement.findAttribute(AttributeMapper<T>)

```java
default <T extends Attribute<T>> Optional<T> findAttribute(AttributeMapper<T> attr)
```

Finds an attribute by name.  This is suitable to find attributes that
allow at most one instance
in one structure.  If this is used to find attributes that allow multiple
instances in one structure, the first matching instance is returned.

Parameters:

- `attr`: the attribute mapper
- `<T>`: the type of the attribute

**API note:** This can easily find an attribute and send it to another `ClassFileBuilder`, which is a `Consumer`:

**Returns:** the attribute, or `Optional.empty()` if the attribute
is not present

## AttributedElement.findAttributes(AttributeMapper<T>)

```java
default <T extends Attribute<T>> List<T> findAttributes(AttributeMapper<T> attr)
```

Finds attributes by name.  This is suitable to find attributes that
allow multiple instances
in one structure.

Parameters:

- `attr`: the attribute mapper
- `<T>`: the type of the attribute

**Returns:** the attributes, or an empty `List` if the attribute
is not present
