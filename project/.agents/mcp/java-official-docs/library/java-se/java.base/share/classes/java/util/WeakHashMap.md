# WeakHashMap class (java.util)

```java
public class WeakHashMap< K,V> extends AbstractMap<K,V> implements Map<K,V>
```

Hash table based implementation of the {@code Map} interface, with
<em>weak keys</em>.
An entry in a {@code WeakHashMap} will automatically be removed when
its key is no longer in ordinary use.  More precisely, the presence of a
mapping for a given key will not prevent the key from being discarded by the
garbage collector, that is, made finalizable, finalized, and then reclaimed.
When a key has been discarded its entry is effectively removed from the map,
so this class behaves somewhat differently from other {@code Map}
implementations.

<p> Both null values and the null key are supported. This class has
performance characteristics similar to those of the {@code HashMap}
class, and has the same efficiency parameters of <em>initial capacity</em>
and <em>load factor</em>.

<p> Like most collection classes, this class is not synchronized.
A synchronized {@code WeakHashMap} may be constructed using the
{@link Collections#synchronizedMap Collections.synchronizedMap}
method.

<p> This class is intended primarily for use with key objects whose
{@code equals} methods test for object identity using the
{@code ==} operator.  Once such a key is discarded it can never be
recreated, so it is impossible to do a lookup of that key in a
{@code WeakHashMap} at some later time and be surprised that its entry
has been removed.  This class will work perfectly well with key objects
whose {@code equals} methods are not based upon object identity, such
as {@code String} instances.  With such recreatable key objects,
however, the automatic removal of {@code WeakHashMap} entries whose
keys have been discarded may prove to be confusing.

<p> The behavior of the {@code WeakHashMap} class depends in part upon
the actions of the garbage collector, so several familiar (though not
required) {@code Map} invariants do not hold for this class.  Because
the garbage collector may discard keys at any time, a
{@code WeakHashMap} may behave as though an unknown thread is silently
removing entries.  In particular, even if you synchronize on a
{@code WeakHashMap} instance and invoke none of its mutator methods, it
is possible for the {@code size} method to return smaller values over
time, for the {@code isEmpty} method to return {@code false} and
then {@code true}, for the {@code containsKey} method to return
{@code true} and later {@code false} for a given key, for the
{@code get} method to return a value for a given key but later return
{@code null}, for the {@code put} method to return
{@code null} and the {@code remove} method to return
{@code false} for a key that previously appeared to be in the map, and
for successive examinations of the key set, the value collection, and
the entry set to yield successively smaller numbers of elements.

<p> Each key object in a {@code WeakHashMap} is stored indirectly as
the referent of a weak reference.  Therefore a key will automatically be
removed only after the weak references to it, both inside and outside of the
map, have been cleared by the garbage collector.

<p> <strong>Implementation note:</strong> The value objects in a
{@code WeakHashMap} are held by ordinary strong references.  Thus care
should be taken to ensure that value objects do not strongly refer to their
own keys, either directly or indirectly, since that will prevent the keys
from being discarded.  Note that a value object may refer indirectly to its
key via the {@code WeakHashMap} itself; that is, a value object may
strongly refer to some other key object whose associated value object, in
turn, strongly refers to the key of the first value object.  If the values
in the map do not rely on the map holding strong references to them, one way
to deal with this is to wrap values themselves within
{@code WeakReferences} before
inserting, as in: {@code m.put(key, new WeakReference(value))},
and then unwrapping upon each {@code get}.

<p>The iterators returned by the {@code iterator} method of the collections
returned by all of this class's "collection view methods" are
<i>fail-fast</i>: if the map is structurally modified at any time after the
iterator is created, in any way except through the iterator's own
{@code remove} method, the iterator will throw a {@link
ConcurrentModificationException}.  Thus, in the face of concurrent
modification, the iterator fails quickly and cleanly, rather than risking
arbitrary, non-deterministic behavior at an undetermined time in the future.

<p>Note that the fail-fast behavior of an iterator cannot be guaranteed
as it is, generally speaking, impossible to make any hard guarantees in the
presence of unsynchronized concurrent modification.  Fail-fast iterators
throw {@code ConcurrentModificationException} on a best-effort basis.
Therefore, it would be wrong to write a program that depended on this
exception for its correctness:  <i>the fail-fast behavior of iterators
should be used only to detect bugs.</i>

<p>This class is a member of the
<a href="{@docRoot}/java.base/java/util/package-summary.html#CollectionsFramework">
Java Collections Framework</a>.

@param <K> the type of keys maintained by this map
@param <V> the type of mapped values

@author      Doug Lea
@author      Josh Bloch
@author      Mark Reinhold
@since       1.2
@see         java.util.HashMap
@see         java.lang.ref.WeakReference

## WeakHashMap.WeakHashMap(int, float)

```java
public WeakHashMap(int initialCapacity, float loadFactor)
```

Constructs a new, empty {@code WeakHashMap} with the given initial
capacity and the given load factor.

@apiNote
To create a {@code WeakHashMap} with an initial capacity that accommodates
an expected number of mappings, use {@link #newWeakHashMap(int) newWeakHashMap}.

@param  initialCapacity The initial capacity of the {@code WeakHashMap}
@param  loadFactor      The load factor of the {@code WeakHashMap}
@throws IllegalArgumentException if the initial capacity is negative,
        or if the load factor is nonpositive.

## WeakHashMap.WeakHashMap(int)

```java
public WeakHashMap(int initialCapacity)
```

Constructs a new, empty {@code WeakHashMap} with the given initial
capacity and the default load factor (0.75).

@apiNote
To create a {@code WeakHashMap} with an initial capacity that accommodates
an expected number of mappings, use {@link #newWeakHashMap(int) newWeakHashMap}.

@param  initialCapacity The initial capacity of the {@code WeakHashMap}
@throws IllegalArgumentException if the initial capacity is negative

## WeakHashMap.WeakHashMap()

```java
public WeakHashMap()
```

Constructs a new, empty {@code WeakHashMap} with the default initial
capacity (16) and load factor (0.75).

## WeakHashMap.WeakHashMap(Map<? extends K, ? extends V>)

```java
public WeakHashMap(Map<? extends K, ? extends V> m)
```

Constructs a new {@code WeakHashMap} with the same mappings as the
specified map.  The {@code WeakHashMap} is created with the default
load factor (0.75) and an initial capacity sufficient to hold the
mappings in the specified map.

@param   m the map whose mappings are to be placed in this map
@throws  NullPointerException if the specified map is null
@since   1.3

## WeakHashMap.size()

```java
public int size()
```

Returns the number of key-value mappings in this map.
This result is a snapshot, and may not reflect unprocessed
entries that will be removed before next attempted access
because they are no longer referenced.

## WeakHashMap.isEmpty()

```java
public boolean isEmpty()
```

Returns {@code true} if this map contains no key-value mappings.
This result is a snapshot, and may not reflect unprocessed
entries that will be removed before next attempted access
because they are no longer referenced.

## WeakHashMap.get(Object)

```java
public V get(Object key)
```

Returns the value to which the specified key is mapped,
or {@code null} if this map contains no mapping for the key.

<p>More formally, if this map contains a mapping from a key
{@code k} to a value {@code v} such that
{@code Objects.equals(key, k)},
then this method returns {@code v}; otherwise
it returns {@code null}.  (There can be at most one such mapping.)

<p>A return value of {@code null} does not <i>necessarily</i>
indicate that the map contains no mapping for the key; it's also
possible that the map explicitly maps the key to {@code null}.
The {@link #containsKey containsKey} operation may be used to
distinguish these two cases.

@see #put(Object, Object)

## WeakHashMap.containsKey(Object)

```java
public boolean containsKey(Object key)
```

Returns {@code true} if this map contains a mapping for the
specified key.

@param  key   The key whose presence in this map is to be tested
@return {@code true} if there is a mapping for {@code key};
        {@code false} otherwise

## WeakHashMap.put(K, V)

```java
public V put( K key, V value)
```

Associates the specified value with the specified key in this map.
If the map previously contained a mapping for this key, the old
value is replaced.

@param key key with which the specified value is to be associated.
@param value value to be associated with the specified key.
@return the previous value associated with {@code key}, or
        {@code null} if there was no mapping for {@code key}.
        (A {@code null} return can also indicate that the map
        previously associated {@code null} with {@code key}.)

## WeakHashMap.putAll(Map<? extends K, ? extends V>)

```java
public void putAll(Map<? extends K, ? extends V> m)
```

Copies all of the mappings from the specified map to this map.
These mappings will replace any mappings that this map had for any
of the keys currently in the specified map.

@param m mappings to be stored in this map.
@throws  NullPointerException if the specified map is null.

## WeakHashMap.remove(Object)

```java
public V remove(Object key)
```

Removes the mapping for a key from this weak hash map if it is present.
More formally, if this map contains a mapping from key {@code k} to
value {@code v} such that <code>(key==null ?  k==null :
key.equals(k))</code>, that mapping is removed.  (The map can contain
at most one such mapping.)

<p>Returns the value to which this map previously associated the key,
or {@code null} if the map contained no mapping for the key.  A
return value of {@code null} does not <i>necessarily</i> indicate
that the map contained no mapping for the key; it's also possible
that the map explicitly mapped the key to {@code null}.

<p>The map will not contain a mapping for the specified key once the
call returns.

@param key key whose mapping is to be removed from the map
@return the previous value associated with {@code key}, or
        {@code null} if there was no mapping for {@code key}

## WeakHashMap.clear()

```java
public void clear()
```

Removes all of the mappings from this map.
The map will be empty after this call returns.

## WeakHashMap.containsValue(Object)

```java
public boolean containsValue(Object value)
```

Returns {@code true} if this map maps one or more keys to the
specified value.

@param value value whose presence in this map is to be tested
@return {@code true} if this map maps one or more keys to the
        specified value

## WeakHashMap.nextEntry()

```java
protected Entry<K,V> nextEntry()
```

The common parts of next() across different types of iterators

## WeakHashMap.keySet()

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

## WeakHashMap.values()

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

## WeakHashMap.entrySet()

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

## WeakHashMap.newWeakHashMap(int)

```java
public static <K, V> WeakHashMap<K, V> newWeakHashMap(int numMappings)
```

Creates a new, empty WeakHashMap suitable for the expected number of mappings.
The returned map uses the default load factor of 0.75, and its initial capacity is
generally large enough so that the expected number of mappings can be added
without resizing the map.

@param numMappings the expected number of mappings
@param <K>         the type of keys maintained by the new map
@param <V>         the type of mapped values
@return the newly created map
@throws IllegalArgumentException if numMappings is negative
@since 19