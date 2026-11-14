---
title: "ConcurrentHashMap class (java.util.concurrent) (part 4 of 4)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/concurrent/ConcurrentHashMap.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ConcurrentHashMap class (java.util.concurrent) (part 4 of 4)

## ConcurrentHashMap.reduceValuesToInt(long, ToIntFunction<? super V>, int, IntBinaryOperator)

```java
public int reduceValuesToInt(long parallelismThreshold, ToIntFunction<? super V> transformer, int basis, IntBinaryOperator reducer)
```

Returns the result of accumulating the given transformation
of all values using the given reducer to combine values,
and the given basis as an identity value.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `transformer`: a function returning the transformation for an element
- `basis`: the identity (initial default value) for the reduction
- `reducer`: a commutative associative combining function

**Returns:** the result of accumulating the given transformation
of all values

**Since:** 1.8

## ConcurrentHashMap.forEachEntry(long, Consumer<? super Map.Entry<K,V>>)

```java
public void forEachEntry(long parallelismThreshold, Consumer<? super Map.Entry<K,V>> action)
```

Performs the given action for each entry.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `action`: the action

**Since:** 1.8

## ConcurrentHashMap.forEachEntry(long, Function<Map.Entry<K,V>, ? extends U>, Consumer<? super U>)

```java
public <U> void forEachEntry(long parallelismThreshold, Function<Map.Entry<K,V>, ? extends U> transformer, Consumer<? super U> action)
```

Performs the given action for each non-null transformation
of each entry.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `transformer`: a function returning the transformation for an element, or null if there is no transformation (in which case the action is not applied)
- `action`: the action
- ``: the return type of the transformer

**Since:** 1.8

## ConcurrentHashMap.searchEntries(long, Function<Map.Entry<K,V>, ? extends U>)

```java
public <U> U searchEntries(long parallelismThreshold, Function<Map.Entry<K,V>, ? extends U> searchFunction)
```

Returns a non-null result from applying the given search
function on each entry, or null if none.  Upon success,
further element processing is suppressed and the results of
any other parallel invocations of the search function are
ignored.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `searchFunction`: a function returning a non-null result on success, else null
- ``: the return type of the search function

**Returns:** a non-null result from applying the given search
function on each entry, or null if none

**Since:** 1.8

## ConcurrentHashMap.reduceEntries(long, BiFunction<Map.Entry<K,V>, Map.Entry<K,V>, ? extends Map.Entry<K,V>>)

```java
public Map.Entry<K,V> reduceEntries(long parallelismThreshold, BiFunction<Map.Entry<K,V>, Map.Entry<K,V>, ? extends Map.Entry<K,V>> reducer)
```

Returns the result of accumulating all entries using the
given reducer to combine values, or null if none.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `reducer`: a commutative associative combining function

**Returns:** the result of accumulating all entries

**Since:** 1.8

## ConcurrentHashMap.reduceEntries(long, Function<Map.Entry<K,V>, ? extends U>, BiFunction<? super U, ? super U, ? extends U>)

```java
public <U> U reduceEntries(long parallelismThreshold, Function<Map.Entry<K,V>, ? extends U> transformer, BiFunction<? super U, ? super U, ? extends U> reducer)
```

Returns the result of accumulating the given transformation
of all entries using the given reducer to combine values,
or null if none.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `transformer`: a function returning the transformation for an element, or null if there is no transformation (in which case it is not combined)
- `reducer`: a commutative associative combining function
- ``: the return type of the transformer

**Returns:** the result of accumulating the given transformation
of all entries

**Since:** 1.8

## ConcurrentHashMap.reduceEntriesToDouble(long, ToDoubleFunction<Map.Entry<K,V>>, double, DoubleBinaryOperator)

```java
public double reduceEntriesToDouble(long parallelismThreshold, ToDoubleFunction<Map.Entry<K,V>> transformer, double basis, DoubleBinaryOperator reducer)
```

Returns the result of accumulating the given transformation
of all entries using the given reducer to combine values,
and the given basis as an identity value.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `transformer`: a function returning the transformation for an element
- `basis`: the identity (initial default value) for the reduction
- `reducer`: a commutative associative combining function

**Returns:** the result of accumulating the given transformation
of all entries

**Since:** 1.8

## ConcurrentHashMap.reduceEntriesToLong(long, ToLongFunction<Map.Entry<K,V>>, long, LongBinaryOperator)

```java
public long reduceEntriesToLong(long parallelismThreshold, ToLongFunction<Map.Entry<K,V>> transformer, long basis, LongBinaryOperator reducer)
```

Returns the result of accumulating the given transformation
of all entries using the given reducer to combine values,
and the given basis as an identity value.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `transformer`: a function returning the transformation for an element
- `basis`: the identity (initial default value) for the reduction
- `reducer`: a commutative associative combining function

**Returns:** the result of accumulating the given transformation
of all entries

**Since:** 1.8

## ConcurrentHashMap.reduceEntriesToInt(long, ToIntFunction<Map.Entry<K,V>>, int, IntBinaryOperator)

```java
public int reduceEntriesToInt(long parallelismThreshold, ToIntFunction<Map.Entry<K,V>> transformer, int basis, IntBinaryOperator reducer)
```

Returns the result of accumulating the given transformation
of all entries using the given reducer to combine values,
and the given basis as an identity value.

Parameters:

- `parallelismThreshold`: the (estimated) number of elements needed for this operation to be executed in parallel
- `transformer`: a function returning the transformation for an element
- `basis`: the identity (initial default value) for the reduction
- `reducer`: a commutative associative combining function

**Returns:** the result of accumulating the given transformation
of all entries

**Since:** 1.8

## ConcurrentHashMap.getMap()

```java
public ConcurrentHashMap<K,V> getMap()
```

Returns the map backing this view.

**Returns:** the map backing this view

## ConcurrentHashMap.clear()

```java
public final void clear()
```

Removes all of the elements from this view, by removing all
the mappings from the map backing this view.

## ConcurrentHashMap.iterator()

```java
public abstract Iterator<E> iterator()
```

Returns an iterator over the elements in this collection.

The returned iterator is
*weakly consistent*.

**Returns:** an iterator over the elements in this collection

## ConcurrentHashMap.toString()

```java
public final String toString()
```

Returns a string representation of this collection.
The string representation consists of the string representations
of the collection's elements in the order they are returned by
its iterator, enclosed in square brackets (`"[]"`).
Adjacent elements are separated by the characters `", "`
(comma and space).  Elements are converted to strings as by
`String.valueOf(Object)`.

**Returns:** a string representation of this collection

## ConcurrentHashMap.getMappedValue()

```java
public V getMappedValue()
```

Returns the default mapped value for additions,
or `null` if additions are not supported.

**Returns:** the default mapped value for additions, or `null`
if not supported

## ConcurrentHashMap.contains(Object)

```java
public boolean contains(Object o)
```

(inherited documentation)

Throws:

- `NullPointerException`: if the specified key is null

## ConcurrentHashMap.remove(Object)

```java
public boolean remove(Object o)
```

Removes the key from this map view, by removing the key (and its
corresponding value) from the backing map.  This method does
nothing if the key is not in the map.

Parameters:

- `o`: the key to be removed from the backing map

**Returns:** `true` if the backing map contained the specified key

Throws:

- `NullPointerException`: if the specified key is null

## ConcurrentHashMap.iterator()

```java
public Iterator<K> iterator()
```

**Returns:** an iterator over the keys of the backing map

## ConcurrentHashMap.add(K)

```java
public boolean add(K e)
```

Adds the specified key to this set view by mapping the key to
the default mapped value in the backing map, if defined.

Parameters:

- `e`: key to be added

**Returns:** `true` if this set changed as a result of the call

Throws:

- `NullPointerException`: if the specified key is null
- `UnsupportedOperationException`: if no default mapped value for additions was provided

## ConcurrentHashMap.addAll(Collection<? extends K>)

```java
public boolean addAll(Collection<? extends K> c)
```

Adds all of the elements in the specified collection to this set,
as if by calling `add` on each one.

Parameters:

- `c`: the elements to be inserted into this set

**Returns:** `true` if this set changed as a result of the call

Throws:

- `NullPointerException`: if the collection or any of its elements are `null`
- `UnsupportedOperationException`: if no default mapped value for additions was provided

## ConcurrentHashMap.iterator()

```java
public Iterator<Map.Entry<K,V>> iterator()
```

**Returns:** an iterator over the entries of the backing map
