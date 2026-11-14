---
title: "ClassFileTransform interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/ClassFileTransform.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ClassFileTransform interface (java.lang.classfile)

```java
public sealed interface ClassFileTransform< C extends ClassFileTransform<C, E, B>, E extends ClassFileElement, B extends ClassFileBuilder<E, B>> permits ClassTransform, FieldTransform, MethodTransform, CodeTransform
```

A transformation on a `CompoundElement` by processing its individual
member elements and sending the results to a `ClassFileBuilder`,
through `ClassFileBuilder.transform`.  A subtype of `ClassFileTransform` is defined for each subtype of `CompoundElement`
and `ClassFileBuilder`, as shown in the sealed class hierarchy below.

For example, this is a basic <example-value> of a `CodeModel` that
redirects all calls to static methods in the `Foo` class to the `Bar` class, preserving all other elements:

Note that if no transformation of a member element is desired, the element
should be presented to builder::with.  If no
action is taken, that member element is dropped.

More advanced usages of transforms include start or end handling, stateful transformation that makes a
decision based on previously encountered member elements, and composition of transforms, where one transform processes the
results of a previous transform on the input compound structure.  All these
capabilities are supported by this interface and accessible to user transform
implementations.

Users can define custom start and end handling for a transform by overriding
`atStart` and `atEnd`.  The start handler is called before any
member element is processed, and the end handler is called after all member
elements are processed.  For example, the start handler can be used to inject
extra code elements to the beginning of a code array, and the end handler,
combined with stateful transformation, can perform cleanup actions, such as
determining if an attribute has been merged, or if a new attribute should be
defined.  Each subtype of `ClassFileTransform` defines a utility method
`endHandler` that returns a transform that only has end handling.

Transforms can have states that persist across processing of individual
member elements.  For example, if a transform injects an annotation, the
transform may keep track if it has encountered and presented an updated
`RuntimeVisibleAnnotationsAttribute` to the builder; if it has not yet,
it can present a new attribute containing only the injected annotation in its
end handler.  If such a transform is to be shared or reused, each returned
transform should have its own state.  Each subtype of `ClassFileTransform`
defines a utility method `ofStateful` where a supplier creates the
transform at its initial state each time the transform is reused.

Transforms can be composed via `andThen`.  When this transform is
composed with another transform, it means the output member elements received
by the `ClassFileBuilder` become the input elements to that other
transform.  Composition avoids building intermediate structures for multiple
transforms to run on.  Each subtype of `ClassFileTransform` implements
`andThen`, which generally should not be implemented by users.

Transforms that run on smaller structures can be lifted to its enclosing
structures to selectively run on all enclosed smaller structures of the same
kind.  For example, a `CodeTransform` can be lifted via CodeTransform) to
transform the method body of select methods in the class it runs on.  This
allows users to write small transforms and apply to larger scales.

Besides `ClassFileBuilder.transform`, there are other methods that
accepts a transform conveniently, such as `ClassFile.transformClass`,
`ClassBuilder.transformField`, `ClassBuilder.transformMethod`, or
`MethodBuilder.transformCode`.  They are convenience methods that suit
the majority of transformation scenarios.

Parameters:

- `<C>`: the transform type
- `<E>`: the member element type
- ``: the builder type

**sealedGraph:**

**Since:** 24

## ClassFileTransform.accept(B, E)

```java
void accept(B builder, E element)
```

Transform an element by taking the appropriate actions on the builder.
Used when transforming a classfile entity (class, method, field, method
body.) If no transformation is desired, the element can be presented to
`B.with(ClassFileElement)`.  If the element is to be dropped, no
action is required.

This method is called by the Class-File API.  Users should never call
this method.

Parameters:

- `builder`: the builder for the new entity
- `element`: the element

## ClassFileTransform.atEnd(B)

```java
default void atEnd(B builder)
```

Take any final action during transformation of a classfile entity.  Called
after all elements of the class are presented to ClassFileElement).

This method is called by the Class-File API.  Users should never call
this method.

Parameters:

- `builder`: the builder for the new entity

**Implementation requirements:** The default implementation does nothing.

## ClassFileTransform.atStart(B)

```java
default void atStart(B builder)
```

Take any preliminary action during transformation of a classfile entity.
Called before any elements of the class are presented to ClassFileElement).

This method is called by the Class-File API.  Users should never call
this method.

Parameters:

- `builder`: the builder for the new entity

**Implementation requirements:** The default implementation does nothing.

## ClassFileTransform.andThen(C)

```java
C andThen(C next)
```

Chain this transform with another; elements presented to the builder of
this transform will become the input to the next transform.

This method is implemented by the Class-File API.  Users usually don't
have sufficient access to Class-File API functionalities to override this
method correctly for generic downstream transforms.

Parameters:

- `next`: the downstream transform

**Returns:** the chained transform
