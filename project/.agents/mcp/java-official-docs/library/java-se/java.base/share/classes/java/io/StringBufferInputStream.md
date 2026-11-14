# StringBufferInputStream class (java.io)

```java
public class StringBufferInputStream extends InputStream
```

This class allows an application to create an input stream in
which the bytes read are supplied by the contents of a string.
Applications can also read bytes from a byte array by using a
{@code ByteArrayInputStream}.
<p>
Only the low eight bits of each character in the string are used by
this class.

@author     Arthur van Hoff
@see        java.io.ByteArrayInputStream
@see        java.io.StringReader
@since      1.0
@deprecated This class does not properly convert characters into bytes.  As
            of JDK&nbsp;1.1, the preferred way to create a stream from a
            string is via the {@code StringReader} class.

## StringBufferInputStream.buffer

```java
protected String buffer
```

The string from which bytes are read.

## StringBufferInputStream.pos

```java
protected int pos
```

The index of the next character to read from the input stream buffer.

@see        java.io.StringBufferInputStream#buffer

## StringBufferInputStream.count

```java
protected int count
```

The number of valid characters in the input stream buffer.

@see        java.io.StringBufferInputStream#buffer

## StringBufferInputStream.StringBufferInputStream(String)

```java
public StringBufferInputStream(String s)
```

Creates a string input stream to read data from the specified string.

@param      s   the underlying input buffer.

## StringBufferInputStream.read()

```java
public synchronized int read()
```

Reads the next byte of data from this input stream. The value
byte is returned as an {@code int} in the range
{@code 0} to {@code 255}. If no byte is available
because the end of the stream has been reached, the value
{@code -1} is returned.

@implSpec
The {@code read} method of
{@code StringBufferInputStream} cannot block. It returns the
low eight bits of the next character in this input stream's buffer.

@return     {@inheritDoc}

## StringBufferInputStream.read(byte[], int, int)

```java
public synchronized int read(byte[] b, int off, int len)
```

Reads up to {@code len} bytes of data from this input stream
into an array of bytes.
@implSpec
The {@code read} method of
{@code StringBufferInputStream} cannot block. It copies the
low eight bits from the characters in this input stream's buffer into
the byte array argument.

@param      b     {@inheritDoc}
@param      off   {@inheritDoc}
@param      len   {@inheritDoc}
@return     {@inheritDoc}

## StringBufferInputStream.skip(long)

```java
public synchronized long skip(long n)
```

Skips {@code n} bytes of input from this input stream. Fewer
bytes might be skipped if the end of the input stream is reached.

@param      n   {@inheritDoc}
@return     the actual number of bytes skipped.

## StringBufferInputStream.available()

```java
public synchronized int available()
```

Returns the number of bytes that can be read from the input
stream without blocking.

@return     the value of {@code count - pos}, which is the
            number of bytes remaining to be read from the input buffer.

## StringBufferInputStream.reset()

```java
public synchronized void reset()
```

Resets the input stream to begin reading from the first character
of this input stream's underlying buffer.