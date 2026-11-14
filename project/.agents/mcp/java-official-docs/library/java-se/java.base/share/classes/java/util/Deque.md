---
title: "Deque interface (java.util) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Deque.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Deque interface (java.util)

```java
public interface Deque<E> extends Queue<E>, SequencedCollection<E>
```

A linear collection that supports element insertion and removal at
both ends.  The name *deque* is short for "double ended queue"
and is usually pronounced "deck".  Most `Deque`
implementations place no fixed limits on the number of elements
they may contain, but this interface supports capacity-restricted
deques as well as those with no fixed size limit.

This interface defines methods to access the elements at both
ends of the deque.  Methods are provided to insert, remove, and
examine the element.  Each of these methods exists in two forms:
one throws an exception if the operation fails, the other returns a
special value (either `null` or `false`, depending on
the operation).  The latter form of the insert operation is
designed specifically for use with capacity-restricted
`Deque` implementations; in most implementations, insert
operations cannot fail.

The twelve methods described above are summarized in the
following table:

Summary of Deque methods

    First Element (Head)
    Last Element (Tail)

   Throws exception
   Special value
   Throws exception
   Special value

   Insert
   addFirst(e)
   offerFirst(e)
   addLast(e)
   offerLast(e)

   Remove
   removeFirst()
   pollFirst()
   removeLast()
   pollLast()

   Examine
   getFirst()
   peekFirst()
   getLast()
   peekLast()

This interface extends the `Queue` interface.  When a deque is
used as a queue, FIFO (First-In-First-Out) behavior results.  Elements are
added at the end of the deque and removed from the beginning.  The methods
inherited from the `Queue` interface are precisely equivalent to
`Deque` methods as indicated in the following table:

Comparison of Queue and Deque methods

    `Queue` Method
    Equivalent `Deque` Method

   add(e)
   addLast(e)

   offer(e)
   offerLast(e)

   remove()
   removeFirst()

   poll()
   pollFirst()

   element()
   getFirst()

   peek()
   peekFirst()

Deques can also be used as LIFO (Last-In-First-Out) stacks.  This
interface should be used in preference to the legacy `Stack` class.
When a deque is used as a stack, elements are pushed and popped from the
beginning of the deque.  Stack methods are equivalent to `Deque`
methods as indicated in the table below:

Comparison of Stack and Deque methods

    Stack Method
    Equivalent `Deque` Method

   push(e)
   addFirst(e)

   pop()
   removeFirst()

   peek()
   peekFirst()

Note that the peek method works equally well when
a deque is used as a queue or a stack; in either case, elements are
drawn from the beginning of the deque.

This interface provides two methods to remove interior
elements, removeFirstOccurrence and
removeLastOccurrence.

Unlike the `List` interface, this interface does not
provide support for indexed access to elements.

While `Deque` implementations are not strictly required
to prohibit the insertion of null elements, they are strongly
encouraged to do so.  Users of any `Deque` implementations
that do allow null elements are strongly encouraged *not* to
take advantage of the ability to insert nulls.  This is so because
`null` is used as a special return value by various methods
to indicate that the deque is empty.

`Deque` implementations generally do not define
element-based versions of the `equals` and `hashCode`
methods, but instead inherit the identity-based versions from class
`Object`.

This interface is a member of the

Java Collections Framework.

Parameters:

- `<E>`: the type of elements held in this deque

**Since:** 1.6

## Deque.addFirst(E)

```java
void addFirst(E e)
```

Inserts the specified element at the front of this deque if it is
possible to do so immediately without violating capacity restrictions,
throwing an `IllegalStateException` if no space is currently
available.  When using a capacity-restricted deque, it is generally
preferable to use method `offerFirst`.

Parameters:

- `e`: the element to add

Throws:

- `IllegalStateException`: if the element cannot be added at this time due to capacity restrictions
- `ClassCastException`: if the class of the specified element prevents it from being added to this deque
- `NullPointerException`: if the specified element is null and this deque does not permit null elements
- `IllegalArgumentException`: if some property of the specified element prevents it from being added to this deque

## Deque.addLast(E)

```java
void addLast(E e)
```

Inserts the specified element at the end of this deque if it is
possible to do so immediately without violating capacity restrictions,
throwing an `IllegalStateException` if no space is currently
available.  When using a capacity-restricted deque, it is generally
preferable to use method `offerLast`.

This method is equivalent to `add`.

Parameters:

- `e`: the element to add

Throws:

- `IllegalStateException`: if the element cannot be added at this time due to capacity restrictions
- `ClassCastException`: if the class of the specified element prevents it from being added to this deque
- `NullPointerException`: if the specified element is null and this deque does not permit null elements
- `IllegalArgumentException`: if some property of the specified element prevents it from being added to this deque

## Deque.offerFirst(E)

```java
boolean offerFirst(E e)
```

Inserts the specified element at the front of this deque unless it would
violate capacity restrictions.  When using a capacity-restricted deque,
this method is generally preferable to the `addFirst` method,
which can fail to insert an element only by throwing an exception.

Parameters:

- `e`: the element to add

**Returns:** `true` if the element was added to this deque, else
        `false`

Throws:

- `ClassCastException`: if the class of the specified element prevents it from being added to this deque
- `NullPointerException`: if the specified element is null and this deque does not permit null elements
- `IllegalArgumentException`: if some property of the specified element prevents it from being added to this deque

## Deque.offerLast(E)

```java
boolean offerLast(E e)
```

Inserts the specified element at the end of this deque unless it would
violate capacity restrictions.  When using a capacity-restricted deque,
this method is generally preferable to the `addLast` method,
which can fail to insert an element only by throwing an exception.

Parameters:

- `e`: the element to add

**Returns:** `true` if the element was added to this deque, else
        `false`

Throws:

- `ClassCastException`: if the class of the specified element prevents it from being added to this deque
- `NullPointerException`: if the specified element is null and this deque does not permit null elements
- `IllegalArgumentException`: if some property of the specified element prevents it from being added to this deque

## Deque.removeFirst()

```java
E removeFirst()
```

Retrieves and removes the first element of this deque.  This method
differs from pollFirst only in that it throws an
exception if this deque is empty.

**Returns:** the head of this deque

Throws:

- `NoSuchElementException`: if this deque is empty

## Deque.removeLast()

```java
E removeLast()
```

Retrieves and removes the last element of this deque.  This method
differs from pollLast only in that it throws an
exception if this deque is empty.

**Returns:** the tail of this deque

Throws:

- `NoSuchElementException`: if this deque is empty

## Deque.pollFirst()

```java
E pollFirst()
```

Retrieves and removes the first element of this deque,
or returns `null` if this deque is empty.

**Returns:** the head of this deque, or `null` if this deque is empty

## Deque.pollLast()

```java
E pollLast()
```

Retrieves and removes the last element of this deque,
or returns `null` if this deque is empty.

**Returns:** the tail of this deque, or `null` if this deque is empty

## Deque.getFirst()

```java
E getFirst()
```

Retrieves, but does not remove, the first element of this deque.

This method differs from peekFirst only in that it
throws an exception if this deque is empty.

**Returns:** the head of this deque

Throws:

- `NoSuchElementException`: if this deque is empty

## Deque.getLast()

```java
E getLast()
```

Retrieves, but does not remove, the last element of this deque.
This method differs from peekLast only in that it
throws an exception if this deque is empty.

**Returns:** the tail of this deque

Throws:

- `NoSuchElementException`: if this deque is empty

## Deque.peekFirst()

```java
E peekFirst()
```

Retrieves, but does not remove, the first element of this deque,
or returns `null` if this deque is empty.

**Returns:** the head of this deque, or `null` if this deque is empty

## Deque.peekLast()

```java
E peekLast()
```

Retrieves, but does not remove, the last element of this deque,
or returns `null` if this deque is empty.

**Returns:** the tail of this deque, or `null` if this deque is empty

## Deque.removeFirstOccurrence(Object)

```java
boolean removeFirstOccurrence(Object o)
```

Removes the first occurrence of the specified element from this deque.
If the deque does not contain the element, it is unchanged.
More formally, removes the first element `e` such that
`Objects.equals(o, e)` (if such an element exists).
Returns `true` if this deque contained the specified element
(or equivalently, if this deque changed as a result of the call).

Parameters:

- `o`: element to be removed from this deque, if present

**Returns:** `true` if an element was removed as a result of this call

Throws:

- `ClassCastException`: if the class of the specified element is incompatible with this deque (optional)
- `NullPointerException`: if the specified element is null and this deque does not permit null elements (optional)

## Deque.removeLastOccurrence(Object)

```java
boolean removeLastOccurrence(Object o)
```

Removes the last occurrence of the specified element from this deque.
If the deque does not contain the element, it is unchanged.
More formally, removes the last element `e` such that
`Objects.equals(o, e)` (if such an element exists).
Returns `true` if this deque contained the specified element
(or equivalently, if this deque changed as a result of the call).

Parameters:

- `o`: element to be removed from this deque, if present

**Returns:** `true` if an element was removed as a result of this call

Throws:

- `ClassCastException`: if the class of the specified element is incompatible with this deque (optional)
- `NullPointerException`: if the specified element is null and this deque does not permit null elements (optional)

## Deque.add(E)

```java
boolean add(E e)
```

Inserts the specified element into the queue represented by this deque
(in other words, at the tail of this deque) if it is possible to do so
immediately without violating capacity restrictions, returning
`true` upon success and throwing an
`IllegalStateException` if no space is currently available.
When using a capacity-restricted deque, it is generally preferable to
use offer.

This method is equivalent to `addLast`.

Parameters:

- `e`: the element to add

**Returns:** `true` (as specified by `Collection.add`)

Throws:

- `IllegalStateException`: if the element cannot be added at this time due to capacity restrictions
- `ClassCastException`: if the class of the specified element prevents it from being added to this deque
- `NullPointerException`: if the specified element is null and this deque does not permit null elements
- `IllegalArgumentException`: if some property of the specified element prevents it from being added to this deque

## Deque.offer(E)

```java
boolean offer(E e)
```

Inserts the specified element into the queue represented by this deque
(in other words, at the tail of this deque) if it is possible to do so
immediately without violating capacity restrictions, returning
`true` upon success and `false` if no space is currently
available.  When using a capacity-restricted deque, this method is
generally preferable to the `add` method, which can fail to
insert an element only by throwing an exception.

This method is equivalent to `offerLast`.

Parameters:

- `e`: the element to add

**Returns:** `true` if the element was added to this deque, else
        `false`

Throws:

- `ClassCastException`: if the class of the specified element prevents it from being added to this deque
- `NullPointerException`: if the specified element is null and this deque does not permit null elements
- `IllegalArgumentException`: if some property of the specified element prevents it from being added to this deque

## Deque.remove()

```java
E remove()
```

Retrieves and removes the head of the queue represented by this deque
(in other words, the first element of this deque).
This method differs from poll() only in that it
throws an exception if this deque is empty.

This method is equivalent to `removeFirst()`.

**Returns:** the head of the queue represented by this deque

Throws:

- `NoSuchElementException`: if this deque is empty

## Deque.poll()

```java
E poll()
```

Retrieves and removes the head of the queue represented by this deque
(in other words, the first element of this deque), or returns
`null` if this deque is empty.

This method is equivalent to `pollFirst()`.

**Returns:** the first element of this deque, or `null` if
        this deque is empty

## Deque.element()

```java
E element()
```

Retrieves, but does not remove, the head of the queue represented by
this deque (in other words, the first element of this deque).
This method differs from peek only in that it throws an
exception if this deque is empty.

This method is equivalent to `getFirst()`.

**Returns:** the head of the queue represented by this deque

Throws:

- `NoSuchElementException`: if this deque is empty

## Deque.peek()

```java
E peek()
```

Retrieves, but does not remove, the head of the queue represented by
this deque (in other words, the first element of this deque), or
returns `null` if this deque is empty.

This method is equivalent to `peekFirst()`.

**Returns:** the head of the queue represented by this deque, or
        `null` if this deque is empty
