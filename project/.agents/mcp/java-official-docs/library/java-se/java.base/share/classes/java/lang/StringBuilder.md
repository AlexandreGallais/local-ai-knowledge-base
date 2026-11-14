# StringBuilder class (java.lang)

```java
public final class StringBuilder extends AbstractStringBuilder implements Appendable, java.io.Serializable, Comparable<StringBuilder>, CharSequence
```

A mutable sequence of characters.  This class provides an API compatible
with {@code StringBuffer}, but with no guarantee of synchronization.
This class is designed for use as a drop-in replacement for
{@code StringBuffer} in places where the string buffer was being
used by a single thread (as is generally the case).   Where possible,
it is recommended that this class be used in preference to
{@code StringBuffer} as it will be faster under most implementations.

<p>The principal operations on a {@code StringBuilder} are the
{@code append} and {@code insert} methods, which are
overloaded so as to accept data of any type. Each effectively
converts a given datum to a string and then appends or inserts the
characters of that string to the string builder. The
{@code append} method always adds these characters at the end
of the builder; the {@code insert} method adds the characters at
a specified point.
<p>
For example, if {@code z} refers to a string builder object
whose current contents are "{@code start}", then
the method call {@code z.append("le")} would cause the string
builder to contain "{@code startle}", whereas
{@code z.insert(4, "le")} would alter the string builder to
contain "{@code starlet}".
<p>
In general, if sb refers to an instance of a {@code StringBuilder},
then {@code sb.append(x)} has the same effect as
{@code sb.insert(sb.length(), x)}.
<p>
Every string builder has a capacity. As long as the length of the
character sequence contained in the string builder does not exceed
the capacity, it is not necessary to allocate a new internal
buffer. If the internal buffer overflows, it is automatically made larger.

<p>Instances of {@code StringBuilder} are not safe for
use by multiple threads. If such synchronization is required then it is
recommended that {@link java.lang.StringBuffer} be used.

<p>Unless otherwise noted, passing a {@code null} argument to a constructor
or method in this class will cause a {@link NullPointerException} to be
thrown.

@apiNote
{@code StringBuilder} implements {@code Comparable} but does not override
{@link Object#equals equals}. Thus, the natural ordering of {@code StringBuilder}
is inconsistent with equals. Care should be exercised if {@code StringBuilder}
objects are used as keys in a {@code SortedMap} or elements in a {@code SortedSet}.
See {@link Comparable}, {@link java.util.SortedMap SortedMap}, or
{@link java.util.SortedSet SortedSet} for more information.

@author      Michael McCloskey
@see         java.lang.StringBuffer
@see         java.lang.String
@since       1.5

## StringBuilder.StringBuilder()

```java
public StringBuilder()
```

Constructs a string builder with no characters in it and an
initial capacity of 16 characters.

## StringBuilder.StringBuilder(int)

```java
public StringBuilder(int capacity)
```

Constructs a string builder with no characters in it and an
initial capacity specified by the {@code capacity} argument.

@param      capacity  the initial capacity.
@throws     NegativeArraySizeException  if the {@code capacity}
              argument is less than {@code 0}.

## StringBuilder.StringBuilder(String)

```java
public StringBuilder(String str)
```

Constructs a string builder initialized to the contents of the
specified string. The initial capacity of the string builder is
{@code 16} plus the length of the string argument.

@param   str   the initial contents of the buffer.

## StringBuilder.StringBuilder(CharSequence)

```java
public StringBuilder(CharSequence seq)
```

Constructs a string builder that contains the same characters
as the specified {@code CharSequence}. The initial capacity of
the string builder is {@code 16} plus the length of the
{@code CharSequence} argument.

@param      seq   the sequence to copy.

## StringBuilder.compareTo(StringBuilder)

```java
public int compareTo(StringBuilder another)
```

Compares two {@code StringBuilder} instances lexicographically. This method
follows the same rules for lexicographical comparison as defined in the
{@linkplain java.lang.CharSequence#compare(java.lang.CharSequence,
java.lang.CharSequence)  CharSequence.compare(this, another)} method.

<p>
For finer-grained, locale-sensitive String comparison, refer to
{@link java.text.Collator}.

@param another the {@code StringBuilder} to be compared with

@return  the value {@code 0} if this {@code StringBuilder} contains the same
character sequence as that of the argument {@code StringBuilder}; a negative integer
if this {@code StringBuilder} is lexicographically less than the
{@code StringBuilder} argument; or a positive integer if this {@code StringBuilder}
is lexicographically greater than the {@code StringBuilder} argument.

@since 11

## StringBuilder.append(StringBuffer)

```java
public StringBuilder append(StringBuffer sb)
```

Appends the specified {@code StringBuffer} to this sequence.
<p>
The characters of the {@code StringBuffer} argument are appended,
in order, to this sequence, increasing the
length of this sequence by the length of the argument.
If {@code sb} is {@code null}, then the four characters
{@code "null"} are appended to this sequence.
<p>
Let <i>n</i> be the length of this character sequence just prior to
execution of the {@code append} method. Then the character at index
<i>k</i> in the new character sequence is equal to the character at
index <i>k</i> in the old character sequence, if <i>k</i> is less than
<i>n</i>; otherwise, it is equal to the character at index <i>k-n</i>
in the argument {@code sb}.

@param   sb   the {@code StringBuffer} to append.
@return  a reference to this object.

## StringBuilder.append(CharSequence, int, int)

```java
public StringBuilder append(CharSequence s, int start, int end)
```

@throws     IndexOutOfBoundsException {@inheritDoc}

## StringBuilder.append(char[], int, int)

```java
public StringBuilder append(char[] str, int offset, int len)
```

@throws IndexOutOfBoundsException {@inheritDoc}

## StringBuilder.appendCodePoint(int)

```java
public StringBuilder appendCodePoint(int codePoint)
```

@since 1.5

## StringBuilder.delete(int, int)

```java
public StringBuilder delete(int start, int end)
```

@throws StringIndexOutOfBoundsException {@inheritDoc}

## StringBuilder.deleteCharAt(int)

```java
public StringBuilder deleteCharAt(int index)
```

@throws StringIndexOutOfBoundsException {@inheritDoc}

## StringBuilder.replace(int, int, String)

```java
public StringBuilder replace(int start, int end, String str)
```

@throws StringIndexOutOfBoundsException {@inheritDoc}

## StringBuilder.insert(int, char[], int, int)

```java
public StringBuilder insert(int index, char[] str, int offset, int len)
```

@throws StringIndexOutOfBoundsException {@inheritDoc}

## StringBuilder.insert(int, Object)

```java
public StringBuilder insert(int offset, Object obj)
```

@throws StringIndexOutOfBoundsException {@inheritDoc}

## StringBuilder.insert(int, String)

```java
public StringBuilder insert(int offset, String str)
```

@throws StringIndexOutOfBoundsException {@inheritDoc}

## StringBuilder.insert(int, char[])

```java
public StringBuilder insert(int offset, char[] str)
```

@throws StringIndexOutOfBoundsException {@inheritDoc}

## StringBuilder.insert(int, CharSequence)

```java
public StringBuilder insert(int dstOffset, CharSequence s)
```

@throws IndexOutOfBoundsException {@inheritDoc}

## StringBuilder.insert(int, CharSequence, int, int)

```java
public StringBuilder insert(int dstOffset, CharSequence s, int start, int end)
```

@throws IndexOutOfBoundsException {@inheritDoc}

## StringBuilder.insert(int, boolean)

```java
public StringBuilder insert(int offset, boolean b)
```

@throws StringIndexOutOfBoundsException {@inheritDoc}

## StringBuilder.insert(int, char)

```java
public StringBuilder insert(int offset, char c)
```

@throws IndexOutOfBoundsException {@inheritDoc}

## StringBuilder.insert(int, int)

```java
public StringBuilder insert(int offset, int i)
```

@throws StringIndexOutOfBoundsException {@inheritDoc}

## StringBuilder.insert(int, long)

```java
public StringBuilder insert(int offset, long l)
```

@throws StringIndexOutOfBoundsException {@inheritDoc}

## StringBuilder.insert(int, float)

```java
public StringBuilder insert(int offset, float f)
```

@throws StringIndexOutOfBoundsException {@inheritDoc}

## StringBuilder.insert(int, double)

```java
public StringBuilder insert(int offset, double d)
```

@throws StringIndexOutOfBoundsException {@inheritDoc}

## StringBuilder.repeat(int, int)

```java
public StringBuilder repeat(int codePoint, int count)
```

@throws IllegalArgumentException {@inheritDoc}

@since 21

## StringBuilder.repeat(CharSequence, int)

```java
public StringBuilder repeat(CharSequence cs, int count)
```

@throws IllegalArgumentException {@inheritDoc}

@since 21