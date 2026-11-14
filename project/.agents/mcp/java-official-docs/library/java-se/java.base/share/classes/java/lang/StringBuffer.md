---
title: "StringBuffer class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/StringBuffer.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StringBuffer class (java.lang)

```java
public final class StringBuffer extends AbstractStringBuilder implements Appendable, Serializable, Comparable<StringBuffer>, CharSequence
```

A thread-safe, mutable sequence of characters.
A string buffer is like a `String`, but can be modified. At any
point in time it contains some particular sequence of characters, but
the length and content of the sequence can be changed through certain
method calls.

String buffers are safe for use by multiple threads. The methods
are synchronized where necessary so that all the operations on any
particular instance behave as if they occur in some serial order
that is consistent with the order of the method calls made by each of
the individual threads involved.

The principal operations on a `StringBuffer` are the
`append` and `insert` methods, which are
overloaded so as to accept data of any type. Each effectively
converts a given datum to a string and then appends or inserts the
characters of that string to the string buffer. The
`append` method always adds these characters at the end
of the buffer; the `insert` method adds the characters at
a specified point.

For example, if `z` refers to a string buffer object
whose current contents are `"start"`, then
the method call `z.append("le")` would cause the string
buffer to contain `"startle"`, whereas
`z.insert(4, "le")` would alter the string buffer to
contain `"starlet"`.

In general, if sb refers to an instance of a `StringBuffer`,
then `sb.append(x)` has the same effect as
`sb.insert(sb.length(), x)`.

Whenever an operation occurs involving a source sequence (such as
appending or inserting from a source sequence), this class synchronizes
only on the string buffer performing the operation, not on the source.
Note that while `StringBuffer` is designed to be safe to use
concurrently from multiple threads, if the constructor or the
`append` or `insert` operation is passed a source sequence
that is shared across threads, the calling code must ensure
that the operation has a consistent and unchanging view of the source
sequence for the duration of the operation.
This could be satisfied by the caller holding a lock during the
operation's call, by using an immutable source sequence, or by not
sharing the source sequence across threads.

Every string buffer has a capacity. As long as the length of the
character sequence contained in the string buffer does not exceed
the capacity, it is not necessary to allocate a new internal
buffer array. If the internal buffer overflows, it is
automatically made larger.

Unless otherwise noted, passing a `null` argument to a constructor
or method in this class will cause a `NullPointerException` to be
thrown.

As of  release JDK 5, this class has been supplemented with an equivalent
class designed for use by a single thread, `StringBuilder`.  The
`StringBuilder` class should generally be used in preference to
this one, as it supports all of the same operations but it is faster, as
it performs no synchronization.

**API note:** `StringBuffer` implements `Comparable` but does not override
equals. Thus, the natural ordering of `StringBuffer`
is inconsistent with equals. Care should be exercised if `StringBuffer`
objects are used as keys in a `SortedMap` or elements in a `SortedSet`.
See `Comparable`, SortedMap, or
SortedSet for more information.

**See also:** java.lang.StringBuilder

**See also:** java.lang.String

**Since:** 1.0

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

Parameters:

- `capacity`: the initial capacity.

Throws:

- `NegativeArraySizeException`: if the `capacity` argument is less than `0`.

## StringBuffer.StringBuffer(String)

```java
public StringBuffer(String str)
```

Constructs a string buffer initialized to the contents of the
specified string. The initial capacity of the string buffer is
`16` plus the length of the string argument.

Parameters:

- `str`: the initial contents of the buffer.

## StringBuffer.StringBuffer(CharSequence)

```java
public StringBuffer(CharSequence seq)
```

Constructs a string buffer that contains the same characters
as the specified `CharSequence`. The initial capacity of
the string buffer is `16` plus the length of the
`CharSequence` argument.

Parameters:

- `seq`: the sequence to copy.

**Since:** 1.5

## StringBuffer.compareTo(StringBuffer)

```java
public synchronized int compareTo(StringBuffer another)
```

Compares two `StringBuffer` instances lexicographically. This method
follows the same rules for lexicographical comparison as defined in the
java.lang.CharSequence) CharSequence.compare(this, another) method.

For finer-grained, locale-sensitive String comparison, refer to
`java.text.Collator`.

Parameters:

- `another`: the `StringBuffer` to be compared with

**Implementation note:** This method synchronizes on `this`, the current object, but not
`StringBuffer another` with which `this StringBuffer` is compared.

**Returns:** the value `0` if this `StringBuffer` contains the same
character sequence as that of the argument `StringBuffer`; a negative integer
if this `StringBuffer` is lexicographically less than the
`StringBuffer` argument; or a positive integer if this `StringBuffer`
is lexicographically greater than the `StringBuffer` argument.

**Since:** 11

## StringBuffer.trimToSize()

```java
public synchronized void trimToSize()
```

**Since:** 1.5

## StringBuffer.setLength(int)

```java
public synchronized void setLength(int newLength)
```

**See also:** #length()

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.charAt(int)

```java
public synchronized char charAt(int index)
```

**See also:** #length()

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.codePointAt(int)

```java
public synchronized int codePointAt(int index)
```

**Since:** 1.5

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.codePointBefore(int)

```java
public synchronized int codePointBefore(int index)
```

**Since:** 1.5

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.codePointCount(int, int)

```java
public synchronized int codePointCount(int beginIndex, int endIndex)
```

**Since:** 1.5

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.offsetByCodePoints(int, int)

```java
public synchronized int offsetByCodePoints(int index, int codePointOffset)
```

**Since:** 1.5

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.setCharAt(int, char)

```java
public synchronized void setCharAt(int index, char ch)
```

**See also:** #length()

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.append(StringBuffer)

```java
public synchronized StringBuffer append(StringBuffer sb)
```

Appends the specified `StringBuffer` to this sequence.

The characters of the `StringBuffer` argument are appended,
in order, to the contents of this `StringBuffer`, increasing the
length of this `StringBuffer` by the length of the argument.
If `sb` is `null`, then the four characters
`"null"` are appended to this `StringBuffer`.

Let *n* be the length of the old character sequence, the one
contained in the `StringBuffer` just prior to execution of the
`append` method. Then the character at index *k* in
the new character sequence is equal to the character at index *k*
in the old character sequence, if *k* is less than *n*;
otherwise, it is equal to the character at index *k-n* in the
argument `sb`.

This method synchronizes on `this`, the destination
object, but does not synchronize on the source (`sb`).

Parameters:

- `sb`: the `StringBuffer` to append.

**Returns:** a reference to this object.

**Since:** 1.4

## StringBuffer.append(CharSequence)

```java
public synchronized StringBuffer append(CharSequence s)
```

Appends the specified `CharSequence` to this
sequence.

The characters of the `CharSequence` argument are appended,
in order, increasing the length of this sequence by the length of the
argument.

The result of this method is exactly the same as if it were an
invocation of this.append(s, 0, s.length());

This method synchronizes on `this`, the destination
object, but does not synchronize on the source (`s`).

If `s` is `null`, then the four characters
`"null"` are appended.

Parameters:

- `s`: the `CharSequence` to append.

**Returns:** a reference to this object.

**Since:** 1.5

## StringBuffer.append(CharSequence, int, int)

```java
public synchronized StringBuffer append(CharSequence s, int start, int end)
```

**Since:** 1.5

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.append(char[], int, int)

```java
public synchronized StringBuffer append(char[] str, int offset, int len)
```

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.appendCodePoint(int)

```java
public synchronized StringBuffer appendCodePoint(int codePoint)
```

**Since:** 1.5

## StringBuffer.delete(int, int)

```java
public synchronized StringBuffer delete(int start, int end)
```

**Since:** 1.2

Throws:

- `StringIndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.deleteCharAt(int)

```java
public synchronized StringBuffer deleteCharAt(int index)
```

**Since:** 1.2

Throws:

- `StringIndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.replace(int, int, String)

```java
public synchronized StringBuffer replace(int start, int end, String str)
```

**Since:** 1.2

Throws:

- `StringIndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.substring(int)

```java
public synchronized String substring(int start)
```

**Since:** 1.2

Throws:

- `StringIndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.subSequence(int, int)

```java
public synchronized CharSequence subSequence(int start, int end)
```

**Since:** 1.4

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.substring(int, int)

```java
public synchronized String substring(int start, int end)
```

**Since:** 1.2

Throws:

- `StringIndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.insert(int, char[], int, int)

```java
public synchronized StringBuffer insert(int index, char[] str, int offset, int len)
```

**Since:** 1.2

Throws:

- `StringIndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.insert(int, Object)

```java
public synchronized StringBuffer insert(int offset, Object obj)
```

Throws:

- `StringIndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.insert(int, String)

```java
public synchronized StringBuffer insert(int offset, String str)
```

Throws:

- `StringIndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.insert(int, char[])

```java
public synchronized StringBuffer insert(int offset, char[] str)
```

Throws:

- `StringIndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.insert(int, CharSequence)

```java
public StringBuffer insert(int dstOffset, CharSequence s)
```

**Since:** 1.5

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.insert(int, CharSequence, int, int)

```java
public synchronized StringBuffer insert(int dstOffset, CharSequence s, int start, int end)
```

**Since:** 1.5

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.insert(int, boolean)

```java
public StringBuffer insert(int offset, boolean b)
```

Throws:

- `StringIndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.insert(int, char)

```java
public synchronized StringBuffer insert(int offset, char c)
```

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.insert(int, int)

```java
public StringBuffer insert(int offset, int i)
```

Throws:

- `StringIndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.insert(int, long)

```java
public StringBuffer insert(int offset, long l)
```

Throws:

- `StringIndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.insert(int, float)

```java
public StringBuffer insert(int offset, float f)
```

Throws:

- `StringIndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.insert(int, double)

```java
public StringBuffer insert(int offset, double d)
```

Throws:

- `StringIndexOutOfBoundsException`: (inherited documentation)

## StringBuffer.indexOf(String)

```java
public int indexOf(String str)
```

**Since:** 1.4

## StringBuffer.indexOf(String, int)

```java
public synchronized int indexOf(String str, int fromIndex)
```

**Since:** 1.4

## StringBuffer.lastIndexOf(String)

```java
public int lastIndexOf(String str)
```

**Since:** 1.4

## StringBuffer.lastIndexOf(String, int)

```java
public synchronized int lastIndexOf(String str, int fromIndex)
```

**Since:** 1.4

## StringBuffer.reverse()

```java
public synchronized StringBuffer reverse()
```

**Since:** 1.0.2

## StringBuffer.repeat(int, int)

```java
public synchronized StringBuffer repeat(int codePoint, int count)
```

**Since:** 21

Throws:

- `IllegalArgumentException`: (inherited documentation)

## StringBuffer.repeat(CharSequence, int)

```java
public synchronized StringBuffer repeat(CharSequence cs, int count)
```

**Since:** 21

Throws:

- `IllegalArgumentException`: (inherited documentation)
