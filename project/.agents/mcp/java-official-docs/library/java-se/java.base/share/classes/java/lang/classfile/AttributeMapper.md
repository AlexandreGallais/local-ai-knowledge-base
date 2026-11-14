---
title: "AttributeMapper interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/AttributeMapper.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AttributeMapper interface (java.lang.classfile)

```java
public interface AttributeMapper<A extends Attribute<A>>
```

Bidirectional mapper between the `class` file representation of an
attribute and its API model.  The attribute mapper identifies an attribute
by its name, and is used to parse the
`class` file representation into a model, and to write the model
representation back to a `class` file.

`Attributes` defines the mappers for predefined attributes in the JVMS
and certain conventional attributes.  For other attributes (JVMS ), users can define their own `AttributeMapper`; classes that
model those attributes should extend `CustomAttribute`.  To read those
attributes, user-defined `AttributeMapper`s must be registered to the
`ClassFile.AttributeMapperOption`.

Parameters:

- ``: the attribute type

**See also:** Attributes

**See also:** ClassFile.AttributeMapperOption

**See also:** java.lang.classfile.attribute

**Since:** 24

## AttributeMapper.the

```java
STATELESS, /** * In addition to standalone data, the attribute refers to the constant * pool, including the
```

The attribute contains only standalone data, and has no reference to
other parts of its enclosing `class` file, besides the name of
the attribute.  Thus, its contents can always be bulk-copied to
another `class` file.

For example, a bit mask is standalone data.

## AttributeMapper.the

```java
CP_REFS, /** * In addition to standalone data and references to the constant pool, * the attribute refers to positions into the
```

In addition to standalone data, the attribute refers to the constant
pool, including the BootstrapMethods
attribute, of its enclosing `class` file.  Thus, it can be
bulk-copied when the destination `class` file extends its
constant pool from that of the original `class`.  It must be
expanded to translate constant pool references and rewritten when
constant pool indices are not compatible.

For example, a `Utf8Entry` is a reference to the constant pool.

**See also:** ConstantPoolBuilder#of(ClassModel)

**See also:** ClassFile.ConstantPoolSharingOption

## AttributeMapper.library(type * variable, etc.)

```java
LABELS, /** * The attribute refers to structures not managed by the library (type * variable lists, etc.). As a result, even when the attribute is * expanded, those references may not be correctly translated, and the * rewritten results may be incorrect. * <p> * If the attribute is read from a
```

In addition to standalone data and references to the constant pool,
the attribute refers to positions into the `code` array of a
Code attribute.  Thus, it can be bulked-copied
when the `code` array is unchanged, which requires that the
destination `class` file extends its constant pool from that of
the original `class`.  It must be expanded to translate `Label`s or constant pool references and rewritten if the `code`
array is perturbed, including when constant pool indices are not
compatible.

For example, a bci value, modeled by a `Label`, is a reference
to a position in the `code` array.

## AttributeMapper.UNSTABLE, /** * The attribute is completely unknown. As a result, expanding and * rewriting is not possible, and any difference between the destination *

```java
UNSTABLE, /** * The attribute is completely unknown. As a result, expanding and * rewriting is not possible, and any difference between the destination *
```

The attribute refers to structures not managed by the library (type
variable lists, etc.).  As a result, even when the attribute is
expanded, those references may not be correctly translated, and the
rewritten results may be incorrect.

If the attribute is read from a `class` file, `ClassFile.AttributesProcessingOption` determines whether to preserve
or drop the attribute during transformation.

**See also:** ClassFile.AttributesProcessingOption#DROP_UNSTABLE_ATTRIBUTES

## AttributeMapper.UNKNOWN } /** *

```java
UNKNOWN } /** *
```

The attribute is completely unknown.  As a result, expanding and
rewriting is not possible, and any difference between the destination
`class` file and its enclosing `class` file may make the
attribute incorrect.

`ClassFile.AttributesProcessingOption` determines whether to
preserve or drop the attribute during transformation.

**See also:** UnknownAttribute

**See also:** ClassFile.AttributesProcessingOption#DROP_UNSTABLE_ATTRIBUTES

**See also:** ClassFile.AttributesProcessingOption#DROP_UNKNOWN_ATTRIBUTES

## AttributeMapper.name()

```java
String name()
```

## AttributeMapper.readAttribute(AttributedElement, ClassReader, int)

```java
A readAttribute(AttributedElement enclosing, ClassReader cf, int pos)
```

Creates an `Attribute` instance from a `class` file for the
Class-File API.

This method is called by the Class-File API to support reading of
attributes.  Users should never call this method.

The Class-File API makes these promises about the call to this method:

- The `Utf8Entry` for the name of the attribute is accessible
with `cf.readEntry(pos - 6, Utf8Entry.class)`, and is validated;

- The length of the attribute is accessible with `cf.readInt(pos - 4)`, and is validated to be positive and not beyond the length of the
`class` file;

- The `AttributedElement` attribute access functionalities on the
`enclosing` model may not be accessed when this method is called,
but can be accessed later by the returned attribute when it is accessible
to users.

The returned `Attribute` must fulfill these requirements:

- `Attribute.attributeMapper()` returns this mapper;

- `Attribute.attributeName()` returns the attribute name in the
`class` file.

Parameters:

- `enclosing`: the structure in which this attribute appears
- `cf`: provides access to the `class` file to read from
- `pos`: the offset into the `class` file at which the contents of the attribute starts

**API note:** Implementations of this method should perform minimal work to return an
attribute, as this method is called even if the resulting attribute is
never used.  In particular, the implementation should avoid checking the
validity of the attribute `class` file data or performing actions
that may throw exceptions.

**Returns:** the read attribute

## AttributeMapper.writeAttribute(BufWriter, A)

```java
void writeAttribute(BufWriter buf, A attr)
```

Writes an `Attribute` instance to a `class` file for the
Class-File API.

This method is called by the Class-File API to support writing of
attributes.  Users should never call this method.

The Class-File API makes these promises about the call to this method:

- attr.attributeMapper() returns
this mapper;

- The `buf` may already have data written, that its size may not be `0`.

The `class` file writing must fulfill these requirements:

- The attribute name `u2` and attribute length `u4` must
be written to the `buf`;

- attr.attributeName() is written as
if with `buf.writeIndex(attr.attributeName())`;

- The attribute length is the length, in bytes, of attribute contents
written to the `buf`, not including the 6 bytes used by the name
and the length;

- If any information in the API model of the attribute, `attr`,
cannot be represented in the `class` file format of the attribute,
an `IllegalArgumentException` is thrown.

Parameters:

- `buf`: the `BufWriter` to which the attribute should be written
- `attr`: the attribute to write

**API note:** `BufWriter.patchInt` can be used to update the attribute length
after the attribute contents are written to the `buf`.

Throws:

- `IllegalArgumentException`: if some data in the API model of the attribute is invalid for the `class` file format

## AttributeMapper.allowMultiple()

```java
default boolean allowMultiple()
```

If an attribute does not allow multiple instances in one structure,
can be supplied to a `ClassFileBuilder`, and multiple instances of
the attribute are supplied to the builder, the last supplied attribute
appears on the built structure.

**Implementation requirements:** The default implementation returns `false`.

## AttributeMapper.stability()

```java
AttributeStability stability()
```
