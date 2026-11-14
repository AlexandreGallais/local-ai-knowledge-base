---
title: "ClassFileBuilder interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/ClassFileBuilder.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ClassFileBuilder interface (java.lang.classfile)

```java
public sealed interface ClassFileBuilder<E extends ClassFileElement, B extends ClassFileBuilder<E, B>> extends Consumer<E> permits ClassBuilder, FieldBuilder, MethodBuilder, CodeBuilder
```

A builder for a `CompoundElement`, which accepts the member elements
to be integrated into the built structure.  Builders are usually passed as
an argument to `Consumer` handlers, such as in Consumer).  The handlers should deliver elements
to a builder similar to how a `CompoundElement` traverses its member
elements.

The basic way a builder accepts elements is through `with`, which
supports call chaining.  Concrete subtypes of builders usually define extra
methods to define elements directly to the builder, such as `ClassBuilder.withFlags(int)` or `CodeBuilder.aload(int)`.

Whether a member element can appear multiple times in a compound structure
affects the behavior of the element in `ClassFileBuilder`s.  If an
element can appear at most once but multiple instances are supplied to a
`ClassFileBuilder`, the last supplied instance appears on the built
structure.  If an element appears exactly once but no instance is supplied,
an unspecified default value element may be used in that structure.

Due to restrictions of the `class` file format, certain member elements
that can be modeled by the API cannot be represented in the built structure
under specific circumstances.  Passing such elements to the builder causes
`IllegalArgumentException`.  Some `ClassFile.Option`s control
whether such elements should be altered or dropped to produce valid `class` files.

Parameters:

- `<E>`: the member element type
- ``: the self type of this builder

**See also:** CompoundElement

**See also:** ClassFileTransform

**sealedGraph:**

**Since:** 24

## ClassFileBuilder.accept(E)

```java
default void accept(E e)
```

Integrates the member element into the structure being built.

Parameters:

- `e`: the member element

**API note:** This method exists to implement `Consumer`; users can use `with` for call chaining.

Throws:

- `IllegalArgumentException`: if the member element cannot be represented in the `class` file format

## ClassFileBuilder.with(E)

```java
B with(E e)
```

Integrates the member element into the structure being built.

Parameters:

- `e`: the member element

**Returns:** this builder

Throws:

- `IllegalArgumentException`: if the member element cannot be represented in the `class` file format

## ClassFileBuilder.constantPool()

```java
ConstantPoolBuilder constantPool()
```

## ClassFileBuilder.transform(CompoundElement<E>, ClassFileTransform<?, E, B>)

```java
default B transform(CompoundElement<E> model, ClassFileTransform<?, E, B> transform)
```

Applies a transform to a compound structure, directing results to this
builder.

The transform will receive each element of the compound structure, as
well as this builder for building the structure.  The transform is free
to preserve, remove, or replace elements as it sees fit.

A builder can run multiple transforms against different compound
structures, integrating member elements of different origins.

Parameters:

- `model`: the structure to transform
- `transform`: the transform to apply

**API note:** Many subinterfaces have methods like `ClassBuilder.transformMethod`
or `MethodBuilder.transformCode`.  However, calling them is
fundamentally different from calling this method: those methods call the
`transform` on the child builders instead of on itself.  For
example, `classBuilder.transformMethod` calls `methodBuilder.transform` with a new method builder instead of calling
`classBuilder.transform` on itself.

**Returns:** this builder

**See also:** ClassFileTransform
