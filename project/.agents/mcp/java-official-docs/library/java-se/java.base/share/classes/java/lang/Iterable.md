---
title: "Iterable interface (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/Iterable.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Iterable interface (java.lang)

```java
public interface Iterable<T>
```

Implementing this interface allows an object to be the target of the enhanced
`for` statement (sometimes called the "for-each loop" statement).

Parameters:

- `<T>`: the type of elements returned by the iterator

**Since:** 1.5

**JLS:** 14.14.2 The enhanced `for` statement

## Iterable.iterator()

```java
Iterator<T> iterator()
```

Returns an iterator over elements of type `T`.

**Returns:** an Iterator.

## Iterable.forEach(Consumer<? super T>)

```java
default void forEach(Consumer<? super T> action)
```

Performs the given action for each element of the `Iterable`
until all elements have been processed or the action throws an
exception.  Actions are performed in the order of iteration, if that
order is specified.  Exceptions thrown by the action are relayed to the
caller.

The behavior of this method is unspecified if the action performs
side-effects that modify the underlying source of elements, unless an
overriding class has specified a concurrent modification policy.

Parameters:

- `action`: The action to be performed for each element

**Implementation requirements:** The default implementation behaves as if:

```java
    for (T t : this)
        action.accept(t);
```

**Since:** 1.8

Throws:

- `NullPointerException`: if the specified action is null

## Iterable.spliterator()

```java
default Spliterator<T> spliterator()
```

Creates a `Spliterator` over the elements described by this
`Iterable`.

**Implementation requirements:** The default implementation creates an
*early-binding*
spliterator from the iterable's `Iterator`.  The spliterator
inherits the *fail-fast* properties of the iterable's iterator.

**Implementation note:** The default implementation should usually be overridden.  The
spliterator returned by the default implementation has poor splitting
capabilities, is unsized, and does not report any spliterator
characteristics. Implementing classes can nearly always provide a
better implementation.

**Returns:** a `Spliterator` over the elements described by this
`Iterable`.

**Since:** 1.8
