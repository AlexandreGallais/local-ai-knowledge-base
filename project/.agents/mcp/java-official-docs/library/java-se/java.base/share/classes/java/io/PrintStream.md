---
title: "PrintStream class (java.io) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/PrintStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PrintStream class (java.io)

```java
public class PrintStream extends FilterOutputStream implements Appendable, Closeable
```

A `PrintStream` adds functionality to another output stream,
namely the ability to print representations of various data values
conveniently.  Two other features are provided as well.  Unlike other output
streams, a `PrintStream` never throws an
`IOException`; instead, exceptional situations merely set an
internal flag that can be tested via the `checkError` method.
Optionally, a `PrintStream` can be created so as to flush
automatically; this means that the `flush` method of the underlying
output stream is automatically invoked after a byte array is written, one
of the `println` methods is invoked, or a newline character or byte
(`'\n'`) is written.

 All characters printed by a `PrintStream` are converted into
bytes using the given encoding or charset, or the default charset if not
specified.
The `PrintWriter` class should be used in situations that require
writing characters rather than bytes.

 This class always replaces malformed and unmappable character sequences
with the charset's default replacement string.
The `java.nio.charset.CharsetEncoder` class should be used when more
control over the encoding process is required.

**Since:** 1.0

**See also:** Charset#defaultCharset()

## PrintStream.PrintStream(OutputStream)

```java
public PrintStream(OutputStream out)
```

Creates a new print stream, without automatic line flushing, with the
specified OutputStream. Characters written to the stream are converted
to bytes using the default charset, or where `out` is a
`PrintStream`, the charset used by the print stream.

Parameters:

- `out`: The output stream to which values and objects will be printed

**See also:** java.io.PrintWriter#PrintWriter(java.io.OutputStream)

**See also:** Charset#defaultCharset()

## PrintStream.PrintStream(OutputStream, boolean)

```java
public PrintStream(OutputStream out, boolean autoFlush)
```

Creates a new print stream, with the specified OutputStream and line
flushing. Characters written to the stream are converted to bytes using
the default charset, or where `out` is a `PrintStream`,
the charset used by the print stream.

Parameters:

- `out`: The output stream to which values and objects will be printed
- `autoFlush`: Whether the output buffer will be flushed whenever a byte array is written, one of the `println` methods is invoked, or a newline character or byte (`'\n'`) is written

**See also:** java.io.PrintWriter#PrintWriter(java.io.OutputStream, boolean)

**See also:** Charset#defaultCharset()

## PrintStream.PrintStream(OutputStream, boolean, String)

```java
public PrintStream(OutputStream out, boolean autoFlush, String encoding) throws UnsupportedEncodingException
```

Creates a new print stream, with the specified OutputStream, line
flushing, and character encoding.

Parameters:

- `out`: The output stream to which values and objects will be printed
- `autoFlush`: Whether the output buffer will be flushed whenever a byte array is written, one of the `println` methods is invoked, or a newline character or byte (`'\n'`) is written
- `encoding`: The name of a supported  character encoding

**Since:** 1.4

Throws:

- `UnsupportedEncodingException`: If the named encoding is not supported

## PrintStream.PrintStream(OutputStream, boolean, Charset)

```java
public PrintStream(OutputStream out, boolean autoFlush, Charset charset)
```

Creates a new print stream, with the specified OutputStream, line
flushing and charset.  This convenience constructor creates the necessary
intermediate OutputStreamWriter,
which will encode characters using the provided charset.

Parameters:

- `out`: The output stream to which values and objects will be printed
- `autoFlush`: Whether the output buffer will be flushed whenever a byte array is written, one of the `println` methods is invoked, or a newline character or byte (`'\n'`) is written
- `charset`: A charset

**Since:** 10

## PrintStream.PrintStream(String)

```java
public PrintStream(String fileName) throws FileNotFoundException
```

Creates a new print stream, without automatic line flushing, with the
specified file name.  This convenience constructor creates
the necessary intermediate OutputStreamWriter, which will encode characters using the
default charset
for this instance of the Java virtual machine.

Parameters:

- `fileName`: The name of the file to use as the destination of this print stream. If the file exists, then it will be truncated to zero size; otherwise, a new file will be created. The output will be written to the file and is buffered.

**See also:** Charset#defaultCharset()

**Since:** 1.5

Throws:

- `FileNotFoundException`: If the given file object does not denote an existing, writable regular file and a new regular file of that name cannot be created, or if some other error occurs while opening or creating the file

## PrintStream.PrintStream(String, String)

```java
public PrintStream(String fileName, String csn) throws FileNotFoundException, UnsupportedEncodingException
```

Creates a new print stream, without automatic line flushing, with the
specified file name and charset.  This convenience constructor creates
the necessary intermediate OutputStreamWriter, which will encode characters using the provided
charset.

Parameters:

- `fileName`: The name of the file to use as the destination of this print stream. If the file exists, then it will be truncated to zero size; otherwise, a new file will be created. The output will be written to the file and is buffered.
- `csn`: The name of a supported charset

**Since:** 1.5

Throws:

- `FileNotFoundException`: If the given file object does not denote an existing, writable regular file and a new regular file of that name cannot be created, or if some other error occurs while opening or creating the file
- `UnsupportedEncodingException`: If the named charset is not supported

## PrintStream.PrintStream(String, Charset)

```java
public PrintStream(String fileName, Charset charset) throws IOException
```

Creates a new print stream, without automatic line flushing, with the
specified file name and charset.  This convenience constructor creates
the necessary intermediate OutputStreamWriter, which will encode characters using the provided
charset.

Parameters:

- `fileName`: The name of the file to use as the destination of this print stream. If the file exists, then it will be truncated to zero size; otherwise, a new file will be created. The output will be written to the file and is buffered.
- `charset`: A charset

**Since:** 10

Throws:

- `IOException`: if an I/O error occurs while opening or creating the file

## PrintStream.PrintStream(File)

```java
public PrintStream(File file) throws FileNotFoundException
```

Creates a new print stream, without automatic line flushing, with the
specified file.  This convenience constructor creates the necessary
intermediate OutputStreamWriter,
which will encode characters using the default charset for this
instance of the Java virtual machine.

Parameters:

- `file`: The file to use as the destination of this print stream. If the file exists, then it will be truncated to zero size; otherwise, a new file will be created. The output will be written to the file and is buffered.

**See also:** Charset#defaultCharset()

**Since:** 1.5

Throws:

- `FileNotFoundException`: If the given file object does not denote an existing, writable regular file and a new regular file of that name cannot be created, or if some other error occurs while opening or creating the file

## PrintStream.PrintStream(File, String)

```java
public PrintStream(File file, String csn) throws FileNotFoundException, UnsupportedEncodingException
```

Creates a new print stream, without automatic line flushing, with the
specified file and charset.  This convenience constructor creates
the necessary intermediate OutputStreamWriter, which will encode characters using the provided
charset.

Parameters:

- `file`: The file to use as the destination of this print stream. If the file exists, then it will be truncated to zero size; otherwise, a new file will be created. The output will be written to the file and is buffered.
- `csn`: The name of a supported charset

**Since:** 1.5

Throws:

- `FileNotFoundException`: If the given file object does not denote an existing, writable regular file and a new regular file of that name cannot be created, or if some other error occurs while opening or creating the file
- `UnsupportedEncodingException`: If the named charset is not supported

## PrintStream.PrintStream(File, Charset)

```java
public PrintStream(File file, Charset charset) throws IOException
```

Creates a new print stream, without automatic line flushing, with the
specified file and charset.  This convenience constructor creates
the necessary intermediate OutputStreamWriter, which will encode characters using the provided
charset.

Parameters:

- `file`: The file to use as the destination of this print stream. If the file exists, then it will be truncated to zero size; otherwise, a new file will be created. The output will be written to the file and is buffered.
- `charset`: A charset

**Since:** 10

Throws:

- `IOException`: if an I/O error occurs while opening or creating the file

## PrintStream.flush()

```java
public void flush()
```

Flushes the stream.  This is done by writing any buffered output bytes to
the underlying output stream and then flushing that stream.

**See also:** java.io.OutputStream#flush()

## PrintStream.close()

```java
public void close()
```

Closes the stream.  This is done by flushing the stream and then closing
the underlying output stream.

**See also:** java.io.OutputStream#close()

## PrintStream.checkError()

```java
public boolean checkError()
```

Flushes the stream if it's not closed and checks its error state.

**Returns:** `true` if and only if this stream has encountered an
        `IOException`, or the `setError` method has been
        invoked

## PrintStream.setError()

```java
protected void setError()
```

Sets the error state of the stream to `true`.

 This method will cause subsequent invocations of `checkError()` to return `true` until
`clearError()` is invoked.

**Since:** 1.1

## PrintStream.clearError()

```java
protected void clearError()
```

Clears the error state of this stream.

 This method will cause subsequent invocations of `checkError()` to return `false` until another write
operation fails and invokes `setError()`.

**Since:** 1.6

## PrintStream.write(int)

```java
public void write(int b)
```

Writes the specified byte to this stream.  If the byte is a newline and
automatic flushing is enabled then the `flush` method will be
invoked on the underlying output stream.

 Note that the byte is written as given; to write a character that
will be translated according to the default charset, use the
`print(char)` or `println(char)` methods.

Parameters:

- `b`: The byte to be written

**See also:** #print(char)

**See also:** #println(char)

## PrintStream.write(byte[], int, int)

```java
public void write(byte[] buf, int off, int len)
```

Writes `len` bytes from the specified byte array starting at
offset `off` to this stream.  If automatic flushing is
enabled then the `flush` method will be invoked on the underlying
output stream.

 Note that the bytes will be written as given; to write characters
that will be translated according to the default charset, use the
`print(char)` or `println(char)` methods.

Parameters:

- `buf`: A byte array
- `off`: Offset from which to start taking bytes
- `len`: Number of bytes to write

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## PrintStream.write(byte[])

```java
public void write(byte[] buf) throws IOException
```

Writes all bytes from the specified byte array to this stream. If
automatic flushing is enabled then the `flush` method will be
invoked on the underlying output stream.

 Note that the bytes will be written as given; to write characters
that will be translated according to the default charset, use the
`print(char[])` or `println(char[])` methods.

Parameters:

- `buf`: A byte array

**API note:** Although declared to throw `IOException`, this method never
actually does so. Instead, like other methods that this class
overrides, it sets an internal flag which may be tested via the
`checkError()` method. To write an array of bytes without having
to write a `catch` block for the `IOException`, use either
buf) writeBytes(buf) or
int, int) write(buf, 0, buf.length).

**Implementation requirements:** This method is equivalent to
this.write(buf, 0, buf.length).

**See also:** #writeBytes(byte[])

**See also:** #write(byte[],int,int)

Throws:

- `IOException`: If an I/O error occurs.

## PrintStream.writeBytes(byte[])

```java
public void writeBytes(byte[] buf)
```

Writes all bytes from the specified byte array to this stream.
If automatic flushing is enabled then the `flush` method
will be invoked.

 Note that the bytes will be written as given; to write characters
that will be translated according to the default charset, use the
`print(char[])` or `println(char[])` methods.

Parameters:

- `buf`: A byte array

**Implementation requirements:** This method is equivalent to
int, int) this.write(buf, 0, buf.length).

**Since:** 14

## PrintStream.print(boolean)

```java
public void print(boolean b)
```

Prints a boolean value.  The string produced by `java.lang.String.valueOf(boolean)` is translated into bytes
according to the default charset, and these bytes
are written in exactly the manner of the
`write(int)` method.

Parameters:

- `b`: The `boolean` to be printed

**See also:** Charset#defaultCharset()

## PrintStream.print(char)

```java
public void print(char c)
```

Prints a character.  The character is translated into one or more bytes
according to the character encoding given to the constructor, or the
default charset if none specified. These bytes
are written in exactly the manner of the `write(int)` method.

Parameters:

- `c`: The `char` to be printed

**See also:** Charset#defaultCharset()

## PrintStream.print(int)

```java
public void print(int i)
```

Prints an integer.  The string produced by `java.lang.String.valueOf(int)` is translated into bytes
according to the default charset, and these bytes
are written in exactly the manner of the
`write(int)` method.

Parameters:

- `i`: The `int` to be printed

**See also:** java.lang.Integer#toString(int)

**See also:** Charset#defaultCharset()

## PrintStream.print(long)

```java
public void print(long l)
```

Prints a long integer.  The string produced by `java.lang.String.valueOf(long)` is translated into bytes
according to the default charset, and these bytes
are written in exactly the manner of the
`write(int)` method.

Parameters:

- `l`: The `long` to be printed

**See also:** java.lang.Long#toString(long)

**See also:** Charset#defaultCharset()
