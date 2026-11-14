---
title: "FieldTransform interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/FieldTransform.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FieldTransform interface (java.lang.classfile)

```java
public non-sealed interface FieldTransform extends ClassFileTransform<FieldTransform, FieldElement, FieldBuilder>
```

A transformation on streams of `FieldElement`.

Refer to `ClassFileTransform` for general guidance and caution around
the use of transforms for structures in the `class` file format.

A field transform can be lifted to a class transform via `ClassTransform.transformingFields(FieldTransform)`, transforming only
the `FieldModel` among the class members and passing all other elements
to the builders.

**See also:** FieldModel

**See also:** ClassBuilder#transformField

**Since:** 24

## FieldTransform.ACCEPT_ALL

```java
FieldTransform ACCEPT_ALL
```

A field transform that passes all elements to the builder.

## FieldTransform.ofStateful(Supplier<FieldTransform>)

```java
static FieldTransform ofStateful(Supplier<FieldTransform> supplier)
```

Creates a stateful field transform from a `Supplier`.  The supplier
will be invoked for each transformation.

Parameters:

- `supplier`: a `Supplier` that produces a fresh transform object for each traversal

**Returns:** the stateful field transform

## FieldTransform.endHandler(Consumer<FieldBuilder>)

```java
static FieldTransform endHandler(Consumer<FieldBuilder> finisher)
```

Creates a field transform that passes each element through to the builder,
and calls the specified function when transformation is complete.

Parameters:

- `finisher`: the function to call when transformation is complete

**Returns:** the field transform

## FieldTransform.dropping(Predicate<FieldElement>)

```java
static FieldTransform dropping(Predicate<FieldElement> filter)
```

Creates a field transform that passes each element through to the builder,
except for those that the supplied `Predicate` is true for.

Parameters:

- `filter`: the predicate that determines which elements to drop

**Returns:** the field transform

## FieldTransform.andThen(FieldTransform)

```java
default FieldTransform andThen(FieldTransform t)
```

**Implementation requirements:** The default implementation returns this field transform chained with another
field transform from the argument. Chaining of two transforms requires to
involve a chained builder serving as a target builder for this transform
and also as a source of elements for the downstream transform.
