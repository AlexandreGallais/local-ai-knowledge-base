# StringBuffer class (java.lang)

```java
public final class StringBuffer extends AbstractStringBuilder implements Appendable, Serializable, Comparable<StringBuffer>, CharSequence
```

A thread-safe, mutable sequence of characters.
A string buffer is like a {@link String}, but can be modified. At any
point in time it contains some particular sequence of characters, but
the length and content of the sequence can be changed through certain
method calls.
<p>
String buffers are safe for use by multiple threads. The methods
are synchronized where necessary so that all the operations on any
particular instance behave as if they occur in some serial order
that is consistent with the order of the method calls made by each of
the individual threads involved.
<p>
The principal operations on a {@code StringBuffer} are the
{@code append} and {@code insert} methods, which are
overloaded so as to accept data of any type. Each effectively
converts a given datum to a string and then appends or inserts the
characters of that string to the string buffer. The
{@code append} method always adds these characters at the end
of the buffer; the {@code insert} method adds the characters at
a specified point.
<p>
For example, if {@code z} refers to a string buffer object
whose current contents are {@code "start"}, then
the method call {@code z.append("le")} would cause the string
buffer to contain {@code "startle"}, whereas
{@code z.insert(4, "le")} would alter the string buffer to
contain {@code "starlet"}.
<p>
In general, if sb refers to an instance of a {@code StringBuffer},
then {@code sb.append(x)} has the same effect as
{@code sb.insert(sb.length(), x)}.
<p>
Whenever an operation occurs involving a source sequence (such as
appending or inserting from a source sequence), this class synchronizes
only on the string buffer performing the operation, not on the source.
Note that while {@code StringBuffer} is designed to be safe to use
concurrently from multiple threads, if the constructor or the
{@code append} or {@code insert} operation is passed a source sequence
that is shared across threads, the calling code must ensure
that the operation has a consistent and unchanging view of the source
sequence for the duration of the operation.
This could be satisfied by the caller holding a lock during the
operation's call, by using an immutable source sequence, or by not
sharing the source sequence across threads.
<p>
Every string buffer has a capacity. As long as the length of the
character sequence contained in the string buffer does not exceed
the capacity, it is not necessary to allocate a new internal
buffer array. If the internal buffer overflows, it is
automatically made larger.
<p>
Unless otherwise noted, passing a {@code null} argument to a constructor
or method in this class will cause a {@link NullPointerException} to be
thrown.
<p>
As of  release JDK 5, this class has been supplemented with an equivalent
class designed for use by a single thread, {@link StringBuilder}.  The
{@code StringBuilder} class should generally be used in preference to
this one, as it supports all of the same operations but it is faster, as
it performs no synchronization.

@apiNote
{@code StringBuffer} implements {@code Comparable} but does not override
{@link Object#equals equals}. Thus, the natural ordering of {@code StringBuffer}
is inconsistent with equals. Care should be exercised if {@code StringBuffer}
objects are used as keys in a {@code SortedMap} or elements in a {@code SortedSet}.
See {@link Comparable}, {@link java.util.SortedMap SortedMap}, or
{@link java.util.SortedSet SortedSet} for more information.

@author      Arthur van Hoff
@see     java.lang.StringBuilder
@see     java.lang.String
@since   1.0

## StringBuffer.StringBuffer()

```java
public StringBuffer()
```

Constructs a string buffer with no characters in it and an
initial capacity of 16 characters.

## StringBuffer.StringBuffer(int)

```java
public StringBuffer(int capacity)
```

Constructs a string buffer with no characters in it and
the specified initial capacity.

@param      capacity  the initial capacity.
@throws     NegativeArraySizeException  if the {@code capacity}
            argument is less than {@code 0}.

## StringBuffer.StringBuffer(String)

```java
public StringBuffer(String str)
```

Constructs a string buffer initialized to the contents of the
specified string. The initial capacity of the string buffer is
{@code 16} plus the length of the string argument.

@param   str   the initial contents of the buffer.

## StringBuffer.StringBuffer(CharSequence)

```java
public StringBuffer(CharSequence seq)
```

Constructs a string buffer that contains the same characters
as the specified {@code CharSequence}. The initial capacity of
the string buffer is {@code 16} plus the length of the
{@code CharSequence} argument.

@param      seq   the sequence to copy.
@since 1.5

## StringBuffer.compareTo(StringBuffer)

```java
public synchronized int compareTo(StringBuffer another)
```

Compares two {@code StringBuffer} instances lexicographically. This method
follows the same rules for lexicographical comparison as defined in the
{@linkplain java.lang.CharSequence#compare(java.lang.CharSequence,
java.lang.CharSequence)  CharSequence.compare(this, another)} method.

<p>
For finer-grained, locale-sensitive String comparison, refer to
{@link java.text.Collator}.

@implNote
This method synchronizes on {@code this}, the current object, but not
{@code StringBuffer another} with which {@code this StringBuffer} is compared.

@param another the {@code StringBuffer} to be compared with

@return  the value {@code 0} if this {@code StringBuffer} contains the same
character sequence as that of the argument {@code StringBuffer}; a negative integer
if this {@code StringBuffer} is lexicographically less than the
{@code StringBuffer} argument; or a positive integer if this {@code StringBuffer}
is lexicographically greater than the {@code StringBuffer} argument.

@since 11

## StringBuffer.trimToSize()

```java
public synchronized void trimToSize()
```

@since      1.5

## StringBuffer.setLength(int)

```java
public synchronized void setLength(int newLength)
```

@throws IndexOutOfBoundsException {@inheritDoc}
@see        #length()

## StringBuffer.charAt(int)

```java
public synchronized char charAt(int index)
```

@throws IndexOutOfBoundsException {@inheritDoc}
@see        #length()

## StringBuffer.codePointAt(int)

```java
public synchronized int codePointAt(int index)
```

@throws IndexOutOfBoundsException {@inheritDoc}
@since      1.5

## StringBuffer.codePointBefore(int)

```java
public synchronized int codePointBefore(int index)
```

@throws IndexOutOfBoundsException {@inheritDoc}
@since     1.5

## StringBuffer.codePointCount(int, int)

```java
public synchronized int codePointCount(int beginIndex, int endIndex)
```

@throws IndexOutOfBoundsException {@inheritDoc}
@since     1.5

## StringBuffer.offsetByCodePoints(int, int)

```java
public synchronized int offsetByCodePoints(int index, int codePointOffset)
```

@throws IndexOutOfBoundsException {@inheritDoc}
@since     1.5

## StringBuffer.setCharAt(int, char)

```java
public synchronized void setCharAt(int index, char ch)
```

@throws IndexOutOfBoundsException {@inheritDoc}
@see        #length()

## StringBuffer.append(StringBuffer)

```java
public synchronized StringBuffer append(StringBuffer sb)
```

Appends the specified {@code StringBuffer} to this sequence.
<p>
The characters of the {@code StringBuffer} argument are appended,
in order, to the contents of this {@code StringBuffer}, increasing the
length of this {@code StringBuffer} by the length of the argument.
If {@code sb} is {@code null}, then the four characters
{@code "null"} are appended to this {@code StringBuffer}.
<p>
Let <i>n</i> be the length of the old character sequence, the one
contained in the {@code StringBuffer} just prior to execution of the
{@code append} method. Then the character at index <i>k</i> in
the new character sequence is equal to the character at index <i>k</i>
in the old character sequence, if <i>k</i> is less than <i>n</i>;
otherwise, it is equal to the character at index <i>k-n</i> in the
argument {@code sb}.
<p>
This method synchronizes on {@code this}, the destination
object, but does not synchronize on the source ({@code sb}).

@param   sb   the {@code StringBuffer} to append.
@return  a reference to this object.
@since 1.4

## StringBuffer.append(CharSequence)

```java
public synchronized StringBuffer append(CharSequence s)
```

Appends the specified {@code CharSequence} to this
sequence.
<p>
The characters of the {@code CharSequence} argument are appended,
in order, increasing the length of this sequence by the length of the
argument.

<p>The result of this method is exactly the same as if it were an
invocation of this.append(s, 0, s.length());

<p>This method synchronizes on {@code this}, the destination
object, but does not synchronize on the source ({@code s}).

<p>If {@code s} is {@code null}, then the four characters
{@code "null"} are appended.

@param   s the {@code CharSequence} to append.
@return  a reference to this object.
@since 1.5

## StringBuffer.append(CharSequence, int, int)

```java
public synchronized StringBuffer append(CharSequence s, int start, int end)
```

@throws IndexOutOfBoundsException {@inheritDoc}
@since      1.5

## StringBuffer.append(char[], int, int)

```java
public synchronized StringBuffer append(char[] str, int offset, int len)
```

@throws IndexOutOfBoundsException {@inheritDoc}

## StringBuffer.appendCodePoint(int)

```java
public synchronized StringBuffer appendCodePoint(int codePoint)
```

@since 1.5

## StringBuffer.delete(int, int)

```java
public synchronized StringBuffer delete(int start, int end)
```

@throws StringIndexOutOfBoundsException {@inheritDoc}
@since      1.2

## StringBuffer.deleteCharAt(int)

```java
public synchronized StringBuffer deleteCharAt(int index)
```

@throws StringIndexOutOfBoundsException {@inheritDoc}
@since      1.2

## StringBuffer.replace(int, int, String)

```java
public synchronized StringBuffer replace(int start, int end, String str)
```

@throws StringIndexOutOfBoundsException {@inheritDoc}
@since      1.2

## StringBuffer.substring(int)

```java
public synchronized String substring(int start)
```

@throws StringIndexOutOfBoundsException {@inheritDoc}
@since      1.2

## StringBuffer.subSequence(int, int)

```java
public synchronized CharSequence subSequence(int start, int end)
```

@throws IndexOutOfBoundsException {@inheritDoc}
@since      1.4

## StringBuffer.substring(int, int)

```java
public synchronized String substring(int start, int end)
```

@throws StringIndexOutOfBoundsException {@inheritDoc}
@since      1.2

## StringBuffer.insert(int, char[], int, int)

```java
public synchronized StringBuffer insert(int index, char[] str, int offset, int len)
```

@throws StringIndexOutOfBoundsException {@inheritDoc}
@since      1.2

## StringBuffer.insert(int, Object)

```java
public synchronized StringBuffer insert(int offset, Object obj)
```

@throws StringIndexOutOfBoundsException {@inheritDoc}

## StringBuffer.insert(int, String)

```java
public synchronized StringBuffer insert(int offset, String str)
```

@throws StringIndexOutOfBoundsException {@inheritDoc}

## StringBuffer.insert(int, char[])

```java
public synchronized StringBuffer insert(int offset, char[] str)
```

@throws StringIndexOutOfBoundsException {@inheritDoc}

## StringBuffer.insert(int, CharSequence)

```java
public StringBuffer insert(int dstOffset, CharSequence s)
```

@throws IndexOutOfBoundsException {@inheritDoc}
@since      1.5

## StringBuffer.insert(int, CharSequence, int, int)

```java
public synchronized StringBuffer insert(int dstOffset, CharSequence s, int start, int end)
```

@throws IndexOutOfBoundsException {@inheritDoc}
@since      1.5

## StringBuffer.insert(int, boolean)

```java
public StringBuffer insert(int offset, boolean b)
```

@throws StringIndexOutOfBoundsException {@inheritDoc}

## StringBuffer.insert(int, char)

```java
public synchronized StringBuffer insert(int offset, char c)
```

@throws IndexOutOfBoundsException {@inheritDoc}

## StringBuffer.insert(int, int)

```java
public StringBuffer insert(int offset, int i)
```

@throws StringIndexOutOfBoundsException {@inheritDoc}

## StringBuffer.insert(int, long)

```java
public StringBuffer insert(int offset, long l)
```

@throws StringIndexOutOfBoundsException {@inheritDoc}

## StringBuffer.insert(int, float)

```java
public StringBuffer insert(int offset, float f)
```

@throws StringIndexOutOfBoundsException {@inheritDoc}

## StringBuffer.insert(int, double)

```java
public StringBuffer insert(int offset, double d)
```

@throws StringIndexOutOfBoundsException {@inheritDoc}

## StringBuffer.indexOf(String)

```java
public int indexOf(String str)
```

@since      1.4

## StringBuffer.indexOf(String, int)

```java
public synchronized int indexOf(String str, int fromIndex)
```

@since      1.4

## StringBuffer.lastIndexOf(String)

```java
public int lastIndexOf(String str)
```

@since      1.4

## StringBuffer.lastIndexOf(String, int)

```java
public synchronized int lastIndexOf(String str, int fromIndex)
```

@since      1.4

## StringBuffer.reverse()

```java
public synchronized StringBuffer reverse()
```

@since   1.0.2

## StringBuffer.repeat(int, int)

```java
public synchronized StringBuffer repeat(int codePoint, int count)
```

@throws IllegalArgumentException {@inheritDoc}

@since 21

## StringBuffer.repeat(CharSequence, int)

```java
public synchronized StringBuffer repeat(CharSequence cs, int count)
```

@throws IllegalArgumentException {@inheritDoc}

@since 21