---
title: "DataOutputStream class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/DataOutputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DataOutputStream class (java.io)

```java
public class DataOutputStream extends FilterOutputStream implements DataOutput
```

A data output stream lets an application write primitive Java data
types to an output stream in a portable way. An application can
then use a data input stream to read the data back in. A data output
stream wraps another output stream and delegates writing bytes to the
write methods of that output stream. Writing data consisting of more than
a single byte may cause several writes to the underlying output stream.

A DataOutputStream is not safe for use by multiple concurrent
threads. If a DataOutputStream is to be used by more than one
thread then access to the data output stream should be controlled
by appropriate synchronization.

**See also:** java.io.DataInputStream

**Since:** 1.0

## DataOutputStream.written

```java
protected int written
```

The number of bytes written to the data output stream so far.
If this counter overflows, it will be wrapped to Integer.MAX_VALUE.

## DataOutputStream.DataOutputStream(OutputStream)

```java
public DataOutputStream(OutputStream out)
```

Creates a new data output stream to write data to the specified
underlying output stream. The counter `written` is
set to zero.

Parameters:

- `out`: the underlying output stream, to be saved for later use.

**See also:** java.io.FilterOutputStream#out

## DataOutputStream.write(int)

```java
public synchronized void write(int b) throws IOException
```

Writes the specified byte (the low eight bits of the argument
`b`) to the underlying output stream. If no exception
is thrown, the counter `written` is incremented by
`1`.

Implements the `write` method of `OutputStream`.

Parameters:

- `b`: the `byte` to be written.

**See also:** java.io.FilterOutputStream#out

Throws:

- `IOException`: if an I/O error occurs.

## DataOutputStream.write(byte[], int, int)

```java
public synchronized void write(byte[] b, int off, int len) throws IOException
```

Writes `len` bytes from the specified byte array
starting at offset `off` to the underlying output stream.
If no exception is thrown, the counter `written` is
incremented by `len`.

Parameters:

- `b`: the data.
- `off`: the start offset in the data.
- `len`: the number of bytes to write.

**See also:** java.io.FilterOutputStream#out

Throws:

- `IOException`: if an I/O error occurs.
- `IndexOutOfBoundsException`: (inherited documentation)

## DataOutputStream.flush()

```java
public void flush() throws IOException
```

Flushes this data output stream. This forces any buffered output
bytes to be written out to the stream.

The `flush` method of `DataOutputStream`
calls the `flush` method of its underlying output stream.

**See also:** java.io.FilterOutputStream#out

**See also:** java.io.OutputStream#flush()

Throws:

- `IOException`: if an I/O error occurs.

## DataOutputStream.writeBoolean(boolean)

```java
public final void writeBoolean(boolean v) throws IOException
```

Writes a `boolean` to the underlying output stream as
a 1-byte value. The value `true` is written out as the
value `(byte)1`; the value `false` is
written out as the value `(byte)0`. If no exception is
thrown, the counter `written` is incremented by
`1`.

Parameters:

- `v`: a `boolean` value to be written.

**See also:** java.io.FilterOutputStream#out

Throws:

- `IOException`: if an I/O error occurs.

## DataOutputStream.writeByte(int)

```java
public final void writeByte(int v) throws IOException
```

Writes out a `byte` to the underlying output stream as
a 1-byte value. If no exception is thrown, the counter
`written` is incremented by `1`.

Parameters:

- `v`: a `byte` value to be written.

**See also:** java.io.FilterOutputStream#out

Throws:

- `IOException`: if an I/O error occurs.

## DataOutputStream.writeShort(int)

```java
public final void writeShort(int v) throws IOException
```

Writes a `short` to the underlying output stream as two
bytes, high byte first. If no exception is thrown, the counter
`written` is incremented by `2`.

Parameters:

- `v`: a `short` to be written.

**See also:** java.io.FilterOutputStream#out

Throws:

- `IOException`: if an I/O error occurs.

## DataOutputStream.writeChar(int)

```java
public final void writeChar(int v) throws IOException
```

Writes a `char` to the underlying output stream as a
2-byte value, high byte first. If no exception is thrown, the
counter `written` is incremented by `2`.

Parameters:

- `v`: a `char` value to be written.

**See also:** java.io.FilterOutputStream#out

Throws:

- `IOException`: if an I/O error occurs.

## DataOutputStream.writeInt(int)

```java
public final void writeInt(int v) throws IOException
```

Writes an `int` to the underlying output stream as four
bytes, high byte first. If no exception is thrown, the counter
`written` is incremented by `4`.

Parameters:

- `v`: an `int` to be written.

**See also:** java.io.FilterOutputStream#out

Throws:

- `IOException`: if an I/O error occurs.

## DataOutputStream.writeLong(long)

```java
public final void writeLong(long v) throws IOException
```

Writes a `long` to the underlying output stream as eight
bytes, high byte first. In no exception is thrown, the counter
`written` is incremented by `8`.

Parameters:

- `v`: a `long` to be written.

**See also:** java.io.FilterOutputStream#out

Throws:

- `IOException`: if an I/O error occurs.

## DataOutputStream.writeFloat(float)

```java
public final void writeFloat(float v) throws IOException
```

Converts the float argument to an `int` using the
`floatToIntBits` method in class `Float`,
and then writes that `int` value to the underlying
output stream as a 4-byte quantity, high byte first. If no
exception is thrown, the counter `written` is
incremented by `4`.

Parameters:

- `v`: a `float` value to be written.

**See also:** java.io.FilterOutputStream#out

**See also:** java.lang.Float#floatToIntBits(float)

Throws:

- `IOException`: if an I/O error occurs.

## DataOutputStream.writeDouble(double)

```java
public final void writeDouble(double v) throws IOException
```

Converts the double argument to a `long` using the
`doubleToLongBits` method in class `Double`,
and then writes that `long` value to the underlying
output stream as an 8-byte quantity, high byte first. If no
exception is thrown, the counter `written` is
incremented by `8`.

Parameters:

- `v`: a `double` value to be written.

**See also:** java.io.FilterOutputStream#out

**See also:** java.lang.Double#doubleToLongBits(double)

Throws:

- `IOException`: if an I/O error occurs.

## DataOutputStream.writeBytes(String)

```java
public final void writeBytes(String s) throws IOException
```

Writes out the string to the underlying output stream as a
sequence of bytes. Each character in the string is written out, in
sequence, by discarding its high eight bits. If no exception is
thrown, the counter `written` is incremented by the
length of `s`.

Parameters:

- `s`: a string of bytes to be written.

**See also:** java.io.FilterOutputStream#out

Throws:

- `IOException`: if an I/O error occurs.

## DataOutputStream.writeChars(String)

```java
public final void writeChars(String s) throws IOException
```

Writes a string to the underlying output stream as a sequence of
characters. Each character is written to the data output stream as
if by the `writeChar` method. If no exception is
thrown, the counter `written` is incremented by twice
the length of `s`.

Parameters:

- `s`: a `String` value to be written.

**See also:** java.io.DataOutputStream#writeChar(int)

**See also:** java.io.FilterOutputStream#out

Throws:

- `IOException`: if an I/O error occurs.

## DataOutputStream.writeUTF(String)

```java
public final void writeUTF(String str) throws IOException
```

Writes a string to the underlying output stream using
modified UTF-8
encoding in a machine-independent manner.

First, two bytes are written to the output stream as if by the
`writeShort` method giving the number of bytes to
follow. This value is the number of bytes actually written out,
not the length of the string. Following the length, each character
of the string is output, in sequence, using the modified UTF-8 encoding
for the character. If no exception is thrown, the counter
`written` is incremented by the total number of
bytes written to the output stream. This will be at least two
plus the length of `str`, and at most two plus
thrice the length of `str`.

Parameters:

- `str`: a string to be written.

**See also:** #writeChars(String)

Throws:

- `UTFDataFormatException`: if the modified UTF-8 encoding of `str` would exceed 65535 bytes in length
- `IOException`: if some other I/O error occurs.

## DataOutputStream.size()

```java
public final int size()
```

Returns the current value of the counter `written`,
the number of bytes written to this data output stream so far.
If the counter overflows, it will be wrapped to Integer.MAX_VALUE.

**Returns:** the value of the `written` field.

**See also:** java.io.DataOutputStream#written
