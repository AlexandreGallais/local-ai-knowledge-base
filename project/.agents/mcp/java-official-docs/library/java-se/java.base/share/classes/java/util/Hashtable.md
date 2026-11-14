# Hashtable class (java.util)

```java
public class Hashtable<K,V> extends Dictionary<K,V> implements Map<K,V>, Cloneable, java.io.Serializable
```

This class implements a hash table, which maps keys to values. Any
non-{@code null} object can be used as a key or as a value. <p>

To successfully store and retrieve objects from a hashtable, the
objects used as keys must implement the {@code hashCode}
method and the {@code equals} method. <p>

An instance of {@code Hashtable} has two parameters that affect its
performance: <i>initial capacity</i> and <i>load factor</i>.  The
<i>capacity</i> is the number of <i>buckets</i> in the hash table, and the
<i>initial capacity</i> is simply the capacity at the time the hash table
is created.  Note that the hash table is <i>open</i>: in the case of a "hash
collision", a single bucket stores multiple entries, which must be searched
sequentially.  The <i>load factor</i> is a measure of how full the hash
table is allowed to get before its capacity is automatically increased.
The initial capacity and load factor parameters are merely hints to
the implementation.  The exact details as to when and whether the rehash
method is invoked are implementation-dependent.<p>

Generally, the default load factor (.75) offers a good tradeoff between
time and space costs.  Higher values decrease the space overhead but
increase the time cost to look up an entry (which is reflected in most
{@code Hashtable} operations, including {@code get} and {@code put}).<p>

The initial capacity controls a tradeoff between wasted space and the
need for {@code rehash} operations, which are time-consuming.
No {@code rehash} operations will <i>ever</i> occur if the initial
capacity is greater than the maximum number of entries the
{@code Hashtable} will contain divided by its load factor.  However,
setting the initial capacity too high can waste space.<p>

If many entries are to be made into a {@code Hashtable},
creating it with a sufficiently large capacity may allow the
entries to be inserted more efficiently than letting it perform
automatic rehashing as needed to grow the table. <p>

This example creates a hashtable of numbers. It uses the names of
the numbers as keys:
<pre>   {@code
  Hashtable<String, Integer> numbers
    = new Hashtable<String, Integer>();
  numbers.put("one", 1);
  numbers.put("two", 2);
  numbers.put("three", 3);}</pre>

<p>To retrieve a number, use the following code:
<pre>   {@code
  Integer n = numbers.get("two");
  if (n != null) {
    System.out.println("two = " + n);
  }}</pre>

<p>The iterators returned by the {@code iterator} method of the collections
returned by all of this class's "collection view methods" are
<em>fail-fast</em>: if the Hashtable is structurally modified at any time
after the iterator is created, in any way except through the iterator's own
{@code remove} method, the iterator will throw a {@link
ConcurrentModificationException}.  Thus, in the face of concurrent
modification, the iterator fails quickly and cleanly, rather than risking
arbitrary, non-deterministic behavior at an undetermined time in the future.
The Enumerations returned by Hashtable's {@link #keys keys} and
{@link #elements elements} methods are <em>not</em> fail-fast; if the
Hashtable is structurally modified at any time after the enumeration is
created then the results of enumerating are undefined.

<p>Note that the fail-fast behavior of an iterator cannot be guaranteed
as it is, generally speaking, impossible to make any hard guarantees in the
presence of unsynchronized concurrent modification.  Fail-fast iterators
throw {@code ConcurrentModificationException} on a best-effort basis.
Therefore, it would be wrong to write a program that depended on this
exception for its correctness: <i>the fail-fast behavior of iterators
should be used only to detect bugs.</i>

<p>As of the Java 2 platform v1.2, this class was retrofitted to
implement the {@link Map} interface, making it a member of the
<a href="{@docRoot}/java.base/java/util/package-summary.html#CollectionsFramework">

Java Collections Framework</a>.  Unlike the new collection
implementations, {@code Hashtable} is synchronized.  If a
thread-safe implementation is not needed, it is recommended to use
{@link HashMap} in place of {@code Hashtable}.  If a thread-safe
highly-concurrent implementation is desired, then it is recommended
to use {@link java.util.concurrent.ConcurrentHashMap} in place of
{@code Hashtable}.

@param <K> the type of keys maintained by this map
@param <V> the type of mapped values

@author  Arthur van Hoff
@author  Josh Bloch
@author  Neal Gafter
@see     Object#equals(java.lang.Object)
@see     Object#hashCode()
@see     Hashtable#rehash()
@see     Collection
@see     Map
@see     HashMap
@see     TreeMap
@since 1.0

## Hashtable.Hashtable(int, float)

```java
public Hashtable(int initialCapacity, float loadFactor)
```

Constructs a new, empty hashtable with the specified initial
capacity and the specified load factor.

@param      initialCapacity   the initial capacity of the hashtable.
@param      loadFactor        the load factor of the hashtable.
@throws     IllegalArgumentException  if the initial capacity is less
            than zero, or if the load factor is nonpositive.

## Hashtable.Hashtable(int)

```java
public Hashtable(int initialCapacity)
```

Constructs a new, empty hashtable with the specified initial capacity
and default load factor (0.75).

@param     initialCapacity   the initial capacity of the hashtable.
@throws    IllegalArgumentException if the initial capacity is less
             than zero.

## Hashtable.Hashtable()

```java
public Hashtable()
```

Constructs a new, empty hashtable with a default initial capacity (11)
and load factor (0.75).

## Hashtable.Hashtable(Map<? extends K, ? extends V>)

```java
public Hashtable(Map<? extends K, ? extends V> t)
```

Constructs a new hashtable with the same mappings as the given
Map.  The hashtable is created with an initial capacity sufficient to
hold the mappings in the given Map and a default load factor (0.75).

@param t the map whose mappings are to be placed in this map.
@throws NullPointerException if the specified map is null.
@since   1.2

## Hashtable.size()

```java
public synchronized int size()
```

Returns the number of keys in this hashtable.

@return  the number of keys in this hashtable.

## Hashtable.isEmpty()

```java
public synchronized boolean isEmpty()
```

Tests if this hashtable maps no keys to values.

@return  {@code true} if this hashtable maps no keys to values;
         {@code false} otherwise.

## Hashtable.keys()

```java
public synchronized Enumeration<K> keys()
```

Returns an enumeration of the keys in this hashtable.
Use the Enumeration methods on the returned object to fetch the keys
sequentially. If the hashtable is structurally modified while enumerating
over the keys then the results of enumerating are undefined.

@return  an enumeration of the keys in this hashtable.
@see     Enumeration
@see     #elements()
@see     #keySet()
@see     Map

## Hashtable.elements()

```java
public synchronized Enumeration<V> elements()
```

Returns an enumeration of the values in this hashtable.
Use the Enumeration methods on the returned object to fetch the elements
sequentially. If the hashtable is structurally modified while enumerating
over the values then the results of enumerating are undefined.

@return  an enumeration of the values in this hashtable.
@see     java.util.Enumeration
@see     #keys()
@see     #values()
@see     Map

## Hashtable.contains(Object)

```java
public synchronized boolean contains(Object value)
```

Tests if some key maps into the specified value in this hashtable.
This operation is more expensive than the {@link #containsKey
containsKey} method.

<p>Note that this method is identical in functionality to
{@link #containsValue containsValue}, (which is part of the
{@link Map} interface in the collections framework).

@param      value   a value to search for
@return     {@code true} if and only if some key maps to the
            {@code value} argument in this hashtable as
            determined by the {@code equals} method;
            {@code false} otherwise.
@throws     NullPointerException  if the value is {@code null}

## Hashtable.containsValue(Object)

```java
public boolean containsValue(Object value)
```

Returns true if this hashtable maps one or more keys to this value.

<p>Note that this method is identical in functionality to {@link
#contains contains} (which predates the {@link Map} interface).

@param value value whose presence in this hashtable is to be tested
@return {@code true} if this map maps one or more keys to the
        specified value
@throws NullPointerException  if the value is {@code null}
@since 1.2

## Hashtable.containsKey(Object)

```java
public synchronized boolean containsKey(Object key)
```

Tests if the specified object is a key in this hashtable.

@param   key   possible key
@return  {@code true} if and only if the specified object
         is a key in this hashtable, as determined by the
         {@code equals} method; {@code false} otherwise.
@throws  NullPointerException  if the key is {@code null}
@see     #contains(Object)

## Hashtable.get(Object)

```java
public synchronized V get(Object key)
```

Returns the value to which the specified key is mapped,
or {@code null} if this map contains no mapping for the key.

<p>More formally, if this map contains a mapping from a key
{@code k} to a value {@code v} such that {@code (key.equals(k))},
then this method returns {@code v}; otherwise it returns
{@code null}.  (There can be at most one such mapping.)

@param key the key whose associated value is to be returned
@return the value to which the specified key is mapped, or
        {@code null} if this map contains no mapping for the key
@throws NullPointerException if the specified key is null
@see     #put(Object, Object)

## Hashtable.rehash()

```java
protected void rehash()
```

Increases the capacity of and internally reorganizes this
hashtable, in order to accommodate and access its entries more
efficiently.  This method is called automatically when the
number of keys in the hashtable exceeds this hashtable's capacity
and load factor.

## Hashtable.put(K, V)

```java
public synchronized V put(K key, V value)
```

Maps the specified {@code key} to the specified
{@code value} in this hashtable. Neither the key nor the
value can be {@code null}. <p>

The value can be retrieved by calling the {@code get} method
with a key that is equal to the original key.

@param      key     the hashtable key
@param      value   the value
@return     the previous value of the specified key in this hashtable,
            or {@code null} if it did not have one
@throws     NullPointerException  if the key or value is
              {@code null}
@see     Object#equals(Object)
@see     #get(Object)

## Hashtable.remove(Object)

```java
public synchronized V remove(Object key)
```

Removes the key (and its corresponding value) from this
hashtable. This method does nothing if the key is not in the hashtable.

@param   key   the key that needs to be removed
@return  the value to which the key had been mapped in this hashtable,
         or {@code null} if the key did not have a mapping
@throws  NullPointerException  if the key is {@code null}

## Hashtable.putAll(Map<? extends K, ? extends V>)

```java
public synchronized void putAll(Map<? extends K, ? extends V> t)
```

Copies all of the mappings from the specified map to this hashtable.
These mappings will replace any mappings that this hashtable had for any
of the keys currently in the specified map.

@param t mappings to be stored in this map
@throws NullPointerException if the specified map is null
@since 1.2

## Hashtable.clear()

```java
public synchronized void clear()
```

Clears this hashtable so that it contains no keys.

## Hashtable.clone()

```java
public synchronized Object clone()
```

Creates a shallow copy of this hashtable. All the structure of the
hashtable itself is copied, but the keys and values are not cloned.
This is a relatively expensive operation.

@return  a clone of the hashtable

## Hashtable.toString()

```java
public synchronized String toString()
```

Returns a string representation of this {@code Hashtable} object
in the form of a set of entries, enclosed in braces and separated
by the ASCII characters "<code> ,&nbsp;</code>" (comma and space). Each
entry is rendered as the key, an equals sign {@code =}, and the
associated element, where the {@code toString} method is used to
convert the key and element to strings.

@return  a string representation of this hashtable

## Hashtable.keySet()

```java
public Set<K> keySet()
```

Returns a {@link Set} view of the keys contained in this map.
The set is backed by the map, so changes to the map are
reflected in the set, and vice-versa.  If the map is modified
while an iteration over the set is in progress (except through
the iterator's own {@code remove} operation), the results of
the iteration are undefined.  The set supports element removal,
which removes the corresponding mapping from the map, via the
{@code Iterator.remove}, {@code Set.remove},
{@code removeAll}, {@code retainAll}, and {@code clear}
operations.  It does not support the {@code add} or {@code addAll}
operations.

@since 1.2

## Hashtable.entrySet()

```java
public Set<Map.Entry<K,V>> entrySet()
```

Returns a {@link Set} view of the mappings contained in this map.
The set is backed by the map, so changes to the map are
reflected in the set, and vice-versa.  If the map is modified
while an iteration over the set is in progress (except through
the iterator's own {@code remove} operation, or through the
{@code setValue} operation on a map entry returned by the
iterator) the results of the iteration are undefined.  The set
supports element removal, which removes the corresponding
mapping from the map, via the {@code Iterator.remove},
{@code Set.remove}, {@code removeAll}, {@code retainAll} and
{@code clear} operations.  It does not support the
{@code add} or {@code addAll} operations.

@since 1.2

## Hashtable.values()

```java
public Collection<V> values()
```

Returns a {@link Collection} view of the values contained in this map.
The collection is backed by the map, so changes to the map are
reflected in the collection, and vice-versa.  If the map is
modified while an iteration over the collection is in progress
(except through the iterator's own {@code remove} operation),
the results of the iteration are undefined.  The collection
supports element removal, which removes the corresponding
mapping from the map, via the {@code Iterator.remove},
{@code Collection.remove}, {@code removeAll},
{@code retainAll} and {@code clear} operations.  It does not
support the {@code add} or {@code addAll} operations.

@since 1.2

## Hashtable.equals(Object)

```java
public synchronized boolean equals(Object o)
```

Compares the specified Object with this Map for equality,
as per the definition in the Map interface.

@param  o object to be compared for equality with this hashtable
@return true if the specified Object is equal to this Map
@see Map#equals(Object)
@since 1.2

## Hashtable.hashCode()

```java
public synchronized int hashCode()
```

Returns the hash code value for this Map as per the definition in the
Map interface.

@see Map#hashCode()
@since 1.2

## Hashtable.computeIfAbsent(K, Function<? super K, ? extends V>)

```java
public synchronized V computeIfAbsent(K key, Function<? super K, ? extends V> mappingFunction)
```

{@inheritDoc}

<p>This method will, on a best-effort basis, throw a
{@link java.util.ConcurrentModificationException} if the mapping
function modified this map during computation.

@throws ConcurrentModificationException if it is detected that the
mapping function modified this map

## Hashtable.computeIfPresent(K, BiFunction<? super K, ? super V, ? extends V>)

```java
public synchronized V computeIfPresent(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction)
```

{@inheritDoc}

<p>This method will, on a best-effort basis, throw a
{@link java.util.ConcurrentModificationException} if the remapping
function modified this map during computation.

@throws ConcurrentModificationException if it is detected that the
remapping function modified this map

## Hashtable.compute(K, BiFunction<? super K, ? super V, ? extends V>)

```java
public synchronized V compute(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction)
```

{@inheritDoc}

<p>This method will, on a best-effort basis, throw a
{@link java.util.ConcurrentModificationException} if the remapping
function modified this map during computation.

@throws ConcurrentModificationException if it is detected that the
remapping function modified this map

## Hashtable.merge(K, V, BiFunction<? super V, ? super V, ? extends V>)

```java
public synchronized V merge(K key, V value, BiFunction<? super V, ? super V, ? extends V> remappingFunction)
```

{@inheritDoc}

<p>This method will, on a best-effort basis, throw a
{@link java.util.ConcurrentModificationException} if the remapping
function modified this map during computation.

@throws ConcurrentModificationException if it is detected that the
remapping function modified this map

## Hashtable.expectedModCount

```java
protected int expectedModCount
```

The modCount value that the iterator believes that the backing
Hashtable should have.  If this expectation is violated, the iterator
has detected concurrent modification.