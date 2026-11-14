# CharSequence interface (java.lang)

```java
public interface CharSequence
```

A {@code CharSequence} is a readable sequence of {@code char} values. This
interface provides uniform, read-only access to many different kinds of
{@code char} sequences.
A {@code char} value represents a character in the <i>Basic
Multilingual Plane (BMP)</i> or a surrogate. Refer to <a
href="Character.html#unicode">Unicode Character Representation</a> for details.

<p> This interface does not refine the general contracts of the {@link
java.lang.Object#equals(java.lang.Object) equals} and {@link
java.lang.Object#hashCode() hashCode} methods. The result of testing two objects
that implement {@code CharSequence} for equality is therefore, in general, undefined.
Each object may be implemented by a different class, and there
is no guarantee that each class will be capable of testing its instances
for equality with those of the other.  It is therefore inappropriate to use
arbitrary {@code CharSequence} instances as elements in a set or as keys in
a map. </p>

@author Mike McCloskey
@since 1.4

## CharSequence.length()

```java
int length()
```

Returns the length of this character sequence.  The length is the number
of 16-bit {@code char}s in the sequence.

@return  the number of {@code char}s in this sequence

## CharSequence.charAt(int)

```java
char charAt(int index)
```

Returns the {@code char} value at the specified index.  An index ranges from zero
to {@code length() - 1}.  The first {@code char} value of the sequence is at
index zero, the next at index one, and so on, as for array
indexing.

<p>If the {@code char} value specified by the index is a
{@linkplain Character##unicode surrogate}, the surrogate value
is returned.

@param   index   the index of the {@code char} value to be returned

@return  the specified {@code char} value

@throws  IndexOutOfBoundsException
         if the {@code index} argument is negative or not less than
         {@code length()}

## CharSequence.isEmpty()

```java
default boolean isEmpty()
```

Returns {@code true} if this character sequence is empty.

@implSpec
The default implementation returns the result of calling {@code length() == 0}.

@return {@code true} if {@link #length()} is {@code 0}, otherwise
{@code false}

@since 15

## CharSequence.subSequence(int, int)

```java
CharSequence subSequence(int start, int end)
```

Returns a {@code CharSequence} that is a subsequence of this sequence.
The subsequence starts with the {@code char} value at the specified index and
ends with the {@code char} value at index {@code end - 1}.  The length
(in {@code char}s) of the
returned sequence is {@code end - start}, so if {@code start == end}
then an empty sequence is returned.

@param   start   the start index, inclusive
@param   end     the end index, exclusive

@return  the specified subsequence

@throws  IndexOutOfBoundsException
         if {@code start} or {@code end} are negative,
         if {@code end} is greater than {@code length()},
         or if {@code start} is greater than {@code end}

## CharSequence.toString()

```java
public String toString()
```

Returns a string containing the characters in this sequence in the same
order as this sequence.  The length of the string will be the length of
this sequence.

@return  a string consisting of exactly this sequence of characters

## CharSequence.chars()

```java
public default IntStream chars()
```

Returns a stream of {@code int} zero-extending the {@code char} values
from this sequence.  Any char which maps to a
{@linkplain Character##unicode surrogate code point} is passed
through uninterpreted.

<p>The stream binds to this sequence when the terminal stream operation
commences (specifically, for mutable sequences the spliterator for the
stream is <a href="../util/Spliterator.html#binding"><em>late-binding</em></a>).
If the sequence is modified during that operation then the result is
undefined.

@return an IntStream of char values from this sequence
@since 1.8

## CharSequence.codePoints()

```java
public default IntStream codePoints()
```

Returns a stream of code point values from this sequence.  Any surrogate
pairs encountered in the sequence are combined as if by {@linkplain
Character#toCodePoint Character.toCodePoint} and the result is passed
to the stream. Any other code units, including ordinary BMP characters,
unpaired surrogates, and undefined code units, are zero-extended to
{@code int} values which are then passed to the stream.

<p>The stream binds to this sequence when the terminal stream operation
commences (specifically, for mutable sequences the spliterator for the
stream is <a href="../util/Spliterator.html#binding"><em>late-binding</em></a>).
If the sequence is modified during that operation then the result is
undefined.

@return an IntStream of Unicode code points from this sequence
@since 1.8

## CharSequence.compare(CharSequence, CharSequence)

```java
public static int compare(CharSequence cs1, CharSequence cs2)
```

Compares two {@code CharSequence} instances lexicographically. Returns a
negative value, zero, or a positive value if the first sequence is lexicographically
less than, equal to, or greater than the second, respectively.

<p>
The lexicographical ordering of {@code CharSequence} is defined as follows.
Consider a {@code CharSequence} <i>cs</i> of length <i>len</i> to be a
sequence of char values, <i>cs[0]</i> to <i>cs[len-1]</i>. Suppose <i>k</i>
is the lowest index at which the corresponding char values from each sequence
differ. The lexicographic ordering of the sequences is determined by a numeric
comparison of the char values <i>cs1[k]</i> with <i>cs2[k]</i>. If there is
no such index <i>k</i>, the shorter sequence is considered lexicographically
less than the other. If the sequences have the same length, the sequences are
considered lexicographically equal.


@param cs1 the first {@code CharSequence}
@param cs2 the second {@code CharSequence}

@return  the value {@code 0} if the two {@code CharSequence} are equal;
         a negative integer if the first {@code CharSequence}
         is lexicographically less than the second; or a
         positive integer if the first {@code CharSequence} is
         lexicographically greater than the second.

@since 11

## CharSequence.getChars(int, int, char[], int)

```java
public default void getChars(int srcBegin, int srcEnd, char[] dst, int dstBegin)
```

Copies characters from this sequence into the given destination array.
The first character to be copied is at index {@code srcBegin}; the last
character to be copied is at index {@code srcEnd-1}. The total number of
characters to be copied is {@code srcEnd-srcBegin}. The
characters are copied into the subarray of {@code dst} starting
at index {@code dstBegin} and ending at index:
<pre>{@code
dstbegin + (srcEnd-srcBegin) - 1
}</pre>

@param      srcBegin   start copying at this offset.
@param      srcEnd     stop copying at this offset.
@param      dst        the array to copy the data into.
@param      dstBegin   offset into {@code dst}.
@throws     IndexOutOfBoundsException  if any of the following is true:
            <ul>
            <li>{@code srcBegin} is negative
            <li>{@code dstBegin} is negative
            <li>the {@code srcBegin} argument is greater than
            the {@code srcEnd} argument.
            <li>{@code srcEnd} is greater than
            {@code this.length()}.
            <li>{@code dstBegin+srcEnd-srcBegin} is greater than
            {@code dst.length}
            </ul>
@throws     NullPointerException if {@code dst} is {@code null}

@implSpec
The default implementation invokes {@link #charAt(int index)} in a loop
iterating {@code index} from {@code srcBegin} to {@code srcEnd-1}.
Concurrent truncation of this character sequence can throw
{@code IndexOutOfBoundsException}. In this case, some characters, but not
all, may be already transferred.

@since 25