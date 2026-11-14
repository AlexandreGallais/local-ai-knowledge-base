# IdentityHashMap class (java.util)

```java
public class IdentityHashMap<K,V> extends AbstractMap<K,V> implements Map<K,V>, java.io.Serializable, Cloneable
```

This class implements the {@code Map} interface with a hash table, using
reference-equality in place of object-equality when comparing keys (and
values).  In other words, in an {@code IdentityHashMap}, two keys
{@code k1} and {@code k2} are considered equal if and only if
{@code (k1==k2)}.  (In normal {@code Map} implementations (like
{@code HashMap}) two keys {@code k1} and {@code k2} are considered equal
if and only if {@code (k1==null ? k2==null : k1.equals(k2))}.)

<p><b>This class is <i>not</i> a general-purpose {@code Map}
implementation!  While this class implements the {@code Map} interface, it
intentionally violates {@code Map's} general contract, which mandates the
use of the {@code equals} method when comparing objects.  This class is
designed for use only in the rare cases wherein reference-equality
semantics are required.</b>

<p>The view collections of this map also have reference-equality semantics
for their elements. See the {@link keySet() keySet}, {@link values() values},
and {@link entrySet() entrySet} methods for further information.

<p>A typical use of this class is <i>topology-preserving object graph
transformations</i>, such as serialization or deep-copying.  To perform such
a transformation, a program must maintain a "node table" that keeps track
of all the object references that have already been processed.  The node
table must not equate distinct objects even if they happen to be equal.
Another typical use of this class is to maintain <i>proxy objects</i>.  For
example, a debugging facility might wish to maintain a proxy object for
each object in the program being debugged.

<p>This class provides all of the optional map operations, and permits
{@code null} values and the {@code null} key.  This class makes no
guarantees as to the order of the map; in particular, it does not guarantee
that the order will remain constant over time.

<p>This class provides constant-time performance for the basic
operations ({@code get} and {@code put}), assuming the system
identity hash function ({@link System#identityHashCode(Object)})
disperses elements properly among the buckets.

<p>This class has one tuning parameter (which affects performance but not
semantics): <i>expected maximum size</i>.  This parameter is the maximum
number of key-value mappings that the map is expected to hold.  Internally,
this parameter is used to determine the number of buckets initially
comprising the hash table.  The precise relationship between the expected
maximum size and the number of buckets is unspecified.

<p>If the size of the map (the number of key-value mappings) sufficiently
exceeds the expected maximum size, the number of buckets is increased.
Increasing the number of buckets ("rehashing") may be fairly expensive, so
it pays to create identity hash maps with a sufficiently large expected
maximum size.  On the other hand, iteration over collection views requires
time proportional to the number of buckets in the hash table, so it
pays not to set the expected maximum size too high if you are especially
concerned with iteration performance or memory usage.

<p><strong>Note that this implementation is not synchronized.</strong>
If multiple threads access an identity hash map concurrently, and at
least one of the threads modifies the map structurally, it <i>must</i>
be synchronized externally.  (A structural modification is any operation
that adds or deletes one or more mappings; merely changing the value
associated with a key that an instance already contains is not a
structural modification.)  This is typically accomplished by
synchronizing on some object that naturally encapsulates the map.

If no such object exists, the map should be "wrapped" using the
{@link Collections#synchronizedMap Collections.synchronizedMap}
method.  This is best done at creation time, to prevent accidental
unsynchronized access to the map:<pre>
  Map m = Collections.synchronizedMap(new IdentityHashMap(...));</pre>

<p>The iterators returned by the {@code iterator} method of the
collections returned by all of this class's "collection view
methods" are <i>fail-fast</i>: if the map is structurally modified
at any time after the iterator is created, in any way except
through the iterator's own {@code remove} method, the iterator
will throw a {@link ConcurrentModificationException}.  Thus, in the
face of concurrent modification, the iterator fails quickly and
cleanly, rather than risking arbitrary, non-deterministic behavior
at an undetermined time in the future.

<p>Note that the fail-fast behavior of an iterator cannot be guaranteed
as it is, generally speaking, impossible to make any hard guarantees in the
presence of unsynchronized concurrent modification.  Fail-fast iterators
throw {@code ConcurrentModificationException} on a best-effort basis.
Therefore, it would be wrong to write a program that depended on this
exception for its correctness: <i>fail-fast iterators should be used only
to detect bugs.</i>

<p>This class is a member of the
<a href="{@docRoot}/java.base/java/util/package-summary.html#CollectionsFramework">
Java Collections Framework</a>.

@implNote
<p>This is a simple <i>linear-probe</i> hash table,
as described for example in texts by Sedgewick and Knuth.  The array
contains alternating keys and values, with keys at even indexes and values
at odd indexes. (This arrangement has better locality for large
tables than does using separate arrays.)  For many Java implementations
and operation mixes, this class will yield better performance than
{@link HashMap}, which uses <i>chaining</i> rather than linear-probing.

@param <K> the type of keys maintained by this map
@param <V> the type of mapped values

@see     System#identityHashCode(Object)
@see     Object#hashCode()
@see     Collection
@see     Map
@see     HashMap
@see     TreeMap
@author  Doug Lea and Josh Bloch
@since   1.4

## IdentityHashMap.IdentityHashMap()

```java
public IdentityHashMap()
```

Constructs a new, empty identity hash map with a default expected
maximum size (21).

## IdentityHashMap.IdentityHashMap(int)

```java
public IdentityHashMap(int expectedMaxSize)
```

Constructs a new, empty map with the specified expected maximum size.
Putting more than the expected number of key-value mappings into
the map may cause the internal data structure to grow, which may be
somewhat time-consuming.

@param expectedMaxSize the expected maximum size of the map
@throws IllegalArgumentException if {@code expectedMaxSize} is negative

## IdentityHashMap.IdentityHashMap(Map<? extends K, ? extends V>)

```java
public IdentityHashMap(Map<? extends K, ? extends V> m)
```

Constructs a new identity hash map containing the key-value mappings
in the specified map.

@param m the map whose mappings are to be placed into this map
@throws NullPointerException if the specified map is null

## IdentityHashMap.size()

```java
public int size()
```

Returns the number of key-value mappings in this identity hash map.

@return the number of key-value mappings in this map

## IdentityHashMap.isEmpty()

```java
public boolean isEmpty()
```

Returns {@code true} if this identity hash map contains no key-value
mappings.

@return {@code true} if this identity hash map contains no key-value
        mappings

## IdentityHashMap.get(Object)

```java
public V get(Object key)
```

Returns the value to which the specified key is mapped,
or {@code null} if this map contains no mapping for the key.

<p>More formally, if this map contains a mapping from a key
{@code k} to a value {@code v} such that {@code (key == k)},
then this method returns {@code v}; otherwise it returns
{@code null}.  (There can be at most one such mapping.)

<p>A return value of {@code null} does not <i>necessarily</i>
indicate that the map contains no mapping for the key; it's also
possible that the map explicitly maps the key to {@code null}.
The {@link #containsKey containsKey} operation may be used to
distinguish these two cases.

@see #put(Object, Object)

## IdentityHashMap.containsKey(Object)

```java
public boolean containsKey(Object key)
```

Tests whether the specified object reference is a key in this identity
hash map. Returns {@code true} if and only if this map contains a mapping
with key {@code k} such that {@code (key == k)}.

@param   key   possible key
@return  {@code true} if the specified object reference is a key
         in this map
@see     #containsValue(Object)

## IdentityHashMap.containsValue(Object)

```java
public boolean containsValue(Object value)
```

Tests whether the specified object reference is a value in this identity
hash map. Returns {@code true} if and only if this map contains a mapping
with value {@code v} such that {@code (value == v)}.

@param value value whose presence in this map is to be tested
@return {@code true} if this map maps one or more keys to the
        specified object reference
@see     #containsKey(Object)

## IdentityHashMap.put(K, V)

```java
public V put(K key, V value)
```

Associates the specified value with the specified key in this identity
hash map. If this map already {@link containsKey(Object) contains}
a mapping for the key, the old value is replaced, otherwise, a new mapping
is inserted into this map.

@param key the key with which the specified value is to be associated
@param value the value to be associated with the specified key
@return the previous value associated with {@code key}, or
        {@code null} if there was no mapping for {@code key}.
        (A {@code null} return can also indicate that the map
        previously associated {@code null} with {@code key}.)
@see     Object#equals(Object)
@see     #get(Object)
@see     #containsKey(Object)

## IdentityHashMap.putAll(Map<? extends K, ? extends V>)

```java
public void putAll(Map<? extends K, ? extends V> m)
```

Copies all of the mappings from the specified map to this map.
For each mapping in the specified map, if this map already
{@link containsKey(Object) contains} a mapping for the key,
its value is replaced with the value from the specified map;
otherwise, a new mapping is inserted into this map.

@param m mappings to be stored in this map
@throws NullPointerException if the specified map is null

## IdentityHashMap.remove(Object)

```java
public V remove(Object key)
```

Removes the mapping for this key from this map if present.
The mapping is removed if and only if the mapping has a key
{@code k} such that (key == k).

@param key key whose mapping is to be removed from the map
@return the previous value associated with {@code key}, or
        {@code null} if there was no mapping for {@code key}.
        (A {@code null} return can also indicate that the map
        previously associated {@code null} with {@code key}.)

## IdentityHashMap.clear()

```java
public void clear()
```

Removes all of the mappings from this map.
The map will be empty after this call returns.

## IdentityHashMap.equals(Object)

```java
public boolean equals(Object o)
```

Compares the specified object with this map for equality.  Returns
{@code true} if the given object is also a map and the two maps
represent identical object-reference mappings.  More formally, this
map is equal to another map {@code m} if and only if
{@code this.entrySet().equals(m.entrySet())}. See the
{@link entrySet() entrySet} method for the specification of equality
of this map's entries.

<p><b>Owing to the reference-equality-based semantics of this map it is
possible that the symmetry and transitivity requirements of the
{@code Object.equals} contract may be violated if this map is compared
to a normal map.  However, the {@code Object.equals} contract is
guaranteed to hold among {@code IdentityHashMap} instances.</b>

@param  o object to be compared for equality with this map
@return {@code true} if the specified object is equal to this map
@see Object#equals(Object)

## IdentityHashMap.hashCode()

```java
public int hashCode()
```

Returns the hash code value for this map.  The hash code of a map is
defined to be the sum of the hash codes of each entry of this map.
See the {@link entrySet() entrySet} method for a specification of the
hash code of this map's entries.

<p>This specification ensures that {@code m1.equals(m2)}
implies that {@code m1.hashCode()==m2.hashCode()} for any two
{@code IdentityHashMap} instances {@code m1} and {@code m2}, as
required by the general contract of {@link Object#hashCode}.

<p><b>Owing to the reference-equality-based semantics of the
{@code Map.Entry} instances in the set returned by this map's
{@code entrySet} method, it is possible that the contractual
requirement of {@code Object.hashCode} mentioned in the previous
paragraph will be violated if one of the two objects being compared is
an {@code IdentityHashMap} instance and the other is a normal map.</b>

@return the hash code value for this map
@see Object#equals(Object)
@see #equals(Object)

## IdentityHashMap.clone()

```java
public Object clone()
```

Returns a shallow copy of this identity hash map: the keys and values
themselves are not cloned.

@return a shallow copy of this map

## IdentityHashMap.keySet()

```java
public Set<K> keySet()
```

Returns an identity-based set view of the keys contained in this map.
The set is backed by the map, so changes to the map are reflected in
the set, and vice-versa.  If the map is modified while an iteration
over the set is in progress, the results of the iteration are
undefined.  The set supports element removal, which removes the
corresponding mapping from the map, via the {@code Iterator.remove},
{@code Set.remove}, {@code removeAll}, {@code retainAll}, and
{@code clear} methods.  It does not support the {@code add} or
{@code addAll} methods.

<p><b>While the object returned by this method implements the
{@code Set} interface, it does <i>not</i> obey {@code Set's} general
contract.  Like its backing map, the set returned by this method
defines element equality as reference-equality rather than
object-equality.  This affects the behavior of its {@code contains},
{@code remove}, {@code containsAll}, {@code equals}, and
{@code hashCode} methods.</b>

<p><b>The {@code equals} method of the returned set returns {@code true}
only if the specified object is a set containing exactly the same
object references as the returned set.  The symmetry and transitivity
requirements of the {@code Object.equals} contract may be violated if
the set returned by this method is compared to a normal set.  However,
the {@code Object.equals} contract is guaranteed to hold among sets
returned by this method.</b>

<p>The {@code hashCode} method of the returned set returns the sum of
the <i>identity hashcodes</i> of the elements in the set, rather than
the sum of their hashcodes.  This is mandated by the change in the
semantics of the {@code equals} method, in order to enforce the
general contract of the {@code Object.hashCode} method among sets
returned by this method.

@return an identity-based set view of the keys contained in this map
@see Object#equals(Object)
@see System#identityHashCode(Object)

## IdentityHashMap.values()

```java
public Collection<V> values()
```

Returns a {@link Collection} view of the values contained in this map.
The collection is backed by the map, so changes to the map are
reflected in the collection, and vice-versa.  If the map is
modified while an iteration over the collection is in progress,
the results of the iteration are undefined.  The collection
supports element removal, which removes the corresponding
mapping from the map, via the {@code Iterator.remove},
{@code Collection.remove}, {@code removeAll},
{@code retainAll} and {@code clear} methods.  It does not
support the {@code add} or {@code addAll} methods.

<p><b>While the object returned by this method implements the
{@code Collection} interface, it does <i>not</i> obey
{@code Collection's} general contract.  Like its backing map,
the collection returned by this method defines element equality as
reference-equality rather than object-equality.  This affects the
behavior of its {@code contains}, {@code remove} and
{@code containsAll} methods.</b>

## IdentityHashMap.entrySet()

```java
public Set<Map.Entry<K,V>> entrySet()
```

Returns a {@link Set} view of the mappings contained in this map.
Each element in the returned set is a reference-equality-based
{@code Map.Entry}.  The set is backed by the map, so changes
to the map are reflected in the set, and vice-versa.  If the
map is modified while an iteration over the set is in progress,
the results of the iteration are undefined.  The set supports
element removal, which removes the corresponding mapping from
the map, via the {@code Iterator.remove}, {@code Set.remove},
{@code removeAll}, {@code retainAll} and {@code clear}
methods.  It does not support the {@code add} or
{@code addAll} methods.

<p>Like the backing map, the {@code Map.Entry} objects in the set
returned by this method define key and value equality as
reference-equality rather than object-equality.  This affects the
behavior of the {@code equals} and {@code hashCode} methods of these
{@code Map.Entry} objects.  A reference-equality based {@code Map.Entry
e} is equal to an object {@code o} if and only if {@code o} is a
{@code Map.Entry} and {@code e.getKey()==o.getKey() &&
e.getValue()==o.getValue()}.  To accommodate these equals
semantics, the {@code hashCode} method returns
{@code System.identityHashCode(e.getKey()) ^
System.identityHashCode(e.getValue())}. (While the keys and values
are compared using reference equality, the {@code Map.Entry}
objects themselves are not.)

<p><b>Owing to the reference-equality-based semantics of the
{@code Map.Entry} instances in the set returned by this method,
it is possible that the symmetry and transitivity requirements of
the {@link Object#equals(Object)} contract may be violated if any of
the entries in the set is compared to a normal map entry, or if
the set returned by this method is compared to a set of normal map
entries (such as would be returned by a call to this method on a normal
map).  However, the {@code Object.equals} contract is guaranteed to
hold among identity-based map entries, and among sets of such entries.
</b>

@return a set view of the identity-mappings contained in this map

## IdentityHashMap.remove(Object, Object)

```java
public boolean remove(Object key, Object value)
```

{@inheritDoc}

<p>More formally, if this map contains a mapping from a key
{@code k} to a value {@code v} such that {@code (key == k)}
and {@code (value == v)}, then this method removes the mapping
for this key and returns {@code true}; otherwise it returns
{@code false}.

## IdentityHashMap.replace(K, V, V)

```java
public boolean replace(K key, V oldValue, V newValue)
```

{@inheritDoc}

<p>More formally, if this map contains a mapping from a key
{@code k} to a value {@code v} such that {@code (key == k)}
and {@code (oldValue == v)}, then this method associates
{@code k} with {@code newValue} and returns {@code true};
otherwise it returns {@code false}.