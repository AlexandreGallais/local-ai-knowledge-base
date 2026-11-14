---
title: "StringCharacterIterator class (java.text)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/StringCharacterIterator.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StringCharacterIterator class (java.text)

```java
public final class StringCharacterIterator implements CharacterIterator
```

`StringCharacterIterator` implements the
`CharacterIterator` protocol for a `String`.
The `StringCharacterIterator` class iterates over the
entire `String`. All constructors throw `NullPointerException`
if `text` is `null`.

**See also:** CharacterIterator

**Since:** 1.1

## StringCharacterIterator.StringCharacterIterator(String)

```java
public StringCharacterIterator(String text)
```

Constructs an iterator with an initial index of 0.

Parameters:

- `text`: the `String` to be iterated over

## StringCharacterIterator.StringCharacterIterator(String, int)

```java
public StringCharacterIterator(String text, int pos)
```

Constructs an iterator with the specified initial index.

Parameters:

- `text`: The String to be iterated over
- `pos`: Initial iterator position

Throws:

- `IllegalArgumentException`: if `pos` is not within the bounds of range (inclusive) from `0` to the length of `text`

## StringCharacterIterator.StringCharacterIterator(String, int, int, int)

```java
public StringCharacterIterator(String text, int begin, int end, int pos)
```

Constructs an iterator over the given range of the given string, with the
index set at the specified position.

Parameters:

- `text`: The String to be iterated over
- `begin`: Index of the first character
- `end`: Index of the character following the last character
- `pos`: Initial iterator position

Throws:

- `IllegalArgumentException`: if `begin` and `end` are not within the bounds of range (inclusive) from `0` to the length of `text`, `begin` is greater than `end`, or `pos` is not within the bounds of range (inclusive) from `begin` to `end`

## StringCharacterIterator.setText(String)

```java
public void setText(String text)
```

Reset this iterator to point to a new string.  This package-visible
method is used by other java.text classes that want to avoid allocating
new StringCharacterIterator objects every time their setText method
is called.

Parameters:

- `text`: The String to be iterated over

**Since:** 1.2

Throws:

- `NullPointerException`: if `text` is `null`

## StringCharacterIterator.first()

```java
public char first()
```

Implements CharacterIterator.first() for String.

**See also:** CharacterIterator#first

## StringCharacterIterator.last()

```java
public char last()
```

Implements CharacterIterator.last() for String.

**See also:** CharacterIterator#last

## StringCharacterIterator.setIndex(int)

```java
public char setIndex(int p)
```

Implements CharacterIterator.setIndex() for String.

**See also:** CharacterIterator#setIndex

Throws:

- `IllegalArgumentException`: if `p` is not within the bounds (inclusive) of `getBeginIndex()` to `getEndIndex()`

## StringCharacterIterator.current()

```java
public char current()
```

Implements CharacterIterator.current() for String.

**See also:** CharacterIterator#current

## StringCharacterIterator.next()

```java
public char next()
```

Implements CharacterIterator.next() for String.

**See also:** CharacterIterator#next

## StringCharacterIterator.previous()

```java
public char previous()
```

Implements CharacterIterator.previous() for String.

**See also:** CharacterIterator#previous

## StringCharacterIterator.getBeginIndex()

```java
public int getBeginIndex()
```

Implements CharacterIterator.getBeginIndex() for String.

**See also:** CharacterIterator#getBeginIndex

## StringCharacterIterator.getEndIndex()

```java
public int getEndIndex()
```

Implements CharacterIterator.getEndIndex() for String.

**See also:** CharacterIterator#getEndIndex

## StringCharacterIterator.getIndex()

```java
public int getIndex()
```

Implements CharacterIterator.getIndex() for String.

**See also:** CharacterIterator#getIndex

## StringCharacterIterator.equals(Object)

```java
public boolean equals(Object obj)
```

Compares the equality of two StringCharacterIterator objects.

Parameters:

- `obj`: the StringCharacterIterator object to be compared with.

**Returns:** true if the given obj is the same as this
StringCharacterIterator object; false otherwise.

## StringCharacterIterator.hashCode()

```java
public int hashCode()
```

Computes a hashcode for this iterator.

**Returns:** A hash code

## StringCharacterIterator.clone()

```java
public Object clone()
```

Creates a copy of this iterator.

**Returns:** A copy of this
