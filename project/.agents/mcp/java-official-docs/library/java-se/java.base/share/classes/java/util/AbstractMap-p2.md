---
title: "AbstractMap class (java.util) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/AbstractMap.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AbstractMap class (java.util) (part 2 of 2)

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
