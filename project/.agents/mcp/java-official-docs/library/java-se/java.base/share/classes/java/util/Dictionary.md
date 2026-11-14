---
title: "Dictionary class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Dictionary.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Dictionary class (java.util)

```java
public abstract class Dictionary<K,V>
```

The `Dictionary` class is the abstract parent of any
class, such as `Hashtable`, which maps keys to values.
Every key and every value is an object. In any one `Dictionary`
object, every key is associated with at most one value. Given a
`Dictionary` and a key, the associated element can be looked up.
Any non-`null` object can be used as a key and as a value.

As a rule, the `equals` method should be used by
implementations of this class to decide if two keys are the same.

**NOTE: This class is obsolete.  New implementations should
implement the Map interface, rather than extending this class.**

Parameters:

- `<K>`: the type of keys
- `<V>`: the type of mapped values

**See also:** java.util.Map

**See also:** java.lang.Object#equals(java.lang.Object)

**See also:** java.lang.Object#hashCode()

**See also:** java.util.Hashtable

**Since:** 1.0

## Dictionary.Dictionary()

```java
public Dictionary()
```

Sole constructor.  (For invocation by subclass constructors, typically
implicit.)

## Dictionary.size()

```java
public abstract int size()
```

Returns the number of entries (distinct keys) in this dictionary.

**Returns:** the number of keys in this dictionary.

## Dictionary.isEmpty()

```java
public abstract boolean isEmpty()
```

Tests if this dictionary maps no keys to value. The general contract
for the `isEmpty` method is that the result is true if and only
if this dictionary contains no entries.

**Returns:** `true` if this dictionary maps no keys to values;
         `false` otherwise.

## Dictionary.keys()

```java
public abstract Enumeration<K> keys()
```

Returns an enumeration of the keys in this dictionary. The general
contract for the keys method is that an `Enumeration` object
is returned that will generate all the keys for which this dictionary
contains entries.

**Returns:** an enumeration of the keys in this dictionary.

**See also:** java.util.Dictionary#elements()

**See also:** java.util.Enumeration

## Dictionary.elements()

```java
public abstract Enumeration<V> elements()
```

Returns an enumeration of the values in this dictionary. The general
contract for the `elements` method is that an
`Enumeration` is returned that will generate all the elements
contained in entries in this dictionary.

**Returns:** an enumeration of the values in this dictionary.

**See also:** java.util.Dictionary#keys()

**See also:** java.util.Enumeration

## Dictionary.get(Object)

```java
public abstract V get(Object key)
```

Returns the value to which the key is mapped in this dictionary.
The general contract for the `isEmpty` method is that if this
dictionary contains an entry for the specified key, the associated
value is returned; otherwise, `null` is returned.

Parameters:

- `key`: a key in this dictionary. `null` if the key is not mapped to any value in this dictionary.

**Returns:** the value to which the key is mapped in this dictionary;

**See also:** java.util.Dictionary#put(java.lang.Object, java.lang.Object)

Throws:

- `NullPointerException`: if the `key` is `null`.

## Dictionary.put(K, V)

```java
public abstract V put(K key, V value)
```

Maps the specified `key` to the specified
`value` in this dictionary. Neither the key nor the
value can be `null`.

If this dictionary already contains an entry for the specified
`key`, the value already in this dictionary for that
`key` is returned, after modifying the entry to contain the
 new element.

If this dictionary does not already have an entry
 for the specified `key`, an entry is created for the
 specified `key` and `value`, and `null` is
 returned.

The `value` can be retrieved by calling the
`get` method with a `key` that is equal to
the original `key`.

Parameters:

- `key`: the hashtable key.
- `value`: the value.

**Returns:** the previous value to which the `key` was mapped
            in this dictionary, or `null` if the key did not
            have a previous mapping.

**See also:** java.lang.Object#equals(java.lang.Object)

**See also:** java.util.Dictionary#get(java.lang.Object)

Throws:

- `NullPointerException`: if the `key` or `value` is `null`.

## Dictionary.remove(Object)

```java
public abstract V remove(Object key)
```

Removes the `key` (and its corresponding
`value`) from this dictionary. This method does nothing
if the `key` is not in this dictionary.

Parameters:

- `key`: the key that needs to be removed.

**Returns:** the value to which the `key` had been mapped in this
         dictionary, or `null` if the key did not have a
         mapping.

Throws:

- `NullPointerException`: if `key` is `null`.
