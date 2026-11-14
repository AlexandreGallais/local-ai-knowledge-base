---
title: "CopyOnWriteArrayList class (java.util.concurrent) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/CopyOnWriteArrayList.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CopyOnWriteArrayList class (java.util.concurrent) (part 2 of 2)

## CopyOnWriteArrayList.removeIf(Predicate<? super E>)

```java
public boolean removeIf(Predicate<? super E> filter)
```

Throws:

- `NullPointerException`: (inherited documentation)

## CopyOnWriteArrayList.toString()

```java
public String toString()
```

Returns a string representation of this list.  The string
representation consists of the string representations of the list's
elements in the order they are returned by its iterator, enclosed in
square brackets (`"[]"`).  Adjacent elements are separated by
the characters `", "` (comma and space).  Elements are
converted to strings as by `String.valueOf(Object)`.

**Returns:** a string representation of this list

## CopyOnWriteArrayList.equals(Object)

```java
public boolean equals(Object o)
```

Compares the specified object with this list for equality.
Returns `true` if the specified object is the same object
as this object, or if it is also a `List` and the sequence
of elements returned by an iterator
over the specified list is the same as the sequence returned by
an iterator over this list.  The two sequences are considered to
be the same if they have the same length and corresponding
elements at the same position in the sequence are *equal*.
Two elements `e1` and `e2` are considered
*equal* if `Objects.equals(e1, e2)`.

Parameters:

- `o`: the object to be compared for equality with this list

**Returns:** `true` if the specified object is equal to this list

## CopyOnWriteArrayList.hashCode()

```java
public int hashCode()
```

Returns the hash code value for this list.

This implementation uses the definition in `List.hashCode`.

**Returns:** the hash code value for this list

## CopyOnWriteArrayList.iterator()

```java
public Iterator<E> iterator()
```

Returns an iterator over the elements in this list in proper sequence.

The returned iterator provides a snapshot of the state of the list
when the iterator was constructed. No synchronization is needed while
traversing the iterator. The iterator does *NOT* support the
`remove` method.

**Returns:** an iterator over the elements in this list in proper sequence

## CopyOnWriteArrayList.listIterator()

```java
public ListIterator<E> listIterator()
```

(inherited documentation)

The returned iterator provides a snapshot of the state of the list
when the iterator was constructed. No synchronization is needed while
traversing the iterator. The iterator does *NOT* support the
`remove`, `set` or `add` methods.

## CopyOnWriteArrayList.listIterator(int)

```java
public ListIterator<E> listIterator(int index)
```

(inherited documentation)

The returned iterator provides a snapshot of the state of the list
when the iterator was constructed. No synchronization is needed while
traversing the iterator. The iterator does *NOT* support the
`remove`, `set` or `add` methods.

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## CopyOnWriteArrayList.spliterator()

```java
public Spliterator<E> spliterator()
```

Returns a `Spliterator` over the elements in this list.

The `Spliterator` reports `Spliterator.IMMUTABLE`,
`Spliterator.ORDERED`, `Spliterator.SIZED`, and
`Spliterator.SUBSIZED`.

The spliterator provides a snapshot of the state of the list
when the spliterator was constructed. No synchronization is needed while
operating on the spliterator.

**Returns:** a `Spliterator` over the elements in this list

**Since:** 1.8

## CopyOnWriteArrayList.remove()

```java
public void remove()
```

Not supported. Always throws UnsupportedOperationException.

Throws:

- `UnsupportedOperationException`: always; `remove` is not supported by this iterator.

## CopyOnWriteArrayList.set(E)

```java
public void set(E e)
```

Not supported. Always throws UnsupportedOperationException.

Throws:

- `UnsupportedOperationException`: always; `set` is not supported by this iterator.

## CopyOnWriteArrayList.add(E)

```java
public void add(E e)
```

Not supported. Always throws UnsupportedOperationException.

Throws:

- `UnsupportedOperationException`: always; `add` is not supported by this iterator.

## CopyOnWriteArrayList.subList(int, int)

```java
public List<E> subList(int fromIndex, int toIndex)
```

Returns a view of the portion of this list between
`fromIndex`, inclusive, and `toIndex`, exclusive.
The returned list is backed by this list, so changes in the
returned list are reflected in this list.

The semantics of the list returned by this method become
undefined if the backing list (i.e., this list) is modified in
any way other than via the returned list.

Parameters:

- `fromIndex`: low endpoint (inclusive) of the subList
- `toIndex`: high endpoint (exclusive) of the subList

**Returns:** a view of the specified range within this list

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## CopyOnWriteArrayList.reversed()

```java
public List<E> reversed()
```

(inherited documentation)

Modifications to the reversed view are permitted and will be propagated
to this list. In addition, modifications to this list will be visible
in the reversed view. Sublists and iterators of the reversed view have
the same restrictions as those of this list.

**Since:** 21
