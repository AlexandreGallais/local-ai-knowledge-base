---
title: "CodeTransform interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/CodeTransform.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CodeTransform interface (java.lang.classfile)

```java
public non-sealed interface CodeTransform extends ClassFileTransform<CodeTransform, CodeElement, CodeBuilder>
```

A transformation on streams of `CodeElement`.  The stream can come
from a `CodeModel`, or a handler to a `CodeBuilder` as in
`CodeBuilder.transforming`.

Refer to `ClassFileTransform` for general guidance and caution around
the use of transforms for structures in the `class` file format.

A code transform can be lifted to a method or a class transform via `MethodTransform.transformingCode(CodeTransform)` and `ClassTransform.transformingMethodBodies(CodeTransform)`, transforming only
the `CodeModel` within those structures and passing all other elements
to the builders.

**See also:** CodeModel

**See also:** MethodBuilder#transformCode

**See also:** CodeBuilder#transforming

**Since:** 24

## CodeTransform.ACCEPT_ALL

```java
CodeTransform ACCEPT_ALL
```

A code transform that passes all elements to the builder.

## CodeTransform.ofStateful(Supplier<CodeTransform>)

```java
static CodeTransform ofStateful(Supplier<CodeTransform> supplier)
```

Creates a stateful code transform from a `Supplier`.  The supplier
will be invoked for each transformation.

Parameters:

- `supplier`: a `Supplier` that produces a fresh transform object for each traversal

**Returns:** the stateful code transform

## CodeTransform.endHandler(Consumer<CodeBuilder>)

```java
static CodeTransform endHandler(Consumer<CodeBuilder> finisher)
```

Creates a code transform that passes each element through to the builder,
and calls the specified function when transformation is complete.

Parameters:

- `finisher`: the function to call when transformation is complete

**Returns:** the code transform

## CodeTransform.andThen(CodeTransform)

```java
default CodeTransform andThen(CodeTransform t)
```

**Implementation requirements:** The default implementation returns this code transform chained with another
code transform from the argument. Chaining of two transforms requires to
involve a chained builder serving as a target builder for this transform
and also as a source of elements for the downstream transform.
