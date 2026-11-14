# HashMap class (java.util)

```java
public class HashMap<K,V> extends AbstractMap<K,V> implements Map<K,V>, Cloneable, Serializable
```

Hash table based implementation of the {@code Map} interface.  This
implementation provides all of the optional map operations, and permits
{@code null} values and the {@code null} key.  (The {@code HashMap}
class is roughly equivalent to {@code Hashtable}, except that it is
unsynchronized and permits nulls.)  This class makes no guarantees as to
the order of the map; in particular, it does not guarantee that the order
will remain constant over time.

<p>This implementation provides constant-time performance for the basic
operations ({@code get} and {@code put}), assuming the hash function
disperses the elements properly among the buckets.  Iteration over
collection views requires time proportional to the "capacity" of the
{@code HashMap} instance (the number of buckets) plus its size (the number
of key-value mappings).  Thus, it's very important not to set the initial
capacity too high (or the load factor too low) if iteration performance is
important.

<p>An instance of {@code HashMap} has two parameters that affect its
performance: <i>initial capacity</i> and <i>load factor</i>.  The
<i>capacity</i> is the number of buckets in the hash table, and the initial
capacity is simply the capacity at the time the hash table is created.  The
<i>load factor</i> is a measure of how full the hash table is allowed to
get before its capacity is automatically increased.  When the number of
entries in the hash table exceeds the product of the load factor and the
current capacity, the hash table is <i>rehashed</i> (that is, internal data
structures are rebuilt) so that the hash table has approximately twice the
number of buckets.

<p>As a general rule, the default load factor (.75) offers a good
tradeoff between time and space costs.  Higher values decrease the
space overhead but increase the lookup cost (reflected in most of
the operations of the {@code HashMap} class, including
{@code get} and {@code put}).  The expected number of entries in
the map and its load factor should be taken into account when
setting its initial capacity, so as to minimize the number of
rehash operations.  If the initial capacity is greater than the
maximum number of entries divided by the load factor, no rehash
operations will ever occur.

<p>If many mappings are to be stored in a {@code HashMap}
instance, creating it with a sufficiently large capacity will allow
the mappings to be stored more efficiently than letting it perform
automatic rehashing as needed to grow the table.  Note that using
many keys with the same {@code hashCode()} is a sure way to slow
down performance of any hash table. To ameliorate impact, when keys
are {@link Comparable}, this class may use comparison order among
keys to help break ties.

<p><strong>Note that this implementation is not synchronized.</strong>
If multiple threads access a hash map concurrently, and at least one of
the threads modifies the map structurally, it <i>must</i> be
synchronized externally.  (A structural modification is any operation
that adds or deletes one or more mappings; merely changing the value
associated with a key that an instance already contains is not a
structural modification.)  This is typically accomplished by
synchronizing on some object that naturally encapsulates the map.

If no such object exists, the map should be "wrapped" using the
{@link Collections#synchronizedMap Collections.synchronizedMap}
method.  This is best done at creation time, to prevent accidental
unsynchronized access to the map:<pre>
  Map m = Collections.synchronizedMap(new HashMap(...));</pre>

<p>The iterators returned by all of this class's "collection view methods"
are <i>fail-fast</i>: if the map is structurally modified at any time after
the iterator is created, in any way except through the iterator's own
{@code remove} method, the iterator will throw a
{@link ConcurrentModificationException}.  Thus, in the face of concurrent
modification, the iterator fails quickly and cleanly, rather than risking
arbitrary, non-deterministic behavior at an undetermined time in the
future.

<p>Note that the fail-fast behavior of an iterator cannot be guaranteed
as it is, generally speaking, impossible to make any hard guarantees in the
presence of unsynchronized concurrent modification.  Fail-fast iterators
throw {@code ConcurrentModificationException} on a best-effort basis.
Therefore, it would be wrong to write a program that depended on this
exception for its correctness: <i>the fail-fast behavior of iterators
should be used only to detect bugs.</i>

<p>This class is a member of the
<a href="{@docRoot}/java.base/java/util/package-summary.html#CollectionsFramework">
Java Collections Framework</a>.

@param <K> the type of keys maintained by this map
@param <V> the type of mapped values

@author  Doug Lea
@author  Josh Bloch
@author  Arthur van Hoff
@author  Neal Gafter
@see     Object#hashCode()
@see     Collection
@see     Map
@see     TreeMap
@see     Hashtable
@since   1.2

## HashMap.HashMap(int, float)

```java
public HashMap(int initialCapacity, float loadFactor)
```

Constructs an empty {@code HashMap} with the specified initial
capacity and load factor.

@apiNote
To create a {@code HashMap} with an initial capacity that accommodates
an expected number of mappings, use {@link #newHashMap(int) newHashMap}.

@param  initialCapacity the initial capacity
@param  loadFactor      the load factor
@throws IllegalArgumentException if the initial capacity is negative
        or the load factor is nonpositive

## HashMap.HashMap(int)

```java
public HashMap(int initialCapacity)
```

Constructs an empty {@code HashMap} with the specified initial
capacity and the default load factor (0.75).

@apiNote
To create a {@code HashMap} with an initial capacity that accommodates
an expected number of mappings, use {@link #newHashMap(int) newHashMap}.

@param  initialCapacity the initial capacity.
@throws IllegalArgumentException if the initial capacity is negative.

## HashMap.HashMap()

```java
public HashMap()
```

Constructs an empty {@code HashMap} with the default initial capacity
(16) and the default load factor (0.75).

## HashMap.HashMap(Map<? extends K, ? extends V>)

```java
public HashMap(Map<? extends K, ? extends V> m)
```

Constructs a new {@code HashMap} with the same mappings as the
specified {@code Map}.  The {@code HashMap} is created with
default load factor (0.75) and an initial capacity sufficient to
hold the mappings in the specified {@code Map}.

@param   m the map whose mappings are to be placed in this map
@throws  NullPointerException if the specified map is null

## HashMap.size()

```java
public int size()
```

Returns the number of key-value mappings in this map.

@return the number of key-value mappings in this map

## HashMap.isEmpty()

```java
public boolean isEmpty()
```

Returns {@code true} if this map contains no key-value mappings.

@return {@code true} if this map contains no key-value mappings

## HashMap.get(Object)

```java
public V get(Object key)
```

Returns the value to which the specified key is mapped,
or {@code null} if this map contains no mapping for the key.

<p>More formally, if this map contains a mapping from a key
{@code k} to a value {@code v} such that {@code (key==null ? k==null :
key.equals(k))}, then this method returns {@code v}; otherwise
it returns {@code null}.  (There can be at most one such mapping.)

<p>A return value of {@code null} does not <i>necessarily</i>
indicate that the map contains no mapping for the key; it's also
possible that the map explicitly maps the key to {@code null}.
The {@link #containsKey containsKey} operation may be used to
distinguish these two cases.

@see #put(Object, Object)

## HashMap.containsKey(Object)

```java
public boolean containsKey(Object key)
```

Returns {@code true} if this map contains a mapping for the
specified key.

@param   key   The key whose presence in this map is to be tested
@return {@code true} if this map contains a mapping for the specified
key.

## HashMap.put(K, V)

```java
public V put(K key, V value)
```

Associates the specified value with the specified key in this map.
If the map previously contained a mapping for the key, the old
value is replaced.

@param key key with which the specified value is to be associated
@param value value to be associated with the specified key
@return the previous value associated with {@code key}, or
        {@code null} if there was no mapping for {@code key}.
        (A {@code null} return can also indicate that the map
        previously associated {@code null} with {@code key}.)

## HashMap.putAll(Map<? extends K, ? extends V>)

```java
public void putAll(Map<? extends K, ? extends V> m)
```

Copies all of the mappings from the specified map to this map.
These mappings will replace any mappings that this map had for
any of the keys currently in the specified map.

@param m mappings to be stored in this map
@throws NullPointerException if the specified map is null

## HashMap.remove(Object)

```java
public V remove(Object key)
```

Removes the mapping for the specified key from this map if present.

@param  key key whose mapping is to be removed from the map
@return the previous value associated with {@code key}, or
        {@code null} if there was no mapping for {@code key}.
        (A {@code null} return can also indicate that the map
        previously associated {@code null} with {@code key}.)

## HashMap.clear()

```java
public void clear()
```

Removes all of the mappings from this map.
The map will be empty after this call returns.

## HashMap.containsValue(Object)

```java
public boolean containsValue(Object value)
```

Returns {@code true} if this map maps one or more keys to the
specified value.

@param value value whose presence in this map is to be tested
@return {@code true} if this map maps one or more keys to the
        specified value

## HashMap.keySet()

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

@return a set view of the keys contained in this map

## HashMap.values()

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

@return a view of the values contained in this map

## HashMap.entrySet()

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

@return a set view of the mappings contained in this map

## HashMap.computeIfAbsent(K, Function<? super K, ? extends V>)

```java
public V computeIfAbsent(K key, Function<? super K, ? extends V> mappingFunction)
```

{@inheritDoc}

<p>This method will, on a best-effort basis, throw a
{@link ConcurrentModificationException} if it is detected that the
mapping function modifies this map during computation.

@throws ConcurrentModificationException if it is detected that the
mapping function modified this map

## HashMap.computeIfPresent(K, BiFunction<? super K, ? super V, ? extends V>)

```java
public V computeIfPresent(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction)
```

{@inheritDoc}

<p>This method will, on a best-effort basis, throw a
{@link ConcurrentModificationException} if it is detected that the
remapping function modifies this map during computation.

@throws ConcurrentModificationException if it is detected that the
remapping function modified this map

## HashMap.compute(K, BiFunction<? super K, ? super V, ? extends V>)

```java
public V compute(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction)
```

{@inheritDoc}

<p>This method will, on a best-effort basis, throw a
{@link ConcurrentModificationException} if it is detected that the
remapping function modifies this map during computation.

@throws ConcurrentModificationException if it is detected that the
remapping function modified this map

## HashMap.merge(K, V, BiFunction<? super V, ? super V, ? extends V>)

```java
public V merge(K key, V value, BiFunction<? super V, ? super V, ? extends V> remappingFunction)
```

{@inheritDoc}

<p>This method will, on a best-effort basis, throw a
{@link ConcurrentModificationException} if it is detected that the
remapping function modifies this map during computation.

@throws ConcurrentModificationException if it is detected that the
remapping function modified this map

## HashMap.clone()

```java
public Object clone()
```

Returns a shallow copy of this {@code HashMap} instance: the keys and
values themselves are not cloned.

@return a shallow copy of this map

## HashMap.newHashMap(int)

```java
public static <K, V> HashMap<K, V> newHashMap(int numMappings)
```

Creates a new, empty HashMap suitable for the expected number of mappings.
The returned map uses the default load factor of 0.75, and its initial capacity is
generally large enough so that the expected number of mappings can be added
without resizing the map.

@param numMappings the expected number of mappings
@param <K>         the type of keys maintained by the new map
@param <V>         the type of mapped values
@return the newly created map
@throws IllegalArgumentException if numMappings is negative
@since 19