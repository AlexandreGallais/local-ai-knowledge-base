---
title: "Collection interface (java.util) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Collection.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Collection interface (java.util) (part 3 of 3)

## Collection.spliterator()

```java
default Spliterator<E> spliterator()
```

Creates a `Spliterator` over the elements in this collection.

Implementations should document characteristic values reported by the
spliterator.  Such characteristic values are not required to be reported
if the spliterator reports `Spliterator.SIZED` and this collection
contains no elements.

The default implementation should be overridden by subclasses that
can return a more efficient spliterator.  In order to
preserve expected laziness behavior for the `stream()` and
`parallelStream()` methods, spliterators should either have the
characteristic of `IMMUTABLE` or `CONCURRENT`, or be
*late-binding*.
If none of these is practical, the overriding class should describe the
spliterator's documented policy of binding and structural interference,
and should override the `stream()` and `parallelStream()`
methods to create streams using a `Supplier` of the spliterator,
as in:

```java
    Stream<E> s = StreamSupport.stream(() -> spliterator(), spliteratorCharacteristics)
```

These requirements ensure that streams produced by the
`stream()` and `parallelStream()` methods will reflect the
contents of the collection as of initiation of the terminal stream
operation.

**Implementation requirements:** The default implementation creates a
*late-binding* spliterator
from the collection's `Iterator`.  The spliterator inherits the
*fail-fast* properties of the collection's iterator.

The created `Spliterator` reports `Spliterator.SIZED`.

**Implementation note:** The created `Spliterator` additionally reports
`Spliterator.SUBSIZED`.

If a spliterator covers no elements then the reporting of additional
characteristic values, beyond that of `SIZED` and `SUBSIZED`,
does not aid clients to control, specialize or simplify computation.
However, this does enable shared use of an immutable and empty
spliterator instance (see `Spliterators.emptySpliterator()`) for
empty collections, and enables clients to determine if such a spliterator
covers no elements.

**Returns:** a `Spliterator` over the elements in this collection

**Since:** 1.8

## Collection.stream()

```java
default Stream<E> stream()
```

Returns a sequential `Stream` with this collection as its source.

This method should be overridden when the `spliterator()`
method cannot return a spliterator that is `IMMUTABLE`,
`CONCURRENT`, or *late-binding*. (See `spliterator()`
for details.)

**Implementation requirements:** The default implementation creates a sequential `Stream` from the
collection's `Spliterator`.

**Returns:** a sequential `Stream` over the elements in this collection

**Since:** 1.8

## Collection.parallelStream()

```java
default Stream<E> parallelStream()
```

Returns a possibly parallel `Stream` with this collection as its
source.  It is allowable for this method to return a sequential stream.

This method should be overridden when the `spliterator()`
method cannot return a spliterator that is `IMMUTABLE`,
`CONCURRENT`, or *late-binding*. (See `spliterator()`
for details.)

**Implementation requirements:** The default implementation creates a parallel `Stream` from the
collection's `Spliterator`.

**Returns:** a possibly parallel `Stream` over the elements in this
collection

**Since:** 1.8
