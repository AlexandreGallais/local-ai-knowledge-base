---
title: "PrintWriter class (java.io) (part 1 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/PrintWriter.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PrintWriter class (java.io)

```java
public class PrintWriter extends Writer
```

Prints formatted representations of objects to a text-output stream.  This
class implements all of the `print` methods found in `PrintStream`.  It does not contain methods for writing raw bytes, for which
a program should use unencoded byte streams.

 Unlike the `PrintStream` class, if automatic flushing is enabled
it will be done only when one of the `println`, `printf`, or
`format` methods is invoked, rather than whenever a newline character
happens to be output.  These methods use the platform's own notion of line
separator rather than the newline character.

 Methods in this class never throw I/O exceptions, although some of its
constructors may.  The client may inquire as to whether any errors have
occurred by invoking checkError().

 This class always replaces malformed and unmappable character sequences with
the charset's default replacement string.
The `java.nio.charset.CharsetEncoder` class should be used when more
control over the encoding process is required.

**Since:** 1.1

## PrintWriter.out

```java
protected Writer out
```

The underlying character-output stream of this
`PrintWriter`.

**Since:** 1.2

## PrintWriter.PrintWriter(Writer)

```java
public PrintWriter(Writer out)
```

Creates a new PrintWriter, without automatic line flushing.

Parameters:

- `out`: A character-output stream

## PrintWriter.PrintWriter(Writer, boolean)

```java
public PrintWriter(Writer out, boolean autoFlush)
```

Creates a new PrintWriter.

Parameters:

- `out`: A character-output stream
- `autoFlush`: A boolean; if true, the `println`, `printf`, or `format` methods will flush the output buffer

## PrintWriter.PrintWriter(OutputStream)

```java
public PrintWriter(OutputStream out)
```

Creates a new PrintWriter, without automatic line flushing, from an
existing OutputStream.  This convenience constructor creates the
necessary intermediate OutputStreamWriter, which will convert characters
into bytes using the default charset, or where `out` is a
`PrintStream`, the charset used by the print stream.

Parameters:

- `out`: An output stream

**See also:** OutputStreamWriter#OutputStreamWriter(OutputStream)

**See also:** Charset#defaultCharset()

## PrintWriter.PrintWriter(OutputStream, boolean)

```java
public PrintWriter(OutputStream out, boolean autoFlush)
```

Creates a new PrintWriter from an existing OutputStream.  This
convenience constructor creates the necessary intermediate
OutputStreamWriter, which will convert characters into bytes using
the default charset, or where `out` is a `PrintStream`,
the charset used by the print stream.

Parameters:

- `out`: An output stream
- `autoFlush`: A boolean; if true, the `println`, `printf`, or `format` methods will flush the output buffer

**See also:** OutputStreamWriter#OutputStreamWriter(OutputStream)

**See also:** Charset#defaultCharset()

## PrintWriter.PrintWriter(OutputStream, boolean, Charset)

```java
public PrintWriter(OutputStream out, boolean autoFlush, Charset charset)
```

Creates a new PrintWriter from an existing OutputStream.  This
convenience constructor creates the necessary intermediate
OutputStreamWriter, which will convert characters into bytes using the
specified charset.

Parameters:

- `out`: An output stream
- `autoFlush`: A boolean; if true, the `println`, `printf`, or `format` methods will flush the output buffer
- `charset`: A charset

**Since:** 10

## PrintWriter.PrintWriter(String)

```java
public PrintWriter(String fileName) throws FileNotFoundException
```

Creates a new PrintWriter, without automatic line flushing, with the
specified file name.  This convenience constructor creates the necessary
intermediate OutputStreamWriter,
which will encode characters using the default charset for this
instance of the Java virtual machine.

Parameters:

- `fileName`: The name of the file to use as the destination of this writer. If the file exists then it will be truncated to zero size; otherwise, a new file will be created. The output will be written to the file and is buffered.

**See also:** Charset#defaultCharset()

**Since:** 1.5

Throws:

- `FileNotFoundException`: If the given string does not denote an existing, writable regular file and a new regular file of that name cannot be created, or if some other error occurs while opening or creating the file

## PrintWriter.PrintWriter(String, String)

```java
public PrintWriter(String fileName, String csn) throws FileNotFoundException, UnsupportedEncodingException
```

Creates a new PrintWriter, without automatic line flushing, with the
specified file name and charset.  This convenience constructor creates
the necessary intermediate OutputStreamWriter, which will encode characters using the provided
charset.

Parameters:

- `fileName`: The name of the file to use as the destination of this writer. If the file exists then it will be truncated to zero size; otherwise, a new file will be created. The output will be written to the file and is buffered.
- `csn`: The name of a supported charset

**Since:** 1.5

Throws:

- `FileNotFoundException`: If the given string does not denote an existing, writable regular file and a new regular file of that name cannot be created, or if some other error occurs while opening or creating the file
- `UnsupportedEncodingException`: If the named charset is not supported

## PrintWriter.PrintWriter(String, Charset)

```java
public PrintWriter(String fileName, Charset charset) throws IOException
```

Creates a new PrintWriter, without automatic line flushing, with the
specified file name and charset.  This convenience constructor creates
the necessary intermediate OutputStreamWriter, which will encode characters using the provided
charset.

Parameters:

- `fileName`: The name of the file to use as the destination of this writer. If the file exists then it will be truncated to zero size; otherwise, a new file will be created. The output will be written to the file and is buffered.
- `charset`: A charset

**Since:** 10

Throws:

- `IOException`: if an I/O error occurs while opening or creating the file

## PrintWriter.PrintWriter(File)

```java
public PrintWriter(File file) throws FileNotFoundException
```

Creates a new PrintWriter, without automatic line flushing, with the
specified file.  This convenience constructor creates the necessary
intermediate OutputStreamWriter,
which will encode characters using the default charset for this
instance of the Java virtual machine.

Parameters:

- `file`: The file to use as the destination of this writer. If the file exists then it will be truncated to zero size; otherwise, a new file will be created. The output will be written to the file and is buffered.

**See also:** Charset#defaultCharset()

**Since:** 1.5

Throws:

- `FileNotFoundException`: If the given file object does not denote an existing, writable regular file and a new regular file of that name cannot be created, or if some other error occurs while opening or creating the file

## PrintWriter.PrintWriter(File, String)

```java
public PrintWriter(File file, String csn) throws FileNotFoundException, UnsupportedEncodingException
```

Creates a new PrintWriter, without automatic line flushing, with the
specified file and charset.  This convenience constructor creates the
necessary intermediate OutputStreamWriter, which will encode characters using the provided
charset.

Parameters:

- `file`: The file to use as the destination of this writer. If the file exists then it will be truncated to zero size; otherwise, a new file will be created. The output will be written to the file and is buffered.
- `csn`: The name of a supported charset

**Since:** 1.5

Throws:

- `FileNotFoundException`: If the given file object does not denote an existing, writable regular file and a new regular file of that name cannot be created, or if some other error occurs while opening or creating the file
- `UnsupportedEncodingException`: If the named charset is not supported

## PrintWriter.PrintWriter(File, Charset)

```java
public PrintWriter(File file, Charset charset) throws IOException
```

Creates a new PrintWriter, without automatic line flushing, with the
specified file and charset.  This convenience constructor creates the
necessary intermediate OutputStreamWriter, which will encode characters using the provided
charset.

Parameters:

- `file`: The file to use as the destination of this writer. If the file exists then it will be truncated to zero size; otherwise, a new file will be created. The output will be written to the file and is buffered.
- `charset`: A charset

**Since:** 10

Throws:

- `IOException`: if an I/O error occurs while opening or creating the file

## PrintWriter.flush()

```java
public void flush()
```

Flushes the stream.

**See also:** #checkError()

## PrintWriter.close()

```java
public void close()
```

Closes the stream and releases any system resources associated
with it. Closing a previously closed stream has no effect.

**See also:** #checkError()

## PrintWriter.checkError()

```java
public boolean checkError()
```

Flushes the stream if it's not closed and checks its error state.

**Returns:** `true` if and only if this stream has encountered an
        `IOException`, or the `setError` method has been
        invoked

## PrintWriter.setError()

```java
protected void setError()
```

Sets the error state of the stream to `true`.

 This method will cause subsequent invocations of `checkError()` to return `true` until `clearError()` is invoked.

## PrintWriter.clearError()

```java
protected void clearError()
```

Clears the error state of this stream.

 This method will cause subsequent invocations of `checkError()` to return `false` until another write
operation fails and invokes `setError()`.

**Since:** 1.6

## PrintWriter.write(int)

```java
public void write(int c)
```

Writes a single character.

Parameters:

- `c`: int specifying a character to be written.

## PrintWriter.write(char[], int, int)

```java
public void write(char[] buf, int off, int len)
```

Writes A Portion of an array of characters.

Parameters:

- `buf`: Array of characters
- `off`: Offset from which to start writing characters
- `len`: Number of characters to write

Throws:

- `IndexOutOfBoundsException`: If the values of the `off` and `len` parameters cause the corresponding method of the underlying `Writer` to throw an `IndexOutOfBoundsException`

## PrintWriter.write(char[])

```java
public void write(char[] buf)
```

Writes an array of characters.  This method cannot be inherited from the
Writer class because it must suppress I/O exceptions.

Parameters:

- `buf`: Array of characters to be written

## PrintWriter.write(String, int, int)

```java
public void write(String s, int off, int len)
```

Writes a portion of a string.

Parameters:

- `s`: A String
- `off`: Offset from which to start writing characters
- `len`: Number of characters to write

Throws:

- `IndexOutOfBoundsException`: If the values of the `off` and `len` parameters cause the corresponding method of the underlying `Writer` to throw an `IndexOutOfBoundsException`

## PrintWriter.write(String)

```java
public void write(String s)
```

Writes a string.  This method cannot be inherited from the Writer class
because it must suppress I/O exceptions.

Parameters:

- `s`: String to be written

## PrintWriter.print(boolean)

```java
public void print(boolean b)
```

Prints a boolean value.  The string produced by `java.lang.String.valueOf(boolean)` is translated into bytes
according to the default charset, and these bytes
are written in exactly the manner of the `write(int)` method.

Parameters:

- `b`: The `boolean` to be printed

**See also:** Charset#defaultCharset()

## PrintWriter.print(char)

```java
public void print(char c)
```

Prints a character.  The character is translated into one or more bytes
according to the default charset, and these bytes
are written in exactly the manner of the `write(int)` method.

Parameters:

- `c`: The `char` to be printed

**See also:** Charset#defaultCharset()

## PrintWriter.print(int)

```java
public void print(int i)
```

Prints an integer.  The string produced by `java.lang.String.valueOf(int)` is translated into bytes according
to the default charset, and these bytes are
written in exactly the manner of the `write(int)`
method.

Parameters:

- `i`: The `int` to be printed

**See also:** java.lang.Integer#toString(int)

**See also:** Charset#defaultCharset()

## PrintWriter.print(long)

```java
public void print(long l)
```

Prints a long integer.  The string produced by `java.lang.String.valueOf(long)` is translated into bytes
according to the default charset, and these bytes
are written in exactly the manner of the `write(int)`
method.

Parameters:

- `l`: The `long` to be printed

**See also:** java.lang.Long#toString(long)

**See also:** Charset#defaultCharset()

## PrintWriter.print(float)

```java
public void print(float f)
```

Prints a floating-point number.  The string produced by `java.lang.String.valueOf(float)` is translated into bytes
according to the default charset, and these bytes
are written in exactly the manner of the `write(int)`
method.

Parameters:

- `f`: The `float` to be printed

**See also:** java.lang.Float#toString(float)

**See also:** Charset#defaultCharset()

## PrintWriter.print(double)

```java
public void print(double d)
```

Prints a double-precision floating-point number.  The string produced by
`java.lang.String.valueOf(double)` is translated into
bytes according to the default charset, and these
bytes are written in exactly the manner of the `write(int)` method.

Parameters:

- `d`: The `double` to be printed

**See also:** java.lang.Double#toString(double)

**See also:** Charset#defaultCharset()

## PrintWriter.print(char[])

```java
public void print(char[] s)
```

Prints an array of characters.  The characters are converted into bytes
according to the default charset, and these bytes
are written in exactly the manner of the `write(int)`
method.

Parameters:

- `s`: The array of chars to be printed

**See also:** Charset#defaultCharset()

Throws:

- `NullPointerException`: If `s` is `null`

## PrintWriter.print(String)

```java
public void print(String s)
```

Prints a string.  If the argument is `null` then the string
`"null"` is printed.  Otherwise, the string's characters are
converted into bytes according to the default charset,
and these bytes are written in exactly the manner of the
`write(int)` method.

Parameters:

- `s`: The `String` to be printed

**See also:** Charset#defaultCharset()
