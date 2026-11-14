---
title: "SequenceLayout interface (java.lang.foreign)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/foreign/SequenceLayout.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# SequenceLayout interface (java.lang.foreign)

```java
public sealed interface SequenceLayout extends MemoryLayout permits SequenceLayoutImpl
```

A compound layout that denotes a homogeneous repetition of a given
*element layout*. The repetition count is said to be the sequence layout's
*element count*. A sequence layout can be thought of as a struct layout where
the sequence layout's element layout is repeated a number of times that is equal to
the sequence layout's element count. In other words this layout:

is equivalent to the following layout:

**Implementation requirements:** This class is immutable, thread-safe and
value-based.

**Since:** 22

## SequenceLayout.elementLayout()

```java
MemoryLayout elementLayout()
```

## SequenceLayout.elementCount()

```java
long elementCount()
```

## SequenceLayout.withElementCount(long)

```java
SequenceLayout withElementCount(long elementCount)
```

Parameters:

- `elementCount`: the new element count

Throws:

- `IllegalArgumentException`: if `elementCount` is negative
- `IllegalArgumentException`: if `elementLayout.bitSize() * elementCount` overflows

## SequenceLayout.reshape(long...)

```java
SequenceLayout reshape(long... elementCounts)
```

Rearranges the elements in this sequence layout into a multidimensional sequence
layout. The resulting layout is a sequence layout where element layouts in the
flattened projection of this sequence layout are
rearranged into one or more nested sequence layouts according to the provided
element counts. This transformation preserves the layout size;
that is, multiplying the provided element counts must yield the same element count
as the flattened projection of this sequence layout.

For instance, given a sequence layout of the kind:

calling `seq.reshape(2, 6)` will yield the following sequence layout:

If one of the provided element counts is the special value `-1`, then
the element count in that position will be inferred from the remaining element
counts and the element count of the flattened projection of this layout.
For instance, a layout equivalent to the above `reshapeSeq` can also be
computed in the following ways:

Parameters:

- `elementCounts`: an array of element counts, of which at most one can be `-1`

**Returns:** a sequence layout where element layouts in the
        flattened projection of this sequence layout
        (see `flatten()`) are re-arranged into one or more nested
        sequence layouts

Throws:

- `IllegalArgumentException`: if two or more element counts are set to `-1`, or if one or more element count is `<= 0` (but other than `-1`) or, if, after any required inference, multiplying the element counts does not yield the same element count as the flattened projection of this sequence layout

## SequenceLayout.flatten()

```java
SequenceLayout flatten()
```

Returns a flattened sequence layout. The element layout of the returned
sequence layout is the first non-sequence layout found by inspecting
(recursively, if needed) the element layout of this sequence layout:

This transformation preserves the layout size; nested sequence layout in this
sequence layout will be dropped and their element counts will be incorporated
into that of the returned sequence layout. For instance, given a
sequence layout of the kind:

calling `seq.flatten()` will yield the following sequence layout:

**Returns:** a sequence layout with the same size as this layout
        (but, possibly, with different element count), whose
        element layout is not a sequence layout

## SequenceLayout.withName(String)

```java
SequenceLayout withName(String name)
```

(inherited documentation)

## SequenceLayout.withoutName()

```java
MemoryLayout withoutName()
```

(inherited documentation)

## SequenceLayout.withByteAlignment(long)

```java
SequenceLayout withByteAlignment(long byteAlignment)
```

(inherited documentation)

Throws:

- `IllegalArgumentException`: (inherited documentation)
- `IllegalArgumentException`: if `byteAlignment < elementLayout().byteAlignment()`
