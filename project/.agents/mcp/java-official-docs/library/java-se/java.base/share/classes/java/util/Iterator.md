---
title: "Iterator interface (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Iterator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Iterator interface (java.util)

```java
public interface Iterator<E>
```

An iterator over a collection.  `Iterator` takes the place of
`Enumeration` in the Java Collections Framework.  Iterators
differ from enumerations in two ways:

-  Iterators allow the caller to remove elements from the
          underlying collection during the iteration with well-defined
          semantics.

-  Method names have been improved.

This interface is a member of the

Java Collections Framework.

Parameters:

- `<E>`: the type of elements returned by this iterator

**API note:** An `Enumeration` can be converted into an `Iterator` by
using the `Enumeration.asIterator` method.

**See also:** Collection

**See also:** ListIterator

**See also:** Iterable

**Since:** 1.2

## Iterator.hasNext()

```java
boolean hasNext()
```

Returns `true` if the iteration has more elements.
(In other words, returns `true` if `next` would
return an element rather than throwing an exception.)

**Returns:** `true` if the iteration has more elements

## Iterator.next()

```java
E next()
```

Returns the next element in the iteration.

**Returns:** the next element in the iteration

Throws:

- `NoSuchElementException`: if the iteration has no more elements

## Iterator.remove()

```java
default void remove()
```

Removes from the underlying collection the last element returned
by this iterator (optional operation).  This method can be called
only once per call to `next`.

The behavior of an iterator is unspecified if the underlying collection
is modified while the iteration is in progress in any way other than by
calling this method, unless an overriding class has specified a
concurrent modification policy.

The behavior of an iterator is unspecified if this method is called
after a call to the forEachRemaining method.

**Implementation requirements:** The default implementation throws an instance of
`UnsupportedOperationException` and performs no other action.

Throws:

- `UnsupportedOperationException`: if the `remove` operation is not supported by this iterator
- `IllegalStateException`: if the `next` method has not yet been called, or the `remove` method has already been called after the last call to the `next` method

## Iterator.forEachRemaining(Consumer<? super E>)

```java
default void forEachRemaining(Consumer<? super E> action)
```

Performs the given action for each remaining element until all elements
have been processed or the action throws an exception.  Actions are
performed in the order of iteration, if that order is specified.
Exceptions thrown by the action are relayed to the caller.

The behavior of an iterator is unspecified if the action modifies the
collection in any way (even by calling the remove method
or other mutator methods of `Iterator` subtypes),
unless an overriding class has specified a concurrent modification policy.

Subsequent behavior of an iterator is unspecified if the action throws an
exception.

Parameters:

- `action`: The action to be performed for each element

**Implementation requirements:** The default implementation behaves as if:

```java
    while (hasNext())
        action.accept(next());
```

**Since:** 1.8

Throws:

- `NullPointerException`: if the specified action is null
