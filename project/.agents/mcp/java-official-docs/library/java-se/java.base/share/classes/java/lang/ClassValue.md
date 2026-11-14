---
title: "ClassValue class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/ClassValue.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ClassValue class (java.lang)

```java
public abstract class ClassValue<T>
```

Lazily associate a computed value with any `Class` object.
For example, if a dynamic language needs to construct a message dispatch
table for each class encountered at a message send call site,
it can use a `ClassValue` to cache information needed to
perform the message send quickly, for each class encountered.

The basic <example-value> of a `ClassValue` is get, which
returns the associated value, initially created by an invocation to computeValue; multiple invocations may happen under race, but
exactly one value is associated to a `Class` and returned.

Another operation is remove: it clears the associated value
(if it exists), and ensures the next associated value is computed with input
states up-to-date with the removal.

For a particular association, there is a total order for accesses to the
associated value.  Accesses are atomic; they include:

- A read-only access by `get`

- An attempt to associate the return value of a `computeValue` by
`get`

- Clearing of an association by `remove`

A `get` call always include at least one access; a `remove` call
always has exactly one access; a `computeValue` call always happens
between two accesses.  This establishes the order of `computeValue`
calls with respect to `remove` calls and determines whether the
results of a `computeValue` can be successfully associated by a `get`.

Parameters:

- `<T>`: the type of the associated value

**Since:** 1.7

## ClassValue.ClassValue()

```java
protected ClassValue()
```

Sole constructor.  (For invocation by subclass constructors, typically
implicit.)

## ClassValue.computeValue(Class<?>)

```java
protected abstract T computeValue(Class<?> type)
```

Computes the value to associate to the given `Class`.

This method is invoked when the initial read-only access by get finds no associated value.

If this method throws an exception, the initiating `get` call will
not attempt to associate a value, and may terminate by returning the
associated value if it exists, or by propagating that exception otherwise.

Otherwise, the value is computed and returned.  An attempt to associate
the return value happens, with one of the following outcomes:

- The associated value is present; it is returned and no association
is done.

- The most recent remove call, if it exists, does not
happen-before (JLS ) the finish of the `computeValue`
that computed the value to associate.  A new invocation to `computeValue`, which that `remove` call happens-before, will
re-establish this happens-before relationship.

- Otherwise, this value is successfully associated and returned.

Parameters:

- `type`: the `Class` to associate a value to

**API note:** A `computeValue` call may, due to class loading or other
circumstances, recursively call `get` or `remove` for the
same `type`.  The recursive `get`, if the recursion stops,
successfully finishes and this initiating `get` observes the
associated value from recursion.  The recursive `remove` is no-op,
since being on the same thread, the `remove` already happens-before
the finish of this `computeValue`; the result from this `computeValue` still may be associated.

**Returns:** the newly computed value to associate

**See also:** #get

**See also:** #remove

## ClassValue.get(Class<?>)

```java
public T get(Class<?> type)
```

This method first performs a read-only access, and returns the associated
value if it exists.  Otherwise, this method tries to associate a value
from a computeValue invocation until the associated
value exists, which could be associated by a competing thread.

This method may throw an exception from a `computeValue` invocation.
In this case, no association happens.

Parameters:

- `type`: the `Class` to retrieve the associated value for

**See also:** #remove

**See also:** #computeValue

Throws:

- `NullPointerException`: if the argument is `null`

## ClassValue.remove(Class<?>)

```java
public void remove(Class<?> type)
```

Removes the associated value for the given `Class` and invalidates
all out-of-date computations.  If this association is subsequently
accessed, this removal happens-before (JLS ) the finish of the computeValue call that
returned the associated value.

Parameters:

- `type`: the type whose class value must be removed

Throws:

- `NullPointerException`: if the argument is `null`
