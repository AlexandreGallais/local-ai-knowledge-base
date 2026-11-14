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
<p>
A DataOutputStream is not safe for use by multiple concurrent
threads. If a DataOutputStream is to be used by more than one
thread then access to the data output stream should be controlled
by appropriate synchronization.

@see     java.io.DataInputStream
@since   1.0

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
underlying output stream. The counter {@code written} is
set to zero.

@param   out   the underlying output stream, to be saved for later
               use.
@see     java.io.FilterOutputStream#out

## DataOutputStream.write(int)

```java
public synchronized void write(int b) throws IOException
```

Writes the specified byte (the low eight bits of the argument
{@code b}) to the underlying output stream. If no exception
is thrown, the counter {@code written} is incremented by
{@code 1}.
<p>
Implements the {@code write} method of {@code OutputStream}.

@param      b   the {@code byte} to be written.
@throws     IOException  if an I/O error occurs.
@see        java.io.FilterOutputStream#out

## DataOutputStream.write(byte[], int, int)

```java
public synchronized void write(byte[] b, int off, int len) throws IOException
```

Writes {@code len} bytes from the specified byte array
starting at offset {@code off} to the underlying output stream.
If no exception is thrown, the counter {@code written} is
incremented by {@code len}.

@param      b     the data.
@param      off   the start offset in the data.
@param      len   the number of bytes to write.
@throws     IOException  if an I/O error occurs.
@throws     IndexOutOfBoundsException {@inheritDoc}
@see        java.io.FilterOutputStream#out

## DataOutputStream.flush()

```java
public void flush() throws IOException
```

Flushes this data output stream. This forces any buffered output
bytes to be written out to the stream.
<p>
The {@code flush} method of {@code DataOutputStream}
calls the {@code flush} method of its underlying output stream.

@throws     IOException  if an I/O error occurs.
@see        java.io.FilterOutputStream#out
@see        java.io.OutputStream#flush()

## DataOutputStream.writeBoolean(boolean)

```java
public final void writeBoolean(boolean v) throws IOException
```

Writes a {@code boolean} to the underlying output stream as
a 1-byte value. The value {@code true} is written out as the
value {@code (byte)1}; the value {@code false} is
written out as the value {@code (byte)0}. If no exception is
thrown, the counter {@code written} is incremented by
{@code 1}.

@param      v   a {@code boolean} value to be written.
@throws     IOException  if an I/O error occurs.
@see        java.io.FilterOutputStream#out

## DataOutputStream.writeByte(int)

```java
public final void writeByte(int v) throws IOException
```

Writes out a {@code byte} to the underlying output stream as
a 1-byte value. If no exception is thrown, the counter
{@code written} is incremented by {@code 1}.

@param      v   a {@code byte} value to be written.
@throws     IOException  if an I/O error occurs.
@see        java.io.FilterOutputStream#out

## DataOutputStream.writeShort(int)

```java
public final void writeShort(int v) throws IOException
```

Writes a {@code short} to the underlying output stream as two
bytes, high byte first. If no exception is thrown, the counter
{@code written} is incremented by {@code 2}.

@param      v   a {@code short} to be written.
@throws     IOException  if an I/O error occurs.
@see        java.io.FilterOutputStream#out

## DataOutputStream.writeChar(int)

```java
public final void writeChar(int v) throws IOException
```

Writes a {@code char} to the underlying output stream as a
2-byte value, high byte first. If no exception is thrown, the
counter {@code written} is incremented by {@code 2}.

@param      v   a {@code char} value to be written.
@throws     IOException  if an I/O error occurs.
@see        java.io.FilterOutputStream#out

## DataOutputStream.writeInt(int)

```java
public final void writeInt(int v) throws IOException
```

Writes an {@code int} to the underlying output stream as four
bytes, high byte first. If no exception is thrown, the counter
{@code written} is incremented by {@code 4}.

@param      v   an {@code int} to be written.
@throws     IOException  if an I/O error occurs.
@see        java.io.FilterOutputStream#out

## DataOutputStream.writeLong(long)

```java
public final void writeLong(long v) throws IOException
```

Writes a {@code long} to the underlying output stream as eight
bytes, high byte first. In no exception is thrown, the counter
{@code written} is incremented by {@code 8}.

@param      v   a {@code long} to be written.
@throws     IOException  if an I/O error occurs.
@see        java.io.FilterOutputStream#out

## DataOutputStream.writeFloat(float)

```java
public final void writeFloat(float v) throws IOException
```

Converts the float argument to an {@code int} using the
{@code floatToIntBits} method in class {@code Float},
and then writes that {@code int} value to the underlying
output stream as a 4-byte quantity, high byte first. If no
exception is thrown, the counter {@code written} is
incremented by {@code 4}.

@param      v   a {@code float} value to be written.
@throws     IOException  if an I/O error occurs.
@see        java.io.FilterOutputStream#out
@see        java.lang.Float#floatToIntBits(float)

## DataOutputStream.writeDouble(double)

```java
public final void writeDouble(double v) throws IOException
```

Converts the double argument to a {@code long} using the
{@code doubleToLongBits} method in class {@code Double},
and then writes that {@code long} value to the underlying
output stream as an 8-byte quantity, high byte first. If no
exception is thrown, the counter {@code written} is
incremented by {@code 8}.

@param      v   a {@code double} value to be written.
@throws     IOException  if an I/O error occurs.
@see        java.io.FilterOutputStream#out
@see        java.lang.Double#doubleToLongBits(double)

## DataOutputStream.writeBytes(String)

```java
public final void writeBytes(String s) throws IOException
```

Writes out the string to the underlying output stream as a
sequence of bytes. Each character in the string is written out, in
sequence, by discarding its high eight bits. If no exception is
thrown, the counter {@code written} is incremented by the
length of {@code s}.

@param      s   a string of bytes to be written.
@throws     IOException  if an I/O error occurs.
@see        java.io.FilterOutputStream#out

## DataOutputStream.writeChars(String)

```java
public final void writeChars(String s) throws IOException
```

Writes a string to the underlying output stream as a sequence of
characters. Each character is written to the data output stream as
if by the {@code writeChar} method. If no exception is
thrown, the counter {@code written} is incremented by twice
the length of {@code s}.

@param      s   a {@code String} value to be written.
@throws     IOException  if an I/O error occurs.
@see        java.io.DataOutputStream#writeChar(int)
@see        java.io.FilterOutputStream#out

## DataOutputStream.writeUTF(String)

```java
public final void writeUTF(String str) throws IOException
```

Writes a string to the underlying output stream using
<a href="DataInput.html#modified-utf-8">modified UTF-8</a>
encoding in a machine-independent manner.
<p>
First, two bytes are written to the output stream as if by the
{@code writeShort} method giving the number of bytes to
follow. This value is the number of bytes actually written out,
not the length of the string. Following the length, each character
of the string is output, in sequence, using the modified UTF-8 encoding
for the character. If no exception is thrown, the counter
{@code written} is incremented by the total number of
bytes written to the output stream. This will be at least two
plus the length of {@code str}, and at most two plus
thrice the length of {@code str}.

@param      str   a string to be written.
@throws     UTFDataFormatException  if the modified UTF-8 encoding of
            {@code str} would exceed 65535 bytes in length
@throws     IOException  if some other I/O error occurs.
@see        #writeChars(String)

## DataOutputStream.size()

```java
public final int size()
```

Returns the current value of the counter {@code written},
the number of bytes written to this data output stream so far.
If the counter overflows, it will be wrapped to Integer.MAX_VALUE.

@return  the value of the {@code written} field.
@see     java.io.DataOutputStream#written