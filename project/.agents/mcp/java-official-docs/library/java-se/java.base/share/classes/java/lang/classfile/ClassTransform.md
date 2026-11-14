---
title: "ClassTransform interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/ClassTransform.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ClassTransform interface (java.lang.classfile)

```java
public non-sealed interface ClassTransform extends ClassFileTransform<ClassTransform, ClassElement, ClassBuilder>
```

A transformation on streams of `ClassElement`.

Refer to `ClassFileTransform` for general guidance and caution around
the use of transforms for structures in the `class` file format.

**See also:** ClassModel

**See also:** ClassFile#transformClass(ClassModel, ClassTransform)

**Since:** 24

## ClassTransform.ACCEPT_ALL

```java
static final ClassTransform ACCEPT_ALL
```

A class transform that passes all elements to the builder.

## ClassTransform.ofStateful(Supplier<ClassTransform>)

```java
static ClassTransform ofStateful(Supplier<ClassTransform> supplier)
```

Creates a stateful class transform from a `Supplier`.  The supplier
will be invoked for each transformation.

Parameters:

- `supplier`: a `Supplier` that produces a fresh transform object for each traversal

**Returns:** the stateful class transform

## ClassTransform.endHandler(Consumer<ClassBuilder>)

```java
static ClassTransform endHandler(Consumer<ClassBuilder> finisher)
```

Creates a class transform that passes each element through to the builder,
and calls the specified function when transformation is complete.

Parameters:

- `finisher`: the function to call when transformation is complete

**Returns:** the class transform

## ClassTransform.dropping(Predicate<ClassElement>)

```java
static ClassTransform dropping(Predicate<ClassElement> filter)
```

Creates a class transform that passes each element through to the builder,
except for those that the supplied `Predicate` returns true for.

Parameters:

- `filter`: the predicate that determines which elements to drop

**Returns:** the class transform

## ClassTransform.transformingMethods(Predicate<MethodModel>, MethodTransform)

```java
static ClassTransform transformingMethods(Predicate<MethodModel> filter, MethodTransform xform)
```

Creates a class transform that transforms `MethodModel` elements
with the supplied method transform for methods that the supplied `Predicate` returns true for, passing other elements through to the
builder.

Parameters:

- `filter`: a predicate that determines which methods to transform
- `xform`: the method transform

**Returns:** the class transform

## ClassTransform.transformingMethods(MethodTransform)

```java
static ClassTransform transformingMethods(MethodTransform xform)
```

Creates a class transform that transforms `MethodModel` elements
with the supplied method transform, passing other elements through to the
builder.

Parameters:

- `xform`: the method transform

**Returns:** the class transform

## ClassTransform.transformingMethodBodies(Predicate<MethodModel>, CodeTransform)

```java
static ClassTransform transformingMethodBodies(Predicate<MethodModel> filter, CodeTransform xform)
```

Creates a class transform that transforms the `CodeAttribute` (method body)
of `MethodModel` elements with the supplied code transform for
methods that the supplied `Predicate` returns true for, passing
other elements through to the builder.

Parameters:

- `filter`: a predicate that determines which methods to transform
- `xform`: the code transform

**Returns:** the class transform

## ClassTransform.transformingMethodBodies(CodeTransform)

```java
static ClassTransform transformingMethodBodies(CodeTransform xform)
```

Creates a class transform that transforms the `CodeAttribute` (method body)
of `MethodModel` elements with the supplied code transform, passing
other elements through to the builder.

Parameters:

- `xform`: the code transform

**Returns:** the class transform

## ClassTransform.transformingFields(FieldTransform)

```java
static ClassTransform transformingFields(FieldTransform xform)
```

Creates a class transform that transforms `FieldModel` elements
with the supplied field transform, passing other elements through to the
builder.

Parameters:

- `xform`: the field transform

**Returns:** the class transform

## ClassTransform.andThen(ClassTransform)

```java
default ClassTransform andThen(ClassTransform t)
```

**Implementation requirements:** The default implementation returns this class transform chained with another
class transform from the argument. Chaining of two transforms requires to
involve a chained builder serving as a target builder for this transform
and also as a source of elements for the downstream transform.
