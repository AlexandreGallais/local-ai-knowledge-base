---
title: "CharacterIterator interface (java.text)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/CharacterIterator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# CharacterIterator interface (java.text)

```java
public interface CharacterIterator extends Cloneable
```

This interface defines a protocol for bidirectional iteration over text.
The iterator iterates over a bounded sequence of characters.  Characters
are indexed with values beginning with the value returned by getBeginIndex() and
continuing through the value returned by getEndIndex()-1.

Iterators maintain a current character index, whose valid range is from
getBeginIndex() to getEndIndex(); the value getEndIndex() is included to allow
handling of zero-length text ranges and for historical reasons.
The current index can be retrieved by calling getIndex() and set directly
by calling setIndex(), first(), and last().

The methods previous() and next() are used for iteration. They return DONE if
they would move outside the range from getBeginIndex() to getEndIndex() -1,
signaling that the iterator has reached the end of the sequence. DONE is
also returned by other methods to indicate that the current index is
outside this range.

Examples:

Traverse the text from start to finish

Traverse the text backwards, from end to start

Traverse both forward and backward from a given position in the text.
Calls to notBoundary() in this example represents some
additional stopping criteria.

**Since:** 1.1

**See also:** StringCharacterIterator

**See also:** AttributedCharacterIterator

## CharacterIterator.DONE

```java
public static final char DONE
```

Constant that is returned when the iterator has reached either the end
or the beginning of the text. The value is '\\uFFFF', the "not a
character" value which should not occur in any valid Unicode string.

## CharacterIterator.first()

```java
public char first()
```

Sets the position to getBeginIndex() and returns the character at that
position.

**Returns:** the first character in the text, or DONE if the text is empty

**See also:** #getBeginIndex()

## CharacterIterator.last()

```java
public char last()
```

Sets the position to getEndIndex()-1 (getEndIndex() if the text is empty)
and returns the character at that position.

**Returns:** the last character in the text, or DONE if the text is empty

**See also:** #getEndIndex()

## CharacterIterator.current()

```java
public char current()
```

Gets the character at the current position (as returned by getIndex()).

**Returns:** the character at the current position or DONE if the current
position is off the end of the text.

**See also:** #getIndex()

## CharacterIterator.next()

```java
public char next()
```

Increments the iterator's index by one and returns the character
at the new index.  If the resulting index is greater or equal
to getEndIndex(), the current index is reset to getEndIndex() and
a value of DONE is returned.

**Returns:** the character at the new position or DONE if the new
position is off the end of the text range.

## CharacterIterator.previous()

```java
public char previous()
```

Decrements the iterator's index by one and returns the character
at the new index. If the current index is getBeginIndex(), the index
remains at getBeginIndex() and a value of DONE is returned.

**Returns:** the character at the new position or DONE if the current
position is equal to getBeginIndex().

## CharacterIterator.setIndex(int)

```java
public char setIndex(int position)
```

Sets the position to the specified position in the text and returns that
character.

Parameters:

- `position`: the position within the text. Valid values range from getBeginIndex() to getEndIndex(). An IllegalArgumentException is thrown if an invalid value is supplied.

**Returns:** the character at the specified position or DONE if the specified position is equal to getEndIndex()

## CharacterIterator.getBeginIndex()

```java
public int getBeginIndex()
```

Returns the start index of the text.

**Returns:** the index at which the text begins.

## CharacterIterator.getEndIndex()

```java
public int getEndIndex()
```

Returns the end index of the text.  This index is the index of the first
character following the end of the text.

**Returns:** the index after the last character in the text

## CharacterIterator.getIndex()

```java
public int getIndex()
```

Returns the current index.

**Returns:** the current index.

## CharacterIterator.clone()

```java
public Object clone()
```

Create a copy of this iterator

**Returns:** A copy of this
