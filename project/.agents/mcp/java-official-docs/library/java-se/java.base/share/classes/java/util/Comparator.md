---
title: "Comparator interface (java.util) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Comparator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Comparator interface (java.util)

```java
public interface Comparator<T>
```

A comparison function, which imposes a *total ordering* on
some collection of objects.  Comparators can be passed to a sort
method (such as Collections.sort or Arrays.sort) to allow precise control over the sort order.
Comparators can also be used to control the order of certain data
structures (such as sorted sets or
sorted maps), or to provide an ordering for
collections of objects that don't have a natural ordering.

The ordering imposed by a comparator `c` on a set of elements
`S` is said to be *consistent with equals* if and only if
`c.compare(e1, e2)==0` has the same boolean value as
`e1.equals(e2)` for every `e1` and `e2` in
`S`.

Caution should be exercised when using a comparator capable of imposing an
ordering inconsistent with equals to order a sorted set (or sorted map).
Suppose a sorted set (or sorted map) with an explicit comparator `c`
is used with elements (or keys) drawn from a set `S`.  If the
ordering imposed by `c` on `S` is inconsistent with equals,
the sorted set (or sorted map) will behave "strangely."  In particular the
sorted set (or sorted map) will violate the general contract for set (or
map), which is defined in terms of `equals`.

For example, suppose one adds two elements `a` and `b` such that
`(a.equals(b) && c.compare(a, b) != 0)`
to an empty `TreeSet` with comparator `c`.
The second `add` operation will return
true (and the size of the tree set will increase) because `a` and
`b` are not equivalent from the tree set's perspective, even though
this is contrary to the specification of the
Set.add method.

Note: It is generally a good idea for comparators to also implement
`java.io.Serializable`, as they may be used as ordering methods in
serializable data structures (like `TreeSet`, `TreeMap`).  In
order for the data structure to serialize successfully, the comparator (if
provided) must implement `Serializable`.

For the mathematically inclined, the *relation* that defines the
*imposed ordering* that a given comparator `c` imposes on a
given set of objects `S` is:

```java
      {(x, y) such that c.compare(x, y) <= 0}.
```

 The *quotient* for this total order is:

```java
      {(x, y) such that c.compare(x, y) == 0}.
```

It follows immediately from the contract for `compare` that the
quotient is an *equivalence relation* on `S`, and that the
imposed ordering is a *total order* on `S`.  When we say that
the ordering imposed by `c` on `S` is *consistent with
equals*, we mean that the quotient for the ordering is the equivalence
relation defined by the objects' equals(Object) method(s):

```java
    {(x, y) such that x.equals(y)}.
```

In other words, when the imposed ordering is consistent with
equals, the equivalence classes defined by the equivalence relation
of the `equals` method and the equivalence classes defined by
the quotient of the `compare` method are the same.

Unlike `Comparable`, a comparator may optionally permit
comparison of null arguments, while maintaining the requirements for
an equivalence relation.

This interface is a member of the

Java Collections Framework.

Parameters:

- `<T>`: the type of objects that may be compared by this comparator

**See also:** Comparable

**See also:** java.io.Serializable

**Since:** 1.2

## Comparator.compare(T, T)

```java
int compare(T o1, T o2)
```

Compares its two arguments for order.  Returns a negative integer,
zero, or a positive integer as the first argument is less than, equal
to, or greater than the second.

The implementor must ensure that signum`(compare(x, y)) == -signum(compare(y, x))` for
all `x` and `y`.  (This implies that `compare(x, y)` must throw an exception if and only if `compare(y, x)` throws an exception.)

The implementor must also ensure that the relation is transitive:
`((compare(x, y)>0) && (compare(y, z)>0))` implies
`compare(x, z)>0`.

Finally, the implementor must ensure that `compare(x, y)==0` implies that `signum(compare(x, z))==signum(compare(y, z))` for all `z`.

Parameters:

- `o1`: the first object to be compared.
- `o2`: the second object to be compared.

**API note:** It is generally the case, but *not* strictly required that
`(compare(x, y)==0) == (x.equals(y))`.  Generally speaking,
any comparator that violates this condition should clearly indicate
this fact.  The recommended language is "Note: this comparator
imposes orderings that are inconsistent with equals."

**Returns:** a negative integer, zero, or a positive integer as the
        first argument is less than, equal to, or greater than the
        second.

Throws:

- `NullPointerException`: if an argument is null and this comparator does not permit null arguments
- `ClassCastException`: if the arguments' types prevent them from being compared by this comparator.

## Comparator.equals(Object)

```java
boolean equals(Object obj)
```

Indicates whether some other object is "equal to"
this comparator.  This method must obey the general contract of
`Object.equals(Object)`.  Additionally, this method can
return `true` *only* if the specified object is also
a comparator and it imposes the same ordering as this
comparator.  Thus, `comp1.equals(comp2)` implies that
signum`(comp1.compare(o1, o2))==signum(comp2.compare(o1, o2))` for every object reference
`o1` and `o2`.

Note that it is *always* safe *not* to override
`Object.equals(Object)`.  However, overriding this method may,
in some cases, improve performance by allowing programs to determine
that two distinct comparators impose the same order.

Parameters:

- `obj`: the reference object with which to compare.

**Returns:** `true` only if the specified object is also
         a comparator and it imposes the same ordering as this
         comparator.

**See also:** Object#equals(Object)

**See also:** Object#hashCode()

## Comparator.reversed()

```java
default Comparator<T> reversed()
```

Returns a comparator that imposes the reverse ordering of this
comparator.

**Returns:** a comparator that imposes the reverse ordering of this
        comparator.

**Since:** 1.8

## Comparator.thenComparing(Comparator<? super T>)

```java
default Comparator<T> thenComparing(Comparator<? super T> other)
```

Returns a lexicographic-order comparator with another comparator.
If this `Comparator` considers two elements equal, i.e.
`compare(a, b) == 0`, `other` is used to determine the order.

The returned comparator is serializable if the specified comparator
is also serializable.

Parameters:

- `other`: the other comparator to be used when this comparator compares two objects that are equal.

**API note:** For example, to sort a collection of `String` based on the length
and then case-insensitive natural ordering, the comparator can be
composed using following code,

```java
    Comparator<String> cmp = Comparator.comparingInt(String::length)
            .thenComparing(String.CASE_INSENSITIVE_ORDER);
```

**Returns:** a lexicographic-order comparator composed of this and then the
        other comparator

**Since:** 1.8

Throws:

- `NullPointerException`: if the argument is null.

## Comparator.thenComparing(Function<? super T, ? extends U>, Comparator<? super U>)

```java
default <U> Comparator<T> thenComparing( Function<? super T, ? extends U> keyExtractor, Comparator<? super U> keyComparator)
```

Returns a lexicographic-order comparator with a function that
extracts a key to be compared with the given `Comparator`.

Parameters:

- ``: the type of the sort key
- `keyExtractor`: the function used to extract the sort key
- `keyComparator`: the `Comparator` used to compare the sort key

**Implementation requirements:** This default implementation behaves as if `thenComparing(comparing(keyExtractor, cmp))`.

**Returns:** a lexicographic-order comparator composed of this comparator
        and then comparing on the key <example-value> by the keyExtractor function

**See also:** #comparing(Function, Comparator)

**See also:** #thenComparing(Comparator)

**Since:** 1.8

Throws:

- `NullPointerException`: if either argument is null.

## Comparator.thenComparing(Function<? super T, ? extends U>)

```java
default <U extends Comparable<? super U>> Comparator<T> thenComparing( Function<? super T, ? extends U> keyExtractor)
```

Returns a lexicographic-order comparator with a function that
extracts a `Comparable` sort key.

Parameters:

- ``: the type of the `Comparable` sort key
- `keyExtractor`: the function used to extract the `Comparable` sort key

**Implementation requirements:** This default implementation behaves as if `thenComparing(comparing(keyExtractor))`.

**Returns:** a lexicographic-order comparator composed of this and then the
        `Comparable` sort key.

**See also:** #comparing(Function)

**See also:** #thenComparing(Comparator)

**Since:** 1.8

Throws:

- `NullPointerException`: if the argument is null.

## Comparator.thenComparingInt(ToIntFunction<? super T>)

```java
default Comparator<T> thenComparingInt(ToIntFunction<? super T> keyExtractor)
```

Returns a lexicographic-order comparator with a function that
extracts an `int` sort key.

Parameters:

- `keyExtractor`: the function used to extract the integer sort key

**Implementation requirements:** This default implementation behaves as if `thenComparing(comparingInt(keyExtractor))`.

**Returns:** a lexicographic-order comparator composed of this and then the
        `int` sort key

**See also:** #comparingInt(ToIntFunction)

**See also:** #thenComparing(Comparator)

**Since:** 1.8

Throws:

- `NullPointerException`: if the argument is null.

## Comparator.thenComparingLong(ToLongFunction<? super T>)

```java
default Comparator<T> thenComparingLong(ToLongFunction<? super T> keyExtractor)
```

Returns a lexicographic-order comparator with a function that
extracts a `long` sort key.

Parameters:

- `keyExtractor`: the function used to extract the long sort key

**Implementation requirements:** This default implementation behaves as if `thenComparing(comparingLong(keyExtractor))`.

**Returns:** a lexicographic-order comparator composed of this and then the
        `long` sort key

**See also:** #comparingLong(ToLongFunction)

**See also:** #thenComparing(Comparator)

**Since:** 1.8

Throws:

- `NullPointerException`: if the argument is null.

## Comparator.thenComparingDouble(ToDoubleFunction<? super T>)

```java
default Comparator<T> thenComparingDouble(ToDoubleFunction<? super T> keyExtractor)
```

Returns a lexicographic-order comparator with a function that
extracts a `double` sort key.

Parameters:

- `keyExtractor`: the function used to extract the double sort key

**Implementation requirements:** This default implementation behaves as if `thenComparing(comparingDouble(keyExtractor))`.

**Returns:** a lexicographic-order comparator composed of this and then the
        `double` sort key

**See also:** #comparingDouble(ToDoubleFunction)

**See also:** #thenComparing(Comparator)

**Since:** 1.8

Throws:

- `NullPointerException`: if the argument is null.

## Comparator.reverseOrder()

```java
public static <T extends Comparable<? super T>> Comparator<T> reverseOrder()
```

Returns a comparator that imposes the reverse of the *natural
ordering*.

The returned comparator is serializable and throws `NullPointerException` when comparing `null`.

Parameters:

- `<T>`: the `Comparable` type of element to be compared

**Returns:** a comparator that imposes the reverse of the *natural
        ordering* on `Comparable` objects.

**See also:** Comparable

**Since:** 1.8

## Comparator.naturalOrder()

```java
public static <T extends Comparable<? super T>> Comparator<T> naturalOrder()
```

Returns a comparator that compares `Comparable` objects in natural
order.

The returned comparator is serializable and throws `NullPointerException` when comparing `null`.

Parameters:

- `<T>`: the `Comparable` type of element to be compared

**Returns:** a comparator that imposes the *natural ordering* on `Comparable` objects.

**See also:** Comparable

**Since:** 1.8

## Comparator.nullsFirst(Comparator<? super T>)

```java
public static <T> Comparator<T> nullsFirst(Comparator<? super T> comparator)
```

Returns a null-friendly comparator that considers `null` to be
less than non-null. When both are `null`, they are considered
equal. If both are non-null, the specified `Comparator` is used
to determine the order. If the specified comparator is `null`,
then the returned comparator considers all non-null values to be equal.

The returned comparator is serializable if the specified comparator
is serializable.

Parameters:

- `<T>`: the type of the elements to be compared
- `comparator`: a `Comparator` for comparing non-null values

**Returns:** a comparator that considers `null` to be less than
        non-null, and compares non-null objects with the supplied
        `Comparator`.

**Since:** 1.8

## Comparator.nullsLast(Comparator<? super T>)

```java
public static <T> Comparator<T> nullsLast(Comparator<? super T> comparator)
```

Returns a null-friendly comparator that considers `null` to be
greater than non-null. When both are `null`, they are considered
equal. If both are non-null, the specified `Comparator` is used
to determine the order. If the specified comparator is `null`,
then the returned comparator considers all non-null values to be equal.

The returned comparator is serializable if the specified comparator
is serializable.

Parameters:

- `<T>`: the type of the elements to be compared
- `comparator`: a `Comparator` for comparing non-null values

**Returns:** a comparator that considers `null` to be greater than
        non-null, and compares non-null objects with the supplied
        `Comparator`.

**Since:** 1.8

## Comparator.comparing(Function<? super T, ? extends U>, Comparator<? super U>)

```java
public static <T, U> Comparator<T> comparing( Function<? super T, ? extends U> keyExtractor, Comparator<? super U> keyComparator)
```

Accepts a function that extracts a sort key from a type `T`, and
returns a `Comparator<T>` that compares by that sort key using
the specified `Comparator`.

The returned comparator is serializable if the specified function
and comparator are both serializable.

Parameters:

- `<T>`: the type of element to be compared
- ``: the type of the sort key
- `keyExtractor`: the function used to extract the sort key
- `keyComparator`: the `Comparator` used to compare the sort key

**API note:** For example, to obtain a `Comparator` that compares `Person` objects by their last name ignoring case differences,

```java
    Comparator<Person> cmp = Comparator.comparing(
            Person::getLastName,
            String.CASE_INSENSITIVE_ORDER);
```

**Returns:** a comparator that compares by an extracted key using the
        specified `Comparator`

**Since:** 1.8

Throws:

- `NullPointerException`: if either argument is null
