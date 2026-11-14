---
title: "Stack class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Stack.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Stack class (java.util)

```java
public class Stack<E> extends Vector<E>
```

The `Stack` class represents a last-in-first-out
(LIFO) stack of objects. It extends class `Vector` with five
operations that allow a vector to be treated as a stack. The usual
`push` and `pop` operations are provided, as well as a
method to `peek` at the top item on the stack, a method to test
for whether the stack is `empty`, and a method to `search`
the stack for an item and discover how far it is from the top.

When a stack is first created, it contains no items.

A more complete and consistent set of LIFO stack operations is
provided by the `Deque` interface and its implementations, which
should be used in preference to this class.  For example:

```java
  Deque<Integer> stack = new ArrayDeque<Integer>();
```

Parameters:

- `<E>`: Type of component elements

**Since:** 1.0

## Stack.Stack()

```java
public Stack()
```

Creates an empty Stack.

## Stack.push(E)

```java
public E push(E item)
```

Pushes an item onto the top of this stack. This has exactly
the same effect as:

```java
addElement(item)
```

Parameters:

- `item`: the item to be pushed onto this stack.

**Returns:** the `item` argument.

**See also:** java.util.Vector#addElement

## Stack.pop()

```java
public synchronized E pop()
```

Removes the object at the top of this stack and returns that
object as the value of this function.

**Returns:** The object at the top of this stack (the last item
         of the `Vector` object).

Throws:

- `EmptyStackException`: if this stack is empty.

## Stack.peek()

```java
public synchronized E peek()
```

Looks at the object at the top of this stack without removing it
from the stack.

**Returns:** the object at the top of this stack (the last item
         of the `Vector` object).

Throws:

- `EmptyStackException`: if this stack is empty.

## Stack.empty()

```java
public boolean empty()
```

Tests if this stack is empty.

**Returns:** `true` if and only if this stack contains
         no items; `false` otherwise.

## Stack.search(Object)

```java
public synchronized int search(Object o)
```

Returns the 1-based position where an object is on this stack.
If the object `o` occurs as an item in this stack, this
method returns the distance from the top of the stack of the
occurrence nearest the top of the stack; the topmost item on the
stack is considered to be at distance `1`. The `equals`
method is used to compare `o` to the
items in this stack.

Parameters:

- `o`: the desired object.

**Returns:** the 1-based position from the top of the stack where
         the object is located; the return value `-1`
         indicates that the object is not on the stack.
