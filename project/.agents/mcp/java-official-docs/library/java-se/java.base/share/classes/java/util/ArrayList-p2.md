---
title: "ArrayList class (java.util) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/ArrayList.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ArrayList class (java.util) (part 2 of 2)

## ArrayList.retainAll(Collection<?>)

```java
public boolean retainAll(Collection<?> c)
```

Retains only the elements in this list that are contained in the
specified collection.  In other words, removes from this list all
of its elements that are not contained in the specified collection.

Parameters:

- `c`: collection containing elements to be retained in this list

**Returns:** `true` if this list changed as a result of the call

**See also:** Collection#contains(Object)

Throws:

- `ClassCastException`: if the class of an element of this list is incompatible with the specified collection (optional)
- `NullPointerException`: if this list contains a null element and the specified collection does not permit null elements (optional), or if the specified collection is null

## ArrayList.listIterator(int)

```java
public ListIterator<E> listIterator(int index)
```

Returns a list iterator over the elements in this list (in proper
sequence), starting at the specified position in the list.
The specified index indicates the first element that would be
returned by an initial call to next.
An initial call to previous would
return the element with the specified index minus one.

The returned list iterator is *fail-fast*.

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## ArrayList.listIterator()

```java
public ListIterator<E> listIterator()
```

Returns a list iterator over the elements in this list (in proper
sequence).

The returned list iterator is *fail-fast*.

**See also:** #listIterator(int)

## ArrayList.iterator()

```java
public Iterator<E> iterator()
```

Returns an iterator over the elements in this list in proper sequence.

The returned iterator is *fail-fast*.

**Returns:** an iterator over the elements in this list in proper sequence

## ArrayList.subList(int, int)

```java
public List<E> subList(int fromIndex, int toIndex)
```

Returns a view of the portion of this list between the specified
`fromIndex`, inclusive, and `toIndex`, exclusive.  (If
`fromIndex` and `toIndex` are equal, the returned list is
empty.)  The returned list is backed by this list, so non-structural
changes in the returned list are reflected in this list, and vice-versa.
The returned list supports all of the optional list operations.

This method eliminates the need for explicit range operations (of
the sort that commonly exist for arrays).  Any operation that expects
a list can be used as a range operation by passing a subList view
instead of a whole list.  For example, the following idiom
removes a range of elements from a list:

```java
     list.subList(from, to).clear();
```

Similar idioms may be constructed for `indexOf(Object)` and
`lastIndexOf(Object)`, and all of the algorithms in the
`Collections` class can be applied to a subList.

The semantics of the list returned by this method become undefined if
the backing list (i.e., this list) is *structurally modified* in
any way other than via the returned list.  (Structural modifications are
those that change the size of this list, or otherwise perturb it in such
a fashion that iterations in progress may yield incorrect results.)

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## ArrayList.SubList(ArrayList<E>, int, int)

```java
public SubList(ArrayList<E> root, int fromIndex, int toIndex)
```

Constructs a sublist of an arbitrary ArrayList.

## ArrayList.forEach(Consumer<? super E>)

```java
public void forEach(Consumer<? super E> action)
```

Throws:

- `NullPointerException`: (inherited documentation)

## ArrayList.spliterator()

```java
public Spliterator<E> spliterator()
```

Creates a *late-binding*
and *fail-fast* `Spliterator` over the elements in this
list.

The `Spliterator` reports `Spliterator.SIZED`,
`Spliterator.SUBSIZED`, and `Spliterator.ORDERED`.
Overriding implementations should document the reporting of additional
characteristic values.

**Returns:** a `Spliterator` over the elements in this list

**Since:** 1.8

## ArrayList.removeIf(Predicate<? super E>)

```java
public boolean removeIf(Predicate<? super E> filter)
```

Throws:

- `NullPointerException`: (inherited documentation)
