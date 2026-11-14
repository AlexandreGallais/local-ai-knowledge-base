---
title: "AbstractMap class (java.util) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/AbstractMap.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AbstractMap class (java.util)

```java
public abstract class AbstractMap<K,V> implements Map<K,V>
```

This class provides a skeletal implementation of the `Map`
interface, to minimize the effort required to implement this interface.

To implement an unmodifiable map, the programmer needs only to extend this
class and provide an implementation for the `entrySet` method, which
returns a set-view of the map's mappings.  Typically, the returned set
will, in turn, be implemented atop `AbstractSet`.  This set should
not support the `add` or `remove` methods, and its iterator
should not support the `remove` method.

To implement a modifiable map, the programmer must additionally override
this class's `put` method (which otherwise throws an
`UnsupportedOperationException`), and the iterator returned by
`entrySet().iterator()` must additionally implement its
`remove` method.

The programmer should generally provide a void (no argument) and map
constructor, as per the recommendation in the `Map` interface
specification.

The documentation for each non-abstract method in this class describes its
implementation in detail.  Each of these methods may be overridden if the
map being implemented admits a more efficient implementation.

This class is a member of the

Java Collections Framework.

Parameters:

- `<K>`: the type of keys maintained by this map
- `<V>`: the type of mapped values

**See also:** Map

**See also:** Collection

**Since:** 1.2

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

(inherited documentation)

**Implementation requirements:** This implementation returns `entrySet().size()`.

## AbstractMap.isEmpty()

```java
public boolean isEmpty()
```

(inherited documentation)

**Implementation requirements:** This implementation returns `size() == 0`.

## AbstractMap.containsValue(Object)

```java
public boolean containsValue(Object value)
```

(inherited documentation)

**Implementation requirements:** This implementation iterates over `entrySet()` searching
for an entry with the specified value.  If such an entry is found,
`true` is returned.  If the iteration terminates without
finding such an entry, `false` is returned.  Note that this
implementation requires linear time in the size of the map.

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)

## AbstractMap.containsKey(Object)

```java
public boolean containsKey(Object key)
```

(inherited documentation)

**Implementation requirements:** This implementation iterates over `entrySet()` searching
for an entry with the specified key.  If such an entry is found,
`true` is returned.  If the iteration terminates without
finding such an entry, `false` is returned.  Note that this
implementation requires linear time in the size of the map; many
implementations will override this method.

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)

## AbstractMap.get(Object)

```java
public V get(Object key)
```

(inherited documentation)

**Implementation requirements:** This implementation iterates over `entrySet()` searching
for an entry with the specified key.  If such an entry is found,
the entry's value is returned.  If the iteration terminates without
finding such an entry, `null` is returned.  Note that this
implementation requires linear time in the size of the map; many
implementations will override this method.

Throws:

- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)

## AbstractMap.put(K, V)

```java
public V put(K key, V value)
```

(inherited documentation)

**Implementation requirements:** This implementation always throws an
`UnsupportedOperationException`.

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## AbstractMap.remove(Object)

```java
public V remove(Object key)
```

(inherited documentation)

**Implementation requirements:** This implementation iterates over `entrySet()` searching for an
entry with the specified key.  If such an entry is found, its value is
obtained with its `getValue` operation, the entry is removed
from the collection (and the backing map) with the iterator's
`remove` operation, and the saved value is returned.  If the
iteration terminates without finding such an entry, `null` is
returned.  Note that this implementation requires linear time in the
size of the map; many implementations will override this method.

Note that this implementation throws an
`UnsupportedOperationException` if the `entrySet`
iterator does not support the `remove` method and this map
contains a mapping for the specified key.

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)

## AbstractMap.putAll(Map<? extends K, ? extends V>)

```java
public void putAll(Map<? extends K, ? extends V> m)
```

(inherited documentation)

**Implementation requirements:** This implementation iterates over the specified map's
`entrySet()` collection, and calls this map's `put`
operation once for each entry returned by the iteration.

Note that this implementation throws an
`UnsupportedOperationException` if this map does not support
the `put` operation and the specified map is nonempty.

Throws:

- `UnsupportedOperationException`: (inherited documentation)
- `ClassCastException`: (inherited documentation)
- `NullPointerException`: (inherited documentation)
- `IllegalArgumentException`: (inherited documentation)

## AbstractMap.clear()

```java
public void clear()
```

(inherited documentation)

**Implementation requirements:** This implementation calls `entrySet().clear()`.

Note that this implementation throws an
`UnsupportedOperationException` if the `entrySet`
does not support the `clear` operation.

Throws:

- `UnsupportedOperationException`: (inherited documentation)

## AbstractMap.keySet()

```java
public Set<K> keySet()
```

(inherited documentation)

**Implementation requirements:** This implementation returns a set that subclasses `AbstractSet`.
The subclass's iterator method returns a "wrapper object" over this
map's `entrySet()` iterator.  The `size` method
delegates to this map's `size` method and the
`contains` method delegates to this map's
`containsKey` method.

The set is created the first time this method is called,
and returned in response to all subsequent calls.  No synchronization
is performed, so there is a slight chance that multiple calls to this
method will not all return the same set.

## AbstractMap.values()

```java
public Collection<V> values()
```

(inherited documentation)

**Implementation requirements:** This implementation returns a collection that subclasses `AbstractCollection`.  The subclass's iterator method returns a
"wrapper object" over this map's `entrySet()` iterator.
The `size` method delegates to this map's `size`
method and the `contains` method delegates to this map's
`containsValue` method.

The collection is created the first time this method is called, and
returned in response to all subsequent calls.  No synchronization is
performed, so there is a slight chance that multiple calls to this
method will not all return the same collection.

## AbstractMap.equals(Object)

```java
public boolean equals(Object o)
```

Compares the specified object with this map for equality.  Returns
`true` if the given object is also a map and the two maps
represent the same mappings.  More formally, two maps `m1` and
`m2` represent the same mappings if
`m1.entrySet().equals(m2.entrySet())`.  This ensures that the
`equals` method works properly across different implementations
of the `Map` interface.

Parameters:

- `o`: object to be compared for equality with this map

**Implementation requirements:** This implementation first checks if the specified object is this map;
if so it returns `true`.  Then, it checks if the specified
object is a map whose size is identical to the size of this map; if
not, it returns `false`.  If so, it iterates over this map's
`entrySet` collection, and checks that the specified map
contains each mapping that this map contains.  If the specified map
fails to contain such a mapping, `false` is returned.  If the
iteration completes, `true` is returned.

**Returns:** `true` if the specified object is equal to this map

## AbstractMap.hashCode()

```java
public int hashCode()
```

Returns the hash code value for this map.  The hash code of a map is
defined to be the sum of the hash codes of each entry in the map's
`entrySet()` view.  This ensures that `m1.equals(m2)`
implies that `m1.hashCode()==m2.hashCode()` for any two maps
`m1` and `m2`, as required by the general contract of
`Object.hashCode`.

**Implementation requirements:** This implementation iterates over `entrySet()`, calling
hashCode() on each element (entry) in the
set, and adding up the results.

**Returns:** the hash code value for this map

**See also:** Map.Entry#hashCode()

**See also:** Object#equals(Object)

**See also:** Set#equals(Object)

## AbstractMap.toString()

```java
public String toString()
```

Returns a string representation of this map.  The string representation
consists of a list of key-value mappings in the order returned by the
map's `entrySet` view's iterator, enclosed in braces
(`"{}"`).  Adjacent mappings are separated by the characters
`", "` (comma and space).  Each key-value mapping is rendered as
the key <example-value> by an equals sign (`"="`) followed by the
associated value.  Keys and values are converted to strings as by
`String.valueOf(Object)`.

**Returns:** a string representation of this map

## AbstractMap.clone()

```java
protected Object clone() throws CloneNotSupportedException
```

Returns a shallow copy of this `AbstractMap` instance: the keys
and values themselves are not cloned.

**Returns:** a shallow copy of this map

## AbstractMap.SimpleEntry(K, V)

```java
public SimpleEntry(K key, V value)
```

Creates an entry representing a mapping from the specified
key to the specified value.

Parameters:

- `key`: the key <example-value> by this entry
- `value`: the value represented by this entry

## AbstractMap.SimpleEntry(Entry<? extends K, ? extends V>)

```java
public SimpleEntry(Entry<? extends K, ? extends V> entry)
```

Creates an entry representing the same mapping as the
specified entry.

Parameters:

- `entry`: the entry to copy

## AbstractMap.getKey()

```java
public K getKey()
```

Returns the key <example-value> to this entry.

**Returns:** the key <example-value> to this entry

## AbstractMap.getValue()

```java
public V getValue()
```

Returns the value corresponding to this entry.

**Returns:** the value corresponding to this entry

## AbstractMap.setValue(V)

```java
public V setValue(V value)
```

Replaces the value corresponding to this entry with the specified
value.

Parameters:

- `value`: new value to be stored in this entry

**Returns:** the old value corresponding to the entry

## AbstractMap.equals(Object)

```java
public boolean equals(Object o)
```

Compares the specified object with this entry for equality.
Returns `true` if the given object is also a map entry and
the two entries represent the same mapping.  More formally, two
entries `e1` and `e2` represent the same mapping
if

```java
  (e1.getKey()==null ?
   e2.getKey()==null :
   e1.getKey().equals(e2.getKey()))
  &&
  (e1.getValue()==null ?
   e2.getValue()==null :
   e1.getValue().equals(e2.getValue()))
```

This ensures that the `equals` method works properly across
different implementations of the `Map.Entry` interface.

Parameters:

- `o`: object to be compared for equality with this map entry

**Returns:** `true` if the specified object is equal to this map
        entry

**See also:** #hashCode

## AbstractMap.hashCode()

```java
public int hashCode()
```

Returns the hash code value for this map entry.  The hash code
of a map entry `e` is defined to be:

```java
  (e.getKey()==null   ? 0 : e.getKey().hashCode()) ^
  (e.getValue()==null ? 0 : e.getValue().hashCode())
```

This ensures that `e1.equals(e2)` implies that
`e1.hashCode()==e2.hashCode()` for any two Entries
`e1` and `e2`, as required by the general
contract of `Object.hashCode`.

**Returns:** the hash code value for this map entry

**See also:** #equals

## AbstractMap.toString()

```java
public String toString()
```

Returns a String representation of this map entry.  This
implementation returns the string representation of this
entry's key <example-value> by the equals character ("`=`")
followed by the string representation of this entry's value.

**Returns:** a String representation of this map entry

## AbstractMap.SimpleImmutableEntry(K, V)

```java
public SimpleImmutableEntry(K key, V value)
```

Creates an entry representing a mapping from the specified
key to the specified value.

Parameters:

- `key`: the key <example-value> by this entry
- `value`: the value represented by this entry

## AbstractMap.SimpleImmutableEntry(Entry<? extends K, ? extends V>)

```java
public SimpleImmutableEntry(Entry<? extends K, ? extends V> entry)
```

Creates an entry representing the same mapping as the
specified entry.

Parameters:

- `entry`: the entry to copy

## AbstractMap.getKey()

```java
public K getKey()
```

Returns the key <example-value> to this entry.

**Returns:** the key <example-value> to this entry

## AbstractMap.getValue()

```java
public V getValue()
```

Returns the value corresponding to this entry.

**Returns:** the value corresponding to this entry

## AbstractMap.setValue(V)

```java
public V setValue(V value)
```

Replaces the value corresponding to this entry with the specified
value (optional operation).  This implementation simply throws
`UnsupportedOperationException`, as this class implements
an unmodifiable map entry.

Parameters:

- `value`: new value to be stored in this entry

**Implementation requirements:** The implementation in this class always throws `UnsupportedOperationException`.

**Returns:** (Does not return)

Throws:

- `UnsupportedOperationException`: always
