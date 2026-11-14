# ConcurrentHashMap class (java.util.concurrent)

```java
public class ConcurrentHashMap<K,V> extends AbstractMap<K,V> implements ConcurrentMap<K,V>, Serializable
```

A hash table supporting full concurrency of retrievals and
high expected concurrency for updates. This class obeys the
same functional specification as {@link java.util.Hashtable}, and
includes versions of methods corresponding to each method of
{@code Hashtable}. However, even though all operations are
thread-safe, retrieval operations do <em>not</em> entail locking,
and there is <em>not</em> any support for locking the entire table
in a way that prevents all access.  This class is fully
interoperable with {@code Hashtable} in programs that rely on its
thread safety but not on its synchronization details.

<p>Retrieval operations (including {@code get}) generally do not
block, so may overlap with update operations (including {@code put}
and {@code remove}). Retrievals reflect the results of the most
recently <em>completed</em> update operations holding upon their
onset. (More formally, an update operation for a given key bears a
<em>happens-before</em> relation with any (non-null) retrieval for
that key reporting the updated value.)  For aggregate operations
such as {@code putAll} and {@code clear}, concurrent retrievals may
reflect insertion or removal of only some entries.  Similarly,
Iterators, Spliterators and Enumerations return elements reflecting the
state of the hash table at some point at or since the creation of the
iterator/enumeration.  They do <em>not</em> throw {@link
java.util.ConcurrentModificationException ConcurrentModificationException}.
However, iterators are designed to be used by only one thread at a time.
Bear in mind that the results of aggregate status methods including
{@code size}, {@code isEmpty}, and {@code containsValue} are typically
useful only when a map is not undergoing concurrent updates in other threads.
Otherwise the results of these methods reflect transient states
that may be adequate for monitoring or estimation purposes, but not
for program control.

<p>The table is dynamically expanded when there are too many
collisions (i.e., keys that have distinct hash codes but fall into
the same slot modulo the table size), with the expected average
effect of maintaining roughly two bins per mapping (corresponding
to a 0.75 load factor threshold for resizing). There may be much
variance around this average as mappings are added and removed, but
overall, this maintains a commonly accepted time/space tradeoff for
hash tables.  However, resizing this or any other kind of hash
table may be a relatively slow operation. When possible, it is a
good idea to provide a size estimate as an optional {@code
initialCapacity} constructor argument. An additional optional
{@code loadFactor} constructor argument provides a further means of
customizing initial table capacity by specifying the table density
to be used in calculating the amount of space to allocate for the
given number of elements.  Also, for compatibility with previous
versions of this class, constructors may optionally specify an
expected {@code concurrencyLevel} as an additional hint for
internal sizing.  Note that using many keys with exactly the same
{@code hashCode()} is a sure way to slow down performance of any
hash table. To ameliorate impact, when keys are {@link Comparable},
this class may use comparison order among keys to help break ties.

<p>A {@link Set} projection of a ConcurrentHashMap may be created
(using {@link #newKeySet()} or {@link #newKeySet(int)}), or viewed
(using {@link #keySet(Object)} when only keys are of interest, and the
mapped values are (perhaps transiently) not used or all take the
same mapping value.

<p>A ConcurrentHashMap can be used as a scalable frequency map (a
form of histogram or multiset) by using {@link
java.util.concurrent.atomic.LongAdder} values and initializing via
{@link #computeIfAbsent computeIfAbsent}. For example, to add a count
to a {@code ConcurrentHashMap<String,LongAdder> freqs}, you can use
{@code freqs.computeIfAbsent(key, k -> new LongAdder()).increment();}

<p>This class and its views and iterators implement all of the
<em>optional</em> methods of the {@link Map} and {@link Iterator}
interfaces.

<p>Like {@link Hashtable} but unlike {@link HashMap}, this class
does <em>not</em> allow {@code null} to be used as a key or value.

<p>ConcurrentHashMaps support a set of sequential and parallel bulk
operations that, unlike most {@link Stream} methods, are designed
to be safely, and often sensibly, applied even with maps that are
being concurrently updated by other threads; for example, when
computing a snapshot summary of the values in a shared registry.
There are three kinds of operation, each with four forms, accepting
functions with keys, values, entries, and (key, value) pairs as
arguments and/or return values. Because the elements of a
ConcurrentHashMap are not ordered in any particular way, and may be
processed in different orders in different parallel executions, the
correctness of supplied functions should not depend on any
ordering, or on any other objects or values that may transiently
change while computation is in progress; and except for forEach
actions, should ideally be side-effect-free. Bulk operations on
{@link Map.Entry} objects do not support method {@code setValue}.

<ul>
<li>forEach: Performs a given action on each element.
A variant form applies a given transformation on each element
before performing the action.

<li>search: Returns the first available non-null result of
applying a given function on each element; skipping further
search when a result is found.

<li>reduce: Accumulates each element.  The supplied reduction
function cannot rely on ordering (more formally, it should be
both associative and commutative).  There are five variants:

<ul>

<li>Plain reductions. (There is not a form of this method for
(key, value) function arguments since there is no corresponding
return type.)

<li>Mapped reductions that accumulate the results of a given
function applied to each element.

<li>Reductions to scalar doubles, longs, and ints, using a
given basis value.

</ul>
</ul>

<p>These bulk operations accept a {@code parallelismThreshold}
argument. Methods proceed sequentially if the current map size is
estimated to be less than the given threshold. Using a value of
{@code Long.MAX_VALUE} suppresses all parallelism.  Using a value
of {@code 1} results in maximal parallelism by partitioning into
enough subtasks to fully utilize the {@link
ForkJoinPool#commonPool()} that is used for all parallel
computations. Normally, you would initially choose one of these
extreme values, and then measure performance of using in-between
values that trade off overhead versus throughput.

<p>The concurrency properties of bulk operations follow
from those of ConcurrentHashMap: Any non-null result returned
from {@code get(key)} and related access methods bears a
happens-before relation with the associated insertion or
update.  The result of any bulk operation reflects the
composition of these per-element relations (but is not
necessarily atomic with respect to the map as a whole unless it
is somehow known to be quiescent).  Conversely, because keys
and values in the map are never null, null serves as a reliable
atomic indicator of the current lack of any result.  To
maintain this property, null serves as an implicit basis for
all non-scalar reduction operations. For the double, long, and
int versions, the basis should be one that, when combined with
any other value, returns that other value (more formally, it
should be the identity element for the reduction). Most common
reductions have these properties; for example, computing a sum
with basis 0 or a minimum with basis MAX_VALUE.

<p>Search and transformation functions provided as arguments
should similarly return null to indicate the lack of any result
(in which case it is not used). In the case of mapped
reductions, this also enables transformations to serve as
filters, returning null (or, in the case of primitive
specializations, the identity basis) if the element should not
be combined. You can create compound transformations and
filterings by composing them yourself under this "null means
there is nothing there now" rule before using them in search or
reduce operations.

<p>Methods accepting and/or returning Entry arguments maintain
key-value associations. They may be useful for example when
finding the key for the greatest value. Note that "plain" Entry
arguments can be supplied using {@code new
AbstractMap.SimpleEntry(k,v)}.

<p>Bulk operations may complete abruptly, throwing an
exception encountered in the application of a supplied
function. Bear in mind when handling such exceptions that other
concurrently executing functions could also have thrown
exceptions, or would have done so if the first exception had
not occurred.

<p>Speedups for parallel compared to sequential forms are common
but not guaranteed.  Parallel operations involving brief functions
on small maps may execute more slowly than sequential forms if the
underlying work to parallelize the computation is more expensive
than the computation itself.  Similarly, parallelization may not
lead to much actual parallelism if all processors are busy
performing unrelated tasks.

<p>All arguments to all task methods must be non-null.

<p>This class is a member of the
<a href="{@docRoot}/java.base/java/util/package-summary.html#CollectionsFramework">
Java Collections Framework</a>.

@since 1.5
@author Doug Lea
@param <K> the type of keys maintained by this map
@param <V> the type of mapped values

## ConcurrentHashMap.ConcurrentHashMap()

```java
public ConcurrentHashMap()
```

Creates a new, empty map with the default initial table size (16).

## ConcurrentHashMap.ConcurrentHashMap(int)

```java
public ConcurrentHashMap(int initialCapacity)
```

Creates a new, empty map with an initial table size
accommodating the specified number of elements without the need
to dynamically resize.

@param initialCapacity The implementation performs internal
sizing to accommodate this many elements.
@throws IllegalArgumentException if the initial capacity of
elements is negative

## ConcurrentHashMap.ConcurrentHashMap(Map<? extends K, ? extends V>)

```java
public ConcurrentHashMap(Map<? extends K, ? extends V> m)
```

Creates a new map with the same mappings as the given map.

@param m the map

## ConcurrentHashMap.ConcurrentHashMap(int, float)

```java
public ConcurrentHashMap(int initialCapacity, float loadFactor)
```

Creates a new, empty map with an initial table size based on
the given number of elements ({@code initialCapacity}) and
initial table density ({@code loadFactor}).

@param initialCapacity the initial capacity. The implementation
performs internal sizing to accommodate this many elements,
given the specified load factor.
@param loadFactor the load factor (table density) for
establishing the initial table size
@throws IllegalArgumentException if the initial capacity of
elements is negative or the load factor is nonpositive

@since 1.6

## ConcurrentHashMap.ConcurrentHashMap(int, float, int)

```java
public ConcurrentHashMap(int initialCapacity, float loadFactor, int concurrencyLevel)
```

Creates a new, empty map with an initial table size based on
the given number of elements ({@code initialCapacity}), initial
table density ({@code loadFactor}), and number of concurrently
updating threads ({@code concurrencyLevel}).

@param initialCapacity the initial capacity. The implementation
performs internal sizing to accommodate this many elements,
given the specified load factor.
@param loadFactor the load factor (table density) for
establishing the initial table size
@param concurrencyLevel the estimated number of concurrently
updating threads. The implementation may use this value as
a sizing hint.
@throws IllegalArgumentException if the initial capacity is
negative or the load factor or concurrencyLevel are
nonpositive

## ConcurrentHashMap.size()

```java
public int size()
```

{@inheritDoc}

## ConcurrentHashMap.isEmpty()

```java
public boolean isEmpty()
```

{@inheritDoc}

## ConcurrentHashMap.get(Object)

```java
public V get(Object key)
```

Returns the value to which the specified key is mapped,
or {@code null} if this map contains no mapping for the key.

<p>More formally, if this map contains a mapping from a key
{@code k} to a value {@code v} such that {@code key.equals(k)},
then this method returns {@code v}; otherwise it returns
{@code null}.  (There can be at most one such mapping.)

@throws NullPointerException if the specified key is null

## ConcurrentHashMap.containsKey(Object)

```java
public boolean containsKey(Object key)
```

Tests if the specified object is a key in this table.

@param  key possible key
@return {@code true} if and only if the specified object
        is a key in this table, as determined by the
        {@code equals} method; {@code false} otherwise
@throws NullPointerException if the specified key is null

## ConcurrentHashMap.containsValue(Object)

```java
public boolean containsValue(Object value)
```

Returns {@code true} if this map maps one or more keys to the
specified value. Note: This method may require a full traversal
of the map, and is much slower than method {@code containsKey}.

@param value value whose presence in this map is to be tested
@return {@code true} if this map maps one or more keys to the
        specified value
@throws NullPointerException if the specified value is null

## ConcurrentHashMap.put(K, V)

```java
public V put(K key, V value)
```

Maps the specified key to the specified value in this table.
Neither the key nor the value can be null.

<p>The value can be retrieved by calling the {@code get} method
with a key that is equal to the original key.

@param key key with which the specified value is to be associated
@param value value to be associated with the specified key
@return the previous value associated with {@code key}, or
        {@code null} if there was no mapping for {@code key}
@throws NullPointerException if the specified key or value is null

## ConcurrentHashMap.putAll(Map<? extends K, ? extends V>)

```java
public void putAll(Map<? extends K, ? extends V> m)
```

Copies all of the mappings from the specified map to this one.
These mappings replace any mappings that this map had for any of the
keys currently in the specified map.

@param m mappings to be stored in this map

## ConcurrentHashMap.remove(Object)

```java
public V remove(Object key)
```

Removes the key (and its corresponding value) from this map.
This method does nothing if the key is not in the map.

@param  key the key that needs to be removed
@return the previous value associated with {@code key}, or
        {@code null} if there was no mapping for {@code key}
@throws NullPointerException if the specified key is null

## ConcurrentHashMap.clear()

```java
public void clear()
```

Removes all of the mappings from this map.

## ConcurrentHashMap.keySet()

```java
public KeySetView<K,V> keySet()
```

Returns a {@link Set} view of the keys contained in this map.
The set is backed by the map, so changes to the map are
reflected in the set, and vice-versa. The set supports element
removal, which removes the corresponding mapping from this map,
via the {@code Iterator.remove}, {@code Set.remove},
{@code removeAll}, {@code retainAll}, and {@code clear}
operations.  It does not support the {@code add} or
{@code addAll} operations.

<p>The view's iterators and spliterators are
<a href="package-summary.html#Weakly"><i>weakly consistent</i></a>.

<p>The view's {@code spliterator} reports {@link Spliterator#CONCURRENT},
{@link Spliterator#DISTINCT}, and {@link Spliterator#NONNULL}.

@return the set view

## ConcurrentHashMap.values()

```java
public Collection<V> values()
```

Returns a {@link Collection} view of the values contained in this map.
The collection is backed by the map, so changes to the map are
reflected in the collection, and vice-versa.  The collection
supports element removal, which removes the corresponding
mapping from this map, via the {@code Iterator.remove},
{@code Collection.remove}, {@code removeAll},
{@code retainAll}, and {@code clear} operations.  It does not
support the {@code add} or {@code addAll} operations.

<p>The view's iterators and spliterators are
<a href="package-summary.html#Weakly"><i>weakly consistent</i></a>.

<p>The view's {@code spliterator} reports {@link Spliterator#CONCURRENT}
and {@link Spliterator#NONNULL}.

@return the collection view

## ConcurrentHashMap.entrySet()

```java
public Set<Map.Entry<K,V>> entrySet()
```

Returns a {@link Set} view of the mappings contained in this map.
The set is backed by the map, so changes to the map are
reflected in the set, and vice-versa.  The set supports element
removal, which removes the corresponding mapping from the map,
via the {@code Iterator.remove}, {@code Set.remove},
{@code removeAll}, {@code retainAll}, and {@code clear}
operations.

<p>The view's iterators and spliterators are
<a href="package-summary.html#Weakly"><i>weakly consistent</i></a>.

<p>The view's {@code spliterator} reports {@link Spliterator#CONCURRENT},
{@link Spliterator#DISTINCT}, and {@link Spliterator#NONNULL}.

@return the set view

## ConcurrentHashMap.hashCode()

```java
public int hashCode()
```

Returns the hash code value for this {@link Map}, i.e.,
the sum of, for each key-value pair in the map,
{@code key.hashCode() ^ value.hashCode()}.

@return the hash code value for this map

## ConcurrentHashMap.toString()

```java
public String toString()
```

Returns a string representation of this map.  The string
representation consists of a list of key-value mappings (in no
particular order) enclosed in braces ("{@code {}}").  Adjacent
mappings are separated by the characters {@code ", "} (comma
and space).  Each key-value mapping is rendered as the key
followed by an equals sign ("{@code =}") followed by the
associated value.

@return a string representation of this map

## ConcurrentHashMap.equals(Object)

```java
public boolean equals(Object o)
```

Compares the specified object with this map for equality.
Returns {@code true} if the given object is a map with the same
mappings as this map.  This operation may return misleading
results if either map is concurrently modified during execution
of this method.

@param o object to be compared for equality with this map
@return {@code true} if the specified object is equal to this map

## ConcurrentHashMap.putIfAbsent(K, V)

```java
public V putIfAbsent(K key, V value)
```

{@inheritDoc ConcurrentMap}

@return the previous value associated with the specified key,
        or {@code null} if there was no mapping for the key
@throws NullPointerException if the specified key or value is null

## ConcurrentHashMap.remove(Object, Object)

```java
public boolean remove(Object key, Object value)
```

{@inheritDoc ConcurrentMap}

@throws NullPointerException if the specified key is null
@return {@inheritDoc ConcurrentMap}

## ConcurrentHashMap.replace(K, V, V)

```java
public boolean replace(K key, V oldValue, V newValue)
```

{@inheritDoc ConcurrentMap}

@throws NullPointerException if any of the arguments are null
@return {@inheritDoc ConcurrentMap}

## ConcurrentHashMap.replace(K, V)

```java
public V replace(K key, V value)
```

{@inheritDoc ConcurrentMap}

@return the previous value associated with the specified key,
        or {@code null} if there was no mapping for the key
@throws NullPointerException if the specified key or value is null

## ConcurrentHashMap.getOrDefault(Object, V)

```java
public V getOrDefault(Object key, V defaultValue)
```

Returns the value to which the specified key is mapped, or the
given default value if this map contains no mapping for the
key.

@param key the key whose associated value is to be returned
@param defaultValue the value to return if this map contains
no mapping for the given key
@return the mapping for the key, if present; else the default value
@throws NullPointerException if the specified key is null

## ConcurrentHashMap.computeIfAbsent(K, Function<? super K, ? extends V>)

```java
public V computeIfAbsent(K key, Function<? super K, ? extends V> mappingFunction)
```

If the specified key is not already associated with a value,
attempts to compute its value using the given mapping function
and enters it into this map unless {@code null}.  The entire
method invocation is performed atomically.  The supplied
function is invoked exactly once per invocation of this method
if the key is absent, else not at all.  Some attempted update
operations on this map by other threads may be blocked while
computation is in progress, so the computation should be short
and simple.

<p>The mapping function must not modify this map during computation.

@param key key with which the specified value is to be associated
@param mappingFunction the function to compute a value
@return the current (existing or computed) value associated with
        the specified key, or null if the computed value is null
@throws NullPointerException if the specified key or mappingFunction
        is null
@throws IllegalStateException if the computation detectably
        attempts a recursive update to this map that would
        otherwise never complete
@throws RuntimeException or Error if the mappingFunction does so,
        in which case the mapping is left unestablished

## ConcurrentHashMap.computeIfPresent(K, BiFunction<? super K, ? super V, ? extends V>)

```java
public V computeIfPresent(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction)
```

If the value for the specified key is present, attempts to
compute a new mapping given the key and its current mapped
value.  The entire method invocation is performed atomically.
The supplied function is invoked exactly once per invocation of
this method if the key is present, else not at all.  Some
attempted update operations on this map by other threads may be
blocked while computation is in progress, so the computation
should be short and simple.

<p>The remapping function must not modify this map during computation.

@param key key with which a value may be associated
@param remappingFunction the function to compute a value
@return the new value associated with the specified key, or null if none
@throws NullPointerException if the specified key or remappingFunction
        is null
@throws IllegalStateException if the computation detectably
        attempts a recursive update to this map that would
        otherwise never complete
@throws RuntimeException or Error if the remappingFunction does so,
        in which case the mapping is unchanged

## ConcurrentHashMap.compute(K, BiFunction<? super K, ? super V, ? extends V>)

```java
public V compute(K key, BiFunction<? super K, ? super V, ? extends V> remappingFunction)
```

Attempts to compute a mapping for the specified key and its
current mapped value (or {@code null} if there is no current
mapping). The entire method invocation is performed atomically.
The supplied function is invoked exactly once per invocation of
this method.  Some attempted update operations on this map by
other threads may be blocked while computation is in progress,
so the computation should be short and simple.

<p>The remapping function must not modify this map during computation.

@param key key with which the specified value is to be associated
@param remappingFunction the function to compute a value
@return the new value associated with the specified key, or null if none
@throws NullPointerException if the specified key or remappingFunction
        is null
@throws IllegalStateException if the computation detectably
        attempts a recursive update to this map that would
        otherwise never complete
@throws RuntimeException or Error if the remappingFunction does so,
        in which case the mapping is unchanged

## ConcurrentHashMap.merge(K, V, BiFunction<? super V, ? super V, ? extends V>)

```java
public V merge(K key, V value, BiFunction<? super V, ? super V, ? extends V> remappingFunction)
```

If the specified key is not already associated with a
(non-null) value, associates it with the given value.
Otherwise, replaces the value with the results of the given
remapping function, or removes if {@code null}. The entire
method invocation is performed atomically.  Some attempted
update operations on this map by other threads may be blocked
while computation is in progress, so the computation should be
short and simple, and must not attempt to update any other
mappings of this Map.

@param key key with which the specified value is to be associated
@param value the value to use if absent
@param remappingFunction the function to recompute a value if present
@return the new value associated with the specified key, or null if none
@throws NullPointerException if the specified key or the
        remappingFunction is null
@throws RuntimeException or Error if the remappingFunction does so,
        in which case the mapping is unchanged

## ConcurrentHashMap.contains(Object)

```java
public boolean contains(Object value)
```

Tests if some key maps into the specified value in this table.

<p>Note that this method is identical in functionality to
{@link #containsValue(Object)}, and exists solely to ensure
full compatibility with class {@link java.util.Hashtable},
which supported this method prior to introduction of the
Java Collections Framework.

@param  value a value to search for
@return {@code true} if and only if some key maps to the
        {@code value} argument in this table as
        determined by the {@code equals} method;
        {@code false} otherwise
@throws NullPointerException if the specified value is null

## ConcurrentHashMap.keys()

```java
public Enumeration<K> keys()
```

Returns an enumeration of the keys in this table.

@return an enumeration of the keys in this table
@see #keySet()

## ConcurrentHashMap.elements()

```java
public Enumeration<V> elements()
```

Returns an enumeration of the values in this table.

@return an enumeration of the values in this table
@see #values()

## ConcurrentHashMap.mappingCount()

```java
public long mappingCount()
```

Returns the number of mappings. This method should be used
instead of {@link #size} because a ConcurrentHashMap may
contain more mappings than can be represented as an int. The
value returned is an estimate; the actual count may differ if
there are concurrent insertions or removals.

@return the number of mappings
@since 1.8

## ConcurrentHashMap.newKeySet()

```java
public static <K> KeySetView<K,Boolean> newKeySet()
```

Creates a new {@link Set} backed by a ConcurrentHashMap
from the given type to {@code Boolean.TRUE}.

@param <K> the element type of the returned set
@return the new set
@since 1.8

## ConcurrentHashMap.newKeySet(int)

```java
public static <K> KeySetView<K,Boolean> newKeySet(int initialCapacity)
```

Creates a new {@link Set} backed by a ConcurrentHashMap
from the given type to {@code Boolean.TRUE}.

@param initialCapacity The implementation performs internal
sizing to accommodate this many elements.
@param <K> the element type of the returned set
@return the new set
@throws IllegalArgumentException if the initial capacity of
elements is negative
@since 1.8

## ConcurrentHashMap.keySet(V)

```java
public KeySetView<K,V> keySet(V mappedValue)
```

Returns a {@link Set} view of the keys in this map, using the
given common mapped value for any additions (i.e., {@link
Collection#add} and {@link Collection#addAll(Collection)}).
This is of course only appropriate if it is acceptable to use
the same value for all additions from this view.

@param mappedValue the mapped value to use for any additions
@return the set view
@throws NullPointerException if the mappedValue is null

## ConcurrentHashMap.setValue(V)

```java
public V setValue(V value)
```

Sets our entry's value and writes through to the map. The
value to return is somewhat arbitrary here. Since we do not
necessarily track asynchronous changes, the most recent
"previous" value could be different from what we return (or
could even have been removed, in which case the put will
re-establish). We do not and cannot guarantee more.

## ConcurrentHashMap.forEach(long, BiConsumer<? super K,? super V>)

```java
public void forEach(long parallelismThreshold, BiConsumer<? super K,? super V> action)
```

Performs the given action for each (key, value).

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param action the action
@since 1.8

## ConcurrentHashMap.forEach(long, BiFunction<? super K, ? super V, ? extends U>, Consumer<? super U>)

```java
public <U> void forEach(long parallelismThreshold, BiFunction<? super K, ? super V, ? extends U> transformer, Consumer<? super U> action)
```

Performs the given action for each non-null transformation
of each (key, value).

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param transformer a function returning the transformation
for an element, or null if there is no transformation (in
which case the action is not applied)
@param action the action
@param <U> the return type of the transformer
@since 1.8

## ConcurrentHashMap.search(long, BiFunction<? super K, ? super V, ? extends U>)

```java
public <U> U search(long parallelismThreshold, BiFunction<? super K, ? super V, ? extends U> searchFunction)
```

Returns a non-null result from applying the given search
function on each (key, value), or null if none.  Upon
success, further element processing is suppressed and the
results of any other parallel invocations of the search
function are ignored.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param searchFunction a function returning a non-null
result on success, else null
@param <U> the return type of the search function
@return a non-null result from applying the given search
function on each (key, value), or null if none
@since 1.8

## ConcurrentHashMap.reduce(long, BiFunction<? super K, ? super V, ? extends U>, BiFunction<? super U, ? super U, ? extends U>)

```java
public <U> U reduce(long parallelismThreshold, BiFunction<? super K, ? super V, ? extends U> transformer, BiFunction<? super U, ? super U, ? extends U> reducer)
```

Returns the result of accumulating the given transformation
of all (key, value) pairs using the given reducer to
combine values, or null if none.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param transformer a function returning the transformation
for an element, or null if there is no transformation (in
which case it is not combined)
@param reducer a commutative associative combining function
@param <U> the return type of the transformer
@return the result of accumulating the given transformation
of all (key, value) pairs
@since 1.8

## ConcurrentHashMap.reduceToDouble(long, ToDoubleBiFunction<? super K, ? super V>, double, DoubleBinaryOperator)

```java
public double reduceToDouble(long parallelismThreshold, ToDoubleBiFunction<? super K, ? super V> transformer, double basis, DoubleBinaryOperator reducer)
```

Returns the result of accumulating the given transformation
of all (key, value) pairs using the given reducer to
combine values, and the given basis as an identity value.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param transformer a function returning the transformation
for an element
@param basis the identity (initial default value) for the reduction
@param reducer a commutative associative combining function
@return the result of accumulating the given transformation
of all (key, value) pairs
@since 1.8

## ConcurrentHashMap.reduceToLong(long, ToLongBiFunction<? super K, ? super V>, long, LongBinaryOperator)

```java
public long reduceToLong(long parallelismThreshold, ToLongBiFunction<? super K, ? super V> transformer, long basis, LongBinaryOperator reducer)
```

Returns the result of accumulating the given transformation
of all (key, value) pairs using the given reducer to
combine values, and the given basis as an identity value.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param transformer a function returning the transformation
for an element
@param basis the identity (initial default value) for the reduction
@param reducer a commutative associative combining function
@return the result of accumulating the given transformation
of all (key, value) pairs
@since 1.8

## ConcurrentHashMap.reduceToInt(long, ToIntBiFunction<? super K, ? super V>, int, IntBinaryOperator)

```java
public int reduceToInt(long parallelismThreshold, ToIntBiFunction<? super K, ? super V> transformer, int basis, IntBinaryOperator reducer)
```

Returns the result of accumulating the given transformation
of all (key, value) pairs using the given reducer to
combine values, and the given basis as an identity value.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param transformer a function returning the transformation
for an element
@param basis the identity (initial default value) for the reduction
@param reducer a commutative associative combining function
@return the result of accumulating the given transformation
of all (key, value) pairs
@since 1.8

## ConcurrentHashMap.forEachKey(long, Consumer<? super K>)

```java
public void forEachKey(long parallelismThreshold, Consumer<? super K> action)
```

Performs the given action for each key.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param action the action
@since 1.8

## ConcurrentHashMap.forEachKey(long, Function<? super K, ? extends U>, Consumer<? super U>)

```java
public <U> void forEachKey(long parallelismThreshold, Function<? super K, ? extends U> transformer, Consumer<? super U> action)
```

Performs the given action for each non-null transformation
of each key.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param transformer a function returning the transformation
for an element, or null if there is no transformation (in
which case the action is not applied)
@param action the action
@param <U> the return type of the transformer
@since 1.8

## ConcurrentHashMap.searchKeys(long, Function<? super K, ? extends U>)

```java
public <U> U searchKeys(long parallelismThreshold, Function<? super K, ? extends U> searchFunction)
```

Returns a non-null result from applying the given search
function on each key, or null if none. Upon success,
further element processing is suppressed and the results of
any other parallel invocations of the search function are
ignored.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param searchFunction a function returning a non-null
result on success, else null
@param <U> the return type of the search function
@return a non-null result from applying the given search
function on each key, or null if none
@since 1.8

## ConcurrentHashMap.reduceKeys(long, BiFunction<? super K, ? super K, ? extends K>)

```java
public K reduceKeys(long parallelismThreshold, BiFunction<? super K, ? super K, ? extends K> reducer)
```

Returns the result of accumulating all keys using the given
reducer to combine values, or null if none.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param reducer a commutative associative combining function
@return the result of accumulating all keys using the given
reducer to combine values, or null if none
@since 1.8

## ConcurrentHashMap.reduceKeys(long, Function<? super K, ? extends U>, BiFunction<? super U, ? super U, ? extends U>)

```java
public <U> U reduceKeys(long parallelismThreshold, Function<? super K, ? extends U> transformer, BiFunction<? super U, ? super U, ? extends U> reducer)
```

Returns the result of accumulating the given transformation
of all keys using the given reducer to combine values, or
null if none.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param transformer a function returning the transformation
for an element, or null if there is no transformation (in
which case it is not combined)
@param reducer a commutative associative combining function
@param <U> the return type of the transformer
@return the result of accumulating the given transformation
of all keys
@since 1.8

## ConcurrentHashMap.reduceKeysToDouble(long, ToDoubleFunction<? super K>, double, DoubleBinaryOperator)

```java
public double reduceKeysToDouble(long parallelismThreshold, ToDoubleFunction<? super K> transformer, double basis, DoubleBinaryOperator reducer)
```

Returns the result of accumulating the given transformation
of all keys using the given reducer to combine values, and
the given basis as an identity value.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param transformer a function returning the transformation
for an element
@param basis the identity (initial default value) for the reduction
@param reducer a commutative associative combining function
@return the result of accumulating the given transformation
of all keys
@since 1.8

## ConcurrentHashMap.reduceKeysToLong(long, ToLongFunction<? super K>, long, LongBinaryOperator)

```java
public long reduceKeysToLong(long parallelismThreshold, ToLongFunction<? super K> transformer, long basis, LongBinaryOperator reducer)
```

Returns the result of accumulating the given transformation
of all keys using the given reducer to combine values, and
the given basis as an identity value.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param transformer a function returning the transformation
for an element
@param basis the identity (initial default value) for the reduction
@param reducer a commutative associative combining function
@return the result of accumulating the given transformation
of all keys
@since 1.8

## ConcurrentHashMap.reduceKeysToInt(long, ToIntFunction<? super K>, int, IntBinaryOperator)

```java
public int reduceKeysToInt(long parallelismThreshold, ToIntFunction<? super K> transformer, int basis, IntBinaryOperator reducer)
```

Returns the result of accumulating the given transformation
of all keys using the given reducer to combine values, and
the given basis as an identity value.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param transformer a function returning the transformation
for an element
@param basis the identity (initial default value) for the reduction
@param reducer a commutative associative combining function
@return the result of accumulating the given transformation
of all keys
@since 1.8

## ConcurrentHashMap.forEachValue(long, Consumer<? super V>)

```java
public void forEachValue(long parallelismThreshold, Consumer<? super V> action)
```

Performs the given action for each value.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param action the action
@since 1.8

## ConcurrentHashMap.forEachValue(long, Function<? super V, ? extends U>, Consumer<? super U>)

```java
public <U> void forEachValue(long parallelismThreshold, Function<? super V, ? extends U> transformer, Consumer<? super U> action)
```

Performs the given action for each non-null transformation
of each value.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param transformer a function returning the transformation
for an element, or null if there is no transformation (in
which case the action is not applied)
@param action the action
@param <U> the return type of the transformer
@since 1.8

## ConcurrentHashMap.searchValues(long, Function<? super V, ? extends U>)

```java
public <U> U searchValues(long parallelismThreshold, Function<? super V, ? extends U> searchFunction)
```

Returns a non-null result from applying the given search
function on each value, or null if none.  Upon success,
further element processing is suppressed and the results of
any other parallel invocations of the search function are
ignored.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param searchFunction a function returning a non-null
result on success, else null
@param <U> the return type of the search function
@return a non-null result from applying the given search
function on each value, or null if none
@since 1.8

## ConcurrentHashMap.reduceValues(long, BiFunction<? super V, ? super V, ? extends V>)

```java
public V reduceValues(long parallelismThreshold, BiFunction<? super V, ? super V, ? extends V> reducer)
```

Returns the result of accumulating all values using the
given reducer to combine values, or null if none.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param reducer a commutative associative combining function
@return the result of accumulating all values
@since 1.8

## ConcurrentHashMap.reduceValues(long, Function<? super V, ? extends U>, BiFunction<? super U, ? super U, ? extends U>)

```java
public <U> U reduceValues(long parallelismThreshold, Function<? super V, ? extends U> transformer, BiFunction<? super U, ? super U, ? extends U> reducer)
```

Returns the result of accumulating the given transformation
of all values using the given reducer to combine values, or
null if none.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param transformer a function returning the transformation
for an element, or null if there is no transformation (in
which case it is not combined)
@param reducer a commutative associative combining function
@param <U> the return type of the transformer
@return the result of accumulating the given transformation
of all values
@since 1.8

## ConcurrentHashMap.reduceValuesToDouble(long, ToDoubleFunction<? super V>, double, DoubleBinaryOperator)

```java
public double reduceValuesToDouble(long parallelismThreshold, ToDoubleFunction<? super V> transformer, double basis, DoubleBinaryOperator reducer)
```

Returns the result of accumulating the given transformation
of all values using the given reducer to combine values,
and the given basis as an identity value.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param transformer a function returning the transformation
for an element
@param basis the identity (initial default value) for the reduction
@param reducer a commutative associative combining function
@return the result of accumulating the given transformation
of all values
@since 1.8

## ConcurrentHashMap.reduceValuesToLong(long, ToLongFunction<? super V>, long, LongBinaryOperator)

```java
public long reduceValuesToLong(long parallelismThreshold, ToLongFunction<? super V> transformer, long basis, LongBinaryOperator reducer)
```

Returns the result of accumulating the given transformation
of all values using the given reducer to combine values,
and the given basis as an identity value.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param transformer a function returning the transformation
for an element
@param basis the identity (initial default value) for the reduction
@param reducer a commutative associative combining function
@return the result of accumulating the given transformation
of all values
@since 1.8

## ConcurrentHashMap.reduceValuesToInt(long, ToIntFunction<? super V>, int, IntBinaryOperator)

```java
public int reduceValuesToInt(long parallelismThreshold, ToIntFunction<? super V> transformer, int basis, IntBinaryOperator reducer)
```

Returns the result of accumulating the given transformation
of all values using the given reducer to combine values,
and the given basis as an identity value.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param transformer a function returning the transformation
for an element
@param basis the identity (initial default value) for the reduction
@param reducer a commutative associative combining function
@return the result of accumulating the given transformation
of all values
@since 1.8

## ConcurrentHashMap.forEachEntry(long, Consumer<? super Map.Entry<K,V>>)

```java
public void forEachEntry(long parallelismThreshold, Consumer<? super Map.Entry<K,V>> action)
```

Performs the given action for each entry.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param action the action
@since 1.8

## ConcurrentHashMap.forEachEntry(long, Function<Map.Entry<K,V>, ? extends U>, Consumer<? super U>)

```java
public <U> void forEachEntry(long parallelismThreshold, Function<Map.Entry<K,V>, ? extends U> transformer, Consumer<? super U> action)
```

Performs the given action for each non-null transformation
of each entry.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param transformer a function returning the transformation
for an element, or null if there is no transformation (in
which case the action is not applied)
@param action the action
@param <U> the return type of the transformer
@since 1.8

## ConcurrentHashMap.searchEntries(long, Function<Map.Entry<K,V>, ? extends U>)

```java
public <U> U searchEntries(long parallelismThreshold, Function<Map.Entry<K,V>, ? extends U> searchFunction)
```

Returns a non-null result from applying the given search
function on each entry, or null if none.  Upon success,
further element processing is suppressed and the results of
any other parallel invocations of the search function are
ignored.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param searchFunction a function returning a non-null
result on success, else null
@param <U> the return type of the search function
@return a non-null result from applying the given search
function on each entry, or null if none
@since 1.8

## ConcurrentHashMap.reduceEntries(long, BiFunction<Map.Entry<K,V>, Map.Entry<K,V>, ? extends Map.Entry<K,V>>)

```java
public Map.Entry<K,V> reduceEntries(long parallelismThreshold, BiFunction<Map.Entry<K,V>, Map.Entry<K,V>, ? extends Map.Entry<K,V>> reducer)
```

Returns the result of accumulating all entries using the
given reducer to combine values, or null if none.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param reducer a commutative associative combining function
@return the result of accumulating all entries
@since 1.8

## ConcurrentHashMap.reduceEntries(long, Function<Map.Entry<K,V>, ? extends U>, BiFunction<? super U, ? super U, ? extends U>)

```java
public <U> U reduceEntries(long parallelismThreshold, Function<Map.Entry<K,V>, ? extends U> transformer, BiFunction<? super U, ? super U, ? extends U> reducer)
```

Returns the result of accumulating the given transformation
of all entries using the given reducer to combine values,
or null if none.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param transformer a function returning the transformation
for an element, or null if there is no transformation (in
which case it is not combined)
@param reducer a commutative associative combining function
@param <U> the return type of the transformer
@return the result of accumulating the given transformation
of all entries
@since 1.8

## ConcurrentHashMap.reduceEntriesToDouble(long, ToDoubleFunction<Map.Entry<K,V>>, double, DoubleBinaryOperator)

```java
public double reduceEntriesToDouble(long parallelismThreshold, ToDoubleFunction<Map.Entry<K,V>> transformer, double basis, DoubleBinaryOperator reducer)
```

Returns the result of accumulating the given transformation
of all entries using the given reducer to combine values,
and the given basis as an identity value.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param transformer a function returning the transformation
for an element
@param basis the identity (initial default value) for the reduction
@param reducer a commutative associative combining function
@return the result of accumulating the given transformation
of all entries
@since 1.8

## ConcurrentHashMap.reduceEntriesToLong(long, ToLongFunction<Map.Entry<K,V>>, long, LongBinaryOperator)

```java
public long reduceEntriesToLong(long parallelismThreshold, ToLongFunction<Map.Entry<K,V>> transformer, long basis, LongBinaryOperator reducer)
```

Returns the result of accumulating the given transformation
of all entries using the given reducer to combine values,
and the given basis as an identity value.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param transformer a function returning the transformation
for an element
@param basis the identity (initial default value) for the reduction
@param reducer a commutative associative combining function
@return the result of accumulating the given transformation
of all entries
@since 1.8

## ConcurrentHashMap.reduceEntriesToInt(long, ToIntFunction<Map.Entry<K,V>>, int, IntBinaryOperator)

```java
public int reduceEntriesToInt(long parallelismThreshold, ToIntFunction<Map.Entry<K,V>> transformer, int basis, IntBinaryOperator reducer)
```

Returns the result of accumulating the given transformation
of all entries using the given reducer to combine values,
and the given basis as an identity value.

@param parallelismThreshold the (estimated) number of elements
needed for this operation to be executed in parallel
@param transformer a function returning the transformation
for an element
@param basis the identity (initial default value) for the reduction
@param reducer a commutative associative combining function
@return the result of accumulating the given transformation
of all entries
@since 1.8

## ConcurrentHashMap.getMap()

```java
public ConcurrentHashMap<K,V> getMap()
```

Returns the map backing this view.

@return the map backing this view

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

<p>The returned iterator is
<a href="package-summary.html#Weakly"><i>weakly consistent</i></a>.

@return an iterator over the elements in this collection

## ConcurrentHashMap.toString()

```java
public final String toString()
```

Returns a string representation of this collection.
The string representation consists of the string representations
of the collection's elements in the order they are returned by
its iterator, enclosed in square brackets ({@code "[]"}).
Adjacent elements are separated by the characters {@code ", "}
(comma and space).  Elements are converted to strings as by
{@link String#valueOf(Object)}.

@return a string representation of this collection

## ConcurrentHashMap.getMappedValue()

```java
public V getMappedValue()
```

Returns the default mapped value for additions,
or {@code null} if additions are not supported.

@return the default mapped value for additions, or {@code null}
if not supported

## ConcurrentHashMap.contains(Object)

```java
public boolean contains(Object o)
```

{@inheritDoc}
@throws NullPointerException if the specified key is null

## ConcurrentHashMap.remove(Object)

```java
public boolean remove(Object o)
```

Removes the key from this map view, by removing the key (and its
corresponding value) from the backing map.  This method does
nothing if the key is not in the map.

@param  o the key to be removed from the backing map
@return {@code true} if the backing map contained the specified key
@throws NullPointerException if the specified key is null

## ConcurrentHashMap.iterator()

```java
public Iterator<K> iterator()
```

@return an iterator over the keys of the backing map

## ConcurrentHashMap.add(K)

```java
public boolean add(K e)
```

Adds the specified key to this set view by mapping the key to
the default mapped value in the backing map, if defined.

@param e key to be added
@return {@code true} if this set changed as a result of the call
@throws NullPointerException if the specified key is null
@throws UnsupportedOperationException if no default mapped value
for additions was provided

## ConcurrentHashMap.addAll(Collection<? extends K>)

```java
public boolean addAll(Collection<? extends K> c)
```

Adds all of the elements in the specified collection to this set,
as if by calling {@link #add} on each one.

@param c the elements to be inserted into this set
@return {@code true} if this set changed as a result of the call
@throws NullPointerException if the collection or any of its
elements are {@code null}
@throws UnsupportedOperationException if no default mapped value
for additions was provided

## ConcurrentHashMap.iterator()

```java
public Iterator<Map.Entry<K,V>> iterator()
```

@return an iterator over the entries of the backing map