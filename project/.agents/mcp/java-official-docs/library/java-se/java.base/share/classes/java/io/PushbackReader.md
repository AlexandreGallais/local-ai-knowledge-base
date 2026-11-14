# PushbackReader class (java.io)

```java
public class PushbackReader extends FilterReader
```

A character-stream reader that allows characters to be pushed back into the
stream.

@author      Mark Reinhold
@since       1.1

## PushbackReader.PushbackReader(Reader, int)

```java
public PushbackReader(Reader in, int size)
```

Creates a new pushback reader with a pushback buffer of the given size.

@param   in   The reader from which characters will be read
@param   size The size of the pushback buffer
@throws  IllegalArgumentException if {@code size <= 0}

## PushbackReader.PushbackReader(Reader)

```java
public PushbackReader(Reader in)
```

Creates a new pushback reader with a one-character pushback buffer.

@param   in  The reader from which characters will be read

## PushbackReader.read()

```java
public int read() throws IOException
```

Reads a single character.

@return     The character read, or -1 if the end of the stream has been
            reached

@throws     IOException  If an I/O error occurs

## PushbackReader.read(char[], int, int)

```java
public int read(char[] cbuf, int off, int len) throws IOException
```

{@inheritDoc}

## PushbackReader.unread(int)

```java
public void unread(int c) throws IOException
```

Pushes back a single character by copying it to the front of the
pushback buffer. After this method returns, the next character to be read
will have the value {@code (char)c}.

@param  c  The int value representing a character to be pushed back

@throws IOException  If the pushback buffer is full,
                     or if some other I/O error occurs

## PushbackReader.unread(char[], int, int)

```java
public void unread(char[] cbuf, int off, int len) throws IOException
```

Pushes back a portion of an array of characters by copying it to the
front of the pushback buffer.  After this method returns, the next
character to be read will have the value {@code cbuf[off]}, the
character after that will have the value {@code cbuf[off+1]}, and
so forth.

@param      cbuf  Character array
@param      off   Offset of first character to push back
@param      len   Number of characters to push back

@throws     IOException  If there is insufficient room in the pushback
                         buffer, or if some other I/O error occurs

## PushbackReader.unread(char[])

```java
public void unread(char[] cbuf) throws IOException
```

Pushes back an array of characters by copying it to the front of the
pushback buffer.  After this method returns, the next character to be
read will have the value {@code cbuf[0]}, the character after that
will have the value {@code cbuf[1]}, and so forth.

@param      cbuf  Character array to push back

@throws     IOException  If there is insufficient room in the pushback
                         buffer, or if some other I/O error occurs

## PushbackReader.ready()

```java
public boolean ready() throws IOException
```

Tells whether this stream is ready to be read.

@throws     IOException  If an I/O error occurs

## PushbackReader.mark(int)

```java
public void mark(int readAheadLimit) throws IOException
```

Marks the present position in the stream. The {@code mark}
for class {@code PushbackReader} always throws an exception.

@throws     IOException  Always, since mark is not supported

## PushbackReader.reset()

```java
public void reset() throws IOException
```

Resets the stream. The {@code reset} method of
{@code PushbackReader} always throws an exception.

@throws     IOException  Always, since reset is not supported

## PushbackReader.markSupported()

```java
public boolean markSupported()
```

Tells whether this stream supports the mark() operation, which it does
not.

## PushbackReader.close()

```java
public void close() throws IOException
```

Closes the stream and releases any system resources associated with
it. Once the stream has been closed, further read(),
unread(), ready(), or skip() invocations will throw an IOException.
Closing a previously closed stream has no effect. This method will block
while there is another thread blocking on the reader.

@throws     IOException  If an I/O error occurs

## PushbackReader.skip(long)

```java
public long skip(long n) throws IOException
```

{@inheritDoc}