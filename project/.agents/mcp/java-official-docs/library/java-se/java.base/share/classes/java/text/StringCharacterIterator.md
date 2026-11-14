# StringCharacterIterator class (java.text)

```java
public final class StringCharacterIterator implements CharacterIterator
```

{@code StringCharacterIterator} implements the
{@code CharacterIterator} protocol for a {@code String}.
The {@code StringCharacterIterator} class iterates over the
entire {@code String}. All constructors throw {@code NullPointerException}
if {@code text} is {@code null}.

@see CharacterIterator
@since 1.1

## StringCharacterIterator.StringCharacterIterator(String)

```java
public StringCharacterIterator(String text)
```

Constructs an iterator with an initial index of 0.

@param text the {@code String} to be iterated over

## StringCharacterIterator.StringCharacterIterator(String, int)

```java
public StringCharacterIterator(String text, int pos)
```

Constructs an iterator with the specified initial index.

@param  text   The String to be iterated over
@param  pos    Initial iterator position
@throws IllegalArgumentException if {@code pos} is not within the bounds of
range (inclusive) from {@code 0} to the length of {@code text}

## StringCharacterIterator.StringCharacterIterator(String, int, int, int)

```java
public StringCharacterIterator(String text, int begin, int end, int pos)
```

Constructs an iterator over the given range of the given string, with the
index set at the specified position.

@param  text   The String to be iterated over
@param  begin  Index of the first character
@param  end    Index of the character following the last character
@param  pos    Initial iterator position
@throws IllegalArgumentException if {@code begin} and {@code end} are not
within the bounds of range (inclusive) from {@code 0} to the length of {@code text},
{@code begin} is greater than {@code end}, or {@code pos} is not within
the bounds of range (inclusive) from {@code begin} to {@code end}

## StringCharacterIterator.setText(String)

```java
public void setText(String text)
```

Reset this iterator to point to a new string.  This package-visible
method is used by other java.text classes that want to avoid allocating
new StringCharacterIterator objects every time their setText method
is called.

@param  text   The String to be iterated over
@throws NullPointerException if {@code text} is {@code null}
@since 1.2

## StringCharacterIterator.first()

```java
public char first()
```

Implements CharacterIterator.first() for String.
@see CharacterIterator#first

## StringCharacterIterator.last()

```java
public char last()
```

Implements CharacterIterator.last() for String.
@see CharacterIterator#last

## StringCharacterIterator.setIndex(int)

```java
public char setIndex(int p)
```

Implements CharacterIterator.setIndex() for String.

@throws IllegalArgumentException if {@code p} is not within the bounds
(inclusive) of {@link #getBeginIndex()} to {@link #getEndIndex()}
@see CharacterIterator#setIndex

## StringCharacterIterator.current()

```java
public char current()
```

Implements CharacterIterator.current() for String.
@see CharacterIterator#current

## StringCharacterIterator.next()

```java
public char next()
```

Implements CharacterIterator.next() for String.
@see CharacterIterator#next

## StringCharacterIterator.previous()

```java
public char previous()
```

Implements CharacterIterator.previous() for String.
@see CharacterIterator#previous

## StringCharacterIterator.getBeginIndex()

```java
public int getBeginIndex()
```

Implements CharacterIterator.getBeginIndex() for String.
@see CharacterIterator#getBeginIndex

## StringCharacterIterator.getEndIndex()

```java
public int getEndIndex()
```

Implements CharacterIterator.getEndIndex() for String.
@see CharacterIterator#getEndIndex

## StringCharacterIterator.getIndex()

```java
public int getIndex()
```

Implements CharacterIterator.getIndex() for String.
@see CharacterIterator#getIndex

## StringCharacterIterator.equals(Object)

```java
public boolean equals(Object obj)
```

Compares the equality of two StringCharacterIterator objects.
@param obj the StringCharacterIterator object to be compared with.
@return true if the given obj is the same as this
StringCharacterIterator object; false otherwise.

## StringCharacterIterator.hashCode()

```java
public int hashCode()
```

Computes a hashcode for this iterator.
@return A hash code

## StringCharacterIterator.clone()

```java
public Object clone()
```

Creates a copy of this iterator.
@return A copy of this