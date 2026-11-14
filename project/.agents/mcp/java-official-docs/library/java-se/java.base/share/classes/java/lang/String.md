---
title: "String class (java.lang) (part 1 of 7)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/String.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# String class (java.lang)

```java
public final class String implements java.io.Serializable, Comparable<String>, CharSequence, Constable, ConstantDesc
```

The `String` class represents character strings. All
string literals in Java programs, such as `"abc"`, are
implemented as instances of this class.

Strings are constant; their values cannot be changed after they
are created. String buffers support mutable strings.
Because String objects are immutable they can be shared. For example:

```java
    String str = "abc";
```

is equivalent to:

```java
    char data[] = {'a', 'b', 'c'};
    String str = new String(data);
```

Here are some more examples of how strings can be used:

```java
    System.out.println("abc");
    String cde = "cde";
    System.out.println("abc" + cde);
    String c = "abc".substring(2, 3);
    String d = cde.substring(1, 2);
```

The class `String` includes methods for examining
individual characters of the sequence, for comparing strings, for
searching strings, for extracting substrings, and for creating a
copy of a string with all characters translated to uppercase or to
lowercase. Case mapping is based on the Unicode Standard version
specified by the Character class.

The Java language provides special support for the string
concatenation operator ( + ), and for conversion of
other objects to strings. For additional information on string
concatenation and conversion, see *The Java Language Specification*.

 Unless otherwise noted, passing a `null` argument to a constructor
or method in this class will cause a `NullPointerException` to be
thrown.

A `String` represents a string in the UTF-16 format
in which *supplementary characters* are represented by *surrogate
pairs* (see the section Unicode
Character Representations in the `Character` class for
more information).
Index values refer to `char` code units, so a supplementary
character uses two positions in a `String`.

The `String` class provides methods for dealing with
Unicode code points (i.e., characters), in addition to those for
dealing with Unicode code units (i.e., `char` values).

Unless otherwise noted, methods for comparing Strings do not take locale
into account.  The `java.text.Collator` class provides methods for
finer-grain, locale-sensitive String comparison.

**Implementation note:** The implementation of the string concatenation operator is left to
the discretion of a Java compiler, as long as the compiler ultimately conforms
to *The Java Language Specification*. For example, the `javac` compiler
may implement the operator with `StringBuffer`, `StringBuilder`,
or `java.lang.invoke.StringConcatFactory` depending on the JDK version. The
implementation of string conversion is typically through the method `toString`,
defined by `Object` and inherited by all classes in Java.

**See also:** java.lang.Object#toString()

**See also:** java.lang.StringBuffer

**See also:** java.lang.StringBuilder

**See also:** java.nio.charset.Charset

**Since:** 1.0

**JLS:** 15.18.1 String Concatenation Operator +

## String.String()

```java
public String()
```

Initializes a newly created `String` object so that it represents
an empty character sequence.  Note that use of this constructor is
unnecessary since Strings are immutable.

## String.String(String)

```java
public String(String original)
```

Initializes a newly created `String` object so that it represents
the same sequence of characters as the argument; in other words, the
newly created string is a copy of the argument string. Unless an
explicit copy of `original` is needed, use of this constructor is
unnecessary since Strings are immutable.

Parameters:

- `original`: A `String`

## String.String(char[])

```java
public String(char[] value)
```

Allocates a new `String` so that it represents the sequence of
characters currently contained in the character array argument. The
contents of the character array are copied; subsequent modification of
the character array does not affect the newly created string.

 The contents of the string are unspecified if the character array
is modified during string construction.

Parameters:

- `value`: The initial value of the string

## String.String(char[], int, int)

```java
public String(char[] value, int offset, int count)
```

Allocates a new `String` that contains characters from a subarray
of the character array argument. The `offset` argument is the
index of the first character of the subarray and the `count`
argument specifies the length of the subarray. The contents of the
subarray are copied; subsequent modification of the character array does
not affect the newly created string.

 The contents of the string are unspecified if the character array
is modified during string construction.

Parameters:

- `value`: Array that is the source of characters
- `offset`: The initial offset
- `count`: The length

Throws:

- `IndexOutOfBoundsException`: If `offset` is negative, `count` is negative, or `offset` is greater than `value.length - count`

## String.String(int[], int, int)

```java
public String(int[] codePoints, int offset, int count)
```

Allocates a new `String` that contains characters from a subarray
of the Unicode code point array
argument.  The `offset` argument is the index of the first code
point of the subarray and the `count` argument specifies the
length of the subarray.  The contents of the subarray are converted to
`char`s; subsequent modification of the `int` array does not
affect the newly created string.

 The contents of the string are unspecified if the codepoints array
is modified during string construction.

Parameters:

- `codePoints`: Array that is the source of Unicode code points
- `offset`: The initial offset
- `count`: The length

**Since:** 1.5

Throws:

- `IllegalArgumentException`: If any invalid Unicode code point is found in `codePoints`
- `IndexOutOfBoundsException`: If `offset` is negative, `count` is negative, or `offset` is greater than `codePoints.length - count`

## String.String(byte[], int, int, int)

```java
public String(byte[] ascii, int hibyte, int offset, int count)
```

Allocates a new `String` constructed from a subarray of an array
of 8-bit integer values.

 The `offset` argument is the index of the first byte of the
subarray, and the `count` argument specifies the length of the
subarray.

 Each `byte` in the subarray is converted to a `char` as
specified in the String(byte[],int) constructor.

 The contents of the string are unspecified if the byte array
is modified during string construction.

Parameters:

- `ascii`: The bytes to be converted to characters
- `hibyte`: The top 8 bits of each 16-bit Unicode code unit
- `offset`: The initial offset
- `count`: The length

**Deprecated:** This method does not properly convert bytes into characters.
As of JDK 1.1, the preferred way to do this is via the
`String` constructors that take a `Charset`, charset name,
or that use the default charset.

**See also:** #String(byte[], int)

**See also:** #String(byte[], int, int, java.lang.String)

**See also:** #String(byte[], int, int, java.nio.charset.Charset)

**See also:** #String(byte[], int, int)

**See also:** #String(byte[], java.lang.String)

**See also:** #String(byte[], java.nio.charset.Charset)

**See also:** #String(byte[])

Throws:

- `IndexOutOfBoundsException`: If `offset` is negative, `count` is negative, or `offset` is greater than `ascii.length - count`

## String.String(byte[], int)

```java
public String(byte[] ascii, int hibyte)
```

Allocates a new `String` containing characters constructed from
an array of 8-bit integer values. Each character *c* in the
resulting string is constructed from the corresponding component
*b* in the byte array such that:

```java
    <b><i>c</i></b> == (char)(((hibyte & 0xff) << 8)
                        | (<b><i>b</i></b> & 0xff))
```

 The contents of the string are unspecified if the byte array
is modified during string construction.

Parameters:

- `ascii`: The bytes to be converted to characters
- `hibyte`: The top 8 bits of each 16-bit Unicode code unit

**Deprecated:** This method does not properly convert bytes into
characters.  As of JDK 1.1, the preferred way to do this is via the
`String` constructors that take a `Charset`, charset name,
or that use the default charset.

**See also:** #String(byte[], int, int, java.lang.String)

**See also:** #String(byte[], int, int, java.nio.charset.Charset)

**See also:** #String(byte[], int, int)

**See also:** #String(byte[], java.lang.String)

**See also:** #String(byte[], java.nio.charset.Charset)

**See also:** #String(byte[])

## String.String(byte[], int, int, String)

```java
public String(byte[] bytes, int offset, int length, String charsetName) throws UnsupportedEncodingException
```

Constructs a new `String` by decoding the specified subarray of
bytes using the specified charset.  The length of the new `String`
is a function of the charset, and hence may not be equal to the length
of the subarray.

 The behavior of this constructor when the given bytes are not valid
in the given charset is unspecified.  The `java.nio.charset.CharsetDecoder` class should be used when more control
over the decoding process is required.

 The contents of the string are unspecified if the byte array
is modified during string construction.

Parameters:

- `bytes`: The bytes to be decoded into characters
- `offset`: The index of the first byte to decode
- `length`: The number of bytes to decode
- `charsetName`: The name of a supported charset

**Since:** 1.1

Throws:

- `UnsupportedEncodingException`: If the named charset is not supported
- `IndexOutOfBoundsException`: If `offset` is negative, `length` is negative, or `offset` is greater than `bytes.length - length`

## String.String(byte[], int, int, Charset)

```java
public String(byte[] bytes, int offset, int length, Charset charset)
```

Constructs a new `String` by decoding the specified subarray of
bytes using the specified charset.
The length of the new `String` is a function of the charset, and
hence may not be equal to the length of the subarray.

 This method always replaces malformed-input and unmappable-character
sequences with this charset's default replacement string.  The `java.nio.charset.CharsetDecoder` class should be used when more control
over the decoding process is required.

 The contents of the string are unspecified if the byte array
is modified during string construction.

Parameters:

- `bytes`: The bytes to be decoded into characters
- `offset`: The index of the first byte to decode
- `length`: The number of bytes to decode
- `charset`: The charset to be used to decode the `bytes`

**Since:** 1.6

Throws:

- `IndexOutOfBoundsException`: If `offset` is negative, `length` is negative, or `offset` is greater than `bytes.length - length`

## String.String(byte[], String)

```java
public String(byte[] bytes, String charsetName) throws UnsupportedEncodingException
```

Constructs a new `String` by decoding the specified array of bytes
using the specified charset.  The
length of the new `String` is a function of the charset, and hence
may not be equal to the length of the byte array.

 The behavior of this constructor when the given bytes are not valid
in the given charset is unspecified.  The `java.nio.charset.CharsetDecoder` class should be used when more control
over the decoding process is required.

 The contents of the string are unspecified if the byte array
is modified during string construction.

Parameters:

- `bytes`: The bytes to be decoded into characters
- `charsetName`: The name of a supported charset

**Since:** 1.1

Throws:

- `UnsupportedEncodingException`: If the named charset is not supported

## String.String(byte[], Charset)

```java
public String(byte[] bytes, Charset charset)
```

Constructs a new `String` by decoding the specified array of
bytes using the specified charset.
The length of the new `String` is a function of the charset, and
hence may not be equal to the length of the byte array.

 This method always replaces malformed-input and unmappable-character
sequences with this charset's default replacement string.  The `java.nio.charset.CharsetDecoder` class should be used when more control
over the decoding process is required.

 The contents of the string are unspecified if the byte array
is modified during string construction.

Parameters:

- `bytes`: The bytes to be decoded into characters
- `charset`: The charset to be used to decode the `bytes`

**Since:** 1.6

## String.String(byte[], int, int)

```java
public String(byte[] bytes, int offset, int length)
```

Constructs a new `String` by decoding the specified subarray of
bytes using the default charset.
The length of the new `String` is a function of the charset,
and hence may not be equal to the length of the subarray.

 The behavior of this constructor when the given bytes are not valid
in the default charset is unspecified.  The `java.nio.charset.CharsetDecoder` class should be used when more control
over the decoding process is required.

 The contents of the string are unspecified if the byte array
is modified during string construction.

Parameters:

- `bytes`: The bytes to be decoded into characters
- `offset`: The index of the first byte to decode
- `length`: The number of bytes to decode

**Since:** 1.1

Throws:

- `IndexOutOfBoundsException`: If `offset` is negative, `length` is negative, or `offset` is greater than `bytes.length - length`

## String.String(byte[])

```java
public String(byte[] bytes)
```

Constructs a new `String` by decoding the specified array of bytes
using the default charset. The length
of the new `String` is a function of the charset, and hence may not
be equal to the length of the byte array.

 The behavior of this constructor when the given bytes are not valid
in the default charset is unspecified.  The `java.nio.charset.CharsetDecoder` class should be used when more control
over the decoding process is required.

 The contents of the string are unspecified if the byte array
is modified during string construction.

Parameters:

- `bytes`: The bytes to be decoded into characters

**Since:** 1.1

## String.String(StringBuffer)

```java
public String(StringBuffer buffer)
```

Allocates a new string that contains the sequence of characters
currently contained in the string buffer argument. The contents of the
string buffer are copied; subsequent modification of the string buffer
does not affect the newly created string.

Parameters:

- `buffer`: A `StringBuffer`
