---
title: "StringBuilder class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/StringBuilder.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StringBuilder class (java.lang)

```java
public final class StringBuilder extends AbstractStringBuilder implements Appendable, java.io.Serializable, Comparable<StringBuilder>, CharSequence
```

A mutable sequence of characters.  This class provides an API compatible
with `StringBuffer`, but with no guarantee of synchronization.
This class is designed for use as a drop-in replacement for
`StringBuffer` in places where the string buffer was being
used by a single thread (as is generally the case).   Where possible,
it is recommended that this class be used in preference to
`StringBuffer` as it will be faster under most implementations.

The principal operations on a `StringBuilder` are the
`append` and `insert` methods, which are
overloaded so as to accept data of any type. Each effectively
converts a given datum to a string and then appends or inserts the
characters of that string to the string builder. The
`append` method always adds these characters at the end
of the builder; the `insert` method adds the characters at
a specified point.

For example, if `z` refers to a string builder object
whose current contents are "`start`", then
the method call `z.append("le")` would cause the string
builder to contain "`startle`", whereas
`z.insert(4, "le")` would alter the string builder to
contain "`starlet`".

In general, if sb refers to an instance of a `StringBuilder`,
then `sb.append(x)` has the same effect as
`sb.insert(sb.length(), x)`.

Every string builder has a capacity. As long as the length of the
character sequence contained in the string builder does not exceed
the capacity, it is not necessary to allocate a new internal
buffer. If the internal buffer overflows, it is automatically made larger.

Instances of `StringBuilder` are not safe for
use by multiple threads. If such synchronization is required then it is
recommended that `java.lang.StringBuffer` be used.

Unless otherwise noted, passing a `null` argument to a constructor
or method in this class will cause a `NullPointerException` to be
thrown.

**API note:** `StringBuilder` implements `Comparable` but does not override
equals. Thus, the natural ordering of `StringBuilder`
is inconsistent with equals. Care should be exercised if `StringBuilder`
objects are used as keys in a `SortedMap` or elements in a `SortedSet`.
See `Comparable`, SortedMap, or
SortedSet for more information.

**See also:** java.lang.StringBuffer

**See also:** java.lang.String

**Since:** 1.5

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
initial capacity specified by the `capacity` argument.

Parameters:

- `capacity`: the initial capacity.

Throws:

- `NegativeArraySizeException`: if the `capacity` argument is less than `0`.

## StringBuilder.StringBuilder(String)

```java
public StringBuilder(String str)
```

Constructs a string builder initialized to the contents of the
specified string. The initial capacity of the string builder is
`16` plus the length of the string argument.

Parameters:

- `str`: the initial contents of the buffer.

## StringBuilder.StringBuilder(CharSequence)

```java
public StringBuilder(CharSequence seq)
```

Constructs a string builder that contains the same characters
as the specified `CharSequence`. The initial capacity of
the string builder is `16` plus the length of the
`CharSequence` argument.

Parameters:

- `seq`: the sequence to copy.

## StringBuilder.compareTo(StringBuilder)

```java
public int compareTo(StringBuilder another)
```

Compares two `StringBuilder` instances lexicographically. This method
follows the same rules for lexicographical comparison as defined in the
java.lang.CharSequence) CharSequence.compare(this, another) method.

For finer-grained, locale-sensitive String comparison, refer to
`java.text.Collator`.

Parameters:

- `another`: the `StringBuilder` to be compared with

**Returns:** the value `0` if this `StringBuilder` contains the same
character sequence as that of the argument `StringBuilder`; a negative integer
if this `StringBuilder` is lexicographically less than the
`StringBuilder` argument; or a positive integer if this `StringBuilder`
is lexicographically greater than the `StringBuilder` argument.

**Since:** 11

## StringBuilder.append(StringBuffer)

```java
public StringBuilder append(StringBuffer sb)
```

Appends the specified `StringBuffer` to this sequence.

The characters of the `StringBuffer` argument are appended,
in order, to this sequence, increasing the
length of this sequence by the length of the argument.
If `sb` is `null`, then the four characters
`"null"` are appended to this sequence.

Let *n* be the length of this character sequence just prior to
execution of the `append` method. Then the character at index
*k* in the new character sequence is equal to the character at
index *k* in the old character sequence, if *k* is less than
*n*; otherwise, it is equal to the character at index *k-n*
in the argument `sb`.

Parameters:

- `sb`: the `StringBuffer` to append.

**Returns:** a reference to this object.

## StringBuilder.append(CharSequence, int, int)

```java
public StringBuilder append(CharSequence s, int start, int end)
```

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## StringBuilder.append(char[], int, int)

```java
public StringBuilder append(char[] str, int offset, int len)
```

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## StringBuilder.appendCodePoint(int)

```java
public StringBuilder appendCodePoint(int codePoint)
```

**Since:** 1.5

## StringBuilder.delete(int, int)

```java
public StringBuilder delete(int start, int end)
```

Throws:

- `StringIndexOutOfBoundsException`: (inherited documentation)

## StringBuilder.deleteCharAt(int)

```java
public StringBuilder deleteCharAt(int index)
```

Throws:

- `StringIndexOutOfBoundsException`: (inherited documentation)

## StringBuilder.replace(int, int, String)

```java
public StringBuilder replace(int start, int end, String str)
```

Throws:

- `StringIndexOutOfBoundsException`: (inherited documentation)

## StringBuilder.insert(int, char[], int, int)

```java
public StringBuilder insert(int index, char[] str, int offset, int len)
```

Throws:

- `StringIndexOutOfBoundsException`: (inherited documentation)

## StringBuilder.insert(int, Object)

```java
public StringBuilder insert(int offset, Object obj)
```

Throws:

- `StringIndexOutOfBoundsException`: (inherited documentation)

## StringBuilder.insert(int, String)

```java
public StringBuilder insert(int offset, String str)
```

Throws:

- `StringIndexOutOfBoundsException`: (inherited documentation)

## StringBuilder.insert(int, char[])

```java
public StringBuilder insert(int offset, char[] str)
```

Throws:

- `StringIndexOutOfBoundsException`: (inherited documentation)

## StringBuilder.insert(int, CharSequence)

```java
public StringBuilder insert(int dstOffset, CharSequence s)
```

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## StringBuilder.insert(int, CharSequence, int, int)

```java
public StringBuilder insert(int dstOffset, CharSequence s, int start, int end)
```

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## StringBuilder.insert(int, boolean)

```java
public StringBuilder insert(int offset, boolean b)
```

Throws:

- `StringIndexOutOfBoundsException`: (inherited documentation)

## StringBuilder.insert(int, char)

```java
public StringBuilder insert(int offset, char c)
```

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## StringBuilder.insert(int, int)

```java
public StringBuilder insert(int offset, int i)
```

Throws:

- `StringIndexOutOfBoundsException`: (inherited documentation)

## StringBuilder.insert(int, long)

```java
public StringBuilder insert(int offset, long l)
```

Throws:

- `StringIndexOutOfBoundsException`: (inherited documentation)

## StringBuilder.insert(int, float)

```java
public StringBuilder insert(int offset, float f)
```

Throws:

- `StringIndexOutOfBoundsException`: (inherited documentation)

## StringBuilder.insert(int, double)

```java
public StringBuilder insert(int offset, double d)
```

Throws:

- `StringIndexOutOfBoundsException`: (inherited documentation)

## StringBuilder.repeat(int, int)

```java
public StringBuilder repeat(int codePoint, int count)
```

**Since:** 21

Throws:

- `IllegalArgumentException`: (inherited documentation)

## StringBuilder.repeat(CharSequence, int)

```java
public StringBuilder repeat(CharSequence cs, int count)
```

**Since:** 21

Throws:

- `IllegalArgumentException`: (inherited documentation)
