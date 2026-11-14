# Writer class (java.io)

```java
public abstract class Writer implements Appendable, Closeable, Flushable
```

Abstract class for writing to character streams.  The only methods that a
subclass must implement are write(char[], int, int), flush(), and close().
Most subclasses, however, will override some of the methods defined here in
order to provide higher efficiency, additional functionality, or both.

@see   BufferedWriter
@see   CharArrayWriter
@see   FilterWriter
@see   OutputStreamWriter
@see   FileWriter
@see   PipedWriter
@see   PrintWriter
@see   StringWriter
@see Reader

@author      Mark Reinhold
@since       1.1

## Writer.nullWriter()

```java
public static Writer nullWriter()
```

Returns a new {@code Writer} which discards all characters.  The
returned stream is initially open.  The stream is closed by calling
the {@code close()} method.  Subsequent calls to {@code close()} have
no effect.

<p> While the stream is open, the {@code append(char)}, {@code
append(CharSequence)}, {@code append(CharSequence, int, int)},
{@code flush()}, {@code write(int)}, {@code write(char[])}, and
{@code write(char[], int, int)} methods do nothing. After the stream
has been closed, these methods all throw {@code IOException}.

<p> The {@link #lock object} used to synchronize operations on the
returned {@code Writer} is not specified.

@return a {@code Writer} which discards all characters

@since 11

## Writer.lock

```java
protected Object lock
```

The object used to synchronize operations on this stream.  For
efficiency, a character-stream object may use an object other than
itself to protect critical sections.  A subclass should therefore use
the object in this field rather than {@code this} or a synchronized
method.

## Writer.Writer()

```java
protected Writer()
```

Creates a new character-stream writer whose critical sections will
synchronize on the writer itself.

## Writer.Writer(Object)

```java
protected Writer(Object lock)
```

Creates a new character-stream writer whose critical sections will
synchronize on the given object.

@param  lock
        Object to synchronize on

## Writer.write(int)

```java
public void write(int c) throws IOException
```

Writes a single character.  The character to be written is contained in
the 16 low-order bits of the given integer value; the 16 high-order bits
are ignored.

<p> Subclasses that intend to support efficient single-character output
should override this method.

@param  c
        int specifying a character to be written

@throws  IOException
         If an I/O error occurs

## Writer.write(char[])

```java
public void write(char[] cbuf) throws IOException
```

Writes an array of characters.

@param  cbuf
        Array of characters to be written

@throws  IOException
         If an I/O error occurs

## Writer.write(char[], int, int)

```java
public abstract void write(char[] cbuf, int off, int len) throws IOException
```

Writes a portion of an array of characters.

@param  cbuf
        Array of characters

@param  off
        Offset from which to start writing characters

@param  len
        Number of characters to write

@throws  IndexOutOfBoundsException
         Implementations should throw this exception
         if {@code off} is negative, or {@code len} is negative,
         or {@code off + len} is negative or greater than the length
         of the given array

@throws  IOException
         If an I/O error occurs

## Writer.write(String)

```java
public void write(String str) throws IOException
```

Writes a string.

@param  str
        String to be written

@throws  IOException
         If an I/O error occurs

## Writer.write(String, int, int)

```java
public void write(String str, int off, int len) throws IOException
```

Writes a portion of a string.

@implSpec
The implementation in this class throws an
{@code IndexOutOfBoundsException} for the indicated conditions;
overriding methods may choose to do otherwise.

@param  str
        A String

@param  off
        Offset from which to start writing characters

@param  len
        Number of characters to write

@throws  IndexOutOfBoundsException
         Implementations should throw this exception
         if {@code off} is negative, or {@code len} is negative,
         or {@code off + len} is negative or greater than the length
         of the given string

@throws  IOException
         If an I/O error occurs

## Writer.append(CharSequence)

```java
public Writer append(CharSequence csq) throws IOException
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

@throws  IOException
         If an I/O error occurs

@since  1.5

## Writer.append(CharSequence, int, int)

```java
public Writer append(CharSequence csq, int start, int end) throws IOException
```

Appends a subsequence of the specified character sequence to this writer.

<p> An invocation of this method of the form
{@code out.append(csq, start, end)} when {@code csq}
is not {@code null} behaves in exactly the
same way as the invocation

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

@throws  IOException
         If an I/O error occurs

@since  1.5

## Writer.append(char)

```java
public Writer append(char c) throws IOException
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

@throws  IOException
         If an I/O error occurs

@since 1.5

## Writer.flush()

```java
public abstract void flush() throws IOException
```

Flushes the stream.  If the stream has saved any characters from the
various write() methods in a buffer, write them immediately to their
intended destination.  Then, if that destination is another character or
byte stream, flush it.  Thus one flush() invocation will flush all the
buffers in a chain of Writers and OutputStreams.

<p> If the intended destination of this stream is an abstraction provided
by the underlying operating system, for example a file, then flushing the
stream guarantees only that bytes previously written to the stream are
passed to the operating system for writing; it does not guarantee that
they are actually written to a physical device such as a disk drive.

@throws  IOException
         If an I/O error occurs

## Writer.close()

```java
public abstract void close() throws IOException
```

Closes the stream, flushing it first. Once the stream has been closed,
further write() or flush() invocations will cause an IOException to be
thrown. Closing a previously closed stream has no effect.

@throws  IOException
         If an I/O error occurs