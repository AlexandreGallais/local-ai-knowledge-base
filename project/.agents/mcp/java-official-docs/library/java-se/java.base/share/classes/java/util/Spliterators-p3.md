---
title: "Spliterators class (java.util) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/Spliterators.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Spliterators class (java.util) (part 3 of 3)

## Spliterators.AbstractIntSpliterator(long, int)

```java
protected AbstractIntSpliterator(long est, int additionalCharacteristics)
```

Creates a spliterator reporting the given estimated size and
characteristics.

Parameters:

- `est`: the estimated size of this spliterator if known, otherwise `Long.MAX_VALUE`.
- `additionalCharacteristics`: properties of this spliterator's source or elements. If `SIZED` is reported then this spliterator will additionally report `SUBSIZED`.

## Spliterators.trySplit()

```java
public Spliterator.OfInt trySplit()
```

(inherited documentation)

This implementation permits limited parallelism.

## Spliterators.estimateSize()

```java
public long estimateSize()
```

(inherited documentation)

**Implementation requirements:** This implementation returns the estimated size as reported when
created and, if the estimate size is known, decreases in size when
split.

## Spliterators.characteristics()

```java
public int characteristics()
```

(inherited documentation)

**Implementation requirements:** This implementation returns the characteristics as reported when
created.

## Spliterators.AbstractLongSpliterator(long, int)

```java
protected AbstractLongSpliterator(long est, int additionalCharacteristics)
```

Creates a spliterator reporting the given estimated size and
characteristics.

Parameters:

- `est`: the estimated size of this spliterator if known, otherwise `Long.MAX_VALUE`.
- `additionalCharacteristics`: properties of this spliterator's source or elements. If `SIZED` is reported then this spliterator will additionally report `SUBSIZED`.

## Spliterators.trySplit()

```java
public Spliterator.OfLong trySplit()
```

(inherited documentation)

This implementation permits limited parallelism.

## Spliterators.estimateSize()

```java
public long estimateSize()
```

(inherited documentation)

**Implementation requirements:** This implementation returns the estimated size as reported when
created and, if the estimate size is known, decreases in size when
split.

## Spliterators.characteristics()

```java
public int characteristics()
```

(inherited documentation)

**Implementation requirements:** This implementation returns the characteristics as reported when
created.

## Spliterators.AbstractDoubleSpliterator(long, int)

```java
protected AbstractDoubleSpliterator(long est, int additionalCharacteristics)
```

Creates a spliterator reporting the given estimated size and
characteristics.

Parameters:

- `est`: the estimated size of this spliterator if known, otherwise `Long.MAX_VALUE`.
- `additionalCharacteristics`: properties of this spliterator's source or elements. If `SIZED` is reported then this spliterator will additionally report `SUBSIZED`.

## Spliterators.trySplit()

```java
public Spliterator.OfDouble trySplit()
```

(inherited documentation)

This implementation permits limited parallelism.

## Spliterators.estimateSize()

```java
public long estimateSize()
```

(inherited documentation)

**Implementation requirements:** This implementation returns the estimated size as reported when
created and, if the estimate size is known, decreases in size when
split.

## Spliterators.characteristics()

```java
public int characteristics()
```

(inherited documentation)

**Implementation requirements:** This implementation returns the characteristics as reported when
created.

## Spliterators.IteratorSpliterator(Collection<? extends T>, int)

```java
public IteratorSpliterator(Collection<? extends T> collection, int characteristics)
```

Creates a spliterator using the given
collection's iterator for traversal,
and reporting its size as its initial
size.

Parameters:

- `collection`: the collection
- `characteristics`: properties of this spliterator's source or elements.

## Spliterators.IteratorSpliterator(Iterator<? extends T>, long, int)

```java
public IteratorSpliterator(Iterator<? extends T> iterator, long size, int characteristics)
```

Creates a spliterator using the given iterator
for traversal, and reporting the given initial size
and characteristics.

Parameters:

- `iterator`: the iterator for the source
- `size`: the number of elements in the source
- `characteristics`: properties of this spliterator's source or elements.

## Spliterators.IteratorSpliterator(Iterator<? extends T>, int)

```java
public IteratorSpliterator(Iterator<? extends T> iterator, int characteristics)
```

Creates a spliterator using the given iterator
for traversal, and reporting the given initial size
and characteristics.

Parameters:

- `iterator`: the iterator for the source
- `characteristics`: properties of this spliterator's source or elements.

## Spliterators.IntIteratorSpliterator(PrimitiveIterator.OfInt, long, int)

```java
public IntIteratorSpliterator(PrimitiveIterator.OfInt iterator, long size, int characteristics)
```

Creates a spliterator using the given iterator
for traversal, and reporting the given initial size
and characteristics.

Parameters:

- `iterator`: the iterator for the source
- `size`: the number of elements in the source
- `characteristics`: properties of this spliterator's source or elements.

## Spliterators.IntIteratorSpliterator(PrimitiveIterator.OfInt, int)

```java
public IntIteratorSpliterator(PrimitiveIterator.OfInt iterator, int characteristics)
```

Creates a spliterator using the given iterator for a
source of unknown size, reporting the given
characteristics.

Parameters:

- `iterator`: the iterator for the source
- `characteristics`: properties of this spliterator's source or elements.

## Spliterators.LongIteratorSpliterator(PrimitiveIterator.OfLong, long, int)

```java
public LongIteratorSpliterator(PrimitiveIterator.OfLong iterator, long size, int characteristics)
```

Creates a spliterator using the given iterator
for traversal, and reporting the given initial size
and characteristics.

Parameters:

- `iterator`: the iterator for the source
- `size`: the number of elements in the source
- `characteristics`: properties of this spliterator's source or elements.

## Spliterators.LongIteratorSpliterator(PrimitiveIterator.OfLong, int)

```java
public LongIteratorSpliterator(PrimitiveIterator.OfLong iterator, int characteristics)
```

Creates a spliterator using the given iterator for a
source of unknown size, reporting the given
characteristics.

Parameters:

- `iterator`: the iterator for the source
- `characteristics`: properties of this spliterator's source or elements.

## Spliterators.DoubleIteratorSpliterator(PrimitiveIterator.OfDouble, long, int)

```java
public DoubleIteratorSpliterator(PrimitiveIterator.OfDouble iterator, long size, int characteristics)
```

Creates a spliterator using the given iterator
for traversal, and reporting the given initial size
and characteristics.

Parameters:

- `iterator`: the iterator for the source
- `size`: the number of elements in the source
- `characteristics`: properties of this spliterator's source or elements.

## Spliterators.DoubleIteratorSpliterator(PrimitiveIterator.OfDouble, int)

```java
public DoubleIteratorSpliterator(PrimitiveIterator.OfDouble iterator, int characteristics)
```

Creates a spliterator using the given iterator for a
source of unknown size, reporting the given
characteristics.

Parameters:

- `iterator`: the iterator for the source
- `characteristics`: properties of this spliterator's source or elements.
