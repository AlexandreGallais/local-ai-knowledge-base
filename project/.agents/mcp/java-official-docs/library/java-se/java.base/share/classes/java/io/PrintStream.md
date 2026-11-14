# PrintStream class (java.io)

```java
public class PrintStream extends FilterOutputStream implements Appendable, Closeable
```

A {@code PrintStream} adds functionality to another output stream,
namely the ability to print representations of various data values
conveniently.  Two other features are provided as well.  Unlike other output
streams, a {@code PrintStream} never throws an
{@code IOException}; instead, exceptional situations merely set an
internal flag that can be tested via the {@code checkError} method.
Optionally, a {@code PrintStream} can be created so as to flush
automatically; this means that the {@code flush} method of the underlying
output stream is automatically invoked after a byte array is written, one
of the {@code println} methods is invoked, or a newline character or byte
({@code '\n'}) is written.

<p> All characters printed by a {@code PrintStream} are converted into
bytes using the given encoding or charset, or the default charset if not
specified.
The {@link PrintWriter} class should be used in situations that require
writing characters rather than bytes.

<p> This class always replaces malformed and unmappable character sequences
with the charset's default replacement string.
The {@linkplain java.nio.charset.CharsetEncoder} class should be used when more
control over the encoding process is required.

@author     Frank Yellin
@author     Mark Reinhold
@since      1.0
@see Charset#defaultCharset()

## PrintStream.PrintStream(OutputStream)

```java
public PrintStream(OutputStream out)
```

Creates a new print stream, without automatic line flushing, with the
specified OutputStream. Characters written to the stream are converted
to bytes using the default charset, or where {@code out} is a
{@code PrintStream}, the charset used by the print stream.

@param  out        The output stream to which values and objects will be
                   printed

@see java.io.PrintWriter#PrintWriter(java.io.OutputStream)
@see Charset#defaultCharset()

## PrintStream.PrintStream(OutputStream, boolean)

```java
public PrintStream(OutputStream out, boolean autoFlush)
```

Creates a new print stream, with the specified OutputStream and line
flushing. Characters written to the stream are converted to bytes using
the default charset, or where {@code out} is a {@code PrintStream},
the charset used by the print stream.

@param  out        The output stream to which values and objects will be
                   printed
@param  autoFlush  Whether the output buffer will be flushed
                   whenever a byte array is written, one of the
                   {@code println} methods is invoked, or a newline
                   character or byte ({@code '\n'}) is written

@see java.io.PrintWriter#PrintWriter(java.io.OutputStream, boolean)
@see Charset#defaultCharset()

## PrintStream.PrintStream(OutputStream, boolean, String)

```java
public PrintStream(OutputStream out, boolean autoFlush, String encoding) throws UnsupportedEncodingException
```

Creates a new print stream, with the specified OutputStream, line
flushing, and character encoding.

@param  out        The output stream to which values and objects will be
                   printed
@param  autoFlush  Whether the output buffer will be flushed
                   whenever a byte array is written, one of the
                   {@code println} methods is invoked, or a newline
                   character or byte ({@code '\n'}) is written
@param  encoding   The name of a supported
                   <a href="../lang/package-summary.html#charenc">
                   character encoding</a>

@throws  UnsupportedEncodingException
         If the named encoding is not supported

@since  1.4

## PrintStream.PrintStream(OutputStream, boolean, Charset)

```java
public PrintStream(OutputStream out, boolean autoFlush, Charset charset)
```

Creates a new print stream, with the specified OutputStream, line
flushing and charset.  This convenience constructor creates the necessary
intermediate {@link java.io.OutputStreamWriter OutputStreamWriter},
which will encode characters using the provided charset.

@param  out        The output stream to which values and objects will be
                   printed
@param  autoFlush  Whether the output buffer will be flushed
                   whenever a byte array is written, one of the
                   {@code println} methods is invoked, or a newline
                   character or byte ({@code '\n'}) is written
@param  charset    A {@linkplain Charset charset}

@since  10

## PrintStream.PrintStream(String)

```java
public PrintStream(String fileName) throws FileNotFoundException
```

Creates a new print stream, without automatic line flushing, with the
specified file name.  This convenience constructor creates
the necessary intermediate {@link java.io.OutputStreamWriter
OutputStreamWriter}, which will encode characters using the
{@linkplain Charset#defaultCharset() default charset}
for this instance of the Java virtual machine.

@param  fileName
        The name of the file to use as the destination of this print
        stream.  If the file exists, then it will be truncated to
        zero size; otherwise, a new file will be created.  The output
        will be written to the file and is buffered.

@throws  FileNotFoundException
         If the given file object does not denote an existing, writable
         regular file and a new regular file of that name cannot be
         created, or if some other error occurs while opening or
         creating the file

@see Charset#defaultCharset()

@since  1.5

## PrintStream.PrintStream(String, String)

```java
public PrintStream(String fileName, String csn) throws FileNotFoundException, UnsupportedEncodingException
```

Creates a new print stream, without automatic line flushing, with the
specified file name and charset.  This convenience constructor creates
the necessary intermediate {@link java.io.OutputStreamWriter
OutputStreamWriter}, which will encode characters using the provided
charset.

@param  fileName
        The name of the file to use as the destination of this print
        stream.  If the file exists, then it will be truncated to
        zero size; otherwise, a new file will be created.  The output
        will be written to the file and is buffered.

@param  csn
        The name of a supported {@linkplain Charset charset}

@throws  FileNotFoundException
         If the given file object does not denote an existing, writable
         regular file and a new regular file of that name cannot be
         created, or if some other error occurs while opening or
         creating the file

@throws  UnsupportedEncodingException
         If the named charset is not supported

@since  1.5

## PrintStream.PrintStream(String, Charset)

```java
public PrintStream(String fileName, Charset charset) throws IOException
```

Creates a new print stream, without automatic line flushing, with the
specified file name and charset.  This convenience constructor creates
the necessary intermediate {@link java.io.OutputStreamWriter
OutputStreamWriter}, which will encode characters using the provided
charset.

@param  fileName
        The name of the file to use as the destination of this print
        stream.  If the file exists, then it will be truncated to
        zero size; otherwise, a new file will be created.  The output
        will be written to the file and is buffered.

@param  charset
        A {@linkplain Charset charset}

@throws  IOException
         if an I/O error occurs while opening or creating the file

@since  10

## PrintStream.PrintStream(File)

```java
public PrintStream(File file) throws FileNotFoundException
```

Creates a new print stream, without automatic line flushing, with the
specified file.  This convenience constructor creates the necessary
intermediate {@link java.io.OutputStreamWriter OutputStreamWriter},
which will encode characters using the {@linkplain
Charset#defaultCharset() default charset} for this
instance of the Java virtual machine.

@param  file
        The file to use as the destination of this print stream.  If the
        file exists, then it will be truncated to zero size; otherwise,
        a new file will be created.  The output will be written to the
        file and is buffered.

@throws  FileNotFoundException
         If the given file object does not denote an existing, writable
         regular file and a new regular file of that name cannot be
         created, or if some other error occurs while opening or
         creating the file

@see Charset#defaultCharset()

@since  1.5

## PrintStream.PrintStream(File, String)

```java
public PrintStream(File file, String csn) throws FileNotFoundException, UnsupportedEncodingException
```

Creates a new print stream, without automatic line flushing, with the
specified file and charset.  This convenience constructor creates
the necessary intermediate {@link java.io.OutputStreamWriter
OutputStreamWriter}, which will encode characters using the provided
charset.

@param  file
        The file to use as the destination of this print stream.  If the
        file exists, then it will be truncated to zero size; otherwise,
        a new file will be created.  The output will be written to the
        file and is buffered.

@param  csn
        The name of a supported {@linkplain Charset charset}

@throws  FileNotFoundException
         If the given file object does not denote an existing, writable
         regular file and a new regular file of that name cannot be
         created, or if some other error occurs while opening or
         creating the file

@throws  UnsupportedEncodingException
         If the named charset is not supported

@since  1.5

## PrintStream.PrintStream(File, Charset)

```java
public PrintStream(File file, Charset charset) throws IOException
```

Creates a new print stream, without automatic line flushing, with the
specified file and charset.  This convenience constructor creates
the necessary intermediate {@link java.io.OutputStreamWriter
OutputStreamWriter}, which will encode characters using the provided
charset.

@param  file
        The file to use as the destination of this print stream.  If the
        file exists, then it will be truncated to zero size; otherwise,
        a new file will be created.  The output will be written to the
        file and is buffered.

@param  charset
        A {@linkplain Charset charset}

@throws  IOException
         if an I/O error occurs while opening or creating the file

@since  10

## PrintStream.flush()

```java
public void flush()
```

Flushes the stream.  This is done by writing any buffered output bytes to
the underlying output stream and then flushing that stream.

@see        java.io.OutputStream#flush()

## PrintStream.close()

```java
public void close()
```

Closes the stream.  This is done by flushing the stream and then closing
the underlying output stream.

@see        java.io.OutputStream#close()

## PrintStream.checkError()

```java
public boolean checkError()
```

Flushes the stream if it's not closed and checks its error state.

@return {@code true} if and only if this stream has encountered an
        {@code IOException}, or the {@code setError} method has been
        invoked

## PrintStream.setError()

```java
protected void setError()
```

Sets the error state of the stream to {@code true}.

<p> This method will cause subsequent invocations of {@link
#checkError()} to return {@code true} until
{@link #clearError()} is invoked.

@since 1.1

## PrintStream.clearError()

```java
protected void clearError()
```

Clears the error state of this stream.

<p> This method will cause subsequent invocations of {@link
#checkError()} to return {@code false} until another write
operation fails and invokes {@link #setError()}.

@since 1.6

## PrintStream.write(int)

```java
public void write(int b)
```

Writes the specified byte to this stream.  If the byte is a newline and
automatic flushing is enabled then the {@code flush} method will be
invoked on the underlying output stream.

<p> Note that the byte is written as given; to write a character that
will be translated according to the default charset, use the
{@code print(char)} or {@code println(char)} methods.

@param  b  The byte to be written
@see #print(char)
@see #println(char)

## PrintStream.write(byte[], int, int)

```java
public void write(byte[] buf, int off, int len)
```

Writes {@code len} bytes from the specified byte array starting at
offset {@code off} to this stream.  If automatic flushing is
enabled then the {@code flush} method will be invoked on the underlying
output stream.

<p> Note that the bytes will be written as given; to write characters
that will be translated according to the default charset, use the
{@code print(char)} or {@code println(char)} methods.

@param  buf   A byte array
@param  off   Offset from which to start taking bytes
@param  len   Number of bytes to write
@throws IndexOutOfBoundsException {@inheritDoc}

## PrintStream.write(byte[])

```java
public void write(byte[] buf) throws IOException
```

Writes all bytes from the specified byte array to this stream. If
automatic flushing is enabled then the {@code flush} method will be
invoked on the underlying output stream.

<p> Note that the bytes will be written as given; to write characters
that will be translated according to the default charset, use the
{@code print(char[])} or {@code println(char[])} methods.

@apiNote
Although declared to throw {@code IOException}, this method never
actually does so. Instead, like other methods that this class
overrides, it sets an internal flag which may be tested via the
{@link #checkError()} method. To write an array of bytes without having
to write a {@code catch} block for the {@code IOException}, use either
{@link #writeBytes(byte[] buf) writeBytes(buf)} or
{@link #write(byte[], int, int) write(buf, 0, buf.length)}.

@implSpec
This method is equivalent to
{@link java.io.PrintStream#write(byte[],int,int)
this.write(buf, 0, buf.length)}.

@param  buf   A byte array

@throws IOException If an I/O error occurs.

@see #writeBytes(byte[])
@see #write(byte[],int,int)

## PrintStream.writeBytes(byte[])

```java
public void writeBytes(byte[] buf)
```

Writes all bytes from the specified byte array to this stream.
If automatic flushing is enabled then the {@code flush} method
will be invoked.

<p> Note that the bytes will be written as given; to write characters
that will be translated according to the default charset, use the
{@code print(char[])} or {@code println(char[])} methods.

@implSpec
This method is equivalent to
{@link #write(byte[], int, int) this.write(buf, 0, buf.length)}.

@param  buf   A byte array

@since 14

## PrintStream.print(boolean)

```java
public void print(boolean b)
```

Prints a boolean value.  The string produced by {@link
java.lang.String#valueOf(boolean)} is translated into bytes
according to the default charset, and these bytes
are written in exactly the manner of the
{@link #write(int)} method.

@param      b   The {@code boolean} to be printed
@see Charset#defaultCharset()

## PrintStream.print(char)

```java
public void print(char c)
```

Prints a character.  The character is translated into one or more bytes
according to the character encoding given to the constructor, or the
default charset if none specified. These bytes
are written in exactly the manner of the {@link #write(int)} method.

@param      c   The {@code char} to be printed
@see Charset#defaultCharset()

## PrintStream.print(int)

```java
public void print(int i)
```

Prints an integer.  The string produced by {@link
java.lang.String#valueOf(int)} is translated into bytes
according to the default charset, and these bytes
are written in exactly the manner of the
{@link #write(int)} method.

@param      i   The {@code int} to be printed
@see        java.lang.Integer#toString(int)
@see Charset#defaultCharset()

## PrintStream.print(long)

```java
public void print(long l)
```

Prints a long integer.  The string produced by {@link
java.lang.String#valueOf(long)} is translated into bytes
according to the default charset, and these bytes
are written in exactly the manner of the
{@link #write(int)} method.

@param      l   The {@code long} to be printed
@see        java.lang.Long#toString(long)
@see Charset#defaultCharset()

## PrintStream.print(float)

```java
public void print(float f)
```

Prints a floating-point number.  The string produced by {@link
java.lang.String#valueOf(float)} is translated into bytes
according to the default charset, and these bytes
are written in exactly the manner of the
{@link #write(int)} method.

@param      f   The {@code float} to be printed
@see        java.lang.Float#toString(float)
@see Charset#defaultCharset()

## PrintStream.print(double)

```java
public void print(double d)
```

Prints a double-precision floating-point number.  The string produced by
{@link java.lang.String#valueOf(double)} is translated into
bytes according to the default charset, and these
bytes are written in exactly the manner of the {@link
#write(int)} method.

@param      d   The {@code double} to be printed
@see        java.lang.Double#toString(double)
@see Charset#defaultCharset()

## PrintStream.print(char[])

```java
public void print(char[] s)
```

Prints an array of characters.  The characters are converted into bytes
according to the character encoding given to the constructor, or the
default charset if none specified. These bytes
are written in exactly the manner of the {@link #write(int)} method.

@param      s   The array of chars to be printed
@see Charset#defaultCharset()

@throws  NullPointerException  If {@code s} is {@code null}

## PrintStream.print(String)

```java
public void print(String s)
```

Prints a string.  If the argument is {@code null} then the string
{@code "null"} is printed.  Otherwise, the string's characters are
converted into bytes according to the character encoding given to the
constructor, or the default charset if none
specified. These bytes are written in exactly the manner of the
{@link #write(int)} method.

@param      s   The {@code String} to be printed
@see Charset#defaultCharset()

## PrintStream.print(Object)

```java
public void print(Object obj)
```

Prints an object.  The string produced by the {@link
java.lang.String#valueOf(Object)} method is translated into bytes
according to the default charset, and these bytes
are written in exactly the manner of the
{@link #write(int)} method.

@param      obj   The {@code Object} to be printed
@see        java.lang.Object#toString()
@see Charset#defaultCharset()

## PrintStream.println()

```java
public void println()
```

Terminates the current line by writing the line separator string.  The
line separator string is defined by the system property
{@code line.separator}, and is not necessarily a single newline
character ({@code '\n'}).

## PrintStream.println(boolean)

```java
public void println(boolean x)
```

Prints a boolean and then terminates the line.  This method behaves as
though it invokes {@link #print(boolean)} and then
{@link #println()}.

@param x  The {@code boolean} to be printed

## PrintStream.println(char)

```java
public void println(char x)
```

Prints a character and then terminates the line.  This method behaves as
though it invokes {@link #print(char)} and then
{@link #println()}.

@param x  The {@code char} to be printed.

## PrintStream.println(int)

```java
public void println(int x)
```

Prints an integer and then terminates the line.  This method behaves as
though it invokes {@link #print(int)} and then
{@link #println()}.

@param x  The {@code int} to be printed.

## PrintStream.println(long)

```java
public void println(long x)
```

Prints a long and then terminates the line.  This method behaves as
though it invokes {@link #print(long)} and then
{@link #println()}.

@param x  a The {@code long} to be printed.

## PrintStream.println(float)

```java
public void println(float x)
```

Prints a float and then terminates the line.  This method behaves as
though it invokes {@link #print(float)} and then
{@link #println()}.

@param x  The {@code float} to be printed.

## PrintStream.println(double)

```java
public void println(double x)
```

Prints a double and then terminates the line.  This method behaves as
though it invokes {@link #print(double)} and then
{@link #println()}.

@param x  The {@code double} to be printed.

## PrintStream.println(char[])

```java
public void println(char[] x)
```

Prints an array of characters and then terminates the line.  This method
behaves as though it invokes {@link #print(char[])} and
then {@link #println()}.

@param x  an array of chars to print.

## PrintStream.println(String)

```java
public void println(String x)
```

Prints a String and then terminates the line.  This method behaves as
though it invokes {@link #print(String)} and then
{@link #println()}.

@param x  The {@code String} to be printed.

## PrintStream.println(Object)

```java
public void println(Object x)
```

Prints an Object and then terminates the line.  This method calls
at first String.valueOf(x) to get the printed object's string value,
then behaves as
though it invokes {@link #print(String)} and then
{@link #println()}.

@param x  The {@code Object} to be printed.

## PrintStream.printf(String, Object ...)

```java
public PrintStream printf(String format, Object ... args)
```

A convenience method to write a formatted string to this output stream
using the specified format string and arguments.

<p> An invocation of this method of the form
{@code out.printf(format, args)} behaves
in exactly the same way as the invocation

{@snippet lang=java :
    out.format(format, args)
}

@param  format
        A format string as described in <a
        href="../util/Formatter.html#syntax">Format string syntax</a>

@param  args
        Arguments referenced by the format specifiers in the format
        string.  If there are more arguments than format specifiers, the
        extra arguments are ignored.  The number of arguments is
        variable and may be zero.  The maximum number of arguments is
        limited by the maximum dimension of a Java array as defined by
        <cite>The Java Virtual Machine Specification</cite>.
        The behaviour on a
        {@code null} argument depends on the <a
        href="../util/Formatter.html#syntax">conversion</a>.

@throws  java.util.IllegalFormatException
         If a format string contains an illegal syntax, a format
         specifier that is incompatible with the given arguments,
         insufficient arguments given the format string, or other
         illegal conditions.  For specification of all possible
         formatting errors, see the <a
         href="../util/Formatter.html#detail">Details</a> section of the
         formatter class specification.

@throws  NullPointerException
         If the {@code format} is {@code null}

@return  This output stream

@since  1.5

## PrintStream.printf(Locale, String, Object ...)

```java
public PrintStream printf(Locale l, String format, Object ... args)
```

A convenience method to write a formatted string to this output stream
using the specified format string and arguments.

<p> An invocation of this method of the form
{@code out.printf(l, format, args)} behaves
in exactly the same way as the invocation

{@snippet lang=java :
    out.format(l, format, args)
}

@param  l
        The {@linkplain java.util.Locale locale} to apply during
        formatting.  If {@code l} is {@code null} then no localization
        is applied.

@param  format
        A format string as described in <a
        href="../util/Formatter.html#syntax">Format string syntax</a>

@param  args
        Arguments referenced by the format specifiers in the format
        string.  If there are more arguments than format specifiers, the
        extra arguments are ignored.  The number of arguments is
        variable and may be zero.  The maximum number of arguments is
        limited by the maximum dimension of a Java array as defined by
        <cite>The Java Virtual Machine Specification</cite>.
        The behaviour on a
        {@code null} argument depends on the <a
        href="../util/Formatter.html#syntax">conversion</a>.

@throws  java.util.IllegalFormatException
         If a format string contains an illegal syntax, a format
         specifier that is incompatible with the given arguments,
         insufficient arguments given the format string, or other
         illegal conditions.  For specification of all possible
         formatting errors, see the <a
         href="../util/Formatter.html#detail">Details</a> section of the
         formatter class specification.

@throws  NullPointerException
         If the {@code format} is {@code null}

@return  This output stream

@since  1.5

## PrintStream.format(String, Object ...)

```java
public PrintStream format(String format, Object ... args)
```

Writes a formatted string to this output stream using the specified
format string and arguments.

<p> The locale always used is the one returned by {@link
java.util.Locale#getDefault(Locale.Category)} with
{@link java.util.Locale.Category#FORMAT FORMAT} category specified,
regardless of any previous invocations of other formatting methods on
this object.

@param  format
        A format string as described in <a
        href="../util/Formatter.html#syntax">Format string syntax</a>

@param  args
        Arguments referenced by the format specifiers in the format
        string.  If there are more arguments than format specifiers, the
        extra arguments are ignored.  The number of arguments is
        variable and may be zero.  The maximum number of arguments is
        limited by the maximum dimension of a Java array as defined by
        <cite>The Java Virtual Machine Specification</cite>.
        The behaviour on a
        {@code null} argument depends on the <a
        href="../util/Formatter.html#syntax">conversion</a>.

@throws  java.util.IllegalFormatException
         If a format string contains an illegal syntax, a format
         specifier that is incompatible with the given arguments,
         insufficient arguments given the format string, or other
         illegal conditions.  For specification of all possible
         formatting errors, see the <a
         href="../util/Formatter.html#detail">Details</a> section of the
         formatter class specification.

@throws  NullPointerException
         If the {@code format} is {@code null}

@return  This output stream

@since  1.5

## PrintStream.format(Locale, String, Object ...)

```java
public PrintStream format(Locale l, String format, Object ... args)
```

Writes a formatted string to this output stream using the specified
format string and arguments.

@param  l
        The {@linkplain java.util.Locale locale} to apply during
        formatting.  If {@code l} is {@code null} then no localization
        is applied.

@param  format
        A format string as described in <a
        href="../util/Formatter.html#syntax">Format string syntax</a>

@param  args
        Arguments referenced by the format specifiers in the format
        string.  If there are more arguments than format specifiers, the
        extra arguments are ignored.  The number of arguments is
        variable and may be zero.  The maximum number of arguments is
        limited by the maximum dimension of a Java array as defined by
        <cite>The Java Virtual Machine Specification</cite>.
        The behaviour on a
        {@code null} argument depends on the <a
        href="../util/Formatter.html#syntax">conversion</a>.

@throws  java.util.IllegalFormatException
         If a format string contains an illegal syntax, a format
         specifier that is incompatible with the given arguments,
         insufficient arguments given the format string, or other
         illegal conditions.  For specification of all possible
         formatting errors, see the <a
         href="../util/Formatter.html#detail">Details</a> section of the
         formatter class specification.

@throws  NullPointerException
         If the {@code format} is {@code null}

@return  This output stream

@since  1.5

## PrintStream.append(CharSequence)

```java
public PrintStream append(CharSequence csq)
```

Appends the specified character sequence to this output stream.

<p> An invocation of this method of the form {@code out.append(csq)}
when {@code csq} is not {@code null}, behaves in exactly the same way
as the invocation

{@snippet lang=java :
    out.print(csq.toString())
}

<p> Depending on the specification of {@code toString} for the
character sequence {@code csq}, the entire sequence may not be
appended.  For instance, invoking the {@code toString} method of a
character buffer will return a subsequence whose content depends upon
the buffer's position and limit.

@param  csq
        The character sequence to append.  If {@code csq} is
        {@code null}, then the four characters {@code "null"} are
        appended to this output stream.

@return  This output stream

@since  1.5

## PrintStream.append(CharSequence, int, int)

```java
public PrintStream append(CharSequence csq, int start, int end)
```

Appends a subsequence of the specified character sequence to this output
stream.

<p> An invocation of this method of the form
{@code out.append(csq, start, end)} when
{@code csq} is not {@code null}, behaves in
exactly the same way as the invocation

{@snippet lang=java :
    out.print(csq.subSequence(start, end).toString())
}

@param  csq
        The character sequence from which a subsequence will be
        appended.  If {@code csq} is {@code null}, then characters
        will be appended as if {@code csq} contained the four
        characters {@code "null"}.

@param  start
        The index of the first character in the subsequence

@param  end
        The index of the character following the last character in the
        subsequence

@return  This output stream

@throws  IndexOutOfBoundsException
         If {@code start} or {@code end} are negative, {@code start}
         is greater than {@code end}, or {@code end} is greater than
         {@code csq.length()}

@since  1.5

## PrintStream.append(char)

```java
public PrintStream append(char c)
```

Appends the specified character to this output stream.

<p> An invocation of this method of the form {@code out.append(c)}
behaves in exactly the same way as the invocation

{@snippet lang=java :
    out.print(c)
}

@param  c
        The 16-bit character to append

@return  This output stream

@since  1.5

## PrintStream.charset()

```java
public Charset charset()
```

{@return the charset used in this {@code PrintStream} instance}

@since 18