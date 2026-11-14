---
title: "CustomAttribute class (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/CustomAttribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CustomAttribute class (java.lang.classfile)

```java
public abstract non-sealed class CustomAttribute<T extends CustomAttribute<T>> implements Attribute<T>, CodeElement, ClassElement, MethodElement, FieldElement
```

Models a user-defined attribute in a `class` file.  API models for
user-defined attributes should extend this class.  A user-defined attribute
should also have an `AttributeMapper` defined, which will be returned
by `attributeMapper`, and registered to the `ClassFile.AttributeMapperOption` so the user-defined attributes can be read.

Accessor methods on user-defined attributes read from `class` files
may throw `IllegalArgumentException` if the attribute model is lazily
evaluated, and the evaluation encounters malformed `class` file format
for the attribute.

Parameters:

- `<T>`: the custom attribute type

**See also:** java.lang.classfile.attribute

**Since:** 24

## CustomAttribute.CustomAttribute(AttributeMapper<T>)

```java
protected CustomAttribute(AttributeMapper<T> mapper)
```

Constructor for subclasses to call.

Parameters:

- `mapper`: the attribute mapper

## CustomAttribute.attributeName()

```java
public Utf8Entry attributeName()
```

(inherited documentation)

**Implementation requirements:** The default implementation returns a `Utf8Entry` suitable for
writing only, which may be unbound.
Subclasses representing attributes read from `class` files must
override this method.

**See also:** AttributeMapper#readAttribute
