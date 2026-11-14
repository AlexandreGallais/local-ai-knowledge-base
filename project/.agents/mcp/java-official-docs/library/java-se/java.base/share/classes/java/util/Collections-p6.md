---
title: "Collections class (java.util) (part 6 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Collections.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Collections class (java.util) (part 6 of 6)

## Collections.addAll(Collection<? super T>, T...)

```java
public static <T> boolean addAll(Collection<? super T> c, T... elements)
```

Adds all of the specified elements to the specified collection.
Elements to be added may be specified individually or as an array.
The behaviour of this convenience method is similar to that of
`c.addAll(Collections.unmodifiableList(Arrays.asList(elements)))`.

When elements are specified individually, this method provides a
convenient way to add a few elements to an existing collection:

```java
    Collections.addAll(flavors, "Peaches 'n Plutonium", "Rocky Racoon");
```

Parameters:

- `<T>`: the class of the elements to add and of the collection
- `c`: the collection into which `elements` are to be inserted
- `elements`: the elements to insert into `c`

**Returns:** `true` if the collection changed as a result of the call

**See also:** Collection#addAll(Collection)

**Since:** 1.5

Throws:

- `UnsupportedOperationException`: if `c` does not support the `add` operation
- `NullPointerException`: if `elements` contains one or more null values and `c` does not permit null elements, or if `c` or `elements` are `null`
- `IllegalArgumentException`: if some property of a value in `elements` prevents it from being added to `c`

## Collections.newSetFromMap(Map<E, Boolean>)

```java
public static <E> Set<E> newSetFromMap(Map<E, Boolean> map)
```

Returns a set backed by the specified map.  The resulting set displays
the same ordering, concurrency, and performance characteristics as the
backing map.  In essence, this factory method provides a `Set`
implementation corresponding to any `Map` implementation.  There
is no need to use this method on a `Map` implementation that
already has a corresponding `Set` implementation (such as `HashMap` or `TreeMap`).

Each method invocation on the set returned by this method results in
exactly one method invocation on the backing map or its `keySet`
view, with one exception.  The `addAll` method is implemented
as a sequence of `put` invocations on the backing map.

The specified map must be empty at the time this method is invoked,
and should not be accessed directly after this method returns.  These
conditions are ensured if the map is created empty, passed directly
to this method, and no reference to the map is retained, as illustrated
in the following code fragment:

```java
   Set<Object> weakHashSet = Collections.newSetFromMap(
       new WeakHashMap<Object, Boolean>());
```

Parameters:

- `<E>`: the class of the map keys and of the objects in the returned set
- `map`: the backing map

**Returns:** the set backed by the map

**Since:** 1.6

Throws:

- `IllegalArgumentException`: if `map` is not empty

## Collections.newSequencedSetFromMap(SequencedMap<E, Boolean>)

```java
public static <E> SequencedSet<E> newSequencedSetFromMap(SequencedMap<E, Boolean> map)
```

Returns a sequenced set backed by the specified map.  The resulting set displays
the same ordering, concurrency, and performance characteristics as the
backing map. In essence, this factory method provides a `SequencedSet`
implementation corresponding to any `SequencedMap` implementation.

Each method invocation on the set returned by this method results in
exactly one method invocation on the backing map or its `keySet`
view, with one exception.  The `addAll` method is implemented
as a sequence of `put` invocations on the backing map.

The specified map must be empty at the time this method is invoked,
and should not be accessed directly after this method returns.  These
conditions are ensured if the map is created empty, passed directly
to this method, and no reference to the map is retained.

Parameters:

- `<E>`: the class of the map keys and of the objects in the returned set
- `map`: the backing map

**API note:** The following example code creates a `SequencedSet` from a
`LinkedHashMap`. This differs from a `LinkedHashSet`
in that the map's `removeEldestEntry` is overridden to provide
an eviction policy, which is not possible with a `LinkedHashSet`.

**Returns:** the set backed by the map

**Since:** 21

Throws:

- `IllegalArgumentException`: if `map` is not empty

## Collections.asLifoQueue(Deque<T>)

```java
public static <T> Queue<T> asLifoQueue(Deque<T> deque)
```

Returns a view of a `Deque` as a Last-in-first-out (Lifo)
`Queue`. Method `add` is mapped to `push`,
`remove` is mapped to `pop` and so on. This
view can be useful when you would like to use a method
requiring a `Queue` but you need Lifo ordering.

Each method invocation on the queue returned by this method
results in exactly one method invocation on the backing deque, with
one exception.  The addAll method is
implemented as a sequence of addFirst
invocations on the backing deque.

Parameters:

- `<T>`: the class of the objects in the deque
- `deque`: the deque

**API note:** This method provides a view that inverts the sense of certain operations,
but it doesn't reverse the encounter order. To obtain a reverse-ordered
view, use the Deque.reversed method.

**Returns:** the queue

**Since:** 1.6
