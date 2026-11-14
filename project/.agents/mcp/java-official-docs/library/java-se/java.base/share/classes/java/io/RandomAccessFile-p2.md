---
title: "RandomAccessFile class (java.io) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/RandomAccessFile.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# RandomAccessFile class (java.io) (part 2 of 2)

## RandomAccessFile.close()

```java
public void close() throws IOException
```

Closes this random access file stream and releases any system
resources associated with the stream. A closed random access
file cannot perform input or output operations and cannot be
reopened.

 If this file has an associated channel then the channel is closed
as well.

**API note:** If this stream has an associated channel then this method will close the
channel, which in turn will close this stream. Subclasses that override
this method should be prepared to handle possible reentrant invocation.

Throws:

- `IOException`: if an I/O error occurs.

## RandomAccessFile.readBoolean()

```java
public final boolean readBoolean() throws IOException
```

Reads a `boolean` from this file. This method reads a
single byte from the file, starting at the current file pointer.
A value of `0` represents
`false`. Any other value represents `true`.
This method blocks until the byte is read, the end of the stream
is detected, or an exception is thrown.

**Returns:** the `boolean` value read.

Throws:

- `EOFException`: if this file has reached the end.
- `IOException`: if an I/O error occurs.

## RandomAccessFile.readByte()

```java
public final byte readByte() throws IOException
```

Reads a signed eight-bit value from this file. This method reads a
byte from the file, starting from the current file pointer.
If the byte read is `b`, where
`0 <= b <= 255`,
then the result is:

This method blocks until the byte is read, the end of the stream
is detected, or an exception is thrown.

**Returns:** the next byte of this file as a signed eight-bit
            `byte`.

Throws:

- `EOFException`: if this file has reached the end.
- `IOException`: if an I/O error occurs.

## RandomAccessFile.readUnsignedByte()

```java
public final int readUnsignedByte() throws IOException
```

Reads an unsigned eight-bit number from this file. This method reads
a byte from this file, starting at the current file pointer,
and returns that byte.

This method blocks until the byte is read, the end of the stream
is detected, or an exception is thrown.

**Returns:** the next byte of this file, interpreted as an unsigned
            eight-bit number.

Throws:

- `EOFException`: if this file has reached the end.
- `IOException`: if an I/O error occurs.

## RandomAccessFile.readShort()

```java
public final short readShort() throws IOException
```

Reads a signed 16-bit number from this file. The method reads two
bytes from this file, starting at the current file pointer.
If the two bytes read, in order, are
`b1` and `b2`, where each of the two values is
between `0` and `255`, inclusive, then the
result is equal to:

This method blocks until the two bytes are read, the end of the
stream is detected, or an exception is thrown.

**Returns:** the next two bytes of this file, interpreted as a signed
            16-bit number.

Throws:

- `EOFException`: if this file reaches the end before reading two bytes.
- `IOException`: if an I/O error occurs.

## RandomAccessFile.readUnsignedShort()

```java
public final int readUnsignedShort() throws IOException
```

Reads an unsigned 16-bit number from this file. This method reads
two bytes from the file, starting at the current file pointer.
If the bytes read, in order, are
`b1` and `b2`, where
`0 <= b1, b2 <= 255`,
then the result is equal to:

This method blocks until the two bytes are read, the end of the
stream is detected, or an exception is thrown.

**Returns:** the next two bytes of this file, interpreted as an unsigned
            16-bit integer.

Throws:

- `EOFException`: if this file reaches the end before reading two bytes.
- `IOException`: if an I/O error occurs.

## RandomAccessFile.readChar()

```java
public final char readChar() throws IOException
```

Reads a character from this file. This method reads two
bytes from the file, starting at the current file pointer.
If the bytes read, in order, are
`b1` and `b2`, where
`0 <= b1, b2 <= 255`,
then the result is equal to:

This method blocks until the two bytes are read, the end of the
stream is detected, or an exception is thrown.

**Returns:** the next two bytes of this file, interpreted as a
                 `char`.

Throws:

- `EOFException`: if this file reaches the end before reading two bytes.
- `IOException`: if an I/O error occurs.

## RandomAccessFile.readInt()

```java
public final int readInt() throws IOException
```

Reads a signed 32-bit integer from this file. This method reads 4
bytes from the file, starting at the current file pointer.
If the bytes read, in order, are `b1`,
`b2`, `b3`, and `b4`, where
`0 <= b1, b2, b3, b4 <= 255`,
then the result is equal to:

This method blocks until the four bytes are read, the end of the
stream is detected, or an exception is thrown.

**Returns:** the next four bytes of this file, interpreted as an
            `int`.

Throws:

- `EOFException`: if this file reaches the end before reading four bytes.
- `IOException`: if an I/O error occurs.

## RandomAccessFile.readLong()

```java
public final long readLong() throws IOException
```

Reads a signed 64-bit integer from this file. This method reads eight
bytes from the file, starting at the current file pointer.
If the bytes read, in order, are
`b1`, `b2`, `b3`,
`b4`, `b5`, `b6`,
`b7`, and `b8,` where:

then the result is equal to:

This method blocks until the eight bytes are read, the end of the
stream is detected, or an exception is thrown.

**Returns:** the next eight bytes of this file, interpreted as a
            `long`.

Throws:

- `EOFException`: if this file reaches the end before reading eight bytes.
- `IOException`: if an I/O error occurs.

## RandomAccessFile.readFloat()

```java
public final float readFloat() throws IOException
```

Reads a `float` from this file. This method reads an
`int` value, starting at the current file pointer,
as if by the `readInt` method
and then converts that `int` to a `float`
using the `intBitsToFloat` method in class
`Float`.

This method blocks until the four bytes are read, the end of the
stream is detected, or an exception is thrown.

**Returns:** the next four bytes of this file, interpreted as a
            `float`.

**See also:** java.io.RandomAccessFile#readInt()

**See also:** java.lang.Float#intBitsToFloat(int)

Throws:

- `EOFException`: if this file reaches the end before reading four bytes.
- `IOException`: if an I/O error occurs.

## RandomAccessFile.readDouble()

```java
public final double readDouble() throws IOException
```

Reads a `double` from this file. This method reads a
`long` value, starting at the current file pointer,
as if by the `readLong` method
and then converts that `long` to a `double`
using the `longBitsToDouble` method in
class `Double`.

This method blocks until the eight bytes are read, the end of the
stream is detected, or an exception is thrown.

**Returns:** the next eight bytes of this file, interpreted as a
            `double`.

**See also:** java.io.RandomAccessFile#readLong()

**See also:** java.lang.Double#longBitsToDouble(long)

Throws:

- `EOFException`: if this file reaches the end before reading eight bytes.
- `IOException`: if an I/O error occurs.

## RandomAccessFile.readLine()

```java
public final String readLine() throws IOException
```

Reads the next line of text from this file.  This method successively
reads bytes from the file, starting at the current file pointer,
until it reaches a line terminator or the end
of the file.  Each byte is converted into a character by taking the
byte's value for the lower eight bits of the character and setting the
high eight bits of the character to zero.  This method does not,
therefore, support the full Unicode character set.

 A line of text is terminated by a carriage-return character
(`'\u005Cr'`), a newline character (`'\u005Cn'`), a
carriage-return character immediately followed by a newline character,
or the end of the file.  Line-terminating characters are discarded and
are not included as part of the string returned.

 This method blocks until a newline character is read, a carriage
return and the byte following it are read (to see if it is a newline),
the end of the file is reached, or an exception is thrown.

**Returns:** the next line of text from this file, or null if end
            of file is encountered before even one byte is read.

Throws:

- `IOException`: if an I/O error occurs.

## RandomAccessFile.readUTF()

```java
public final String readUTF() throws IOException
```

Reads in a string from this file. The string has been encoded
using a
modified UTF-8
format.

The first two bytes are read, starting from the current file
pointer, as if by
`readUnsignedShort`. This value gives the number of
following bytes that are in the encoded string, not
the length of the resulting string. The following bytes are then
interpreted as bytes encoding characters in the modified UTF-8 format
and are converted into characters.

This method blocks until all the bytes are read, the end of the
stream is detected, or an exception is thrown.

**Returns:** a Unicode string.

**See also:** java.io.RandomAccessFile#readUnsignedShort()

Throws:

- `EOFException`: if this file reaches the end before reading all the bytes.
- `IOException`: if an I/O error occurs.
- `UTFDataFormatException`: if the bytes do not represent valid modified UTF-8 encoding of a Unicode string.

## RandomAccessFile.writeBoolean(boolean)

```java
public final void writeBoolean(boolean v) throws IOException
```

Writes a `boolean` to the file as a one-byte value. The
value `true` is written out as the value
`(byte)1`; the value `false` is written out
as the value `(byte)0`. The write starts at
the current position of the file pointer.

Parameters:

- `v`: a `boolean` value to be written.

Throws:

- `IOException`: if an I/O error occurs.

## RandomAccessFile.writeByte(int)

```java
public final void writeByte(int v) throws IOException
```

Writes a `byte` to the file as a one-byte value. The
write starts at the current position of the file pointer.

Parameters:

- `v`: a `byte` value to be written.

Throws:

- `IOException`: if an I/O error occurs.

## RandomAccessFile.writeShort(int)

```java
public final void writeShort(int v) throws IOException
```

Writes a `short` to the file as two bytes, high byte first.
The write starts at the current position of the file pointer.

Parameters:

- `v`: a `short` to be written.

Throws:

- `IOException`: if an I/O error occurs.

## RandomAccessFile.writeChar(int)

```java
public final void writeChar(int v) throws IOException
```

Writes a `char` to the file as a two-byte value, high
byte first. The write starts at the current position of the
file pointer.

Parameters:

- `v`: a `char` value to be written.

Throws:

- `IOException`: if an I/O error occurs.

## RandomAccessFile.writeInt(int)

```java
public final void writeInt(int v) throws IOException
```

Writes an `int` to the file as four bytes, high byte first.
The write starts at the current position of the file pointer.

Parameters:

- `v`: an `int` to be written.

Throws:

- `IOException`: if an I/O error occurs.

## RandomAccessFile.writeLong(long)

```java
public final void writeLong(long v) throws IOException
```

Writes a `long` to the file as eight bytes, high byte first.
The write starts at the current position of the file pointer.

Parameters:

- `v`: a `long` to be written.

Throws:

- `IOException`: if an I/O error occurs.

## RandomAccessFile.writeFloat(float)

```java
public final void writeFloat(float v) throws IOException
```

Converts the float argument to an `int` using the
`floatToIntBits` method in class `Float`,
and then writes that `int` value to the file as a
four-byte quantity, high byte first. The write starts at the
current position of the file pointer.

Parameters:

- `v`: a `float` value to be written.

**See also:** java.lang.Float#floatToIntBits(float)

Throws:

- `IOException`: if an I/O error occurs.

## RandomAccessFile.writeDouble(double)

```java
public final void writeDouble(double v) throws IOException
```

Converts the double argument to a `long` using the
`doubleToLongBits` method in class `Double`,
and then writes that `long` value to the file as an
eight-byte quantity, high byte first. The write starts at the current
position of the file pointer.

Parameters:

- `v`: a `double` value to be written.

**See also:** java.lang.Double#doubleToLongBits(double)

Throws:

- `IOException`: if an I/O error occurs.

## RandomAccessFile.writeBytes(String)

```java
public final void writeBytes(String s) throws IOException
```

Writes the string to the file as a sequence of bytes. Each
character in the string is written out, in sequence, by discarding
its high eight bits. The write starts at the current position of
the file pointer.

Parameters:

- `s`: a string of bytes to be written.

Throws:

- `IOException`: if an I/O error occurs.

## RandomAccessFile.writeChars(String)

```java
public final void writeChars(String s) throws IOException
```

Writes a string to the file as a sequence of characters. Each
character is written to the data output stream as if by the
`writeChar` method. The write starts at the current
position of the file pointer.

Parameters:

- `s`: a `String` value to be written.

**See also:** java.io.RandomAccessFile#writeChar(int)

Throws:

- `IOException`: if an I/O error occurs.

## RandomAccessFile.writeUTF(String)

```java
public final void writeUTF(String str) throws IOException
```

Writes a string to the file using
modified UTF-8
encoding in a machine-independent manner.

First, two bytes are written to the file, starting at the
current file pointer, as if by the
`writeShort` method giving the number of bytes to
follow. This value is the number of bytes actually written out,
not the length of the string. Following the length, each character
of the string is output, in sequence, using the modified UTF-8 encoding
for each character.

Parameters:

- `str`: a string to be written.

Throws:

- `IOException`: if an I/O error occurs.
