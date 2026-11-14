---
title: "Enumeration interface (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Enumeration.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Enumeration interface (java.util)

```java
public interface Enumeration<E>
```

An object that implements the Enumeration interface generates a
series of elements, one at a time. Successive calls to the
`nextElement` method return successive elements of the
series.

For example, to print all elements of a `Vector<E>` *v*:

```java
  for (Enumeration<E> e = v.elements(); e.hasMoreElements();)
      System.out.println(e.nextElement());
```

Methods are provided to enumerate through the elements of a
vector, the keys of a hashtable, and the values in a hashtable.
Enumerations are also used to specify the input streams to a
`SequenceInputStream`.

Parameters:

- `<E>`: the type of elements returned by this enumeration

**API note:** The functionality of this interface is duplicated by the `Iterator`
interface.  In addition, `Iterator` adds an optional remove operation,
and has shorter method names.  New implementations should consider using
`Iterator` in preference to `Enumeration`. It is possible to
adapt an `Enumeration` to an `Iterator` by using the
`asIterator` method.

**See also:** java.util.Iterator

**See also:** java.io.SequenceInputStream

**See also:** java.util.Enumeration#nextElement()

**See also:** java.util.Hashtable

**See also:** java.util.Hashtable#elements()

**See also:** java.util.Hashtable#keys()

**See also:** java.util.Vector

**See also:** java.util.Vector#elements()

**Since:** 1.0

## Enumeration.hasMoreElements()

```java
boolean hasMoreElements()
```

Tests if this enumeration contains more elements.

**Returns:** `true` if and only if this enumeration object
          contains at least one more element to provide;
         `false` otherwise.

## Enumeration.nextElement()

```java
E nextElement()
```

Returns the next element of this enumeration if this enumeration
object has at least one more element to provide.

**Returns:** the next element of this enumeration.

Throws:

- `NoSuchElementException`: if no more elements exist.

## Enumeration.asIterator()

```java
default Iterator<E> asIterator()
```

Returns an `Iterator` that traverses the remaining elements
covered by this enumeration. Traversal is undefined if any methods
are called on this enumeration after the call to `asIterator`.

**API note:** This method is intended to help adapt code that produces
`Enumeration` instances to code that consumes `Iterator`
instances. For example, the JarFile.entries() method returns an `Enumeration<JarEntry>`.
This can be turned into an `Iterator`, and then the
`forEachRemaining()` method can be used:

```java
    JarFile jarFile = ... ;
    jarFile.entries().asIterator().forEachRemaining(entry -> { ... });
```

(Note that there is also a JarFile.stream() method that returns a `Stream` of entries,
which may be more convenient in some cases.)

**Implementation requirements:** The default implementation returns an `Iterator` whose
hasNext method calls this Enumeration's
`hasMoreElements` method, whose next
method calls this Enumeration's `nextElement` method, and
whose remove method throws
`UnsupportedOperationException`.

**Returns:** an Iterator representing the remaining elements of this Enumeration

**Since:** 9
