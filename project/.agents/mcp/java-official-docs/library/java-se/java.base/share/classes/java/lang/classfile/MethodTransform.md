---
title: "MethodTransform interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/MethodTransform.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MethodTransform interface (java.lang.classfile)

```java
public non-sealed interface MethodTransform extends ClassFileTransform<MethodTransform, MethodElement, MethodBuilder>
```

A transformation on streams of `MethodElement`.

Refer to `ClassFileTransform` for general guidance and caution around
the use of transforms for structures in the `class` file format.

A method transform can be lifted to a class transform via `ClassTransform.transformingMethods(MethodTransform)`, transforming only
the `MethodModel` among the class members and passing all other
elements to the builders.

**See also:** MethodModel

**See also:** ClassBuilder#transformMethod

**Since:** 24

## MethodTransform.ACCEPT_ALL

```java
MethodTransform ACCEPT_ALL
```

A method transform that passes all elements to the builder.

## MethodTransform.ofStateful(Supplier<MethodTransform>)

```java
static MethodTransform ofStateful(Supplier<MethodTransform> supplier)
```

Creates a stateful method transform from a `Supplier`.  The supplier
will be invoked for each transformation.

Parameters:

- `supplier`: a `Supplier` that produces a fresh transform object for each traversal

**Returns:** the stateful method transform

## MethodTransform.endHandler(Consumer<MethodBuilder>)

```java
static MethodTransform endHandler(Consumer<MethodBuilder> finisher)
```

Creates a method transform that passes each element through to the builder,
and calls the specified function when transformation is complete.

Parameters:

- `finisher`: the function to call when transformation is complete

**Returns:** the method transform

## MethodTransform.dropping(Predicate<MethodElement>)

```java
static MethodTransform dropping(Predicate<MethodElement> filter)
```

Creates a method transform that passes each element through to the builder,
except for those that the supplied `Predicate` is true for.

Parameters:

- `filter`: the predicate that determines which elements to drop

**Returns:** the method transform

## MethodTransform.transformingCode(CodeTransform)

```java
static MethodTransform transformingCode(CodeTransform xform)
```

Creates a method transform that transforms `CodeModel` elements
with the supplied code transform, passing every other element through to
the builder.

Parameters:

- `xform`: the method transform

**Returns:** the class transform

## MethodTransform.andThen(MethodTransform)

```java
default MethodTransform andThen(MethodTransform t)
```

**Implementation requirements:** The default implementation returns this method transform chained with another
method transform from the argument. Chaining of two transforms requires to
involve a chained builder serving as a target builder for this transform
and also as a source of elements for the downstream transform.
