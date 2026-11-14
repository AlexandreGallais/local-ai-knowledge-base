---
title: "MemoryLayout interface (java.lang.foreign) (part 2 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/foreign/MemoryLayout.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MemoryLayout interface (java.lang.foreign) (part 2 of 3)

## MemoryLayout.scale(long, long)

```java
long scale(long offset, long index)
```

Parameters:

- `offset`: the base offset
- `index`: the index to be scaled by the byte size of this layout

Throws:

- `IllegalArgumentException`: if `offset` or `index` is negative
- `ArithmeticException`: if either the addition or multiplication overflows

## MemoryLayout.scaleHandle()

```java
MethodHandle scaleHandle()
```

## MemoryLayout.byteOffset(PathElement...)

```java
long byteOffset(PathElement... elements)
```

Computes the offset, in bytes, of the layout selected by the given layout path,
where the initial layout in the path is this layout.

Parameters:

- `elements`: the layout path elements

**Returns:** The offset, in bytes, of the layout selected by the layout path in
        `elements`

Throws:

- `IllegalArgumentException`: if the layout path is not well-formed for this layout
- `IllegalArgumentException`: if the layout path contains one or more open path elements
- `IllegalArgumentException`: if the layout path contains one or more dereference path elements

## MemoryLayout.byteOffsetHandle(PathElement...)

```java
MethodHandle byteOffsetHandle(PathElement... elements)
```

Creates a method handle that computes the offset, in bytes, of the layout selected
by the given layout path, where the initial layout in the path is this layout.

The returned method handle has the following characteristics:

- its return type is `long`;

- it has one leading `long` parameter representing the base offset;

- it has as zero or more trailing parameters of type `long`, one for
    each open path element in the provided layout
    path. The order of these parameters corresponds to the order in which the
    open path elements occur in the provided layout path.

The final offset returned by the method handle is computed as follows:

```java
offset = b + c_1 + c_2 + ... + c_m + (x_1 * s_1) + (x_2 * s_2) + ... + (x_n * s_n)
```

where `b` represents the base offset provided as a *dynamic*
`long` argument, `x_1`, `x_2`, ... `x_n` represent indices
into sequences provided as *dynamic* `long` arguments, whereas
`s_1`, `s_2`, ... `s_n` are *static* stride constants
derived from the size of the element layout of a sequence, and
`c_1`, `c_2`, ... `c_m` are other *static* offset
constants (such as field offsets) which are derived from the layout path.

For any given dynamic argument `x_i`, it must be that `0 <= x_i < size_i`,
where `size_i` is the size of the open path element associated with `x_i`.
Otherwise, the returned method handle throws `IndexOutOfBoundsException`. Moreover,
the value of `b` must be such that the computation for `offset` does not overflow,
or the returned method handle throws `ArithmeticException`.

Parameters:

- `elements`: the layout path elements

**API note:** The returned method handle can be used to compute a layout offset,
         similarly to `byteOffset(PathElement...)`, but more flexibly, as
         some indices can be specified when invoking the method handle.

**Returns:** a method handle that computes the offset, in bytes, of the layout selected
        by the given layout path

Throws:

- `IllegalArgumentException`: if the layout path is not well-formed for this layout
- `IllegalArgumentException`: if the layout path contains one or more dereference path elements

## MemoryLayout.varHandle(PathElement...)

```java
VarHandle varHandle(PathElement... elements)
```

Creates a var handle that accesses a memory segment at the offset selected by the
given layout path, where the initial layout in the path is this layout.

The returned var handle has the following characteristics:

- its type is derived from the carrier of the
    selected value layout;

- it has a leading parameter of type `MemorySegment` representing the
    accessed segment

- a following `long` parameter, corresponding to the base offset,
    denoted as `B`;

- it has zero or more trailing access coordinates of type `long`,
    one for each open path element in the provided
    layout path, denoted as `I1, I2, ... In`, respectively. The order of
    these access coordinates corresponds to the order in which the open path
    elements occur in the provided layout path.

If the provided layout path `P` contains no dereference elements, then the
offset `O` of the access operation is computed as follows:

Accessing a memory segment using the var handle returned by this method is subject
to the following checks:

- The physical address of the accessed memory segment must be
    aligned according to the
    alignment constraint of the root layout
    (this layout), or an `IllegalArgumentException` is thrown. Note
    that the alignment constraint of the root layout can be more strict
    (but not less) than the alignment constraint of the selected value layout.

- The access operation must fall inside the spatial bounds of the accessed
    memory segment, or an `IndexOutOfBoundsException` is thrown. This is the case
    when `B + A <= S`, where `B` is the base offset (defined above),
    `A` is the size of this layout and `S` is the size of the
    accessed memory segment. Note that the size of this layout might be *bigger*
    than the size of the accessed layout (e.g. when accessing a struct member).

- If the provided layout path has an open path element whose size is `S`,
    its corresponding trailing `long` coordinate value `I` must be
    `0 <= I < S`, or an `IndexOutOfBoundsException` is thrown.

- The accessed memory segment must be
    accessible from the thread
    performing the access operation, or a `WrongThreadException` is thrown.

- For write operations, the accessed memory segment must not be
    read only, or an
    `IllegalArgumentException` is thrown.

- The scope associated with the accessed
    segment must be alive, or an
    `IllegalStateException` is thrown.

If the selected layout is an address layout, calling
`VarHandle.get(Object...)` on the returned var handle will return a new
memory segment. The segment is associated with the global scope. Moreover, the
size of the segment depends on whether the address layout has a
target layout. More specifically:

- If the address layout has a target layout `T`, then the size
    of the returned segment is `T.byteSize()`;

- Otherwise, the address layout has no target layout and the size
    of the returned segment
    is zero.

Moreover, if the selected layout is an address layout,
calling `VarHandle.set(Object...)` can throw `IllegalArgumentException`
if the memory segment representing the address to be written is not a
native memory segment.

If the provided layout path has size `m` and contains a dereference path
element in position `k` (where `k <= m`) then two layout paths
`P` and `Q` are derived, where P contains all the path elements from
0 to `k - 1` and `Q` contains all the path elements from `k + 1`
to `m` (`Q` could be an empty layout path if `k == m`).
Then, the returned var handle is computed as follows:

(The above can be trivially generalized to cases where the provided layout path
contains more than one dereference path elements).

As an example, consider the memory layout expressed by a `GroupLayout`
instance constructed as follows:

To access the member layout named `value`, we can construct a var handle as
follows:

Parameters:

- `elements`: the layout path elements

**API note:** The resulting var handle features certain
*access mode restrictions*, which
are common to all var handles derived from memory layouts.

**Returns:** a var handle that accesses a memory segment at the offset selected by the
        given layout path

Throws:

- `IllegalArgumentException`: if the layout path is not well-formed for this layout
- `IllegalArgumentException`: if the layout selected by the provided path is not a value layout

## MemoryLayout.arrayElementVarHandle(PathElement...)

```java
VarHandle arrayElementVarHandle(PathElement... elements)
```

Creates a var handle that accesses adjacent elements in a memory segment at
offsets selected by the given layout path, where the accessed elements have this
layout, and where the initial layout in the path is this layout.

The returned var handle has the following characteristics:

- its type is derived from the carrier of the
    selected value layout;

- it has a leading parameter of type `MemorySegment` representing
    the accessed segment

- a following `long` parameter, corresponding to the base offset,
    denoted as `B`;

- a following `long` parameter, corresponding to the array index,
    denoted as `I0`. The array index is used to scale the accessed offset
    by this layout size;

- it has zero or more trailing access coordinates of type `long`,
    one for each open path element in the provided
    layout path, denoted as `I1, I2, ... In`, respectively. The order of
    these access coordinates corresponds to the order in which the open path
    elements occur in the provided layout path.

If the provided layout path `P` contains no dereference elements, then the
offset `O` of the access operation is computed as follows:

More formally, the method handle returned by this method is obtained from `varHandle(PathElement...)`,
as follows:

Accessing a memory segment using the var handle returned by this method is subject
to the following checks:

- The physical address of the accessed memory segment must be
    aligned according to the
    alignment constraint of the root layout
    (this layout), or an `IllegalArgumentException` is thrown. Note
    that the alignment constraint of the root layout can be more strict
    (but not less) than the alignment constraint of the selected value layout.

- The access operation must fall inside the spatial bounds of the accessed
    memory segment, or an `IndexOutOfBoundsException` is thrown. This is the case
    when `B + A <= S`, where `B` is the base offset (defined above),
    `A` is the size of this layout and `S` is the size of the
    accessed memory segment. Note that the size of this layout might be *bigger*
    than the size of the accessed layout (e.g. when accessing a struct member).

- If the provided layout path has an open path element whose size is `S`,
    its corresponding trailing `long` coordinate value `I` must be
    `0 <= I < S`, or an `IndexOutOfBoundsException` is thrown.

- The accessed memory segment must be
    accessible from the thread
    performing the access operation, or a `WrongThreadException` is thrown.

- For write operations, the accessed memory segment must not be
    read only, or an
    `IllegalArgumentException` is thrown.

- The scope associated with the accessed
    segment must be alive, or an
    `IllegalStateException` is thrown.

Parameters:

- `elements`: the layout path elements

**API note:** As the leading index coordinate `I0` is not bound by any sequence layout, it
can assume *any* non-negative value - provided that the resulting offset
computation does not overflow, or that the computed offset does not fall outside
the spatial bound of the accessed memory segment. As such, the var handles
returned from this method can be especially useful when accessing
variable-length arrays.

**Returns:** a var handle that accesses adjacent elements in a memory segment at
        offsets selected by the given layout path

Throws:

- `IllegalArgumentException`: if the layout path is not well-formed for this layout
- `IllegalArgumentException`: if the layout selected by the provided path is not a value layout

## MemoryLayout.sliceHandle(PathElement...)

```java
MethodHandle sliceHandle(PathElement... elements)
```

Creates a method handle which, given a memory segment, returns a
long) slice corresponding to
the layout selected by the given layout path, where the initial layout in
the path is this layout.

The returned method handle has the following characteristics:

- its return type is `MemorySegment`;

- it has a leading parameter of type `MemorySegment` corresponding to
    the memory segment to be sliced

- a following `long` parameter, corresponding to the base offset

- it has as zero or more trailing parameters of type `long`, one for
    each open path element in the provided
    layout path. The order of these parameters corresponds to the order in which
    the open path elements occur in the provided layout path.

The offset `O` of the returned segment is computed as if by a call to a
byte offset handle constructed
using the given path elements.

Computing a slice of a memory segment using the method handle returned by this
method is subject to the following checks:

- The physical address of the accessed memory segment must be
    aligned according to the
    alignment constraint of the root layout
    (this layout), or an `IllegalArgumentException` will be issued. Note
    that the alignment constraint of the root layout can be more strict
    (but not less) than the alignment constraint of the selected layout.

- The slicing operation must fall inside the spatial bounds of the accessed
    memory segment, or an `IndexOutOfBoundsException` is thrown. This is the case
    when `B + A <= S`, where `B` is the base offset (defined above),
    `A` is the size of this layout and `S` is the size of the
    accessed memory segment. Note that the size of this layout might be *bigger*
    than the size of the accessed layout (e.g. when accessing a struct member).

- If the provided layout path has an open path element whose size is `S`,
    its corresponding trailing `long` coordinate value `I` must be
    `0 <= I < S`, or an `IndexOutOfBoundsException` is thrown.

Parameters:

- `elements`: the layout path elements

**API note:** The returned method handle can be used to obtain a memory segment slice,
         similarly to long), but more flexibly,
         as some indices can be specified when invoking the method handle.

**Returns:** a method handle that is used to slice a memory segment at
        the offset selected by the given layout path

Throws:

- `IllegalArgumentException`: if the layout path is not well-formed for this layout
- `IllegalArgumentException`: if the layout path contains one or more dereference path elements

## MemoryLayout.select(PathElement...)

```java
MemoryLayout select(PathElement... elements)
```

Returns the layout selected from the provided path, where the initial layout in
the path is this layout.

Parameters:

- `elements`: the layout path elements

**Returns:** the layout selected by the layout path in `elements`

Throws:

- `IllegalArgumentException`: if the layout path is not well-formed for this layout
- `IllegalArgumentException`: if the layout path contains one or more dereference path elements
- `IllegalArgumentException`: if the layout path contains one or more path elements that select one or more sequence element indices, such as `PathElement.sequenceElement(long)` and long))
