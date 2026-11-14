---
title: "BitSet class (java.util) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/BitSet.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# BitSet class (java.util) (part 2 of 2)

## BitSet.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this bit set against the specified object.
The result is `true` if and only if the argument is
not `null` and is a `BitSet` object that has
exactly the same set of bits set to `true` as this bit
set. That is, for every nonnegative `int` index `k`,

```java
((BitSet)obj).get(k) == this.get(k)
```

must be true. The current sizes of the two bit sets are not compared.

Parameters:

- `obj`: the object to compare with

**Returns:** `true` if the objects are the same;
        `false` otherwise

**See also:** #size()

## BitSet.clone()

```java
public Object clone()
```

Cloning this `BitSet` produces a new `BitSet`
that is equal to it.
The clone of the bit set is another bit set that has exactly the
same bits set to `true` as this bit set.

**Returns:** a clone of this bit set

**See also:** #size()

## BitSet.toString()

```java
public String toString()
```

Returns a string representation of this bit set. For every index
for which this `BitSet` contains a bit in the set
state, the decimal representation of that index is included in
the result. Such indices are listed in order from lowest to
highest, separated by ", " (a comma and a space) and
surrounded by braces, resulting in the usual mathematical
notation for a set of integers.

Example:

```java
BitSet drPepper = new BitSet();
```

Now `drPepper.toString()` returns "`{}`".

```java
drPepper.set(2);
```

Now `drPepper.toString()` returns "`{2}`".

```java
drPepper.set(4);
drPepper.set(10);
```

Now `drPepper.toString()` returns "`{2, 4, 10}`".

**Returns:** a string representation of this bit set

## BitSet.stream()

```java
public IntStream stream()
```

Returns a stream of indices for which this `BitSet`
contains a bit in the set state. The indices are returned
in order, from lowest to highest. The size of the stream
is the number of bits in the set state, equal to the value
returned by the `cardinality()` method.

The stream binds to this bit set when the terminal stream operation
commences (specifically, the spliterator for the stream is
*late-binding*).  If the
bit set is modified during that operation then the result is undefined.

**Returns:** a stream of integers representing set indices

**Since:** 1.8
