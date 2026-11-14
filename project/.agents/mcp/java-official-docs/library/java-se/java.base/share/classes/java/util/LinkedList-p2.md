---
title: "LinkedList class (java.util) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/LinkedList.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# LinkedList class (java.util) (part 2 of 2)

## LinkedList.listIterator(int)

```java
public ListIterator<E> listIterator(int index)
```

Returns a list-iterator of the elements in this list (in proper
sequence), starting at the specified position in the list.
Obeys the general contract of `List.listIterator(int)`.

The list-iterator is *fail-fast*: if the list is structurally
modified at any time after the Iterator is created, in any way except
through the list-iterator's own `remove` or `add`
methods, the list-iterator will throw a
`ConcurrentModificationException`.  Thus, in the face of
concurrent modification, the iterator fails quickly and cleanly, rather
than risking arbitrary, non-deterministic behavior at an undetermined
time in the future.

Parameters:

- `index`: index of the first element to be returned from the list-iterator (by a call to `next`)

**Returns:** a ListIterator of the elements in this list (in proper
        sequence), starting at the specified position in the list

**See also:** List#listIterator(int)

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## LinkedList.descendingIterator()

```java
public Iterator<E> descendingIterator()
```

**Since:** 1.6

## LinkedList.clone()

```java
public Object clone()
```

Returns a shallow copy of this `LinkedList`. (The elements
themselves are not cloned.)

**Returns:** a shallow copy of this `LinkedList` instance

## LinkedList.toArray()

```java
public Object[] toArray()
```

Returns an array containing all of the elements in this list
in proper sequence (from first to last element).

The returned array will be "safe" in that no references to it are
maintained by this list.  (In other words, this method must allocate
a new array).  The caller is thus free to modify the returned array.

This method acts as bridge between array-based and collection-based
APIs.

**Returns:** an array containing all of the elements in this list
        in proper sequence

## LinkedList.toArray(T[])

```java
public <T> T[] toArray(T[] a)
```

Returns an array containing all of the elements in this list in
proper sequence (from first to last element); the runtime type of
the returned array is that of the specified array.  If the list fits
in the specified array, it is returned therein.  Otherwise, a new
array is allocated with the runtime type of the specified array and
the size of this list.

If the list fits in the specified array with room to spare (i.e.,
the array has more elements than the list), the element in the array
immediately following the end of the list is set to `null`.
(This is useful in determining the length of the list *only* if
the caller knows that the list does not contain any null elements.)

Like the `toArray()` method, this method acts as bridge between
array-based and collection-based APIs.  Further, this method allows
precise control over the runtime type of the output array, and may,
under certain circumstances, be used to save allocation costs.

Suppose `x` is a list known to contain only strings.
The following code can be used to dump the list into a newly
allocated array of `String`:

```java
    String[] y = x.toArray(new String[0]);
```

Note that `toArray(new Object[0])` is identical in function to
`toArray()`.

Parameters:

- `a`: the array into which the elements of the list are to be stored, if it is big enough; otherwise, a new array of the same runtime type is allocated for this purpose.

**Returns:** an array containing the elements of the list

Throws:

- `ArrayStoreException`: if the runtime type of the specified array is not a supertype of the runtime type of every element in this list
- `NullPointerException`: if the specified array is null

## LinkedList.spliterator()

```java
public Spliterator<E> spliterator()
```

Creates a *late-binding*
and *fail-fast* `Spliterator` over the elements in this
list.

The `Spliterator` reports `Spliterator.SIZED` and
`Spliterator.ORDERED`.  Overriding implementations should document
the reporting of additional characteristic values.

**Implementation note:** The `Spliterator` additionally reports `Spliterator.SUBSIZED`
and implements `trySplit` to permit limited parallelism..

**Returns:** a `Spliterator` over the elements in this list

**Since:** 1.8

## LinkedList.reversed()

```java
public LinkedList<E> reversed()
```

(inherited documentation)

Modifications to the reversed view are permitted and will be propagated to this list.
In addition, modifications to this list will be visible in the reversed view.

**Returns:** (inherited documentation)

**Since:** 21
