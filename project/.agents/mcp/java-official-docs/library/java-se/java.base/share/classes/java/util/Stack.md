# Stack class (java.util)

```java
public class Stack<E> extends Vector<E>
```

The {@code Stack} class represents a last-in-first-out
(LIFO) stack of objects. It extends class {@code Vector} with five
operations that allow a vector to be treated as a stack. The usual
{@code push} and {@code pop} operations are provided, as well as a
method to {@code peek} at the top item on the stack, a method to test
for whether the stack is {@code empty}, and a method to {@code search}
the stack for an item and discover how far it is from the top.
<p>
When a stack is first created, it contains no items.

<p>A more complete and consistent set of LIFO stack operations is
provided by the {@link Deque} interface and its implementations, which
should be used in preference to this class.  For example:
<pre>   {@code
  Deque<Integer> stack = new ArrayDeque<Integer>();}</pre>

@param <E> Type of component elements

@author  Jonathan Payne
@since   1.0

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
<blockquote><pre>
addElement(item)</pre></blockquote>

@param   item   the item to be pushed onto this stack.
@return  the {@code item} argument.
@see     java.util.Vector#addElement

## Stack.pop()

```java
public synchronized E pop()
```

Removes the object at the top of this stack and returns that
object as the value of this function.

@return  The object at the top of this stack (the last item
         of the {@code Vector} object).
@throws  EmptyStackException  if this stack is empty.

## Stack.peek()

```java
public synchronized E peek()
```

Looks at the object at the top of this stack without removing it
from the stack.

@return  the object at the top of this stack (the last item
         of the {@code Vector} object).
@throws  EmptyStackException  if this stack is empty.

## Stack.empty()

```java
public boolean empty()
```

Tests if this stack is empty.

@return  {@code true} if and only if this stack contains
         no items; {@code false} otherwise.

## Stack.search(Object)

```java
public synchronized int search(Object o)
```

Returns the 1-based position where an object is on this stack.
If the object {@code o} occurs as an item in this stack, this
method returns the distance from the top of the stack of the
occurrence nearest the top of the stack; the topmost item on the
stack is considered to be at distance {@code 1}. The {@code equals}
method is used to compare {@code o} to the
items in this stack.

@param   o   the desired object.
@return  the 1-based position from the top of the stack where
         the object is located; the return value {@code -1}
         indicates that the object is not on the stack.