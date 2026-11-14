# ConcurrentSkipListMap class (java.util.concurrent)

```java
public class ConcurrentSkipListMap<K,V> extends AbstractMap<K,V> implements ConcurrentNavigableMap<K,V>, Cloneable, Serializable
```

A scalable concurrent {@link ConcurrentNavigableMap} implementation.
The map is sorted according to the {@linkplain Comparable natural
ordering} of its keys, or by a {@link Comparator} provided at map
creation time, depending on which constructor is used.

<p>This class implements a concurrent variant of <a
href="http://en.wikipedia.org/wiki/Skip_list" target="_top">SkipLists</a>
providing expected average <i>log(n)</i> time cost for the
{@code containsKey}, {@code get}, {@code put} and
{@code remove} operations and their variants.  Insertion, removal,
update, and access operations safely execute concurrently by
multiple threads.

<p>Iterators and spliterators are
<a href="package-summary.html#Weakly"><i>weakly consistent</i></a>.

<p>Ascending key ordered views and their iterators are faster than
descending ones.

<p>All {@code Map.Entry} pairs returned by methods in this class
and its views represent snapshots of mappings at the time they were
produced. They do <em>not</em> support the {@code Entry.setValue}
method. (Note however that it is possible to change mappings in the
associated map using {@code put}, {@code putIfAbsent}, or
{@code replace}, depending on exactly which effect you need.)

<p>Beware that bulk operations {@code putAll}, {@code equals},
{@code toArray}, {@code containsValue}, and {@code clear} are
<em>not</em> guaranteed to be performed atomically. For example, an
iterator operating concurrently with a {@code putAll} operation
might view only some of the added elements.

<p>This class and its views and iterators implement all of the
<em>optional</em> methods of the {@link Map} and {@link Iterator}
interfaces. Like most other concurrent collections, this class does
<em>not</em> permit the use of {@code null} keys or values because some
null return values cannot be reliably distinguished from the absence of
elements.

<p>This class is a member of the
<a href="{@docRoot}/java.base/java/util/package-summary.html#CollectionsFramework">
Java Collections Framework</a>.

@author Doug Lea
@param <K> the type of keys maintained by this map
@param <V> the type of mapped values
@since 1.6

## ConcurrentSkipListMap.ConcurrentSkipListMap()

```java
public ConcurrentSkipListMap()
```

Constructs a new, empty map, sorted according to the
{@linkplain Comparable natural ordering} of the keys.

## ConcurrentSkipListMap.ConcurrentSkipListMap(Comparator<? super K>)

```java
public ConcurrentSkipListMap(Comparator<? super K> comparator)
```

Constructs a new, empty map, sorted according to the specified
comparator.

@param comparator the comparator that will be used to order this map.
       If {@code null}, the {@linkplain Comparable natural
       ordering} of the keys will be used.

## ConcurrentSkipListMap.ConcurrentSkipListMap(Map<? extends K, ? extends V>)

```java
public ConcurrentSkipListMap(Map<? extends K, ? extends V> m)
```

Constructs a new map containing the same mappings as the given map,
sorted according to the {@linkplain Comparable natural ordering} of
the keys.

@param  m the map whose mappings are to be placed in this map
@throws ClassCastException if the keys in {@code m} are not
        {@link Comparable}, or are not mutually comparable
@throws NullPointerException if the specified map or any of its keys
        or values are null

## ConcurrentSkipListMap.ConcurrentSkipListMap(SortedMap<K, ? extends V>)

```java
public ConcurrentSkipListMap(SortedMap<K, ? extends V> m)
```

Constructs a new map containing the same mappings and using the
same ordering as the specified sorted map.

@param m the sorted map whose mappings are to be placed in this
       map, and whose comparator is to be used to sort this map
@throws NullPointerException if the specified sorted map or any of
        its keys or values are null

## ConcurrentSkipListMap.clone()

```java
public ConcurrentSkipListMap<K,V> clone()
```

Returns a shallow copy of this {@code ConcurrentSkipListMap}
instance. (The keys and values themselves are not cloned.)

@return a shallow copy of this map

## ConcurrentSkipListMap.containsKey(Object)

```java
public boolean containsKey(Object key)
```

Returns {@code true} if this map contains a mapping for the specified
key.

@param key key whose presence in this map is to be tested
@return {@code true} if this map contains a mapping for the specified key
@throws ClassCastException if the specified key cannot be compared
        with the keys currently in the map
@throws NullPointerException if the specified key is null

## ConcurrentSkipListMap.get(Object)

```java
public V get(Object key)
```

Returns the value to which the specified key is mapped,
or {@code null} if this map contains no mapping for the key.

<p>More formally, if this map contains a mapping from a key
{@code k} to a value {@code v} such that {@code key} compares
equal to {@code k} according to the map's ordering, then this
method returns {@code v}; otherwise it returns {@code null}.
(There can be at most one such mapping.)

@throws ClassCastException if the specified key cannot be compared
        with the keys currently in the map
@throws NullPointerException if the specified key is null

## ConcurrentSkipListMap.getOrDefault(Object, V)

```java
public V getOrDefault(Object key, V defaultValue)
```

Returns the value to which the specified key is mapped,
or the given defaultValue if this map contains no mapping for the key.

@param key the key
@param defaultValue the value to return if this map contains
no mapping for the given key
@return the mapping for the key, if present; else the defaultValue
@throws NullPointerException if the specified key is null
@since 1.8

## ConcurrentSkipListMap.put(K, V)

```java
public V put(K key, V value)
```

Associates the specified value with the specified key in this map.
If the map previously contained a mapping for the key, the old
value is replaced.

@param key key with which the specified value is to be associated
@param value value to be associated with the specified key
@return the previous value associated with the specified key, or
        {@code null} if there was no mapping for the key
@throws ClassCastException if the specified key cannot be compared
        with the keys currently in the map
@throws NullPointerException if the specified key or value is null

## ConcurrentSkipListMap.remove(Object)

```java
public V remove(Object key)
```

Removes the mapping for the specified key from this map if present.

@param  key key for which mapping should be removed
@return the previous value associated with the specified key, or
        {@code null} if there was no mapping for the key
@throws ClassCastException if the specified key cannot be compared
        with the keys currently in the map
@throws NullPointerException if the specified key is null

## ConcurrentSkipListMap.containsValue(Object)

```java
public boolean containsValue(Object value)
```

Returns {@code true} if this map maps one or more keys to the
specified value.  This operation requires time linear in the
map size. Additionally, it is possible for the map to change
during execution of this method, in which case the returned
result may be inaccurate.

@param value value whose presence in this map is to be tested
@return {@code true} if a mapping to {@code value} exists;
        {@code false} otherwise
@throws NullPointerException if the specified value is null

## ConcurrentSkipListMap.size()

```java
public int size()
```

{@inheritDoc}

## ConcurrentSkipListMap.isEmpty()

```java
public boolean isEmpty()
```

{@inheritDoc}

## ConcurrentSkipListMap.clear()

```java
public void clear()
```

Removes all of the mappings from this map.

## ConcurrentSkipListMap.computeIfAbsent(K, Function<? super K, ? extends V>)

```java
public V computeIfAbsent(K key, Function<? super K, ? extends V> mappingFunction)
```

If the specified key is not already associated with a value,
attempts to compute its value using the given mapping function
and enters it into this map unless {@code null}.  The function
is <em>NOT</em> guaranteed to be applied once atomically only
if the value is not present.

@param key key with which the specified value is to be associated
@param mappingFunction the function to compute a value
@return the current (existing or computed) value associated with
        the specified key, or null if the computed value is null
@throws NullPointerException if the specified key is null
        or the mappingFunction is null
@since 1.8

## ConcurrentSkipListMap.computeIfPresent(K, BiFunction<? super K, ? super V, ? extends V>)

```java
public V computeIfPresent(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction)
```

If the value for the specified key is present, attempts to
compute a new mapping given the key and its current mapped
value. The function is <em>NOT</em> guaranteed to be applied
once atomically.

@param key key with which a value may be associated
@param remappingFunction the function to compute a value
@return the new value associated with the specified key, or null if none
@throws NullPointerException if the specified key is null
        or the remappingFunction is null
@since 1.8

## ConcurrentSkipListMap.compute(K, BiFunction<? super K, ? super V, ? extends V>)

```java
public V compute(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction)
```

Attempts to compute a mapping for the specified key and its
current mapped value (or {@code null} if there is no current
mapping). The function is <em>NOT</em> guaranteed to be applied
once atomically.

@param key key with which the specified value is to be associated
@param remappingFunction the function to compute a value
@return the new value associated with the specified key, or null if none
@throws NullPointerException if the specified key is null
        or the remappingFunction is null
@since 1.8

## ConcurrentSkipListMap.merge(K, V, BiFunction<? super V, ? super V, ? extends V>)

```java
public V merge(K key, V value, BiFunction<? super V, ? super V, ? extends V> remappingFunction)
```

If the specified key is not already associated with a value,
associates it with the given value.  Otherwise, replaces the
value with the results of the given remapping function, or
removes if {@code null}. The function is <em>NOT</em>
guaranteed to be applied once atomically.

@param key key with which the specified value is to be associated
@param value the value to use if absent
@param remappingFunction the function to recompute a value if present
@return the new value associated with the specified key, or null if none
@throws NullPointerException if the specified key or value is null
        or the remappingFunction is null
@since 1.8

## ConcurrentSkipListMap.keySet()

```java
public NavigableSet<K> keySet()
```

Returns a {@link NavigableSet} view of the keys contained in this map.

<p>The set's iterator returns the keys in ascending order.
The set's spliterator additionally reports {@link Spliterator#CONCURRENT},
{@link Spliterator#NONNULL}, {@link Spliterator#SORTED} and
{@link Spliterator#ORDERED}, with an encounter order that is ascending
key order.

<p>The {@linkplain Spliterator#getComparator() spliterator's comparator}
is {@code null} if the {@linkplain #comparator() map's comparator}
is {@code null}.
Otherwise, the spliterator's comparator is the same as or imposes the
same total ordering as the map's comparator.

<p>The set is backed by the map, so changes to the map are
reflected in the set, and vice-versa.  The set supports element
removal, which removes the corresponding mapping from the map,
via the {@code Iterator.remove}, {@code Set.remove},
{@code removeAll}, {@code retainAll}, and {@code clear}
operations.  It does not support the {@code add} or {@code addAll}
operations.

<p>The view's iterators and spliterators are
<a href="package-summary.html#Weakly"><i>weakly consistent</i></a>.

<p>This method is equivalent to method {@code navigableKeySet}.

@return a navigable set view of the keys in this map

## ConcurrentSkipListMap.values()

```java
public Collection<V> values()
```

Returns a {@link Collection} view of the values contained in this map.
<p>The collection's iterator returns the values in ascending order
of the corresponding keys. The collections's spliterator additionally
reports {@link Spliterator#CONCURRENT}, {@link Spliterator#NONNULL} and
{@link Spliterator#ORDERED}, with an encounter order that is ascending
order of the corresponding keys.

<p>The collection is backed by the map, so changes to the map are
reflected in the collection, and vice-versa.  The collection
supports element removal, which removes the corresponding
mapping from the map, via the {@code Iterator.remove},
{@code Collection.remove}, {@code removeAll},
{@code retainAll} and {@code clear} operations.  It does not
support the {@code add} or {@code addAll} operations.

<p>The view's iterators and spliterators are
<a href="package-summary.html#Weakly"><i>weakly consistent</i></a>.

## ConcurrentSkipListMap.entrySet()

```java
public Set<Map.Entry<K,V>> entrySet()
```

Returns a {@link Set} view of the mappings contained in this map.

<p>The set's iterator returns the entries in ascending key order.  The
set's spliterator additionally reports {@link Spliterator#CONCURRENT},
{@link Spliterator#NONNULL}, {@link Spliterator#SORTED} and
{@link Spliterator#ORDERED}, with an encounter order that is ascending
key order.

<p>The set is backed by the map, so changes to the map are
reflected in the set, and vice-versa.  The set supports element
removal, which removes the corresponding mapping from the map,
via the {@code Iterator.remove}, {@code Set.remove},
{@code removeAll}, {@code retainAll} and {@code clear}
operations.  It does not support the {@code add} or
{@code addAll} operations.

<p>The view's iterators and spliterators are
<a href="package-summary.html#Weakly"><i>weakly consistent</i></a>.

<p>The {@code Map.Entry} elements traversed by the {@code iterator}
or {@code spliterator} do <em>not</em> support the {@code setValue}
operation.

@return a set view of the mappings contained in this map,
        sorted in ascending key order

## ConcurrentSkipListMap.equals(Object)

```java
public boolean equals(Object o)
```

Compares the specified object with this map for equality.
Returns {@code true} if the given object is also a map and the
two maps represent the same mappings.  More formally, two maps
{@code m1} and {@code m2} represent the same mappings if
{@code m1.entrySet().equals(m2.entrySet())}.  This
operation may return misleading results if either map is
concurrently modified during execution of this method.

@param o object to be compared for equality with this map
@return {@code true} if the specified object is equal to this map

## ConcurrentSkipListMap.putIfAbsent(K, V)

```java
public V putIfAbsent(K key, V value)
```

{@inheritDoc ConcurrentMap}

@return the previous value associated with the specified key,
        or {@code null} if there was no mapping for the key
@throws ClassCastException if the specified key cannot be compared
        with the keys currently in the map
@throws NullPointerException if the specified key or value is null

## ConcurrentSkipListMap.remove(Object, Object)

```java
public boolean remove(Object key, Object value)
```

{@inheritDoc ConcurrentMap}

@throws ClassCastException if the specified key cannot be compared
        with the keys currently in the map
@throws NullPointerException if the specified key is null
@return {@inheritDoc ConcurrentMap}

## ConcurrentSkipListMap.replace(K, V, V)

```java
public boolean replace(K key, V oldValue, V newValue)
```

{@inheritDoc ConcurrentMap}

@throws ClassCastException if the specified key cannot be compared
        with the keys currently in the map
@throws NullPointerException if any of the arguments are null
@return {@inheritDoc ConcurrentMap}

## ConcurrentSkipListMap.replace(K, V)

```java
public V replace(K key, V value)
```

{@inheritDoc ConcurrentMap}

@return the previous value associated with the specified key,
        or {@code null} if there was no mapping for the key
@throws ClassCastException if the specified key cannot be compared
        with the keys currently in the map
@throws NullPointerException if the specified key or value is null

## ConcurrentSkipListMap.firstKey()

```java
public K firstKey()
```

@throws NoSuchElementException {@inheritDoc}

## ConcurrentSkipListMap.lastKey()

```java
public K lastKey()
```

@throws NoSuchElementException {@inheritDoc}

## ConcurrentSkipListMap.putFirst(K, V)

```java
public V putFirst(K k, V v)
```

Throws {@code UnsupportedOperationException}. The encounter order induced by this
map's comparison method determines the position of mappings, so explicit positioning
is not supported.

@throws UnsupportedOperationException always
@since 21

## ConcurrentSkipListMap.putLast(K, V)

```java
public V putLast(K k, V v)
```

Throws {@code UnsupportedOperationException}. The encounter order induced by this
map's comparison method determines the position of mappings, so explicit positioning
is not supported.

@throws UnsupportedOperationException always
@since 21

## ConcurrentSkipListMap.subMap(K, boolean, K, boolean)

```java
public ConcurrentNavigableMap<K,V> subMap(K fromKey, boolean fromInclusive, K toKey, boolean toInclusive)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if {@code fromKey} or {@code toKey} is null
@throws IllegalArgumentException {@inheritDoc}

## ConcurrentSkipListMap.headMap(K, boolean)

```java
public ConcurrentNavigableMap<K,V> headMap(K toKey, boolean inclusive)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if {@code toKey} is null
@throws IllegalArgumentException {@inheritDoc}

## ConcurrentSkipListMap.tailMap(K, boolean)

```java
public ConcurrentNavigableMap<K,V> tailMap(K fromKey, boolean inclusive)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if {@code fromKey} is null
@throws IllegalArgumentException {@inheritDoc}

## ConcurrentSkipListMap.subMap(K, K)

```java
public ConcurrentNavigableMap<K,V> subMap(K fromKey, K toKey)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if {@code fromKey} or {@code toKey} is null
@throws IllegalArgumentException {@inheritDoc}

## ConcurrentSkipListMap.headMap(K)

```java
public ConcurrentNavigableMap<K,V> headMap(K toKey)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if {@code toKey} is null
@throws IllegalArgumentException {@inheritDoc}

## ConcurrentSkipListMap.tailMap(K)

```java
public ConcurrentNavigableMap<K,V> tailMap(K fromKey)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if {@code fromKey} is null
@throws IllegalArgumentException {@inheritDoc}

## ConcurrentSkipListMap.lowerEntry(K)

```java
public Map.Entry<K,V> lowerEntry(K key)
```

Returns a key-value mapping associated with the greatest key
strictly less than the given key, or {@code null} if there is
no such key. The returned entry does <em>not</em> support the
{@code Entry.setValue} method.

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if the specified key is null

## ConcurrentSkipListMap.lowerKey(K)

```java
public K lowerKey(K key)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if the specified key is null

## ConcurrentSkipListMap.floorEntry(K)

```java
public Map.Entry<K,V> floorEntry(K key)
```

Returns a key-value mapping associated with the greatest key
less than or equal to the given key, or {@code null} if there
is no such key. The returned entry does <em>not</em> support
the {@code Entry.setValue} method.

@param key the key
@throws ClassCastException {@inheritDoc}
@throws NullPointerException if the specified key is null

## ConcurrentSkipListMap.floorKey(K)

```java
public K floorKey(K key)
```

@param key the key
@throws ClassCastException {@inheritDoc}
@throws NullPointerException if the specified key is null

## ConcurrentSkipListMap.ceilingEntry(K)

```java
public Map.Entry<K,V> ceilingEntry(K key)
```

Returns a key-value mapping associated with the least key
greater than or equal to the given key, or {@code null} if
there is no such entry. The returned entry does <em>not</em>
support the {@code Entry.setValue} method.

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if the specified key is null

## ConcurrentSkipListMap.ceilingKey(K)

```java
public K ceilingKey(K key)
```

@throws ClassCastException {@inheritDoc}
@throws NullPointerException if the specified key is null

## ConcurrentSkipListMap.higherEntry(K)

```java
public Map.Entry<K,V> higherEntry(K key)
```

Returns a key-value mapping associated with the least key
strictly greater than the given key, or {@code null} if there
is no such key. The returned entry does <em>not</em> support
the {@code Entry.setValue} method.

@param key the key
@throws ClassCastException {@inheritDoc}
@throws NullPointerException if the specified key is null

## ConcurrentSkipListMap.higherKey(K)

```java
public K higherKey(K key)
```

@param key the key
@throws ClassCastException {@inheritDoc}
@throws NullPointerException if the specified key is null

## ConcurrentSkipListMap.firstEntry()

```java
public Map.Entry<K,V> firstEntry()
```

Returns a key-value mapping associated with the least
key in this map, or {@code null} if the map is empty.
The returned entry does <em>not</em> support
the {@code Entry.setValue} method.

## ConcurrentSkipListMap.lastEntry()

```java
public Map.Entry<K,V> lastEntry()
```

Returns a key-value mapping associated with the greatest
key in this map, or {@code null} if the map is empty.
The returned entry does <em>not</em> support
the {@code Entry.setValue} method.

## ConcurrentSkipListMap.pollFirstEntry()

```java
public Map.Entry<K,V> pollFirstEntry()
```

Removes and returns a key-value mapping associated with
the least key in this map, or {@code null} if the map is empty.
The returned entry does <em>not</em> support
the {@code Entry.setValue} method.

## ConcurrentSkipListMap.pollLastEntry()

```java
public Map.Entry<K,V> pollLastEntry()
```

Removes and returns a key-value mapping associated with
the greatest key in this map, or {@code null} if the map is empty.
The returned entry does <em>not</em> support
the {@code Entry.setValue} method.