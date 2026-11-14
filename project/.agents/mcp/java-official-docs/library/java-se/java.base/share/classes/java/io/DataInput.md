---
title: "DataInput interface (java.io) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/DataInput.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DataInput interface (java.io)

```java
public interface DataInput
```

The `DataInput` interface provides
for reading bytes from a binary stream and
reconstructing from them data in any of
the Java primitive types. There is also
a
facility for reconstructing a `String`
from data in
modified UTF-8
format.

It is generally true of all the reading
routines in this interface that if end of
file is reached before the desired number
of bytes has been read, an `EOFException`
(which is a kind of `IOException`)
is thrown. If any byte cannot be read for
any reason other than end of file, an `IOException`
other than `EOFException` is
thrown. In particular, an `IOException`
may be thrown if the input stream has been
closed.

#### Modified UTF-8

Implementations of the DataInput and DataOutput interfaces represent
Unicode strings in a format that is a slight modification of UTF-8.
(For information regarding the standard UTF-8 format, see section
*3.9 Unicode Encoding Forms* of *The Unicode Standard, Version
4.0*)

- Characters in the range `'\u005Cu0001'` to
        `'\u005Cu007F'` are represented by a single byte.

- The null character `'\u005Cu0000'` and characters
        in the range `'\u005Cu0080'` to `'\u005Cu07FF'` are
        represented by a pair of bytes.

- Characters in the range `'\u005Cu0800'`
        to `'\u005CuFFFF'` are represented by three bytes.

    Encoding of UTF-8 values

      Value
      Byte
      Bit Values

       7
       6
       5
       4
       3
       2
       1
       0

        `\u005Cu0001` to `\u005Cu007F`
       1
      0
      bits 6-0

          `\u005Cu0000`,

          `\u005Cu0080` to `\u005Cu07FF`
       1
      1
      1
      0
      bits 10-6

       2
      1
      0
      bits 5-0

        `\u005Cu0800` to `\u005CuFFFF`
       1
      1
      1
      1
      0
      bits 15-12

       2
      1
      0
      bits 11-6

       3
      1
      0
      bits 5-0

The differences between this format and the
standard UTF-8 format are the following:

- The null byte `'\u005Cu0000'` is encoded in 2-byte format
    rather than 1-byte, so that the encoded strings never have
    embedded nulls.

- Only the 1-byte, 2-byte, and 3-byte formats are used.

- Supplementary characters
    are represented in the form of surrogate pairs.

**See also:** java.io.DataInputStream

**See also:** java.io.DataOutput

**Since:** 1.0

## DataInput.readFully(byte[])

```java
void readFully(byte[] b) throws IOException
```

Reads some bytes from an input
stream and stores them into the buffer
array `b`. The number of bytes
read is equal
to the length of `b`.

This method blocks until one of the
following conditions occurs:

- `b.length`
bytes of input data are available, in which
case a normal return is made.

- End of
file is detected, in which case an `EOFException`
is thrown.

- An I/O error occurs, in
which case an `IOException` other
than `EOFException` is thrown.

If `b` is `null`,
a `NullPointerException` is thrown.
If `b.length` is zero, then
no bytes are read. Otherwise, the first
byte read is stored into element `b[0]`,
the next one into `b[1]`, and
so on.
If an exception is thrown from
this method, then it may be that some but
not all bytes of `b` have been
updated with data from the input stream.

Parameters:

- `b`: the buffer into which the data is read.

Throws:

- `NullPointerException`: if `b` is `null`.
- `EOFException`: if this stream reaches the end before reading all the bytes.
- `IOException`: if an I/O error occurs.

## DataInput.readFully(byte[], int, int)

```java
void readFully(byte[] b, int off, int len) throws IOException
```

Reads `len`
bytes from
an input stream.

This method
blocks until one of the following conditions
occurs:

- `len` bytes
of input data are available, in which case
a normal return is made.

- End of file
is detected, in which case an `EOFException`
is thrown.

- An I/O error occurs, in
which case an `IOException` other
than `EOFException` is thrown.

If `b` is `null`,
a `NullPointerException` is thrown.
If `off` is negative, or `len`
is negative, or `off+len` is
greater than the length of the array `b`,
then an `IndexOutOfBoundsException`
is thrown.
If `len` is zero,
then no bytes are read. Otherwise, the first
byte read is stored into element `b[off]`,
the next one into `b[off+1]`,
and so on. The number of bytes read is,
at most, equal to `len`.

Parameters:

- `b`: the buffer into which the data is read.
- `off`: an int specifying the offset in the data array `b`.
- `len`: an int specifying the number of bytes to read.

Throws:

- `NullPointerException`: if `b` is `null`.
- `IndexOutOfBoundsException`: if `off` is negative, `len` is negative, or `len` is greater than `b.length - off`.
- `EOFException`: if this stream reaches the end before reading all the bytes.
- `IOException`: if an I/O error occurs.

## DataInput.skipBytes(int)

```java
int skipBytes(int n) throws IOException
```

Makes an attempt to skip over
`n` bytes
of data from the input
stream, discarding the skipped bytes. However,
it may skip
over some smaller number of
bytes, possibly zero. This may result from
any of a
number of conditions; reaching
end of file before `n` bytes
have been skipped is
only one possibility.
This method never throws an `EOFException`.
The actual
number of bytes skipped is returned.

Parameters:

- `n`: the number of bytes to be skipped.

**Returns:** the number of bytes actually skipped.

Throws:

- `IOException`: if an I/O error occurs.

## DataInput.readBoolean()

```java
boolean readBoolean() throws IOException
```

Reads one input byte and returns
`true` if that byte is nonzero,
`false` if that byte is zero.
This method is suitable for reading
the byte written by the `writeBoolean`
method of interface `DataOutput`.

**Returns:** the `boolean` value read.

Throws:

- `EOFException`: if this stream reaches the end before reading all the bytes.
- `IOException`: if an I/O error occurs.

## DataInput.readByte()

```java
byte readByte() throws IOException
```

Reads and returns one input byte.
The byte is treated as a signed value in
the range `-128` through `127`,
inclusive.
This method is suitable for
reading the byte written by the `writeByte`
method of interface `DataOutput`.

**Returns:** the 8-bit value read.

Throws:

- `EOFException`: if this stream reaches the end before reading all the bytes.
- `IOException`: if an I/O error occurs.

## DataInput.readUnsignedByte()

```java
int readUnsignedByte() throws IOException
```

Reads one input byte, zero-extends
it to type `int`, and returns
the result, which is therefore in the range
`0`
through `255`.
This method is suitable for reading
the byte written by the `writeByte`
method of interface `DataOutput`
if the argument to `writeByte`
was intended to be a value in the range
`0` through `255`.

**Returns:** the unsigned 8-bit value read.

Throws:

- `EOFException`: if this stream reaches the end before reading all the bytes.
- `IOException`: if an I/O error occurs.

## DataInput.readShort()

```java
short readShort() throws IOException
```

Reads two input bytes and returns
a `short` value. Let `a`
be the first byte read and `b`
be the second byte. The value
returned
is:

```java
(short)((a << 8) | (b & 0xff))
```

This method
is suitable for reading the bytes written
by the `writeShort` method of
interface `DataOutput`.

**Returns:** the 16-bit value read.

Throws:

- `EOFException`: if this stream reaches the end before reading all the bytes.
- `IOException`: if an I/O error occurs.

## DataInput.readUnsignedShort()

```java
int readUnsignedShort() throws IOException
```

Reads two input bytes and returns
an `int` value in the range `0`
through `65535`. Let `a`
be the first byte read and
`b`
be the second byte. The value returned is:

```java
(((a & 0xff) << 8) | (b & 0xff))
```

This method is suitable for reading the bytes
written by the `writeShort` method
of interface `DataOutput`  if
the argument to `writeShort`
was intended to be a value in the range
`0` through `65535`.

**Returns:** the unsigned 16-bit value read.

Throws:

- `EOFException`: if this stream reaches the end before reading all the bytes.
- `IOException`: if an I/O error occurs.

## DataInput.readChar()

```java
char readChar() throws IOException
```

Reads two input bytes and returns a `char` value.
Let `a`
be the first byte read and `b`
be the second byte. The value
returned is:

```java
(char)((a << 8) | (b & 0xff))
```

This method
is suitable for reading bytes written by
the `writeChar` method of interface
`DataOutput`.

**Returns:** the `char` value read.

Throws:

- `EOFException`: if this stream reaches the end before reading all the bytes.
- `IOException`: if an I/O error occurs.

## DataInput.readInt()

```java
int readInt() throws IOException
```

Reads four input bytes and returns an
`int` value. Let `a-d`
be the first through fourth bytes read. The value returned is:

```java
(((a & 0xff) << 24) | ((b & 0xff) << 16) |
 ((c & 0xff) <<  8) | (d & 0xff))
```

This method is suitable
for reading bytes written by the `writeInt`
method of interface `DataOutput`.

**Returns:** the `int` value read.

Throws:

- `EOFException`: if this stream reaches the end before reading all the bytes.
- `IOException`: if an I/O error occurs.

## DataInput.readLong()

```java
long readLong() throws IOException
```

Reads eight input bytes and returns
a `long` value. Let `a-h`
be the first through eighth bytes read.
The value returned is:

```java
(((long)(a & 0xff) << 56) |
 ((long)(b & 0xff) << 48) |
 ((long)(c & 0xff) << 40) |
 ((long)(d & 0xff) << 32) |
 ((long)(e & 0xff) << 24) |
 ((long)(f & 0xff) << 16) |
 ((long)(g & 0xff) <<  8) |
 ((long)(h & 0xff)))
```

This method is suitable
for reading bytes written by the `writeLong`
method of interface `DataOutput`.

**Returns:** the `long` value read.

Throws:

- `EOFException`: if this stream reaches the end before reading all the bytes.
- `IOException`: if an I/O error occurs.

## DataInput.readFloat()

```java
float readFloat() throws IOException
```

Reads four input bytes and returns
a `float` value. It does this
by first constructing an `int`
value in exactly the manner
of the `readInt`
method, then converting this `int`
value to a `float` in
exactly the manner of the method `Float.intBitsToFloat`.
This method is suitable for reading
bytes written by the `writeFloat`
method of interface `DataOutput`.

**Returns:** the `float` value read.

Throws:

- `EOFException`: if this stream reaches the end before reading all the bytes.
- `IOException`: if an I/O error occurs.

## DataInput.readDouble()

```java
double readDouble() throws IOException
```

Reads eight input bytes and returns
a `double` value. It does this
by first constructing a `long`
value in exactly the manner
of the `readLong`
method, then converting this `long`
value to a `double` in exactly
the manner of the method `Double.longBitsToDouble`.
This method is suitable for reading
bytes written by the `writeDouble`
method of interface `DataOutput`.

**Returns:** the `double` value read.

Throws:

- `EOFException`: if this stream reaches the end before reading all the bytes.
- `IOException`: if an I/O error occurs.

## DataInput.readLine()

```java
String readLine() throws IOException
```

Reads the next line of text from the input stream.
It reads successive bytes, converting
each byte separately into a character,
until it encounters a line terminator or
end of
file; the characters read are then
returned as a `String`. Note
that because this
method processes bytes,
it does not support input of the full Unicode
character set.

If end of file is encountered
before even one byte can be read, then `null`
is returned. Otherwise, each byte that is
read is converted to type `char`
by zero-extension. If the character `'\n'`
is encountered, it is discarded and reading
ceases. If the character `'\r'`
is encountered, it is discarded and, if
the following byte converts to the
character `'\n'`, then that is
discarded also; reading then ceases. If
end of file is encountered before either
of the characters `'\n'` and
`'\r'` is encountered, reading
ceases. Once reading has ceased, a `String`
is returned that contains all the characters
read and not discarded, taken in order.
Note that every character in this string
will have a value less than `\u005Cu0100`,
that is, `(char)256`.

**Returns:** the next line of text from the input stream,
        or `null` if the end of file is
        encountered before a byte can be read.

Throws:

- `IOException`: if an I/O error occurs.
