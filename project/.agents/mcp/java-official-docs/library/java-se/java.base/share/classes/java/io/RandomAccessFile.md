# RandomAccessFile class (java.io)

```java
public class RandomAccessFile implements DataOutput, DataInput, Closeable
```

Instances of this class support both reading and writing to a
random access file. A random access file behaves like a large
array of bytes stored in the file system. There is a kind of cursor,
or index into the implied array, called the <em>file pointer</em>;
input operations read bytes starting at the file pointer and advance
the file pointer past the bytes read. If the random access file is
created in read/write mode, then output operations are also available;
output operations write bytes starting at the file pointer and advance
the file pointer past the bytes written. Output operations that write
past the current end of the implied array cause the array to be
extended. The file pointer can be read by the
{@code getFilePointer} method and set by the {@code seek}
method.
<p>
It is generally true of all the reading routines in this class that
if end-of-file is reached before the desired number of bytes has been
read, an {@code EOFException} (which is a kind of
{@code IOException}) is thrown. If any byte cannot be read for
any reason other than end-of-file, an {@code IOException} other
than {@code EOFException} is thrown. In particular, an
{@code IOException} may be thrown if the stream has been closed.

@since   1.0

## RandomAccessFile.RandomAccessFile(String, String)

```java
public RandomAccessFile(String pathname, String mode) throws FileNotFoundException
```

Creates a random access file stream to read from, and optionally
to write to, a file with the specified pathname. If the file exists
it is opened; if it does not exist and write mode is specified, a
new file is created.
{@linkplain java.nio.file##links Symbolic links}
are automatically redirected to the <i>target</i> of the link.
A new {@link FileDescriptor} object is created to represent the
connection to the file.

<p> The {@code mode} argument specifies the access mode with which the
file is to be opened.  The permitted values and their meanings are as
specified for the <a
href="#mode">{@code RandomAccessFile(File,String)}</a> constructor.

@param      pathname   the system-dependent pathname string
@param      mode       the access <a href="#mode">mode</a>
@throws     IllegalArgumentException  if the mode argument is not equal
            to one of {@code "r"}, {@code "rw"}, {@code "rws"}, or
            {@code "rwd"}
@throws     FileNotFoundException
            if the mode is {@code "r"} but the given pathname string does not
            denote an existing regular file, or if the mode begins with
            {@code "rw"} but the given pathname string does not denote an
            existing, writable regular file and a new regular file of
            that pathname cannot be created, or if some other error
            occurs while opening or creating the file

## RandomAccessFile.RandomAccessFile(File, String)

```java
public RandomAccessFile(File file, String mode) throws FileNotFoundException
```

Creates a random access file stream to read from, and optionally
to write to, the file specified by the {@link File} argument. If
the file exists it is opened; if it does not exist and write mode
is specified, a new file is created.
{@linkplain java.nio.file##links Symbolic links}
are automatically redirected to the <i>target</i> of the link.
A new {@link FileDescriptor} object is created to represent the
connection to the file.

<p>The <a id="mode">{@code mode}</a> argument specifies the access mode
in which the file is to be opened.  The permitted values and their
meanings are:

<table class="striped">
<caption style="display:none">Access mode permitted values and meanings</caption>
<thead>
<tr><th scope="col" style="text-align:left">Value</th><th scope="col" style="text-align:left">Meaning</th></tr>
</thead>
<tbody>
<tr><th scope="row" style="vertical-align:top">{@code "r"}</th>
    <td> Open for reading only. Invoking any of the {@code write}
    methods of the resulting object will cause an
    {@link java.io.IOException} to be thrown.</td></tr>
<tr><th scope="row" style="vertical-align:top">{@code "rw"}</th>
    <td> Open for reading and writing.  If the file does not already
    exist then an attempt will be made to create it.</td></tr>
<tr><th scope="row" style="vertical-align:top">{@code "rws"}</th>
    <td> Open for reading and writing, as with {@code "rw"}, and also
    require that every update to the file's content or metadata be
    written synchronously to the underlying storage device.</td></tr>
<tr><th scope="row" style="vertical-align:top">{@code "rwd"}</th>
    <td> Open for reading and writing, as with {@code "rw"}, and also
    require that every update to the file's content be written
    synchronously to the underlying storage device.</td></tr>
</tbody>
</table>

The {@code "rws"} and {@code "rwd"} modes work much like the {@link
java.nio.channels.FileChannel#force(boolean) force(boolean)} method of
the {@link java.nio.channels.FileChannel} class, passing arguments of
{@code true} and {@code false}, respectively, except that they always
apply to every I/O operation and are therefore often more efficient.  If
the file resides on a local storage device then when an invocation of a
method of this class returns it is guaranteed that all changes made to
the file by that invocation will have been written to that device.  This
is useful for ensuring that critical information is not lost in the
event of a system crash.  If the file does not reside on a local device
then no such guarantee is made.

<p>The {@code "rwd"} mode can be used to reduce the number of I/O
operations performed.  Using {@code "rwd"} only requires updates to the
file's content to be written to storage; using {@code "rws"} requires
updates to both the file's content and its metadata to be written, which
generally requires at least one more low-level I/O operation.

@param      file   the file object
@param      mode   the access mode, as described
                   <a href="#mode">above</a>
@throws     IllegalArgumentException  if the mode argument is not equal
            to one of {@code "r"}, {@code "rw"}, {@code "rws"}, or
            {@code "rwd"}
@throws     FileNotFoundException
            if the mode is {@code "r"} but the given file object does
            not denote an existing regular file, or if the mode begins
            with {@code "rw"} but the given file object does not denote
            an existing, writable regular file and a new regular file of
            that pathname cannot be created, or if some other error
            occurs while opening or creating the file
@see        java.nio.channels.FileChannel#force(boolean)

## RandomAccessFile.getFD()

```java
public final FileDescriptor getFD() throws IOException
```

Returns the opaque file descriptor object associated with this
stream.

@return     the file descriptor object associated with this stream.
@throws     IOException  if an I/O error occurs.
@see        java.io.FileDescriptor

## RandomAccessFile.getChannel()

```java
public final FileChannel getChannel()
```

Returns the unique {@link java.nio.channels.FileChannel FileChannel}
object associated with this file.

<p> The {@link java.nio.channels.FileChannel#position()
position} of the returned channel will always be equal to
this object's file-pointer offset as returned by the {@link
#getFilePointer getFilePointer} method.  Changing this object's
file-pointer offset, whether explicitly or by reading or writing bytes,
will change the position of the channel, and vice versa.  Changing the
file's length via this object will change the length seen via the file
channel, and vice versa.

@return  the file channel associated with this file

@since 1.4

## RandomAccessFile.read()

```java
public int read() throws IOException
```

Reads a byte of data from this file. The byte is returned as an
integer in the range 0 to 255 ({@code 0x00-0x0ff}). This
method blocks if no input is yet available.
<p>
Although {@code RandomAccessFile} is not a subclass of
{@code InputStream}, this method behaves in exactly the same
way as the {@link InputStream#read()} method of
{@code InputStream}.

@return     the next byte of data, or {@code -1} if the end of the
            file has been reached.
@throws     IOException  if an I/O error occurs. Not thrown if
                         end-of-file has been reached.

## RandomAccessFile.read(byte[], int, int)

```java
public int read(byte[] b, int off, int len) throws IOException
```

Reads up to {@code len} bytes of data from this file into an
array of bytes. This method blocks until at least one byte of input
is available.
<p>
Although {@code RandomAccessFile} is not a subclass of
{@code InputStream}, this method behaves in exactly the
same way as the {@link InputStream#read(byte[], int, int)} method of
{@code InputStream}.

@param      b     the buffer into which the data is read.
@param      off   the start offset in array {@code b}
                  at which the data is written.
@param      len   the maximum number of bytes read.
@return     the total number of bytes read into the buffer, or
            {@code -1} if there is no more data because the end of
            the file has been reached.
@throws     IOException If the first byte cannot be read for any reason
            other than end of file, or if the random access file has been closed,
            or if some other I/O error occurs.
@throws     NullPointerException If {@code b} is {@code null}.
@throws     IndexOutOfBoundsException If {@code off} is negative,
            {@code len} is negative, or {@code len} is greater than
            {@code b.length - off}

## RandomAccessFile.read(byte[])

```java
public int read(byte[] b) throws IOException
```

Reads up to {@code b.length} bytes of data from this file
into an array of bytes. This method blocks until at least one byte
of input is available.
<p>
Although {@code RandomAccessFile} is not a subclass of
{@code InputStream}, this method behaves in exactly the
same way as the {@link InputStream#read(byte[])} method of
{@code InputStream}.

@param      b   the buffer into which the data is read.
@return     the total number of bytes read into the buffer, or
            {@code -1} if there is no more data because the end of
            this file has been reached.
@throws     IOException If the first byte cannot be read for any reason
            other than end of file, or if the random access file has been closed,
            or if some other I/O error occurs.
@throws     NullPointerException If {@code b} is {@code null}.

## RandomAccessFile.readFully(byte[])

```java
public final void readFully(byte[] b) throws IOException
```

Reads {@code b.length} bytes from this file into the byte
array, starting at the current file pointer. This method reads
repeatedly from the file until the requested number of bytes are
read. This method blocks until the requested number of bytes are
read, the end of the stream is detected, or an exception is thrown.

@param   b   the buffer into which the data is read.
@throws  NullPointerException if {@code b} is {@code null}.
@throws  EOFException  if this file reaches the end before reading
             all the bytes.
@throws  IOException   if an I/O error occurs.

## RandomAccessFile.readFully(byte[], int, int)

```java
public final void readFully(byte[] b, int off, int len) throws IOException
```

Reads exactly {@code len} bytes from this file into the byte
array, starting at the current file pointer. This method reads
repeatedly from the file until the requested number of bytes are
read. This method blocks until the requested number of bytes are
read, the end of the stream is detected, or an exception is thrown.

@param   b     the buffer into which the data is read.
@param   off   the start offset into the data array {@code b}.
@param   len   the number of bytes to read.
@throws  NullPointerException if {@code b} is {@code null}.
@throws  IndexOutOfBoundsException if {@code off} is negative,
               {@code len} is negative, or {@code len} is greater than
               {@code b.length - off}.
@throws  EOFException  if this file reaches the end before reading
               all the bytes.
@throws  IOException   if an I/O error occurs.

## RandomAccessFile.skipBytes(int)

```java
public int skipBytes(int n) throws IOException
```

Attempts to skip over {@code n} bytes of input discarding the
skipped bytes.
<p>

This method may skip over some smaller number of bytes, possibly zero.
This may result from any of a number of conditions; reaching end of
file before {@code n} bytes have been skipped is only one
possibility. This method never throws an {@code EOFException}.
The actual number of bytes skipped is returned.  If {@code n}
is negative, no bytes are skipped.

@param      n   the number of bytes to be skipped.
@return     the actual number of bytes skipped.
@throws     IOException  if an I/O error occurs.

## RandomAccessFile.write(int)

```java
public void write(int b) throws IOException
```

Writes the specified byte to this file. The write starts at
the current file pointer.

@param      b   the {@code byte} to be written.
@throws     IOException  if an I/O error occurs.

## RandomAccessFile.write(byte[])

```java
public void write(byte[] b) throws IOException
```

Writes {@code b.length} bytes from the specified byte array
to this file, starting at the current file pointer.

@param      b   the data.
@throws     IOException  if an I/O error occurs.

## RandomAccessFile.write(byte[], int, int)

```java
public void write(byte[] b, int off, int len) throws IOException
```

Writes {@code len} bytes from the specified byte array
starting at offset {@code off} to this file.

@param      b     the data.
@param      off   the start offset in the data.
@param      len   the number of bytes to write.
@throws     IOException  if an I/O error occurs.
@throws     IndexOutOfBoundsException {@inheritDoc}

## RandomAccessFile.getFilePointer()

```java
public native long getFilePointer() throws IOException
```

Returns the current offset in this file.

@return     the offset from the beginning of the file, in bytes,
            at which the next read or write occurs.
@throws     IOException  if an I/O error occurs.

## RandomAccessFile.seek(long)

```java
public void seek(long pos) throws IOException
```

Sets the file-pointer offset, measured from the beginning of this
file, at which the next read or write occurs.  The offset may be
set beyond the end of the file. Setting the offset beyond the end
of the file does not change the file length.  The file length will
change only by writing after the offset has been set beyond the end
of the file.

@param      pos   the offset position, measured in bytes from the
                  beginning of the file, at which to set the file
                  pointer.
@throws     IOException  if {@code pos} is less than
                         {@code 0} or if an I/O error occurs.

## RandomAccessFile.length()

```java
public long length() throws IOException
```

Returns the length of this file.

@return     the length of this file, measured in bytes.
@throws     IOException  if an I/O error occurs.

## RandomAccessFile.setLength(long)

```java
public void setLength(long newLength) throws IOException
```

Sets the length of this file.

<p> If the present length of the file as returned by the
{@linkplain #length length} method is greater than the desired length
of the file specified by the {@code newLength} argument, then the file
will be truncated.

<p> If the present length of the file is smaller than the desired length,
then the file will be extended.  The contents of the extended portion of
the file are not defined.

<p> If the present length of the file is equal to the desired length,
then the file and its length will be unchanged.

<p> In all cases, after this method returns, the file offset as returned
by the {@linkplain #getFilePointer getFilePointer} method will equal the
minimum of the desired length and the file offset before this method was
called, even if the length is unchanged.  In other words, this method
constrains the file offset to the closed interval {@code [0,newLength]}.

@param      newLength    The desired length of the file
@throws     IOException  If the argument is negative or
                         if some other I/O error occurs
@since      1.2

## RandomAccessFile.close()

```java
public void close() throws IOException
```

Closes this random access file stream and releases any system
resources associated with the stream. A closed random access
file cannot perform input or output operations and cannot be
reopened.

<p> If this file has an associated channel then the channel is closed
as well.

@apiNote
If this stream has an associated channel then this method will close the
channel, which in turn will close this stream. Subclasses that override
this method should be prepared to handle possible reentrant invocation.

@throws     IOException  if an I/O error occurs.

## RandomAccessFile.readBoolean()

```java
public final boolean readBoolean() throws IOException
```

Reads a {@code boolean} from this file. This method reads a
single byte from the file, starting at the current file pointer.
A value of {@code 0} represents
{@code false}. Any other value represents {@code true}.
This method blocks until the byte is read, the end of the stream
is detected, or an exception is thrown.

@return     the {@code boolean} value read.
@throws     EOFException  if this file has reached the end.
@throws     IOException   if an I/O error occurs.

## RandomAccessFile.readByte()

```java
public final byte readByte() throws IOException
```

Reads a signed eight-bit value from this file. This method reads a
byte from the file, starting from the current file pointer.
If the byte read is {@code b}, where
{@code 0 <= b <= 255},
then the result is:
{@snippet lang=java :
    (byte)(b)
}
<p>
This method blocks until the byte is read, the end of the stream
is detected, or an exception is thrown.

@return     the next byte of this file as a signed eight-bit
            {@code byte}.
@throws     EOFException  if this file has reached the end.
@throws     IOException   if an I/O error occurs.

## RandomAccessFile.readUnsignedByte()

```java
public final int readUnsignedByte() throws IOException
```

Reads an unsigned eight-bit number from this file. This method reads
a byte from this file, starting at the current file pointer,
and returns that byte.
<p>
This method blocks until the byte is read, the end of the stream
is detected, or an exception is thrown.

@return     the next byte of this file, interpreted as an unsigned
            eight-bit number.
@throws     EOFException  if this file has reached the end.
@throws     IOException   if an I/O error occurs.

## RandomAccessFile.readShort()

```java
public final short readShort() throws IOException
```

Reads a signed 16-bit number from this file. The method reads two
bytes from this file, starting at the current file pointer.
If the two bytes read, in order, are
{@code b1} and {@code b2}, where each of the two values is
between {@code 0} and {@code 255}, inclusive, then the
result is equal to:
{@snippet lang=java :
    (short)((b1 << 8) | b2)
}
<p>
This method blocks until the two bytes are read, the end of the
stream is detected, or an exception is thrown.

@return     the next two bytes of this file, interpreted as a signed
            16-bit number.
@throws     EOFException  if this file reaches the end before reading
              two bytes.
@throws     IOException   if an I/O error occurs.

## RandomAccessFile.readUnsignedShort()

```java
public final int readUnsignedShort() throws IOException
```

Reads an unsigned 16-bit number from this file. This method reads
two bytes from the file, starting at the current file pointer.
If the bytes read, in order, are
{@code b1} and {@code b2}, where
{@code 0 <= b1, b2 <= 255},
then the result is equal to:
{@snippet lang=java :
    (b1 << 8) | b2
}
<p>
This method blocks until the two bytes are read, the end of the
stream is detected, or an exception is thrown.

@return     the next two bytes of this file, interpreted as an unsigned
            16-bit integer.
@throws     EOFException  if this file reaches the end before reading
              two bytes.
@throws     IOException   if an I/O error occurs.

## RandomAccessFile.readChar()

```java
public final char readChar() throws IOException
```

Reads a character from this file. This method reads two
bytes from the file, starting at the current file pointer.
If the bytes read, in order, are
{@code b1} and {@code b2}, where
{@code 0 <= b1, b2 <= 255},
then the result is equal to:
{@snippet lang=java :
    (char)((b1 << 8) | b2)
}
<p>
This method blocks until the two bytes are read, the end of the
stream is detected, or an exception is thrown.

@return     the next two bytes of this file, interpreted as a
                 {@code char}.
@throws     EOFException  if this file reaches the end before reading
              two bytes.
@throws     IOException   if an I/O error occurs.

## RandomAccessFile.readInt()

```java
public final int readInt() throws IOException
```

Reads a signed 32-bit integer from this file. This method reads 4
bytes from the file, starting at the current file pointer.
If the bytes read, in order, are {@code b1},
{@code b2}, {@code b3}, and {@code b4}, where
{@code 0 <= b1, b2, b3, b4 <= 255},
then the result is equal to:
{@snippet lang=java :
    (b1 << 24) | (b2 << 16) + (b3 << 8) + b4
}
<p>
This method blocks until the four bytes are read, the end of the
stream is detected, or an exception is thrown.

@return     the next four bytes of this file, interpreted as an
            {@code int}.
@throws     EOFException  if this file reaches the end before reading
              four bytes.
@throws     IOException   if an I/O error occurs.

## RandomAccessFile.readLong()

```java
public final long readLong() throws IOException
```

Reads a signed 64-bit integer from this file. This method reads eight
bytes from the file, starting at the current file pointer.
If the bytes read, in order, are
{@code b1}, {@code b2}, {@code b3},
{@code b4}, {@code b5}, {@code b6},
{@code b7}, and {@code b8,} where:
{@snippet :
    0 <= b1, b2, b3, b4, b5, b6, b7, b8 <= 255
}
<p>
then the result is equal to:
{@snippet lang=java :
    ((long)b1 << 56) + ((long)b2 << 48)
        + ((long)b3 << 40) + ((long)b4 << 32)
        + ((long)b5 << 24) + ((long)b6 << 16)
        + ((long)b7 << 8) + b8
}
<p>
This method blocks until the eight bytes are read, the end of the
stream is detected, or an exception is thrown.

@return     the next eight bytes of this file, interpreted as a
            {@code long}.
@throws     EOFException  if this file reaches the end before reading
              eight bytes.
@throws     IOException   if an I/O error occurs.

## RandomAccessFile.readFloat()

```java
public final float readFloat() throws IOException
```

Reads a {@code float} from this file. This method reads an
{@code int} value, starting at the current file pointer,
as if by the {@code readInt} method
and then converts that {@code int} to a {@code float}
using the {@code intBitsToFloat} method in class
{@code Float}.
<p>
This method blocks until the four bytes are read, the end of the
stream is detected, or an exception is thrown.

@return     the next four bytes of this file, interpreted as a
            {@code float}.
@throws     EOFException  if this file reaches the end before reading
            four bytes.
@throws     IOException   if an I/O error occurs.
@see        java.io.RandomAccessFile#readInt()
@see        java.lang.Float#intBitsToFloat(int)

## RandomAccessFile.readDouble()

```java
public final double readDouble() throws IOException
```

Reads a {@code double} from this file. This method reads a
{@code long} value, starting at the current file pointer,
as if by the {@code readLong} method
and then converts that {@code long} to a {@code double}
using the {@code longBitsToDouble} method in
class {@code Double}.
<p>
This method blocks until the eight bytes are read, the end of the
stream is detected, or an exception is thrown.

@return     the next eight bytes of this file, interpreted as a
            {@code double}.
@throws     EOFException  if this file reaches the end before reading
            eight bytes.
@throws     IOException   if an I/O error occurs.
@see        java.io.RandomAccessFile#readLong()
@see        java.lang.Double#longBitsToDouble(long)

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

<p> A line of text is terminated by a carriage-return character
({@code '\u005Cr'}), a newline character ({@code '\u005Cn'}), a
carriage-return character immediately followed by a newline character,
or the end of the file.  Line-terminating characters are discarded and
are not included as part of the string returned.

<p> This method blocks until a newline character is read, a carriage
return and the byte following it are read (to see if it is a newline),
the end of the file is reached, or an exception is thrown.

@return     the next line of text from this file, or null if end
            of file is encountered before even one byte is read.
@throws     IOException  if an I/O error occurs.

## RandomAccessFile.readUTF()

```java
public final String readUTF() throws IOException
```

Reads in a string from this file. The string has been encoded
using a
<a href="DataInput.html#modified-utf-8">modified UTF-8</a>
format.
<p>
The first two bytes are read, starting from the current file
pointer, as if by
{@code readUnsignedShort}. This value gives the number of
following bytes that are in the encoded string, not
the length of the resulting string. The following bytes are then
interpreted as bytes encoding characters in the modified UTF-8 format
and are converted into characters.
<p>
This method blocks until all the bytes are read, the end of the
stream is detected, or an exception is thrown.

@return     a Unicode string.
@throws     EOFException            if this file reaches the end before
              reading all the bytes.
@throws     IOException             if an I/O error occurs.
@throws     UTFDataFormatException  if the bytes do not represent
              valid modified UTF-8 encoding of a Unicode string.
@see        java.io.RandomAccessFile#readUnsignedShort()

## RandomAccessFile.writeBoolean(boolean)

```java
public final void writeBoolean(boolean v) throws IOException
```

Writes a {@code boolean} to the file as a one-byte value. The
value {@code true} is written out as the value
{@code (byte)1}; the value {@code false} is written out
as the value {@code (byte)0}. The write starts at
the current position of the file pointer.

@param      v   a {@code boolean} value to be written.
@throws     IOException  if an I/O error occurs.

## RandomAccessFile.writeByte(int)

```java
public final void writeByte(int v) throws IOException
```

Writes a {@code byte} to the file as a one-byte value. The
write starts at the current position of the file pointer.

@param      v   a {@code byte} value to be written.
@throws     IOException  if an I/O error occurs.

## RandomAccessFile.writeShort(int)

```java
public final void writeShort(int v) throws IOException
```

Writes a {@code short} to the file as two bytes, high byte first.
The write starts at the current position of the file pointer.

@param      v   a {@code short} to be written.
@throws     IOException  if an I/O error occurs.

## RandomAccessFile.writeChar(int)

```java
public final void writeChar(int v) throws IOException
```

Writes a {@code char} to the file as a two-byte value, high
byte first. The write starts at the current position of the
file pointer.

@param      v   a {@code char} value to be written.
@throws     IOException  if an I/O error occurs.

## RandomAccessFile.writeInt(int)

```java
public final void writeInt(int v) throws IOException
```

Writes an {@code int} to the file as four bytes, high byte first.
The write starts at the current position of the file pointer.

@param      v   an {@code int} to be written.
@throws     IOException  if an I/O error occurs.

## RandomAccessFile.writeLong(long)

```java
public final void writeLong(long v) throws IOException
```

Writes a {@code long} to the file as eight bytes, high byte first.
The write starts at the current position of the file pointer.

@param      v   a {@code long} to be written.
@throws     IOException  if an I/O error occurs.

## RandomAccessFile.writeFloat(float)

```java
public final void writeFloat(float v) throws IOException
```

Converts the float argument to an {@code int} using the
{@code floatToIntBits} method in class {@code Float},
and then writes that {@code int} value to the file as a
four-byte quantity, high byte first. The write starts at the
current position of the file pointer.

@param      v   a {@code float} value to be written.
@throws     IOException  if an I/O error occurs.
@see        java.lang.Float#floatToIntBits(float)

## RandomAccessFile.writeDouble(double)

```java
public final void writeDouble(double v) throws IOException
```

Converts the double argument to a {@code long} using the
{@code doubleToLongBits} method in class {@code Double},
and then writes that {@code long} value to the file as an
eight-byte quantity, high byte first. The write starts at the current
position of the file pointer.

@param      v   a {@code double} value to be written.
@throws     IOException  if an I/O error occurs.
@see        java.lang.Double#doubleToLongBits(double)

## RandomAccessFile.writeBytes(String)

```java
public final void writeBytes(String s) throws IOException
```

Writes the string to the file as a sequence of bytes. Each
character in the string is written out, in sequence, by discarding
its high eight bits. The write starts at the current position of
the file pointer.

@param      s   a string of bytes to be written.
@throws     IOException  if an I/O error occurs.

## RandomAccessFile.writeChars(String)

```java
public final void writeChars(String s) throws IOException
```

Writes a string to the file as a sequence of characters. Each
character is written to the data output stream as if by the
{@code writeChar} method. The write starts at the current
position of the file pointer.

@param      s   a {@code String} value to be written.
@throws     IOException  if an I/O error occurs.
@see        java.io.RandomAccessFile#writeChar(int)

## RandomAccessFile.writeUTF(String)

```java
public final void writeUTF(String str) throws IOException
```

Writes a string to the file using
<a href="DataInput.html#modified-utf-8">modified UTF-8</a>
encoding in a machine-independent manner.
<p>
First, two bytes are written to the file, starting at the
current file pointer, as if by the
{@code writeShort} method giving the number of bytes to
follow. This value is the number of bytes actually written out,
not the length of the string. Following the length, each character
of the string is output, in sequence, using the modified UTF-8 encoding
for each character.

@param      str   a string to be written.
@throws     IOException  if an I/O error occurs.