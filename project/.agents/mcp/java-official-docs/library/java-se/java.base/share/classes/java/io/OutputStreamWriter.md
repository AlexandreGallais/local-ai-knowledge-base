# OutputStreamWriter class (java.io)

```java
public class OutputStreamWriter extends Writer
```

An OutputStreamWriter is a bridge from character streams to byte streams:
Characters written to it are encoded into bytes using a specified {@link
Charset charset}.  The charset that it uses
may be specified by name or may be given explicitly, or the
default charset may be accepted.

<p> Each invocation of a write() method causes the encoding converter to be
invoked on the given character(s).  The resulting bytes are accumulated in a
buffer before being written to the underlying output stream.  Note that the
characters passed to the write() methods are not buffered.

<p> For top efficiency, consider wrapping an OutputStreamWriter within a
BufferedWriter so as to avoid frequent converter invocations.  For example:

{@snippet lang=java :
    Writer out = new BufferedWriter(new OutputStreamWriter(anOutputStream));
}

<p> A <i>surrogate pair</i> is a character represented by a sequence of two
{@code char} values: A <i>high</i> surrogate in the range '&#92;uD800' to
'&#92;uDBFF' followed by a <i>low</i> surrogate in the range '&#92;uDC00' to
'&#92;uDFFF'.

<p> A <i>malformed surrogate element</i> is a high surrogate that is not
followed by a low surrogate or a low surrogate that is not preceded by a
high surrogate.

<p> This class always replaces malformed surrogate elements and unmappable
character sequences with the charset's default <i>substitution sequence</i>.
The {@linkplain CharsetEncoder} class should be used when more
control over the encoding process is required.

@see BufferedWriter
@see OutputStream
@see Charset

@author      Mark Reinhold
@since       1.1

## OutputStreamWriter.OutputStreamWriter(OutputStream, String)

```java
public OutputStreamWriter(OutputStream out, String charsetName) throws UnsupportedEncodingException
```

Creates an OutputStreamWriter that uses the named charset.

@param  out
        An OutputStream

@param  charsetName
        The name of a supported {@link Charset charset}

@throws     UnsupportedEncodingException
            If the named encoding is not supported

## OutputStreamWriter.OutputStreamWriter(OutputStream)

```java
public OutputStreamWriter(OutputStream out)
```

Creates an OutputStreamWriter that uses the default character encoding, or
where {@code out} is a {@code PrintStream}, the charset used by the print
stream.

@param  out  An OutputStream
@see Charset#defaultCharset()

## OutputStreamWriter.OutputStreamWriter(OutputStream, Charset)

```java
public OutputStreamWriter(OutputStream out, Charset cs)
```

Creates an OutputStreamWriter that uses the given charset.

@param  out
        An OutputStream

@param  cs
        A charset

@since 1.4

## OutputStreamWriter.OutputStreamWriter(OutputStream, CharsetEncoder)

```java
public OutputStreamWriter(OutputStream out, CharsetEncoder enc)
```

Creates an OutputStreamWriter that uses the given charset encoder.

@param  out
        An OutputStream

@param  enc
        A charset encoder

@since 1.4

## OutputStreamWriter.getEncoding()

```java
public String getEncoding()
```

Returns the name of the character encoding being used by this stream.

<p> If the encoding has an historical name then that name is returned;
otherwise the encoding's canonical name is returned.

<p> If this instance was created with the {@link
#OutputStreamWriter(OutputStream, String)} constructor then the returned
name, being unique for the encoding, may differ from the name passed to
the constructor.  This method may return {@code null} if the stream has
been closed. </p>

@return The historical name of this encoding, or possibly
        {@code null} if the stream has been closed

@see Charset

## OutputStreamWriter.write(int)

```java
public void write(int c) throws IOException
```

Writes a single character.

@throws     IOException  If an I/O error occurs

## OutputStreamWriter.write(char[], int, int)

```java
public void write(char[] cbuf, int off, int len) throws IOException
```

Writes a portion of an array of characters.

@param  cbuf  Buffer of characters
@param  off   Offset from which to start writing characters
@param  len   Number of characters to write

@throws  IndexOutOfBoundsException
         If {@code off} is negative, or {@code len} is negative,
         or {@code off + len} is negative or greater than the length
         of the given array

@throws  IOException  If an I/O error occurs

## OutputStreamWriter.write(String, int, int)

```java
public void write(String str, int off, int len) throws IOException
```

Writes a portion of a string.

@param  str  A String
@param  off  Offset from which to start writing characters
@param  len  Number of characters to write

@throws  IndexOutOfBoundsException
         If {@code off} is negative, or {@code len} is negative,
         or {@code off + len} is negative or greater than the length
         of the given string

@throws  IOException  If an I/O error occurs

## OutputStreamWriter.flush()

```java
public void flush() throws IOException
```

Flushes the stream.

@throws     IOException  If an I/O error occurs