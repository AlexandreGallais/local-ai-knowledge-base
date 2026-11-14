# PrintWriter class (java.io)

```java
public class PrintWriter extends Writer
```

Prints formatted representations of objects to a text-output stream.  This
class implements all of the {@code print} methods found in {@link
PrintStream}.  It does not contain methods for writing raw bytes, for which
a program should use unencoded byte streams.

<p> Unlike the {@link PrintStream} class, if automatic flushing is enabled
it will be done only when one of the {@code println}, {@code printf}, or
{@code format} methods is invoked, rather than whenever a newline character
happens to be output.  These methods use the platform's own notion of line
separator rather than the newline character.

<p> Methods in this class never throw I/O exceptions, although some of its
constructors may.  The client may inquire as to whether any errors have
occurred by invoking {@link #checkError checkError()}.

<p> This class always replaces malformed and unmappable character sequences with
the charset's default replacement string.
The {@linkplain java.nio.charset.CharsetEncoder} class should be used when more
control over the encoding process is required.

@author      Frank Yellin
@author      Mark Reinhold
@since       1.1

## PrintWriter.out

```java
protected Writer out
```

The underlying character-output stream of this
{@code PrintWriter}.

@since 1.2

## PrintWriter.PrintWriter(Writer)

```java
public PrintWriter(Writer out)
```

Creates a new PrintWriter, without automatic line flushing.

@param  out        A character-output stream

## PrintWriter.PrintWriter(Writer, boolean)

```java
public PrintWriter(Writer out, boolean autoFlush)
```

Creates a new PrintWriter.

@param  out        A character-output stream
@param  autoFlush  A boolean; if true, the {@code println},
                   {@code printf}, or {@code format} methods will
                   flush the output buffer

## PrintWriter.PrintWriter(OutputStream)

```java
public PrintWriter(OutputStream out)
```

Creates a new PrintWriter, without automatic line flushing, from an
existing OutputStream.  This convenience constructor creates the
necessary intermediate OutputStreamWriter, which will convert characters
into bytes using the default charset, or where {@code out} is a
{@code PrintStream}, the charset used by the print stream.

@param  out        An output stream

@see OutputStreamWriter#OutputStreamWriter(OutputStream)
@see Charset#defaultCharset()

## PrintWriter.PrintWriter(OutputStream, boolean)

```java
public PrintWriter(OutputStream out, boolean autoFlush)
```

Creates a new PrintWriter from an existing OutputStream.  This
convenience constructor creates the necessary intermediate
OutputStreamWriter, which will convert characters into bytes using
the default charset, or where {@code out} is a {@code PrintStream},
the charset used by the print stream.

@param  out        An output stream
@param  autoFlush  A boolean; if true, the {@code println},
                   {@code printf}, or {@code format} methods will
                   flush the output buffer

@see OutputStreamWriter#OutputStreamWriter(OutputStream)
@see Charset#defaultCharset()

## PrintWriter.PrintWriter(OutputStream, boolean, Charset)

```java
public PrintWriter(OutputStream out, boolean autoFlush, Charset charset)
```

Creates a new PrintWriter from an existing OutputStream.  This
convenience constructor creates the necessary intermediate
OutputStreamWriter, which will convert characters into bytes using the
specified charset.

@param  out        An output stream
@param  autoFlush  A boolean; if true, the {@code println},
                   {@code printf}, or {@code format} methods will
                   flush the output buffer
@param  charset
        A {@linkplain Charset charset}

@since 10

## PrintWriter.PrintWriter(String)

```java
public PrintWriter(String fileName) throws FileNotFoundException
```

Creates a new PrintWriter, without automatic line flushing, with the
specified file name.  This convenience constructor creates the necessary
intermediate {@link OutputStreamWriter OutputStreamWriter},
which will encode characters using the {@linkplain
Charset#defaultCharset() default charset} for this
instance of the Java virtual machine.

@param  fileName
        The name of the file to use as the destination of this writer.
        If the file exists then it will be truncated to zero size;
        otherwise, a new file will be created.  The output will be
        written to the file and is buffered.

@throws  FileNotFoundException
         If the given string does not denote an existing, writable
         regular file and a new regular file of that name cannot be
         created, or if some other error occurs while opening or
         creating the file

@see Charset#defaultCharset()

@since  1.5

## PrintWriter.PrintWriter(String, String)

```java
public PrintWriter(String fileName, String csn) throws FileNotFoundException, UnsupportedEncodingException
```

Creates a new PrintWriter, without automatic line flushing, with the
specified file name and charset.  This convenience constructor creates
the necessary intermediate {@link OutputStreamWriter
OutputStreamWriter}, which will encode characters using the provided
charset.

@param  fileName
        The name of the file to use as the destination of this writer.
        If the file exists then it will be truncated to zero size;
        otherwise, a new file will be created.  The output will be
        written to the file and is buffered.

@param  csn
        The name of a supported {@linkplain Charset charset}

@throws  FileNotFoundException
         If the given string does not denote an existing, writable
         regular file and a new regular file of that name cannot be
         created, or if some other error occurs while opening or
         creating the file

@throws  UnsupportedEncodingException
         If the named charset is not supported

@since  1.5

## PrintWriter.PrintWriter(String, Charset)

```java
public PrintWriter(String fileName, Charset charset) throws IOException
```

Creates a new PrintWriter, without automatic line flushing, with the
specified file name and charset.  This convenience constructor creates
the necessary intermediate {@link OutputStreamWriter
OutputStreamWriter}, which will encode characters using the provided
charset.

@param  fileName
        The name of the file to use as the destination of this writer.
        If the file exists then it will be truncated to zero size;
        otherwise, a new file will be created.  The output will be
        written to the file and is buffered.

@param  charset
        A {@linkplain Charset charset}

@throws  IOException
         if an I/O error occurs while opening or creating the file

@since  10

## PrintWriter.PrintWriter(File)

```java
public PrintWriter(File file) throws FileNotFoundException
```

Creates a new PrintWriter, without automatic line flushing, with the
specified file.  This convenience constructor creates the necessary
intermediate {@link OutputStreamWriter OutputStreamWriter},
which will encode characters using the {@linkplain
Charset#defaultCharset() default charset} for this
instance of the Java virtual machine.

@param  file
        The file to use as the destination of this writer.  If the file
        exists then it will be truncated to zero size; otherwise, a new
        file will be created.  The output will be written to the file
        and is buffered.

@throws  FileNotFoundException
         If the given file object does not denote an existing, writable
         regular file and a new regular file of that name cannot be
         created, or if some other error occurs while opening or
         creating the file

@see Charset#defaultCharset()

@since  1.5

## PrintWriter.PrintWriter(File, String)

```java
public PrintWriter(File file, String csn) throws FileNotFoundException, UnsupportedEncodingException
```

Creates a new PrintWriter, without automatic line flushing, with the
specified file and charset.  This convenience constructor creates the
necessary intermediate {@link OutputStreamWriter
OutputStreamWriter}, which will encode characters using the provided
charset.

@param  file
        The file to use as the destination of this writer.  If the file
        exists then it will be truncated to zero size; otherwise, a new
        file will be created.  The output will be written to the file
        and is buffered.

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

## PrintWriter.PrintWriter(File, Charset)

```java
public PrintWriter(File file, Charset charset) throws IOException
```

Creates a new PrintWriter, without automatic line flushing, with the
specified file and charset.  This convenience constructor creates the
necessary intermediate {@link java.io.OutputStreamWriter
OutputStreamWriter}, which will encode characters using the provided
charset.

@param  file
        The file to use as the destination of this writer.  If the file
        exists then it will be truncated to zero size; otherwise, a new
        file will be created.  The output will be written to the file
        and is buffered.

@param  charset
        A {@linkplain Charset charset}

@throws  IOException
         if an I/O error occurs while opening or creating the file

@since  10

## PrintWriter.flush()

```java
public void flush()
```

Flushes the stream.
@see #checkError()

## PrintWriter.close()

```java
public void close()
```

Closes the stream and releases any system resources associated
with it. Closing a previously closed stream has no effect.

@see #checkError()

## PrintWriter.checkError()

```java
public boolean checkError()
```

Flushes the stream if it's not closed and checks its error state.

@return {@code true} if and only if this stream has encountered an
        {@code IOException}, or the {@code setError} method has been
        invoked

## PrintWriter.setError()

```java
protected void setError()
```

Sets the error state of the stream to {@code true}.

<p> This method will cause subsequent invocations of {@link
#checkError()} to return {@code true} until {@link
#clearError()} is invoked.

## PrintWriter.clearError()

```java
protected void clearError()
```

Clears the error state of this stream.

<p> This method will cause subsequent invocations of {@link
#checkError()} to return {@code false} until another write
operation fails and invokes {@link #setError()}.

@since 1.6

## PrintWriter.write(int)

```java
public void write(int c)
```

Writes a single character.
@param c int specifying a character to be written.

## PrintWriter.write(char[], int, int)

```java
public void write(char[] buf, int off, int len)
```

Writes A Portion of an array of characters.
@param buf Array of characters
@param off Offset from which to start writing characters
@param len Number of characters to write

@throws  IndexOutOfBoundsException
         If the values of the {@code off} and {@code len} parameters
         cause the corresponding method of the underlying {@code Writer}
         to throw an {@code IndexOutOfBoundsException}

## PrintWriter.write(char[])

```java
public void write(char[] buf)
```

Writes an array of characters.  This method cannot be inherited from the
Writer class because it must suppress I/O exceptions.
@param buf Array of characters to be written

## PrintWriter.write(String, int, int)

```java
public void write(String s, int off, int len)
```

Writes a portion of a string.
@param s A String
@param off Offset from which to start writing characters
@param len Number of characters to write

@throws  IndexOutOfBoundsException
         If the values of the {@code off} and {@code len} parameters
         cause the corresponding method of the underlying {@code Writer}
         to throw an {@code IndexOutOfBoundsException}

## PrintWriter.write(String)

```java
public void write(String s)
```

Writes a string.  This method cannot be inherited from the Writer class
because it must suppress I/O exceptions.
@param s String to be written

## PrintWriter.print(boolean)

```java
public void print(boolean b)
```

Prints a boolean value.  The string produced by {@link
java.lang.String#valueOf(boolean)} is translated into bytes
according to the default charset, and these bytes
are written in exactly the manner of the {@link
#write(int)} method.

@param      b   The {@code boolean} to be printed
@see Charset#defaultCharset()

## PrintWriter.print(char)

```java
public void print(char c)
```

Prints a character.  The character is translated into one or more bytes
according to the default charset, and these bytes
are written in exactly the manner of the {@link
#write(int)} method.

@param      c   The {@code char} to be printed
@see Charset#defaultCharset()

## PrintWriter.print(int)

```java
public void print(int i)
```

Prints an integer.  The string produced by {@link
java.lang.String#valueOf(int)} is translated into bytes according
to the default charset, and these bytes are
written in exactly the manner of the {@link #write(int)}
method.

@param      i   The {@code int} to be printed
@see        java.lang.Integer#toString(int)
@see Charset#defaultCharset()

## PrintWriter.print(long)

```java
public void print(long l)
```

Prints a long integer.  The string produced by {@link
java.lang.String#valueOf(long)} is translated into bytes
according to the default charset, and these bytes
are written in exactly the manner of the {@link #write(int)}
method.

@param      l   The {@code long} to be printed
@see        java.lang.Long#toString(long)
@see Charset#defaultCharset()

## PrintWriter.print(float)

```java
public void print(float f)
```

Prints a floating-point number.  The string produced by {@link
java.lang.String#valueOf(float)} is translated into bytes
according to the default charset, and these bytes
are written in exactly the manner of the {@link #write(int)}
method.

@param      f   The {@code float} to be printed
@see        java.lang.Float#toString(float)
@see Charset#defaultCharset()

## PrintWriter.print(double)

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

## PrintWriter.print(char[])

```java
public void print(char[] s)
```

Prints an array of characters.  The characters are converted into bytes
according to the default charset, and these bytes
are written in exactly the manner of the {@link #write(int)}
method.

@param      s   The array of chars to be printed
@see Charset#defaultCharset()

@throws  NullPointerException  If {@code s} is {@code null}

## PrintWriter.print(String)

```java
public void print(String s)
```

Prints a string.  If the argument is {@code null} then the string
{@code "null"} is printed.  Otherwise, the string's characters are
converted into bytes according to the default charset,
and these bytes are written in exactly the manner of the
{@link #write(int)} method.

@param      s   The {@code String} to be printed
@see Charset#defaultCharset()

## PrintWriter.print(Object)

```java
public void print(Object obj)
```

Prints an object.  The string produced by the {@link
java.lang.String#valueOf(Object)} method is translated into bytes
according to the default charset, and these bytes
are written in exactly the manner of the {@link #write(int)}
method.

@param      obj   The {@code Object} to be printed
@see        java.lang.Object#toString()
@see Charset#defaultCharset()

## PrintWriter.println()

```java
public void println()
```

Terminates the current line by writing the line separator string.  The
line separator is {@link System#lineSeparator()} and is not necessarily
a single newline character ({@code '\n'}).

## PrintWriter.println(boolean)

```java
public void println(boolean x)
```

Prints a boolean value and then terminates the line.  This method behaves
as though it invokes {@link #print(boolean)} and then
{@link #println()}.

@param x the {@code boolean} value to be printed

## PrintWriter.println(char)

```java
public void println(char x)
```

Prints a character and then terminates the line.  This method behaves as
though it invokes {@link #print(char)} and then {@link
#println()}.

@param x the {@code char} value to be printed

## PrintWriter.println(int)

```java
public void println(int x)
```

Prints an integer and then terminates the line.  This method behaves as
though it invokes {@link #print(int)} and then {@link
#println()}.

@param x the {@code int} value to be printed

## PrintWriter.println(long)

```java
public void println(long x)
```

Prints a long integer and then terminates the line.  This method behaves
as though it invokes {@link #print(long)} and then
{@link #println()}.

@param x the {@code long} value to be printed

## PrintWriter.println(float)

```java
public void println(float x)
```

Prints a floating-point number and then terminates the line.  This method
behaves as though it invokes {@link #print(float)} and then
{@link #println()}.

@param x the {@code float} value to be printed

## PrintWriter.println(double)

```java
public void println(double x)
```

Prints a double-precision floating-point number and then terminates the
line.  This method behaves as though it invokes {@link
#print(double)} and then {@link #println()}.

@param x the {@code double} value to be printed

## PrintWriter.println(char[])

```java
public void println(char[] x)
```

Prints an array of characters and then terminates the line.  This method
behaves as though it invokes {@link #print(char[])} and then
{@link #println()}.

@param x the array of {@code char} values to be printed

## PrintWriter.println(String)

```java
public void println(String x)
```

Prints a String and then terminates the line.  This method behaves as
though it invokes {@link #print(String)} and then
{@link #println()}.

@param x the {@code String} value to be printed

## PrintWriter.println(Object)

```java
public void println(Object x)
```

Prints an Object and then terminates the line.  This method calls
at first String.valueOf(x) to get the printed object's string value,
then behaves as
though it invokes {@link #print(String)} and then
{@link #println()}.

@param x  The {@code Object} to be printed.

## PrintWriter.printf(String, Object ...)

```java
public PrintWriter printf(String format, Object ... args)
```

A convenience method to write a formatted string to this writer using
the specified format string and arguments.  If automatic flushing is
enabled, calls to this method will flush the output buffer.

<p> An invocation of this method of the form
{@code out.printf(format, args)}
behaves in exactly the same way as the invocation

{@snippet lang=java :
    out.format(format, args)
}

@param  format
        A format string as described in <a
        href="../util/Formatter.html#syntax">Format string syntax</a>.

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

@return  This writer

@since  1.5

## PrintWriter.printf(Locale, String, Object ...)

```java
public PrintWriter printf(Locale l, String format, Object ... args)
```

A convenience method to write a formatted string to this writer using
the specified format string and arguments.  If automatic flushing is
enabled, calls to this method will flush the output buffer.

<p> An invocation of this method of the form
{@code out.printf(l, format, args)}
behaves in exactly the same way as the invocation

{@snippet lang=java :
    out.format(l, format, args)
}

@param  l
        The {@linkplain java.util.Locale locale} to apply during
        formatting.  If {@code l} is {@code null} then no localization
        is applied.

@param  format
        A format string as described in <a
        href="../util/Formatter.html#syntax">Format string syntax</a>.

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

@return  This writer

@since  1.5

## PrintWriter.format(String, Object ...)

```java
public PrintWriter format(String format, Object ... args)
```

Writes a formatted string to this writer using the specified format
string and arguments.  If automatic flushing is enabled, calls to this
method will flush the output buffer.

<p> The locale always used is the one returned by {@link
java.util.Locale#getDefault() Locale.getDefault()}, regardless of any
previous invocations of other formatting methods on this object.

@param  format
        A format string as described in <a
        href="../util/Formatter.html#syntax">Format string syntax</a>.

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
         Formatter class specification.

@throws  NullPointerException
         If the {@code format} is {@code null}

@return  This writer

@since  1.5

## PrintWriter.format(Locale, String, Object ...)

```java
public PrintWriter format(Locale l, String format, Object ... args)
```

Writes a formatted string to this writer using the specified format
string and arguments.  If automatic flushing is enabled, calls to this
method will flush the output buffer.

@param  l
        The {@linkplain java.util.Locale locale} to apply during
        formatting.  If {@code l} is {@code null} then no localization
        is applied.

@param  format
        A format string as described in <a
        href="../util/Formatter.html#syntax">Format string syntax</a>.

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

@return  This writer

@since  1.5

## PrintWriter.append(CharSequence)

```java
public PrintWriter append(CharSequence csq)
```

Appends the specified character sequence to this writer.

<p> An invocation of this method of the form {@code out.append(csq)}
when {@code csq} is not {@code null}, behaves in exactly the same way
as the invocation

{@snippet lang=java :
    out.write(csq.toString())
}

<p> Depending on the specification of {@code toString} for the
character sequence {@code csq}, the entire sequence may not be
appended. For instance, invoking the {@code toString} method of a
character buffer will return a subsequence whose content depends upon
the buffer's position and limit.

@param  csq
        The character sequence to append.  If {@code csq} is
        {@code null}, then the four characters {@code "null"} are
        appended to this writer.

@return  This writer

@since  1.5

## PrintWriter.append(CharSequence, int, int)

```java
public PrintWriter append(CharSequence csq, int start, int end)
```

Appends a subsequence of the specified character sequence to this writer.

<p> An invocation of this method of the form
{@code out.append(csq, start, end)}
when {@code csq} is not {@code null}, behaves in
exactly the same way as the invocation

{@snippet lang=java :
    out.write(csq.subSequence(start, end).toString())
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

@return  This writer

@throws  IndexOutOfBoundsException
         If {@code start} or {@code end} are negative, {@code start}
         is greater than {@code end}, or {@code end} is greater than
         {@code csq.length()}

@since  1.5

## PrintWriter.append(char)

```java
public PrintWriter append(char c)
```

Appends the specified character to this writer.

<p> An invocation of this method of the form {@code out.append(c)}
behaves in exactly the same way as the invocation

{@snippet lang=java :
    out.write(c)
}

@param  c
        The 16-bit character to append

@return  This writer

@since 1.5