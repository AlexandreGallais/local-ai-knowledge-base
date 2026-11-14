---
title: "MemorySegment interface (java.lang.foreign) (part 6 of 8)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/foreign/MemorySegment.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MemorySegment interface (java.lang.foreign) (part 6 of 8)

## MemorySegment.set(ValueLayout.OfChar, long, char)

```java
void set(ValueLayout.OfChar layout, long offset, char value)
```

Writes a char into this segment at the given offset, with the given layout.

Parameters:

- `layout`: the layout of the region of memory to be written
- `offset`: the offset in bytes (relative to this segment address) at which this access operation will occur.
- `value`: the char value to be written

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IndexOutOfBoundsException`: if `offset > byteSize() - layout.byteSize()` or `offset < 0`
- `IllegalArgumentException`: if this segment is read-only

## MemorySegment.get(ValueLayout.OfShort, long)

```java
short get(ValueLayout.OfShort layout, long offset)
```

Reads a short from this segment at the given offset, with the given layout.

Parameters:

- `layout`: the layout of the region of memory to be read
- `offset`: the offset in bytes (relative to this segment address) at which this access operation will occur

**Returns:** a short value read from this segment

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IndexOutOfBoundsException`: if `offset > byteSize() - layout.byteSize()` or `offset < 0`

## MemorySegment.set(ValueLayout.OfShort, long, short)

```java
void set(ValueLayout.OfShort layout, long offset, short value)
```

Writes a short into this segment at the given offset, with the given layout.

Parameters:

- `layout`: the layout of the region of memory to be written
- `offset`: the offset in bytes (relative to this segment address) at which this access operation will occur.
- `value`: the short value to be written

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IndexOutOfBoundsException`: if `offset > byteSize() - layout.byteSize()` or `offset < 0`
- `IllegalArgumentException`: if this segment is read-only

## MemorySegment.get(ValueLayout.OfInt, long)

```java
int get(ValueLayout.OfInt layout, long offset)
```

Reads an int from this segment at the given offset, with the given layout.

Parameters:

- `layout`: the layout of the region of memory to be read
- `offset`: the offset in bytes (relative to this segment address) at which this access operation will occur.

**Returns:** an int value read from this segment

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IndexOutOfBoundsException`: if `offset > byteSize() - layout.byteSize()` or `offset < 0`

## MemorySegment.set(ValueLayout.OfInt, long, int)

```java
void set(ValueLayout.OfInt layout, long offset, int value)
```

Writes an int into this segment at the given offset, with the given layout.

Parameters:

- `layout`: the layout of the region of memory to be written
- `offset`: the offset in bytes (relative to this segment address) at which this access operation will occur
- `value`: the int value to be written

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IndexOutOfBoundsException`: if `offset > byteSize() - layout.byteSize()` or `offset < 0`
- `IllegalArgumentException`: if this segment is read-only

## MemorySegment.get(ValueLayout.OfFloat, long)

```java
float get(ValueLayout.OfFloat layout, long offset)
```

Reads a float from this segment at the given offset, with the given layout.

Parameters:

- `layout`: the layout of the region of memory to be read
- `offset`: the offset in bytes (relative to this segment address) at which this access operation will occur

**Returns:** a float value read from this segment

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IndexOutOfBoundsException`: if `offset > byteSize() - layout.byteSize()` or `offset < 0`

## MemorySegment.set(ValueLayout.OfFloat, long, float)

```java
void set(ValueLayout.OfFloat layout, long offset, float value)
```

Writes a float into this segment at the given offset, with the given layout.

Parameters:

- `layout`: the layout of the region of memory to be written
- `offset`: the offset in bytes (relative to this segment address) at which this access operation will occur
- `value`: the float value to be written

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IndexOutOfBoundsException`: if `offset > byteSize() - layout.byteSize()` or `offset < 0`
- `IllegalArgumentException`: if this segment is read-only

## MemorySegment.get(ValueLayout.OfLong, long)

```java
long get(ValueLayout.OfLong layout, long offset)
```

Reads a long from this segment at the given offset, with the given layout.

Parameters:

- `layout`: the layout of the region of memory to be read
- `offset`: the offset in bytes (relative to this segment address) at which this access operation will occur.

**Returns:** a long value read from this segment

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IndexOutOfBoundsException`: if `offset > byteSize() - layout.byteSize()` or `offset < 0`

## MemorySegment.set(ValueLayout.OfLong, long, long)

```java
void set(ValueLayout.OfLong layout, long offset, long value)
```

Writes a long into this segment at the given offset, with the given layout.

Parameters:

- `layout`: the layout of the region of memory to be written
- `offset`: the offset in bytes (relative to this segment address) at which this access operation will occur.
- `value`: the long value to be written.

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IndexOutOfBoundsException`: if `offset > byteSize() - layout.byteSize()` or `offset < 0`
- `IllegalArgumentException`: if this segment is read-only

## MemorySegment.get(ValueLayout.OfDouble, long)

```java
double get(ValueLayout.OfDouble layout, long offset)
```

Reads a double from this segment at the given offset, with the given layout.

Parameters:

- `layout`: the layout of the region of memory to be read
- `offset`: the offset in bytes (relative to this segment address) at which this access operation will occur

**Returns:** a double value read from this segment

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IndexOutOfBoundsException`: if `offset > byteSize() - layout.byteSize()` or `offset < 0`

## MemorySegment.set(ValueLayout.OfDouble, long, double)

```java
void set(ValueLayout.OfDouble layout, long offset, double value)
```

Writes a double into this segment at the given offset, with the given layout.

Parameters:

- `layout`: the layout of the region of memory to be written
- `offset`: the offset in bytes (relative to this segment address) at which this access operation will occur
- `value`: the double value to be written

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IndexOutOfBoundsException`: if `offset > byteSize() - layout.byteSize()` or `offset < 0`
- `IllegalArgumentException`: if this segment is read-only

## MemorySegment.get(AddressLayout, long)

```java
MemorySegment get(AddressLayout layout, long offset)
```

Reads an address from this segment at the given offset, with the given layout.
The read address is wrapped in a native segment, associated with the global scope.
Under normal conditions, the size of the returned segment is `0`. However,
if the provided address layout has a
target layout `T`, then the size
of the returned segment is set to `T.byteSize()`.

Parameters:

- `layout`: the layout of the region of memory to be read
- `offset`: the offset in bytes (relative to this segment address) at which this access operation will occur

**Returns:** a native segment wrapping an address read from this segment

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IllegalArgumentException`: if provided address layout has a target layout `T`, and the address of the returned segment incompatible with the alignment constraint in `T`
- `IndexOutOfBoundsException`: if `offset > byteSize() - layout.byteSize()` or `offset < 0`

## MemorySegment.set(AddressLayout, long, MemorySegment)

```java
void set(AddressLayout layout, long offset, MemorySegment value)
```

Writes an address into this segment at the given offset, with the given layout.

Parameters:

- `layout`: the layout of the region of memory to be written
- `offset`: the offset in bytes (relative to this segment address) at which this access operation will occur.
- `value`: the address value to be written.

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IndexOutOfBoundsException`: if `offset > byteSize() - layout.byteSize()` or `offset < 0`
- `IllegalArgumentException`: if `value` is not a native segment
- `IllegalArgumentException`: if this segment is read-only

## MemorySegment.getAtIndex(ValueLayout.OfByte, long)

```java
byte getAtIndex(ValueLayout.OfByte layout, long index)
```

Reads a byte from this segment at the given index, scaled by the given
layout size.

Parameters:

- `layout`: the layout of the region of memory to be read
- `index`: a logical index. The offset in bytes (relative to this segment address) at which the access operation will occur can be expressed as `(index * layout.byteSize())`.

**Returns:** a byte value read from this segment

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IllegalArgumentException`: if `layout.byteAlignment() > layout.byteSize()`
- `IndexOutOfBoundsException`: if `index * layout.byteSize()` overflows
- `IndexOutOfBoundsException`: if `index * layout.byteSize() > byteSize() - layout.byteSize()` or `index < 0`

## MemorySegment.getAtIndex(ValueLayout.OfBoolean, long)

```java
boolean getAtIndex(ValueLayout.OfBoolean layout, long index)
```

Reads a boolean from this segment at the given index, scaled by the given
layout size.

Parameters:

- `layout`: the layout of the region of memory to be read
- `index`: a logical index. The offset in bytes (relative to this segment address) at which the access operation will occur can be expressed as `(index * layout.byteSize())`.

**Returns:** a boolean value read from this segment

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IllegalArgumentException`: if `layout.byteAlignment() > layout.byteSize()`
- `IndexOutOfBoundsException`: if `index * layout.byteSize()` overflows
- `IndexOutOfBoundsException`: if `index * layout.byteSize() > byteSize() - layout.byteSize()` or `index < 0`
