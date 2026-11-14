---
title: "MemoryLayout interface (java.lang.foreign) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/foreign/MemoryLayout.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MemoryLayout interface (java.lang.foreign) (part 3 of 3)

## MemoryLayout.groupElement(String)

```java
static PathElement groupElement(String name)
```

Parameters:

- `name`: the name of the member layout to be selected

**Implementation requirements:** in case multiple group elements with a matching name exist, the path
          element returned by this method will select the first one; that is,
          the group element with the lowest offset from the current path is
          selected. In such cases, using `groupElement(long)` might be
          preferable.

## MemoryLayout.groupElement(long)

```java
static PathElement groupElement(long index)
```

Parameters:

- `index`: the index of the member layout element to be selected

Throws:

- `IllegalArgumentException`: if `index < 0`

## MemoryLayout.sequenceElement(long)

```java
static PathElement sequenceElement(long index)
```

Parameters:

- `index`: the index of the sequence element to be selected

Throws:

- `IllegalArgumentException`: if `index < 0`

## MemoryLayout.sequenceElement(long, long)

```java
static PathElement sequenceElement(long start, long step)
```

Returns an open path element
that selects the element layout in a *range* of positions in a sequence
layout. The range is expressed as a pair of starting index (inclusive)
`S` and step factor (which can also be negative) `F`.

The exact sequence element selected by this layout is expressed as an index
`I`. If `C` is the
sequence element count, it follows that `0 <= I < B`, where `B`
is computed as follows:

- if `F > 0`, then `B = ceilDiv(C - S, F)`

- if `F < 0`, then `B = ceilDiv(S + 1, -F)`

That is, the size of the returned open path element is `B`.

Parameters:

- `start`: the index of the first sequence element to be selected
- `step`: the step factor at which subsequence sequence elements are to be selected

**Returns:** a path element that selects the sequence element layout with the
        given index.

Throws:

- `IllegalArgumentException`: if `start < 0`, or `step == 0`

## MemoryLayout.sequenceElement()

```java
static PathElement sequenceElement()
```

The exact sequence element selected by this layout is expressed as an index
`I`. If `C` is the sequence element count, it follows that
`0 <= I < C`. That is, `C` is the size of the returned open path element.

## MemoryLayout.dereferenceElement()

```java
static PathElement dereferenceElement()
```

## MemoryLayout.equals(Object)

```java
boolean equals(Object other)
```

Compares the specified object with this layout for equality. Returns `true`
if and only if the specified object is also a layout, and it is equal to this
layout. Two layouts are considered equal if they are of the same kind, have the
same size, name and alignment constraint. Furthermore, depending on the
layout kind, additional conditions must be satisfied:

- two value layouts are considered equal if they have the same
    order, and
    carrier. Additionally, two address
    layouts are considered equal if they also have the same
    target layout;

- two sequence layouts are considered equal if they have the same element
    count (see `SequenceLayout.elementCount()`), and if their element
    layouts (see `SequenceLayout.elementLayout()`) are also equal;

- two group layouts are considered equal if they are of the same type
    (see `StructLayout`, `UnionLayout`) and if their member layouts
    (see `GroupLayout.memberLayouts()`) are also equal.

Parameters:

- `other`: the object to be compared for equality with this layout

**Returns:** `true` if the specified object is equal to this layout

## MemoryLayout.hashCode()

```java
int hashCode()
```

## MemoryLayout.toString()

```java
String toString()
```

## MemoryLayout.paddingLayout(long)

```java
static PaddingLayout paddingLayout(long byteSize)
```

Creates a padding layout with the given byte size. The alignment constraint of the
returned layout is 1. As such, regardless of its size, in the absence of an
explicit alignment constraint, a padding
layout does not affect the natural alignment of the group or sequence layout it is
nested into.

Parameters:

- `byteSize`: the padding size (expressed in bytes)

**Returns:** the new selector layout

Throws:

- `IllegalArgumentException`: if `byteSize <= 0`

## MemoryLayout.sequenceLayout(long, MemoryLayout)

```java
static SequenceLayout sequenceLayout(long elementCount, MemoryLayout elementLayout)
```

Creates a sequence layout with the given element layout and element count.

Parameters:

- `elementCount`: the sequence element count
- `elementLayout`: the sequence element layout

**Returns:** the new sequence layout with the given element layout and size

Throws:

- `IllegalArgumentException`: if `elementCount` is negative
- `IllegalArgumentException`: if `elementLayout.byteSize() * elementCount` overflows
- `IllegalArgumentException`: if `elementLayout.byteSize() % elementLayout.byteAlignment() != 0`

## MemoryLayout.structLayout(MemoryLayout...)

```java
static StructLayout structLayout(MemoryLayout... elements)
```

Creates a struct layout with the given member layouts.

Parameters:

- `elements`: The member layouts of the struct layout

**Returns:** a struct layout with the given member layouts

**API note:** This factory does not automatically align element layouts, by inserting
         additional padding layout elements. As such,
         the following struct layout creation will fail with an exception:

To avoid the exception, clients can either insert additional padding layout
elements:

Or, alternatively, they can use a member layout that features a smaller alignment
constraint. This will result in a *packed* struct layout:

Throws:

- `IllegalArgumentException`: if the sum of the byte sizes of the member layouts overflows
- `IllegalArgumentException`: if a member layout in `elements` occurs at an offset (relative to the start of the struct layout) which is not compatible with its alignment constraint

## MemoryLayout.unionLayout(MemoryLayout...)

```java
static UnionLayout unionLayout(MemoryLayout... elements)
```

Creates a union layout with the given member layouts.

Parameters:

- `elements`: The member layouts of the union layout

**Returns:** a union layout with the given member layouts
