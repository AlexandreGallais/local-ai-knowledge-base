---
title: "Deque interface (java.util) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Deque.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Deque interface (java.util) (part 2 of 2)

## Deque.addAll(Collection<? extends E>)

```java
boolean addAll(Collection<? extends E> c)
```

Adds all of the elements in the specified collection at the end
of this deque, as if by calling `addLast` on each one,
in the order that they are returned by the collection's iterator.

When using a capacity-restricted deque, it is generally preferable
to call offer separately on each element.

An exception encountered while trying to add an element may result
in only some of the elements having been successfully added when
the associated exception is thrown.

Parameters:

- `c`: the elements to be inserted into this deque

**Returns:** `true` if this deque changed as a result of the call

Throws:

- `IllegalStateException`: if not all the elements can be added at this time due to insertion restrictions
- `ClassCastException`: if the class of an element of the specified collection prevents it from being added to this deque
- `NullPointerException`: if the specified collection contains a null element and this deque does not permit null elements, or if the specified collection is null
- `IllegalArgumentException`: if some property of an element of the specified collection prevents it from being added to this deque

## Deque.push(E)

```java
void push(E e)
```

Pushes an element onto the stack represented by this deque (in other
words, at the head of this deque) if it is possible to do so
immediately without violating capacity restrictions, throwing an
`IllegalStateException` if no space is currently available.

This method is equivalent to `addFirst`.

Parameters:

- `e`: the element to push

Throws:

- `IllegalStateException`: if the element cannot be added at this time due to capacity restrictions
- `ClassCastException`: if the class of the specified element prevents it from being added to this deque
- `NullPointerException`: if the specified element is null and this deque does not permit null elements
- `IllegalArgumentException`: if some property of the specified element prevents it from being added to this deque

## Deque.pop()

```java
E pop()
```

Pops an element from the stack represented by this deque.  In other
words, removes and returns the first element of this deque.

This method is equivalent to `removeFirst()`.

**Returns:** the element at the front of this deque (which is the top
        of the stack represented by this deque)

Throws:

- `NoSuchElementException`: if this deque is empty

## Deque.remove(Object)

```java
boolean remove(Object o)
```

Removes the first occurrence of the specified element from this deque.
If the deque does not contain the element, it is unchanged.
More formally, removes the first element `e` such that
`Objects.equals(o, e)` (if such an element exists).
Returns `true` if this deque contained the specified element
(or equivalently, if this deque changed as a result of the call).

This method is equivalent to `removeFirstOccurrence(Object)`.

Parameters:

- `o`: element to be removed from this deque, if present

**Returns:** `true` if an element was removed as a result of this call

Throws:

- `ClassCastException`: if the class of the specified element is incompatible with this deque (optional)
- `NullPointerException`: if the specified element is null and this deque does not permit null elements (optional)

## Deque.contains(Object)

```java
boolean contains(Object o)
```

Returns `true` if this deque contains the specified element.
More formally, returns `true` if and only if this deque contains
at least one element `e` such that `Objects.equals(o, e)`.

Parameters:

- `o`: element whose presence in this deque is to be tested

**Returns:** `true` if this deque contains the specified element

Throws:

- `ClassCastException`: if the class of the specified element is incompatible with this deque (optional)
- `NullPointerException`: if the specified element is null and this deque does not permit null elements (optional)

## Deque.size()

```java
int size()
```

Returns the number of elements in this deque.

**Returns:** the number of elements in this deque

## Deque.iterator()

```java
Iterator<E> iterator()
```

Returns an iterator over the elements in this deque in proper sequence.
The elements will be returned in order from first (head) to last (tail).

**Returns:** an iterator over the elements in this deque in proper sequence

## Deque.descendingIterator()

```java
Iterator<E> descendingIterator()
```

Returns an iterator over the elements in this deque in reverse
sequential order.  The elements will be returned in order from
last (tail) to first (head).

**Returns:** an iterator over the elements in this deque in reverse
sequence

## Deque.reversed()

```java
default Deque<E> reversed()
```

(inherited documentation)

**Implementation requirements:** The implementation in this interface returns a reverse-ordered Deque
view. The `reversed()` method of the view returns a reference
to this Deque. Other operations on the view are implemented via calls to
public methods on this Deque. The exact relationship between calls on the
view and calls on this Deque is unspecified. However, order-sensitive
operations generally behave as if they delegate to the appropriate method
with the opposite orientation. For example, calling `getFirst` on
the view might result in a call to `getLast` on this Deque.

**Returns:** a reverse-ordered view of this collection, as a `Deque`

**Since:** 21
