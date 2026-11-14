---
title: "Collections class (java.util) (part 5 of 6)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Collections.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Collections class (java.util) (part 5 of 6)

## Collections.emptyIterator()

```java
public static <T> Iterator<T> emptyIterator()
```

Returns an iterator that has no elements.  More precisely,

- hasNext always returns `false`.

- next always throws `NoSuchElementException`.

- remove always throws `IllegalStateException`.

Implementations of this method are permitted, but not
required, to return the same object from multiple invocations.

Parameters:

- `<T>`: type of elements, if there were any, in the iterator

**Returns:** an empty iterator

**Since:** 1.7

## Collections.emptyListIterator()

```java
public static <T> ListIterator<T> emptyListIterator()
```

Returns a list iterator that has no elements.  More precisely,

- hasNext and hasPrevious always return `false`.

- next and previous always throw `NoSuchElementException`.

- remove and set always throw `IllegalStateException`.

- add always throws `UnsupportedOperationException`.

- nextIndex always returns
`0`.

- previousIndex always
returns `-1`.

Implementations of this method are permitted, but not
required, to return the same object from multiple invocations.

Parameters:

- `<T>`: type of elements, if there were any, in the iterator

**Returns:** an empty list iterator

**Since:** 1.7

## Collections.emptyEnumeration()

```java
public static <T> Enumeration<T> emptyEnumeration()
```

Returns an enumeration that has no elements.  More precisely,

- hasMoreElements always
returns `false`.

-  nextElement always throws
`NoSuchElementException`.

Implementations of this method are permitted, but not
required, to return the same object from multiple invocations.

Parameters:

- `<T>`: the class of the objects in the enumeration

**Returns:** an empty enumeration

**Since:** 1.7

## Collections.EMPTY_SET

```java
public static final Set EMPTY_SET
```

The empty set (immutable).  This set is serializable.

**See also:** #emptySet()

## Collections.emptySet()

```java
public static final <T> Set<T> emptySet()
```

Returns an empty set (immutable).  This set is serializable.
Unlike the like-named field, this method is parameterized.

This example illustrates the type-safe way to obtain an empty set:

```java
    Set<String> s = Collections.emptySet();
```

Parameters:

- `<T>`: the class of the objects in the set

**Implementation note:** Implementations of this method need not create a separate
`Set` object for each call.  Using this method is likely to have
comparable cost to using the like-named field.  (Unlike this method, the
field does not provide type safety.)

**Returns:** the empty set

**See also:** #EMPTY_SET

**Since:** 1.5

## Collections.emptySortedSet()

```java
public static <E> SortedSet<E> emptySortedSet()
```

Returns an empty sorted set (immutable).  This set is serializable.

This example illustrates the type-safe way to obtain an empty
sorted set:

```java
    SortedSet<String> s = Collections.emptySortedSet();
```

Parameters:

- `<E>`: type of elements, if there were any, in the set

**Implementation note:** Implementations of this method need not create a separate
`SortedSet` object for each call.

**Returns:** the empty sorted set

**Since:** 1.8

## Collections.emptyNavigableSet()

```java
public static <E> NavigableSet<E> emptyNavigableSet()
```

Returns an empty navigable set (immutable).  This set is serializable.

This example illustrates the type-safe way to obtain an empty
navigable set:

```java
    NavigableSet<String> s = Collections.emptyNavigableSet();
```

Parameters:

- `<E>`: type of elements, if there were any, in the set

**Implementation note:** Implementations of this method need not
create a separate `NavigableSet` object for each call.

**Returns:** the empty navigable set

**Since:** 1.8

## Collections.EMPTY_LIST

```java
public static final List EMPTY_LIST
```

The empty list (immutable).  This list is serializable.

**See also:** #emptyList()

## Collections.emptyList()

```java
public static final <T> List<T> emptyList()
```

Returns an empty list (immutable).  This list is serializable.

This example illustrates the type-safe way to obtain an empty list:

```java
    List<String> s = Collections.emptyList();
```

Parameters:

- `<T>`: type of elements, if there were any, in the list

**Implementation note:** Implementations of this method need not create a separate `List`
object for each call.   Using this method is likely to have comparable
cost to using the like-named field.  (Unlike this method, the field does
not provide type safety.)

**Returns:** an empty immutable list

**See also:** #EMPTY_LIST

**Since:** 1.5

## Collections.EMPTY_MAP

```java
public static final Map EMPTY_MAP
```

The empty map (immutable).  This map is serializable.

**See also:** #emptyMap()

**Since:** 1.3

## Collections.emptyMap()

```java
public static final <K,V> Map<K,V> emptyMap()
```

Returns an empty map (immutable).  This map is serializable.

This example illustrates the type-safe way to obtain an empty map:

```java
    Map<String, Date> s = Collections.emptyMap();
```

Parameters:

- `<K>`: the class of the map keys
- `<V>`: the class of the map values

**Implementation note:** Implementations of this method need not create a separate
`Map` object for each call.  Using this method is likely to have
comparable cost to using the like-named field.  (Unlike this method, the
field does not provide type safety.)

**Returns:** an empty map

**See also:** #EMPTY_MAP

**Since:** 1.5

## Collections.emptySortedMap()

```java
public static final <K,V> SortedMap<K,V> emptySortedMap()
```

Returns an empty sorted map (immutable).  This map is serializable.

This example illustrates the type-safe way to obtain an empty map:

```java
    SortedMap<String, Date> s = Collections.emptySortedMap();
```

Parameters:

- `<K>`: the class of the map keys
- `<V>`: the class of the map values

**Implementation note:** Implementations of this method need not create a separate
`SortedMap` object for each call.

**Returns:** an empty sorted map

**Since:** 1.8

## Collections.emptyNavigableMap()

```java
public static final <K,V> NavigableMap<K,V> emptyNavigableMap()
```

Returns an empty navigable map (immutable).  This map is serializable.

This example illustrates the type-safe way to obtain an empty map:

```java
    NavigableMap<String, Date> s = Collections.emptyNavigableMap();
```

Parameters:

- `<K>`: the class of the map keys
- `<V>`: the class of the map values

**Implementation note:** Implementations of this method need not create a separate
`NavigableMap` object for each call.

**Returns:** an empty navigable map

**Since:** 1.8

## Collections.singleton(T)

```java
public static <T> Set<T> singleton(T o)
```

Returns an immutable set containing only the specified object.
The returned set is serializable.

Parameters:

- `<T>`: the class of the objects in the set
- `o`: the sole object to be stored in the returned set.

**Returns:** an immutable set containing only the specified object.

## Collections.singletonList(T)

```java
public static <T> List<T> singletonList(T o)
```

Returns an immutable list containing only the specified object.
The returned list is serializable.

Parameters:

- `<T>`: the class of the objects in the list
- `o`: the sole object to be stored in the returned list.

**Returns:** an immutable list containing only the specified object.

**Since:** 1.3

## Collections.singletonMap(K, V)

```java
public static <K,V> Map<K,V> singletonMap(K key, V value)
```

Returns an immutable map, mapping only the specified key to the
specified value.  The returned map is serializable.

Parameters:

- `<K>`: the class of the map keys
- `<V>`: the class of the map values
- `key`: the sole key to be stored in the returned map.
- `value`: the value to which the returned map maps `key`.

**Returns:** an immutable map containing only the specified key-value
        mapping.

**Since:** 1.3

## Collections.nCopies(int, T)

```java
public static <T> List<T> nCopies(int n, T o)
```

Returns an immutable list consisting of `n` copies of the
specified object.  The newly allocated data object is tiny (it contains
a single reference to the data object).  This method is useful in
combination with the `List.addAll` method to grow lists.
The returned list is serializable.

Parameters:

- `<T>`: the class of the object to copy and of the objects in the returned list.
- `n`: the number of elements in the returned list.
- `o`: the element to appear repeatedly in the returned list.

**Returns:** an immutable list consisting of `n` copies of the
        specified object.

**See also:** List#addAll(Collection)

**See also:** List#addAll(int, Collection)

Throws:

- `IllegalArgumentException`: if `n < 0`

## Collections.reverseOrder()

```java
public static <T> Comparator<T> reverseOrder()
```

Returns a comparator that imposes the reverse of the *natural
ordering* on a collection of objects that implement the
`Comparable` interface.  (The natural ordering is the ordering
imposed by the objects' own `compareTo` method.)  This enables a
simple idiom for sorting (or maintaining) collections (or arrays) of
objects that implement the `Comparable` interface in
reverse-natural-order.  For example, suppose `a` is an array of
strings. Then:

```java
         Arrays.sort(a, Collections.reverseOrder());
```

 sorts the array in reverse-lexicographic (alphabetical) order.

The returned comparator is serializable.

Parameters:

- `<T>`: the class of the objects compared by the comparator

**API note:** This method returns a `Comparator` that is suitable for sorting
elements in reverse order. To obtain a reverse-ordered *view* of a
sequenced collection, use the SequencedCollection.reversed method. Or, to obtain a reverse-ordered
*view* of a sequenced map, use the SequencedMap.reversed method.

**Returns:** A comparator that imposes the reverse of the *natural
        ordering* on a collection of objects that implement
        the `Comparable` interface.

**See also:** Comparable

## Collections.reverseOrder(Comparator<T>)

```java
public static <T> Comparator<T> reverseOrder(Comparator<T> cmp)
```

Returns a comparator that imposes the reverse ordering of the specified
comparator.  If the specified comparator is `null`, this method is
equivalent to `reverseOrder()` (in other words, it returns a
comparator that imposes the reverse of the *natural ordering* on
a collection of objects that implement the Comparable interface).

The returned comparator is serializable (assuming the specified
comparator is also serializable or `null`).

Parameters:

- `<T>`: the class of the objects compared by the comparator
- `cmp`: a comparator who's ordering is to be reversed by the returned comparator or `null`

**API note:** This method returns a `Comparator` that is suitable for sorting
elements in reverse order. To obtain a reverse-ordered *view* of a
sequenced collection, use the SequencedCollection.reversed method. Or, to obtain a reverse-ordered
*view* of a sequenced map, use the SequencedMap.reversed method.

**Returns:** A comparator that imposes the reverse ordering of the
        specified comparator.

**Since:** 1.5

## Collections.enumeration(Collection<T>)

```java
public static <T> Enumeration<T> enumeration(final Collection<T> c)
```

Returns an enumeration over the specified collection.  This provides
interoperability with legacy APIs that require an enumeration
as input.

The iterator returned from a call to `Enumeration.asIterator()`
does not support removal of elements from the specified collection.  This
is necessary to avoid unintentionally increasing the capabilities of the
returned enumeration.

Parameters:

- `<T>`: the class of the objects in the collection
- `c`: the collection for which an enumeration is to be returned.

**Returns:** an enumeration over the specified collection.

**See also:** Enumeration

## Collections.list(Enumeration<T>)

```java
public static <T> ArrayList<T> list(Enumeration<T> e)
```

Returns an array list containing the elements returned by the
specified enumeration in the order they are returned by the
enumeration.  This method provides interoperability between
legacy APIs that return enumerations and new APIs that require
collections.

Parameters:

- `<T>`: the class of the objects returned by the enumeration
- `e`: enumeration providing elements for the returned array list

**Returns:** an array list containing the elements returned
        by the specified enumeration.

**Since:** 1.4

**See also:** Enumeration

**See also:** ArrayList

## Collections.frequency(Collection<?>, Object)

```java
public static int frequency(Collection<?> c, Object o)
```

Returns the number of elements in the specified collection equal to the
specified object.  More formally, returns the number of elements
`e` in the collection such that
`Objects.equals(o, e)`.

Parameters:

- `c`: the collection in which to determine the frequency of `o`
- `o`: the object whose frequency is to be determined

**Returns:** the number of elements in `c` equal to `o`

**Since:** 1.5

Throws:

- `NullPointerException`: if `c` is null

## Collections.disjoint(Collection<?>, Collection<?>)

```java
public static boolean disjoint(Collection<?> c1, Collection<?> c2)
```

Returns `true` if the two specified collections have no
elements in common.

Care must be exercised if this method is used on collections that
do not comply with the general contract for `Collection`.
Implementations may elect to iterate over either collection and test
for containment in the other collection (or to perform any equivalent
computation).  If either collection uses a nonstandard equality test
(as does a `SortedSet` whose ordering is not *compatible with
equals*, or the key set of an `IdentityHashMap`), both
collections must use the same nonstandard equality test, or the
result of this method is undefined.

Care must also be exercised when using collections that have
restrictions on the elements that they may contain. Collection
implementations are allowed to throw exceptions for any operation
involving elements they deem ineligible. For absolute safety the
specified collections should contain only elements which are
eligible elements for both collections.

Note that it is permissible to pass the same collection in both
parameters, in which case the method will return `true` if and
only if the collection is empty.

Parameters:

- `c1`: a collection
- `c2`: a collection

**Returns:** `true` if the two specified collections have no
elements in common.

**Since:** 1.5

Throws:

- `NullPointerException`: if either collection is `null`.
- `NullPointerException`: if one collection contains a `null` element and `null` is not an eligible element for the other collection. (optional)
- `ClassCastException`: if one collection contains an element that is of a type which is ineligible for the other collection. (optional)
