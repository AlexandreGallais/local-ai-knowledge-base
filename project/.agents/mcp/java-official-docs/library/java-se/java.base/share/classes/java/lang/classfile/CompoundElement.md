---
title: "CompoundElement interface (java.lang.classfile)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/classfile/CompoundElement.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CompoundElement interface (java.lang.classfile)

```java
public sealed interface CompoundElement<E extends ClassFileElement> extends ClassFileElement, Iterable<E> permits ClassModel, CodeModel, FieldModel, MethodModel, jdk.internal.classfile.impl.AbstractUnboundModel
```

A `class` file structure that can be viewed as a composition of its
member structures.  `CompoundElement` allows users to traverse these
member elements with `forEach(Consumer)` or `elementStream()`,
or buffer the elements obtained from the traversal through `iterator()` or `elementList()`.

Unless otherwise specified, all member elements of compatible type will be
presented during the traversal if they exist in this element.  Some member
elements specify that they may appear at most once in this element; if such
elements are presented multiple times, the latest occurrence is authentic and
all previous occurrences should be ignored.

`CompoundElement`s can be constructed by `ClassFileBuilder`s.
ClassFileTransform)
provides an easy way to create a new structure by selectively processing
the original member structures and directing the results to the builder.

Parameters:

- `<E>`: the member element type

**See also:** ClassFileElement##membership Membership Elements

**See also:** ClassFileBuilder

**sealedGraph:**

**Since:** 24

## CompoundElement.forEach(Consumer<? super E>)

```java
void forEach(Consumer<? super E> consumer)
```

Invokes the provided handler with each member element in this compound
element.

Parameters:

- `consumer`: the handler

## CompoundElement.iterator()

```java
default Iterator<E> iterator()
```

## CompoundElement.elementStream()

```java
default Stream<E> elementStream()
```

## CompoundElement.elementList()

```java
default List<E> elementList()
```

## CompoundElement.toDebugString()

```java
default String toDebugString()
```

The format, structure and exact contents of the returned string are not
specified and may change at any time in the future.
