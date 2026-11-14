# CharArrayWriter class (java.io)

```java
public class CharArrayWriter extends Writer
```

This class implements a character buffer that can be used as a Writer.
The buffer automatically grows when data is written to the stream.  The data
can be retrieved using toCharArray() and toString().
<P>
Note: Invoking close() on this class has no effect, and methods
of this class can be called after the stream has closed
without generating an IOException.

@author      Herb Jellinek
@since       1.1

## CharArrayWriter.buf

```java
protected char[] buf
```

The buffer where data is stored.

## CharArrayWriter.count

```java
protected int count
```

The number of chars in the buffer.

## CharArrayWriter.CharArrayWriter()

```java
public CharArrayWriter()
```

Creates a new CharArrayWriter.

## CharArrayWriter.CharArrayWriter(int)

```java
public CharArrayWriter(int initialSize)
```

Creates a new CharArrayWriter with the specified initial size.

@param  initialSize  an int specifying the initial buffer size.
@throws IllegalArgumentException if initialSize is negative

## CharArrayWriter.write(int)

```java
public void write(int c)
```

Writes a character to the buffer.

## CharArrayWriter.write(char[], int, int)

```java
public void write(char[] c, int off, int len)
```

Writes characters to the buffer.
@param c the data to be written
@param off       the start offset in the data
@param len       the number of chars that are written

@throws  IndexOutOfBoundsException
         If {@code off} is negative, or {@code len} is negative,
         or {@code off + len} is negative or greater than the length
         of the given array

## CharArrayWriter.write(String, int, int)

```java
public void write(String str, int off, int len)
```

Write a portion of a string to the buffer.
@param  str  String to be written from
@param  off  Offset from which to start reading characters
@param  len  Number of characters to be written

@throws  IndexOutOfBoundsException
         If {@code off} is negative, or {@code len} is negative,
         or {@code off + len} is negative or greater than the length
         of the given string

## CharArrayWriter.writeTo(Writer)

```java
public void writeTo(Writer out) throws IOException
```

Writes the contents of the buffer to another character stream.

@param out       the output stream to write to
@throws IOException If an I/O error occurs.

## CharArrayWriter.append(CharSequence)

```java
public CharArrayWriter append(CharSequence csq)
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

## CharArrayWriter.append(CharSequence, int, int)

```java
public CharArrayWriter append(CharSequence csq, int start, int end)
```

Appends a subsequence of the specified character sequence to this writer.

<p> An invocation of this method of the form
{@code out.append(csq, start, end)} when
{@code csq} is not {@code null}, behaves in
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

## CharArrayWriter.append(char)

```java
public CharArrayWriter append(char c)
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

## CharArrayWriter.reset()

```java
public void reset()
```

Resets the buffer so that you can use it again without
throwing away the already allocated buffer.

## CharArrayWriter.toCharArray()

```java
public char[] toCharArray()
```

Returns a copy of the input data.

@return an array of chars copied from the input data.

## CharArrayWriter.size()

```java
public int size()
```

Returns the current size of the buffer.

@return an int representing the current size of the buffer.

## CharArrayWriter.toString()

```java
public String toString()
```

Converts input data to a string.
@return the string.

## CharArrayWriter.flush()

```java
public void flush()
```

Flush the stream.

<p> The {@code flush} method of {@code CharArrayWriter} does nothing.

## CharArrayWriter.close()

```java
public void close()
```

Close the stream.  This method does not release the buffer, since its
contents might still be required. Note: Invoking this method in this class
will have no effect.