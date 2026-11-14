---
title: "Collections class (java.util) (part 3 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Collections.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Collections class (java.util) (part 3 of 6)

## Collections.unmodifiableNavigableMap(NavigableMap<K, ? extends V>)

```java
public static <K,V> NavigableMap<K,V> unmodifiableNavigableMap(NavigableMap<K, ? extends V> m)
```

Returns an unmodifiable view of the
specified navigable map. Query operations on the returned navigable map "read
through" to the specified navigable map.  Attempts to modify the returned
navigable map, whether direct, via its collection views, or via its
`subMap`, `headMap`, or `tailMap` views, result in
an `UnsupportedOperationException`.

The returned navigable map will be serializable if the specified
navigable map is serializable.

Parameters:

- `<K>`: the class of the map keys
- `<V>`: the class of the map values
- `m`: the navigable map for which an unmodifiable view is to be returned

**Implementation note:** This method may return its argument if the argument is already unmodifiable.

**Returns:** an unmodifiable view of the specified navigable map

**Since:** 1.8

## Collections.synchronizedCollection(Collection<T>)

```java
public static <T> Collection<T> synchronizedCollection(Collection<T> c)
```

Returns a synchronized (thread-safe) collection backed by the specified
collection.  In order to guarantee serial access, it is critical that
**all** access to the backing collection is accomplished
through the returned collection.

It is imperative that the user manually synchronize on the returned
collection when traversing it via `Iterator`, `Spliterator`
or `Stream`:

```java
 Collection c = Collections.synchronizedCollection(myCollection);
    ...
 synchronized (c) {
     Iterator i = c.iterator(); // Must be in the synchronized block
     while (i.hasNext())
        foo(i.next());
```

Failure to follow this advice may result in non-deterministic behavior.

The returned collection does *not* pass the `hashCode`
and `equals` operations through to the backing collection, but
relies on `Object`'s equals and hashCode methods.  This is
necessary to preserve the contracts of these operations in the case
that the backing collection is a set or a list.

The returned collection will be serializable if the specified collection
is serializable.

Parameters:

- `<T>`: the class of the objects in the collection
- `c`: the collection to be "wrapped" in a synchronized collection.

**Returns:** a synchronized view of the specified collection.

## Collections.synchronizedSet(Set<T>)

```java
public static <T> Set<T> synchronizedSet(Set<T> s)
```

Returns a synchronized (thread-safe) set backed by the specified
set.  In order to guarantee serial access, it is critical that
**all** access to the backing set is accomplished
through the returned set.

It is imperative that the user manually synchronize on the returned
collection when traversing it via `Iterator`, `Spliterator`
or `Stream`:

```java
 Set s = Collections.synchronizedSet(new HashSet());
     ...
 synchronized (s) {
     Iterator i = s.iterator(); // Must be in the synchronized block
     while (i.hasNext())
         foo(i.next());
```

Failure to follow this advice may result in non-deterministic behavior.

The returned set will be serializable if the specified set is
serializable.

Parameters:

- `<T>`: the class of the objects in the set
- `s`: the set to be "wrapped" in a synchronized set.

**Returns:** a synchronized view of the specified set.

## Collections.synchronizedSortedSet(SortedSet<T>)

```java
public static <T> SortedSet<T> synchronizedSortedSet(SortedSet<T> s)
```

Returns a synchronized (thread-safe) sorted set backed by the specified
sorted set.  In order to guarantee serial access, it is critical that
**all** access to the backing sorted set is accomplished
through the returned sorted set (or its views).

It is imperative that the user manually synchronize on the returned
sorted set when traversing it or any of its `subSet`,
`headSet`, or `tailSet` views via `Iterator`,
`Spliterator` or `Stream`:

```java
 SortedSet s = Collections.synchronizedSortedSet(new TreeSet());
     ...
 synchronized (s) {
     Iterator i = s.iterator(); // Must be in the synchronized block
     while (i.hasNext())
         foo(i.next());
```

or:

```java
 SortedSet s = Collections.synchronizedSortedSet(new TreeSet());
 SortedSet s2 = s.headSet(foo);
     ...
 synchronized (s) {  // Note: s, not s2!!!
     Iterator i = s2.iterator(); // Must be in the synchronized block
     while (i.hasNext())
         foo(i.next());
```

Failure to follow this advice may result in non-deterministic behavior.

The returned sorted set will be serializable if the specified
sorted set is serializable.

Parameters:

- `<T>`: the class of the objects in the set
- `s`: the sorted set to be "wrapped" in a synchronized sorted set.

**Returns:** a synchronized view of the specified sorted set.

## Collections.synchronizedNavigableSet(NavigableSet<T>)

```java
public static <T> NavigableSet<T> synchronizedNavigableSet(NavigableSet<T> s)
```

Returns a synchronized (thread-safe) navigable set backed by the
specified navigable set.  In order to guarantee serial access, it is
critical that **all** access to the backing navigable set is
accomplished through the returned navigable set (or its views).

It is imperative that the user manually synchronize on the returned
navigable set when traversing it, or any of its `subSet`,
`headSet`, or `tailSet` views, via `Iterator`,
`Spliterator` or `Stream`:

```java
 NavigableSet s = Collections.synchronizedNavigableSet(new TreeSet());
     ...
 synchronized (s) {
     Iterator i = s.iterator(); // Must be in the synchronized block
     while (i.hasNext())
         foo(i.next());
```

or:

```java
 NavigableSet s = Collections.synchronizedNavigableSet(new TreeSet());
 NavigableSet s2 = s.headSet(foo, true);
     ...
 synchronized (s) {  // Note: s, not s2!!!
     Iterator i = s2.iterator(); // Must be in the synchronized block
     while (i.hasNext())
         foo(i.next());
```

Failure to follow this advice may result in non-deterministic behavior.

The returned navigable set will be serializable if the specified
navigable set is serializable.

Parameters:

- `<T>`: the class of the objects in the set
- `s`: the navigable set to be "wrapped" in a synchronized navigable set

**Returns:** a synchronized view of the specified navigable set

**Since:** 1.8

## Collections.synchronizedList(List<T>)

```java
public static <T> List<T> synchronizedList(List<T> list)
```

Returns a synchronized (thread-safe) list backed by the specified
list.  In order to guarantee serial access, it is critical that
**all** access to the backing list is accomplished
through the returned list.

It is imperative that the user manually synchronize on the returned
list when traversing it via `Iterator`, `Spliterator`
or `Stream`:

```java
 List list = Collections.synchronizedList(new ArrayList());
     ...
 synchronized (list) {
     Iterator i = list.iterator(); // Must be in synchronized block
     while (i.hasNext())
         foo(i.next());
```

Failure to follow this advice may result in non-deterministic behavior.

The returned list will be serializable if the specified list is
serializable.

Parameters:

- `<T>`: the class of the objects in the list
- `list`: the list to be "wrapped" in a synchronized list.

**Returns:** a synchronized view of the specified list.

## Collections.reversed()

```java
public List<E> reversed()
```

Reversed view handling. The reversedView field is transient
and is initialized to null upon construction of the wrapper
and upon deserialization. Reversed views are not serializable.
The reversed view is created on first call to the reversed()
method.

There are four objects at play here:

L = original list
Lr = reversed view of original list
S = synchronized forward wrapper: its backing list is L
Sr = synchronized reversed wrapper: its backing list is Lr

The reversedView field of S points to Sr and vice versa.
This enables the reversed() method always to return the same
object, and for S.reversed().reversed() to return S. This isn't
strictly necessary, because all internal locking is done on S
(which is passed around as mutex). But in the case where the
client does external locking, it's good to minimize the number
of different instances. Note however that external locking on
the reversed wrapper Sr can't be made to work properly with
internal or external locking on the forward wrapper S. (Sublists
of a synchronized wrapper, reversed or not, have the same issue.)

An alternative would be to have a ReversedSynchronizedList view class. However,
that would require two extra classes (one RandomAccess and one not) and it would
complicate the serialization story.

## Collections.synchronizedMap(Map<K,V>)

```java
public static <K,V> Map<K,V> synchronizedMap(Map<K,V> m)
```

Returns a synchronized (thread-safe) map backed by the specified
map.  In order to guarantee serial access, it is critical that
**all** access to the backing map is accomplished
through the returned map.

It is imperative that the user manually synchronize on the returned
map when traversing any of its collection views via `Iterator`,
`Spliterator` or `Stream`:

```java
 Map m = Collections.synchronizedMap(new HashMap());
     ...
 Set s = m.keySet();  // Needn't be in synchronized block
     ...
 synchronized (m) {  // Synchronizing on m, not s!
     Iterator i = s.iterator(); // Must be in synchronized block
     while (i.hasNext())
         foo(i.next());
```

Failure to follow this advice may result in non-deterministic behavior.

The returned map will be serializable if the specified map is
serializable.

Parameters:

- `<K>`: the class of the map keys
- `<V>`: the class of the map values
- `m`: the map to be "wrapped" in a synchronized map.

**Returns:** a synchronized view of the specified map.

## Collections.synchronizedSortedMap(SortedMap<K,V>)

```java
public static <K,V> SortedMap<K,V> synchronizedSortedMap(SortedMap<K,V> m)
```

Returns a synchronized (thread-safe) sorted map backed by the specified
sorted map.  In order to guarantee serial access, it is critical that
**all** access to the backing sorted map is accomplished
through the returned sorted map (or its views).

It is imperative that the user manually synchronize on the returned
sorted map when traversing any of its collection views, or the
collections views of any of its `subMap`, `headMap` or
`tailMap` views, via `Iterator`, `Spliterator` or
`Stream`:

```java
 SortedMap m = Collections.synchronizedSortedMap(new TreeMap());
     ...
 Set s = m.keySet();  // Needn't be in synchronized block
     ...
 synchronized (m) {  // Synchronizing on m, not s!
     Iterator i = s.iterator(); // Must be in synchronized block
     while (i.hasNext())
         foo(i.next());
```

or:

```java
 SortedMap m = Collections.synchronizedSortedMap(new TreeMap());
 SortedMap m2 = m.subMap(foo, bar);
     ...
 Set s2 = m2.keySet();  // Needn't be in synchronized block
     ...
 synchronized (m) {  // Synchronizing on m, not m2 or s2!
     Iterator i = s2.iterator(); // Must be in synchronized block
     while (i.hasNext())
         foo(i.next());
```

Failure to follow this advice may result in non-deterministic behavior.

The returned sorted map will be serializable if the specified
sorted map is serializable.

Parameters:

- `<K>`: the class of the map keys
- `<V>`: the class of the map values
- `m`: the sorted map to be "wrapped" in a synchronized sorted map.

**Returns:** a synchronized view of the specified sorted map.

## Collections.synchronizedNavigableMap(NavigableMap<K,V>)

```java
public static <K,V> NavigableMap<K,V> synchronizedNavigableMap(NavigableMap<K,V> m)
```

Returns a synchronized (thread-safe) navigable map backed by the
specified navigable map.  In order to guarantee serial access, it is
critical that **all** access to the backing navigable map is
accomplished through the returned navigable map (or its views).

It is imperative that the user manually synchronize on the returned
navigable map when traversing any of its collection views, or the
collections views of any of its `subMap`, `headMap` or
`tailMap` views, via `Iterator`, `Spliterator` or
`Stream`:

```java
 NavigableMap m = Collections.synchronizedNavigableMap(new TreeMap());
     ...
 Set s = m.keySet();  // Needn't be in synchronized block
     ...
 synchronized (m) {  // Synchronizing on m, not s!
     Iterator i = s.iterator(); // Must be in synchronized block
     while (i.hasNext())
         foo(i.next());
```

or:

```java
 NavigableMap m = Collections.synchronizedNavigableMap(new TreeMap());
 NavigableMap m2 = m.subMap(foo, true, bar, false);
     ...
 Set s2 = m2.keySet();  // Needn't be in synchronized block
     ...
 synchronized (m) {  // Synchronizing on m, not m2 or s2!
     Iterator i = s2.iterator(); // Must be in synchronized block
     while (i.hasNext())
         foo(i.next());
```

Failure to follow this advice may result in non-deterministic behavior.

The returned navigable map will be serializable if the specified
navigable map is serializable.

Parameters:

- `<K>`: the class of the map keys
- `<V>`: the class of the map values
- `m`: the navigable map to be "wrapped" in a synchronized navigable map

**Returns:** a synchronized view of the specified navigable map.

**Since:** 1.8
