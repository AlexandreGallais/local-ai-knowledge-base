---
title: "SequencedSet interface (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/SequencedSet.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SequencedSet interface (java.util)

```java
public interface SequencedSet<E> extends SequencedCollection<E>, Set<E>
```

A collection that is both a `SequencedCollection` and a `Set`. As such,
it can be thought of either as a `Set` that also has a well-defined
encounter order, or as a
`SequencedCollection` that also has unique elements.

This interface has the same requirements on the `equals` and `hashCode`
methods as defined by Set.equals and Set.hashCode.
Thus, a `Set` and a `SequencedSet` will compare equals if and only
if they have equal elements, irrespective of ordering.

`SequencedSet` defines the `reversed` method, which provides a
reverse-ordered view of this set. The only difference
from the SequencedCollection.reversed method is
that the return type of `SequencedSet.reversed` is `SequencedSet`.

This class is a member of the

Java Collections Framework.

Parameters:

- `<E>`: the type of elements in this sequenced set

**Since:** 21

## SequencedSet.reversed()

```java
SequencedSet<E> reversed()
```

(inherited documentation)

**Returns:** a reverse-ordered view of this collection, as a `SequencedSet`
