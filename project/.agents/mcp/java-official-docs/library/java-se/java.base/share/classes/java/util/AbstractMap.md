# AbstractMap class (java.util)

```java
public abstract class AbstractMap<K,V> implements Map<K,V>
```

This class provides a skeletal implementation of the {@code Map}
interface, to minimize the effort required to implement this interface.

<p>To implement an unmodifiable map, the programmer needs only to extend this
class and provide an implementation for the {@code entrySet} method, which
returns a set-view of the map's mappings.  Typically, the returned set
will, in turn, be implemented atop {@code AbstractSet}.  This set should
not support the {@code add} or {@code remove} methods, and its iterator
should not support the {@code remove} method.

<p>To implement a modifiable map, the programmer must additionally override
this class's {@code put} method (which otherwise throws an
{@code UnsupportedOperationException}), and the iterator returned by
{@code entrySet().iterator()} must additionally implement its
{@code remove} method.

<p>The programmer should generally provide a void (no argument) and map
constructor, as per the recommendation in the {@code Map} interface
specification.

<p>The documentation for each non-abstract method in this class describes its
implementation in detail.  Each of these methods may be overridden if the
map being implemented admits a more efficient implementation.

<p>This class is a member of the
<a href="{@docRoot}/java.base/java/util/package-summary.html#CollectionsFramework">
Java Collections Framework</a>.

@param <K> the type of keys maintained by this map
@param <V> the type of mapped values

@author  Josh Bloch
@author  Neal Gafter
@see Map
@see Collection
@since 1.2

## AbstractMap.AbstractMap()

```java
protected AbstractMap()
```

Sole constructor.  (For invocation by subclass constructors, typically
implicit.)

## AbstractMap.size()

```java
public int size()
```

{@inheritDoc}

@implSpec
This implementation returns {@code entrySet().size()}.

## AbstractMap.isEmpty()

```java
public boolean isEmpty()
```

{@inheritDoc}

@implSpec
This implementation returns {@code size() == 0}.

## AbstractMap.containsValue(Object)

```java
public boolean containsValue(Object value)
```

{@inheritDoc}

@implSpec
This implementation iterates over {@code entrySet()} searching
for an entry with the specified value.  If such an entry is found,
{@code true} is returned.  If the iteration terminates without
finding such an entry, {@code false} is returned.  Note that this
implementation requires linear time in the size of the map.

@throws ClassCastException   {@inheritDoc}
@throws NullPointerException {@inheritDoc}

## AbstractMap.containsKey(Object)

```java
public boolean containsKey(Object key)
```

{@inheritDoc}

@implSpec
This implementation iterates over {@code entrySet()} searching
for an entry with the specified key.  If such an entry is found,
{@code true} is returned.  If the iteration terminates without
finding such an entry, {@code false} is returned.  Note that this
implementation requires linear time in the size of the map; many
implementations will override this method.

@throws ClassCastException   {@inheritDoc}
@throws NullPointerException {@inheritDoc}

## AbstractMap.get(Object)

```java
public V get(Object key)
```

{@inheritDoc}

@implSpec
This implementation iterates over {@code entrySet()} searching
for an entry with the specified key.  If such an entry is found,
the entry's value is returned.  If the iteration terminates without
finding such an entry, {@code null} is returned.  Note that this
implementation requires linear time in the size of the map; many
implementations will override this method.

@throws ClassCastException            {@inheritDoc}
@throws NullPointerException          {@inheritDoc}

## AbstractMap.put(K, V)

```java
public V put(K key, V value)
```

{@inheritDoc}

@implSpec
This implementation always throws an
{@code UnsupportedOperationException}.

@throws UnsupportedOperationException {@inheritDoc}
@throws ClassCastException            {@inheritDoc}
@throws NullPointerException          {@inheritDoc}
@throws IllegalArgumentException      {@inheritDoc}

## AbstractMap.remove(Object)

```java
public V remove(Object key)
```

{@inheritDoc}

@implSpec
This implementation iterates over {@code entrySet()} searching for an
entry with the specified key.  If such an entry is found, its value is
obtained with its {@code getValue} operation, the entry is removed
from the collection (and the backing map) with the iterator's
{@code remove} operation, and the saved value is returned.  If the
iteration terminates without finding such an entry, {@code null} is
returned.  Note that this implementation requires linear time in the
size of the map; many implementations will override this method.

<p>Note that this implementation throws an
{@code UnsupportedOperationException} if the {@code entrySet}
iterator does not support the {@code remove} method and this map
contains a mapping for the specified key.

@throws UnsupportedOperationException {@inheritDoc}
@throws ClassCastException            {@inheritDoc}
@throws NullPointerException          {@inheritDoc}

## AbstractMap.putAll(Map<? extends K, ? extends V>)

```java
public void putAll(Map<? extends K, ? extends V> m)
```

{@inheritDoc}

@implSpec
This implementation iterates over the specified map's
{@code entrySet()} collection, and calls this map's {@code put}
operation once for each entry returned by the iteration.

<p>Note that this implementation throws an
{@code UnsupportedOperationException} if this map does not support
the {@code put} operation and the specified map is nonempty.

@throws UnsupportedOperationException {@inheritDoc}
@throws ClassCastException            {@inheritDoc}
@throws NullPointerException          {@inheritDoc}
@throws IllegalArgumentException      {@inheritDoc}

## AbstractMap.clear()

```java
public void clear()
```

{@inheritDoc}

@implSpec
This implementation calls {@code entrySet().clear()}.

<p>Note that this implementation throws an
{@code UnsupportedOperationException} if the {@code entrySet}
does not support the {@code clear} operation.

@throws UnsupportedOperationException {@inheritDoc}

## AbstractMap.keySet()

```java
public Set<K> keySet()
```

{@inheritDoc}

@implSpec
This implementation returns a set that subclasses {@link AbstractSet}.
The subclass's iterator method returns a "wrapper object" over this
map's {@code entrySet()} iterator.  The {@code size} method
delegates to this map's {@code size} method and the
{@code contains} method delegates to this map's
{@code containsKey} method.

<p>The set is created the first time this method is called,
and returned in response to all subsequent calls.  No synchronization
is performed, so there is a slight chance that multiple calls to this
method will not all return the same set.

## AbstractMap.values()

```java
public Collection<V> values()
```

{@inheritDoc}

@implSpec
This implementation returns a collection that subclasses {@link
AbstractCollection}.  The subclass's iterator method returns a
"wrapper object" over this map's {@code entrySet()} iterator.
The {@code size} method delegates to this map's {@code size}
method and the {@code contains} method delegates to this map's
{@code containsValue} method.

<p>The collection is created the first time this method is called, and
returned in response to all subsequent calls.  No synchronization is
performed, so there is a slight chance that multiple calls to this
method will not all return the same collection.

## AbstractMap.equals(Object)

```java
public boolean equals(Object o)
```

Compares the specified object with this map for equality.  Returns
{@code true} if the given object is also a map and the two maps
represent the same mappings.  More formally, two maps {@code m1} and
{@code m2} represent the same mappings if
{@code m1.entrySet().equals(m2.entrySet())}.  This ensures that the
{@code equals} method works properly across different implementations
of the {@code Map} interface.

@implSpec
This implementation first checks if the specified object is this map;
if so it returns {@code true}.  Then, it checks if the specified
object is a map whose size is identical to the size of this map; if
not, it returns {@code false}.  If so, it iterates over this map's
{@code entrySet} collection, and checks that the specified map
contains each mapping that this map contains.  If the specified map
fails to contain such a mapping, {@code false} is returned.  If the
iteration completes, {@code true} is returned.

@param o object to be compared for equality with this map
@return {@code true} if the specified object is equal to this map

## AbstractMap.hashCode()

```java
public int hashCode()
```

Returns the hash code value for this map.  The hash code of a map is
defined to be the sum of the hash codes of each entry in the map's
{@code entrySet()} view.  This ensures that {@code m1.equals(m2)}
implies that {@code m1.hashCode()==m2.hashCode()} for any two maps
{@code m1} and {@code m2}, as required by the general contract of
{@link Object#hashCode}.

@implSpec
This implementation iterates over {@code entrySet()}, calling
{@link Map.Entry#hashCode hashCode()} on each element (entry) in the
set, and adding up the results.

@return the hash code value for this map
@see Map.Entry#hashCode()
@see Object#equals(Object)
@see Set#equals(Object)

## AbstractMap.toString()

```java
public String toString()
```

Returns a string representation of this map.  The string representation
consists of a list of key-value mappings in the order returned by the
map's {@code entrySet} view's iterator, enclosed in braces
({@code "{}"}).  Adjacent mappings are separated by the characters
{@code ", "} (comma and space).  Each key-value mapping is rendered as
the key followed by an equals sign ({@code "="}) followed by the
associated value.  Keys and values are converted to strings as by
{@link String#valueOf(Object)}.

@return a string representation of this map

## AbstractMap.clone()

```java
protected Object clone() throws CloneNotSupportedException
```

Returns a shallow copy of this {@code AbstractMap} instance: the keys
and values themselves are not cloned.

@return a shallow copy of this map

## AbstractMap.SimpleEntry(K, V)

```java
public SimpleEntry(K key, V value)
```

Creates an entry representing a mapping from the specified
key to the specified value.

@param key the key represented by this entry
@param value the value represented by this entry

## AbstractMap.SimpleEntry(Entry<? extends K, ? extends V>)

```java
public SimpleEntry(Entry<? extends K, ? extends V> entry)
```

Creates an entry representing the same mapping as the
specified entry.

@param entry the entry to copy

## AbstractMap.getKey()

```java
public K getKey()
```

Returns the key corresponding to this entry.

@return the key corresponding to this entry

## AbstractMap.getValue()

```java
public V getValue()
```

Returns the value corresponding to this entry.

@return the value corresponding to this entry

## AbstractMap.setValue(V)

```java
public V setValue(V value)
```

Replaces the value corresponding to this entry with the specified
value.

@param value new value to be stored in this entry
@return the old value corresponding to the entry

## AbstractMap.equals(Object)

```java
public boolean equals(Object o)
```

Compares the specified object with this entry for equality.
Returns {@code true} if the given object is also a map entry and
the two entries represent the same mapping.  More formally, two
entries {@code e1} and {@code e2} represent the same mapping
if<pre>
  (e1.getKey()==null ?
   e2.getKey()==null :
   e1.getKey().equals(e2.getKey()))
  &amp;&amp;
  (e1.getValue()==null ?
   e2.getValue()==null :
   e1.getValue().equals(e2.getValue()))</pre>
This ensures that the {@code equals} method works properly across
different implementations of the {@code Map.Entry} interface.

@param o object to be compared for equality with this map entry
@return {@code true} if the specified object is equal to this map
        entry
@see    #hashCode

## AbstractMap.hashCode()

```java
public int hashCode()
```

Returns the hash code value for this map entry.  The hash code
of a map entry {@code e} is defined to be: <pre>
  (e.getKey()==null   ? 0 : e.getKey().hashCode()) ^
  (e.getValue()==null ? 0 : e.getValue().hashCode())</pre>
This ensures that {@code e1.equals(e2)} implies that
{@code e1.hashCode()==e2.hashCode()} for any two Entries
{@code e1} and {@code e2}, as required by the general
contract of {@link Object#hashCode}.

@return the hash code value for this map entry
@see    #equals

## AbstractMap.toString()

```java
public String toString()
```

Returns a String representation of this map entry.  This
implementation returns the string representation of this
entry's key followed by the equals character ("{@code =}")
followed by the string representation of this entry's value.

@return a String representation of this map entry

## AbstractMap.SimpleImmutableEntry(K, V)

```java
public SimpleImmutableEntry(K key, V value)
```

Creates an entry representing a mapping from the specified
key to the specified value.

@param key the key represented by this entry
@param value the value represented by this entry

## AbstractMap.SimpleImmutableEntry(Entry<? extends K, ? extends V>)

```java
public SimpleImmutableEntry(Entry<? extends K, ? extends V> entry)
```

Creates an entry representing the same mapping as the
specified entry.

@param entry the entry to copy

## AbstractMap.getKey()

```java
public K getKey()
```

Returns the key corresponding to this entry.

@return the key corresponding to this entry

## AbstractMap.getValue()

```java
public V getValue()
```

Returns the value corresponding to this entry.

@return the value corresponding to this entry

## AbstractMap.setValue(V)

```java
public V setValue(V value)
```

Replaces the value corresponding to this entry with the specified
value (optional operation).  This implementation simply throws
{@code UnsupportedOperationException}, as this class implements
an unmodifiable map entry.

@implSpec
The implementation in this class always throws {@code UnsupportedOperationException}.

@param value new value to be stored in this entry
@return (Does not return)
@throws UnsupportedOperationException always

## AbstractMap.equals(Object)

```java
public boolean equals(Object o)
```

Compares the specified object with this entry for equality.
Returns {@code true} if the given object is also a map entry and
the two entries represent the same mapping.  More formally, two
entries {@code e1} and {@code e2} represent the same mapping
if<pre>
  (e1.getKey()==null ?
   e2.getKey()==null :
   e1.getKey().equals(e2.getKey()))
  &amp;&amp;
  (e1.getValue()==null ?
   e2.getValue()==null :
   e1.getValue().equals(e2.getValue()))</pre>
This ensures that the {@code equals} method works properly across
different implementations of the {@code Map.Entry} interface.

@param o object to be compared for equality with this map entry
@return {@code true} if the specified object is equal to this map
        entry
@see    #hashCode

## AbstractMap.hashCode()

```java
public int hashCode()
```

Returns the hash code value for this map entry.  The hash code
of a map entry {@code e} is defined to be: <pre>
  (e.getKey()==null   ? 0 : e.getKey().hashCode()) ^
  (e.getValue()==null ? 0 : e.getValue().hashCode())</pre>
This ensures that {@code e1.equals(e2)} implies that
{@code e1.hashCode()==e2.hashCode()} for any two Entries
{@code e1} and {@code e2}, as required by the general
contract of {@link Object#hashCode}.

@return the hash code value for this map entry
@see    #equals

## AbstractMap.toString()

```java
public String toString()
```

Returns a String representation of this map entry.  This
implementation returns the string representation of this
entry's key followed by the equals character ("{@code =}")
followed by the string representation of this entry's value.

@return a String representation of this map entry