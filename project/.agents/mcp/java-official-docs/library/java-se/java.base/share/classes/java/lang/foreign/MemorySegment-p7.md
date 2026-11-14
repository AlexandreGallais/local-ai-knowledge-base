---
title: "MemorySegment interface (java.lang.foreign) (part 7 of 8)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/foreign/MemorySegment.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MemorySegment interface (java.lang.foreign) (part 7 of 8)

## MemorySegment.getAtIndex(ValueLayout.OfChar, long)

```java
char getAtIndex(ValueLayout.OfChar layout, long index)
```

Reads a char from this segment at the given index, scaled by the given
layout size.

Parameters:

- `layout`: the layout of the region of memory to be read
- `index`: a logical index. The offset in bytes (relative to this segment address) at which the access operation will occur can be expressed as `(index * layout.byteSize())`.

**Returns:** a char value read from this segment

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IllegalArgumentException`: if `layout.byteAlignment() > layout.byteSize()`
- `IndexOutOfBoundsException`: if `index * layout.byteSize()` overflows
- `IndexOutOfBoundsException`: if `index * layout.byteSize() > byteSize() - layout.byteSize()` or `index < 0`

## MemorySegment.setAtIndex(ValueLayout.OfChar, long, char)

```java
void setAtIndex(ValueLayout.OfChar layout, long index, char value)
```

Writes a char into this segment at the given index, scaled by the given
layout size.

Parameters:

- `layout`: the layout of the region of memory to be written
- `index`: a logical index. The offset in bytes (relative to this segment address) at which the access operation will occur can be expressed as `(index * layout.byteSize())`.
- `value`: the char value to be written

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IllegalArgumentException`: if `layout.byteAlignment() > layout.byteSize()`
- `IndexOutOfBoundsException`: if `index * layout.byteSize()` overflows
- `IndexOutOfBoundsException`: if `index * layout.byteSize() > byteSize() - layout.byteSize()` or `index < 0`
- `IllegalArgumentException`: if this segment is read-only

## MemorySegment.getAtIndex(ValueLayout.OfShort, long)

```java
short getAtIndex(ValueLayout.OfShort layout, long index)
```

Reads a short from this segment at the given index, scaled by the given
layout size.

Parameters:

- `layout`: the layout of the region of memory to be read
- `index`: a logical index. The offset in bytes (relative to this segment address) at which the access operation will occur can be expressed as `(index * layout.byteSize())`.

**Returns:** a short value read from this segment

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IllegalArgumentException`: if `layout.byteAlignment() > layout.byteSize()`
- `IndexOutOfBoundsException`: if `index * layout.byteSize()` overflows
- `IndexOutOfBoundsException`: if `index * layout.byteSize() > byteSize() - layout.byteSize()` or `index < 0`

## MemorySegment.setAtIndex(ValueLayout.OfByte, long, byte)

```java
void setAtIndex(ValueLayout.OfByte layout, long index, byte value)
```

Writes a byte into this segment at the given index, scaled by the given layout size.

Parameters:

- `layout`: the layout of the region of memory to be written
- `index`: a logical index. The offset in bytes (relative to this segment address) at which the access operation will occur can be expressed as `(index * layout.byteSize())`.
- `value`: the short value to be written

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IllegalArgumentException`: if `layout.byteAlignment() > layout.byteSize()`
- `IndexOutOfBoundsException`: if `index * layout.byteSize()` overflows
- `IndexOutOfBoundsException`: if `index * layout.byteSize() > byteSize() - layout.byteSize()` or `index < 0`
- `IllegalArgumentException`: if this segment is read-only

## MemorySegment.setAtIndex(ValueLayout.OfBoolean, long, boolean)

```java
void setAtIndex(ValueLayout.OfBoolean layout, long index, boolean value)
```

Writes a boolean into this segment at the given index, scaled by the given
layout size.

Parameters:

- `layout`: the layout of the region of memory to be written
- `index`: a logical index. The offset in bytes (relative to this segment address) at which the access operation will occur can be expressed as `(index * layout.byteSize())`.
- `value`: the short value to be written

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IllegalArgumentException`: if `layout.byteAlignment() > layout.byteSize()`
- `IndexOutOfBoundsException`: if `index * layout.byteSize()` overflows
- `IndexOutOfBoundsException`: if `index * layout.byteSize() > byteSize() - layout.byteSize()` or `index < 0`
- `IllegalArgumentException`: if this segment is read-only

## MemorySegment.setAtIndex(ValueLayout.OfShort, long, short)

```java
void setAtIndex(ValueLayout.OfShort layout, long index, short value)
```

Writes a short into this segment at the given index, scaled by the given
layout size.

Parameters:

- `layout`: the layout of the region of memory to be written
- `index`: a logical index. The offset in bytes (relative to this segment address) at which the access operation will occur can be expressed as `(index * layout.byteSize())`.
- `value`: the short value to be written

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IllegalArgumentException`: if `layout.byteAlignment() > layout.byteSize()`
- `IndexOutOfBoundsException`: if `index * layout.byteSize()` overflows
- `IndexOutOfBoundsException`: if `index * layout.byteSize() > byteSize() - layout.byteSize()` or `index < 0`
- `IllegalArgumentException`: if this segment is read-only

## MemorySegment.getAtIndex(ValueLayout.OfInt, long)

```java
int getAtIndex(ValueLayout.OfInt layout, long index)
```

Reads an int from this segment at the given index, scaled by the given
layout size.

Parameters:

- `layout`: the layout of the region of memory to be read.
- `index`: a logical index. The offset in bytes (relative to this segment address) at which the access operation will occur can be expressed as `(index * layout.byteSize())`.

**Returns:** an int value read from this segment

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IllegalArgumentException`: if `layout.byteAlignment() > layout.byteSize()`
- `IndexOutOfBoundsException`: if `index * layout.byteSize()` overflows
- `IndexOutOfBoundsException`: if `index * layout.byteSize() > byteSize() - layout.byteSize()` or `index < 0`

## MemorySegment.setAtIndex(ValueLayout.OfInt, long, int)

```java
void setAtIndex(ValueLayout.OfInt layout, long index, int value)
```

Writes an int into this segment at the given index, scaled by the given
layout size.

Parameters:

- `layout`: the layout of the region of memory to be written
- `index`: a logical index. The offset in bytes (relative to this segment address) at which the access operation will occur can be expressed as `(index * layout.byteSize())`.
- `value`: the int value to be written

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IllegalArgumentException`: if `layout.byteAlignment() > layout.byteSize()`
- `IndexOutOfBoundsException`: if `index * layout.byteSize()` overflows
- `IndexOutOfBoundsException`: if `index * layout.byteSize() > byteSize() - layout.byteSize()` or `index < 0`
- `IllegalArgumentException`: if this segment is read-only

## MemorySegment.getAtIndex(ValueLayout.OfFloat, long)

```java
float getAtIndex(ValueLayout.OfFloat layout, long index)
```

Reads a float from this segment at the given index, scaled by the given
layout size.

Parameters:

- `layout`: the layout of the region of memory to be read
- `index`: a logical index. The offset in bytes (relative to this segment address) at which the access operation will occur can be expressed as `(index * layout.byteSize())`.

**Returns:** a float value read from this segment

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IllegalArgumentException`: if `layout.byteAlignment() > layout.byteSize()`
- `IndexOutOfBoundsException`: if `index * layout.byteSize()` overflows
- `IndexOutOfBoundsException`: if `index * layout.byteSize() > byteSize() - layout.byteSize()` or `index < 0`

## MemorySegment.setAtIndex(ValueLayout.OfFloat, long, float)

```java
void setAtIndex(ValueLayout.OfFloat layout, long index, float value)
```

Writes a float into this segment at the given index, scaled by the given
layout size.

Parameters:

- `layout`: the layout of the region of memory to be written
- `index`: a logical index. The offset in bytes (relative to this segment address) at which the access operation will occur can be expressed as `(index * layout.byteSize())`.
- `value`: the float value to be written

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IllegalArgumentException`: if `layout.byteAlignment() > layout.byteSize()`
- `IndexOutOfBoundsException`: if `index * layout.byteSize()` overflows
- `IndexOutOfBoundsException`: if `index * layout.byteSize() > byteSize() - layout.byteSize()` or `index < 0`
- `IllegalArgumentException`: if this segment is read-only

## MemorySegment.getAtIndex(ValueLayout.OfLong, long)

```java
long getAtIndex(ValueLayout.OfLong layout, long index)
```

Reads a long from this segment at the given index, scaled by the given
layout size.

Parameters:

- `layout`: the layout of the region of memory to be read
- `index`: a logical index. The offset in bytes (relative to this segment address) at which the access operation will occur can be expressed as `(index * layout.byteSize())`.

**Returns:** a long value read from this segment

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IllegalArgumentException`: if `layout.byteAlignment() > layout.byteSize()`
- `IndexOutOfBoundsException`: if `index * layout.byteSize()` overflows
- `IndexOutOfBoundsException`: if `index * layout.byteSize() > byteSize() - layout.byteSize()` or `index < 0`

## MemorySegment.setAtIndex(ValueLayout.OfLong, long, long)

```java
void setAtIndex(ValueLayout.OfLong layout, long index, long value)
```

Writes a long into this segment at the given index, scaled by the given
layout size.

Parameters:

- `layout`: the layout of the region of memory to be written
- `index`: a logical index. The offset in bytes (relative to this segment address) at which the access operation will occur can be expressed as `(index * layout.byteSize())`.
- `value`: the long value to be written

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IllegalArgumentException`: if `layout.byteAlignment() > layout.byteSize()`
- `IndexOutOfBoundsException`: if `index * layout.byteSize()` overflows
- `IndexOutOfBoundsException`: if `index * layout.byteSize() > byteSize() - layout.byteSize()` or `index < 0`
- `IllegalArgumentException`: if this segment is read-only

## MemorySegment.getAtIndex(ValueLayout.OfDouble, long)

```java
double getAtIndex(ValueLayout.OfDouble layout, long index)
```

Reads a double from this segment at the given index, scaled by the given
layout size.

Parameters:

- `layout`: the layout of the region of memory to be read
- `index`: a logical index. The offset in bytes (relative to this segment address) at which the access operation will occur can be expressed as `(index * layout.byteSize())`.

**Returns:** a double value read from this segment

Throws:

- `IllegalStateException`: if the scope associated with this segment is not alive
- `WrongThreadException`: if this method is called from a thread `T`, such that `isAccessibleBy(T) == false`
- `IllegalArgumentException`: if the access operation is incompatible with the alignment constraint in the provided layout
- `IllegalArgumentException`: if `layout.byteAlignment() > layout.byteSize()`
- `IndexOutOfBoundsException`: if `index * layout.byteSize()` overflows
- `IndexOutOfBoundsException`: if `index * layout.byteSize() > byteSize() - layout.byteSize()` or `index < 0`
