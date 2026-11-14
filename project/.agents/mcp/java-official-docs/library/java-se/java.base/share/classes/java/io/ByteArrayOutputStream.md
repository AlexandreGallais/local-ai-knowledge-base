# ByteArrayOutputStream class (java.io)

```java
public class ByteArrayOutputStream extends OutputStream
```

This class implements an output stream in which the data is
written into a byte array. The buffer automatically grows as data
is written to it.
The data can be retrieved using {@code toByteArray()} and
{@code toString()}.
<p>
Closing a {@code ByteArrayOutputStream} has no effect. The methods in
this class can be called after the stream has been closed without
generating an {@code IOException}.

@author  Arthur van Hoff
@since   1.0

## ByteArrayOutputStream.buf

```java
protected byte[] buf
```

The buffer where data is stored.

## ByteArrayOutputStream.count

```java
protected int count
```

The number of valid bytes in the buffer.

## ByteArrayOutputStream.ByteArrayOutputStream()

```java
public ByteArrayOutputStream()
```

Creates a new {@code ByteArrayOutputStream}. The buffer capacity is
initially 32 bytes, though its size increases if necessary.

## ByteArrayOutputStream.ByteArrayOutputStream(int)

```java
public ByteArrayOutputStream(int size)
```

Creates a new {@code ByteArrayOutputStream}, with a buffer capacity of
the specified size, in bytes.

@param  size   the initial size.
@throws IllegalArgumentException if size is negative.

## ByteArrayOutputStream.write(int)

```java
public synchronized void write(int b)
```

Writes the specified byte to this {@code ByteArrayOutputStream}.

@param   b   the byte to be written.

## ByteArrayOutputStream.write(byte[], int, int)

```java
public synchronized void write(byte[] b, int off, int len)
```

Writes {@code len} bytes from the specified byte array
starting at offset {@code off} to this {@code ByteArrayOutputStream}.

@param   b     {@inheritDoc}
@param   off   {@inheritDoc}
@param   len   {@inheritDoc}
@throws  NullPointerException if {@code b} is {@code null}.
@throws  IndexOutOfBoundsException if {@code off} is negative,
{@code len} is negative, or {@code len} is greater than
{@code b.length - off}

## ByteArrayOutputStream.writeBytes(byte[])

```java
public void writeBytes(byte[] b)
```

Writes the complete contents of the specified byte array
to this {@code ByteArrayOutputStream}.

@apiNote
This method is equivalent to {@link #write(byte[],int,int)
write(b, 0, b.length)}.

@param   b     the data.
@throws  NullPointerException if {@code b} is {@code null}.
@since   11

## ByteArrayOutputStream.writeTo(OutputStream)

```java
public synchronized void writeTo(OutputStream out) throws IOException
```

Writes the complete contents of this {@code ByteArrayOutputStream} to
the specified output stream argument, as if by calling the output
stream's write method using {@code out.write(buf, 0, count)}.

@param   out   the output stream to which to write the data.
@throws  NullPointerException if {@code out} is {@code null}.
@throws  IOException if an I/O error occurs.

## ByteArrayOutputStream.reset()

```java
public synchronized void reset()
```

Resets the {@code count} field of this {@code ByteArrayOutputStream}
to zero, so that all currently accumulated output in the
output stream is discarded. The output stream can be used again,
reusing the already allocated buffer space.

@see     java.io.ByteArrayInputStream#count

## ByteArrayOutputStream.toByteArray()

```java
public synchronized byte[] toByteArray()
```

Creates a newly allocated byte array. Its size is the current
size of this output stream and the valid contents of the buffer
have been copied into it.

@return  the current contents of this output stream, as a byte array.
@see     java.io.ByteArrayOutputStream#size()

## ByteArrayOutputStream.size()

```java
public synchronized int size()
```

Returns the current size of the buffer.

@return  the value of the {@code count} field, which is the number
         of valid bytes in this output stream.
@see     java.io.ByteArrayOutputStream#count

## ByteArrayOutputStream.toString()

```java
public synchronized String toString()
```

Converts the buffer's contents into a string decoding bytes using the
default charset. The length of the new {@code String}
is a function of the charset, and hence may not be equal to the
size of the buffer.

<p> This method always replaces malformed-input and unmappable-character
sequences with the default replacement string for the
default charset. The {@linkplain java.nio.charset.CharsetDecoder}
class should be used when more control over the decoding process is
required.

@see Charset#defaultCharset()
@return String decoded from the buffer's contents.
@since  1.1

## ByteArrayOutputStream.toString(String)

```java
public synchronized String toString(String charsetName) throws UnsupportedEncodingException
```

Converts the buffer's contents into a string by decoding the bytes using
the named {@link Charset charset}.

<p> This method is equivalent to {@code #toString(charset)} that takes a
{@link Charset charset}.

<p> An invocation of this method of the form

{@snippet lang=java :
    ByteArrayOutputStream b;
    b.toString("UTF-8")
}

behaves in exactly the same way as the expression

{@snippet lang=java :
    ByteArrayOutputStream b;
    b.toString(StandardCharsets.UTF_8)
}


@param  charsetName  the name of a supported
        {@link Charset charset}
@return String decoded from the buffer's contents.
@throws UnsupportedEncodingException
        If the named charset is not supported
@since  1.1

## ByteArrayOutputStream.toString(Charset)

```java
public synchronized String toString(Charset charset)
```

Converts the buffer's contents into a string by decoding the bytes using
the specified {@link Charset charset}. The length of the new
{@code String} is a function of the charset, and hence may not be equal
to the length of the byte array.

<p> This method always replaces malformed-input and unmappable-character
sequences with the charset's default replacement string. The {@link
java.nio.charset.CharsetDecoder} class should be used when more control
over the decoding process is required.

@param      charset  the {@linkplain Charset charset}
            to be used to decode the {@code bytes}
@return     String decoded from the buffer's contents.
@since      10

## ByteArrayOutputStream.toString(int)

```java
public synchronized String toString(int hibyte)
```

Creates a newly allocated string. Its size is the current size of
the output stream and the valid contents of the buffer have been
copied into it. Each character <i>c</i> in the resulting string is
constructed from the corresponding element <i>b</i> in the byte
array such that:
{@snippet lang=java :
    c == (char)(((hibyte & 0xff) << 8) | (b & 0xff))
}

@deprecated This method does not properly convert bytes into characters.
As of JDK&nbsp;1.1, the preferred way to do this is via the
{@link #toString(String charsetName)} or {@link #toString(Charset charset)}
method, which takes an encoding-name or charset argument,
or the {@code toString()} method, which uses the default charset.

@param      hibyte    the high byte of each resulting Unicode character.
@return     the current contents of the output stream, as a string.
@see        java.io.ByteArrayOutputStream#size()
@see        java.io.ByteArrayOutputStream#toString(String)
@see        java.io.ByteArrayOutputStream#toString()
@see        Charset#defaultCharset()

## ByteArrayOutputStream.close()

```java
public void close() throws IOException
```

Closing a {@code ByteArrayOutputStream} has no effect. The methods in
this class can be called after the stream has been closed without
generating an {@code IOException}.