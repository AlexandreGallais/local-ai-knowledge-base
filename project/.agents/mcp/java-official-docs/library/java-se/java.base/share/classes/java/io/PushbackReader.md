---
title: "PushbackReader class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/PushbackReader.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PushbackReader class (java.io)

```java
public class PushbackReader extends FilterReader
```

A character-stream reader that allows characters to be pushed back into the
stream.

**Since:** 1.1

## PushbackReader.PushbackReader(Reader, int)

```java
public PushbackReader(Reader in, int size)
```

Creates a new pushback reader with a pushback buffer of the given size.

Parameters:

- `in`: The reader from which characters will be read
- `size`: The size of the pushback buffer

Throws:

- `IllegalArgumentException`: if `size <= 0`

## PushbackReader.PushbackReader(Reader)

```java
public PushbackReader(Reader in)
```

Creates a new pushback reader with a one-character pushback buffer.

Parameters:

- `in`: The reader from which characters will be read

## PushbackReader.read()

```java
public int read() throws IOException
```

Reads a single character.

**Returns:** The character read, or -1 if the end of the stream has been
            reached

Throws:

- `IOException`: If an I/O error occurs

## PushbackReader.read(char[], int, int)

```java
public int read(char[] cbuf, int off, int len) throws IOException
```

(inherited documentation)

## PushbackReader.unread(int)

```java
public void unread(int c) throws IOException
```

Pushes back a single character by copying it to the front of the
pushback buffer. After this method returns, the next character to be read
will have the value `(char)c`.

Parameters:

- `c`: The int value representing a character to be pushed back

Throws:

- `IOException`: If the pushback buffer is full, or if some other I/O error occurs

## PushbackReader.unread(char[], int, int)

```java
public void unread(char[] cbuf, int off, int len) throws IOException
```

Pushes back a portion of an array of characters by copying it to the
front of the pushback buffer.  After this method returns, the next
character to be read will have the value `cbuf[off]`, the
character after that will have the value `cbuf[off+1]`, and
so forth.

Parameters:

- `cbuf`: Character array
- `off`: Offset of first character to push back
- `len`: Number of characters to push back

Throws:

- `IOException`: If there is insufficient room in the pushback buffer, or if some other I/O error occurs

## PushbackReader.unread(char[])

```java
public void unread(char[] cbuf) throws IOException
```

Pushes back an array of characters by copying it to the front of the
pushback buffer.  After this method returns, the next character to be
read will have the value `cbuf[0]`, the character after that
will have the value `cbuf[1]`, and so forth.

Parameters:

- `cbuf`: Character array to push back

Throws:

- `IOException`: If there is insufficient room in the pushback buffer, or if some other I/O error occurs

## PushbackReader.ready()

```java
public boolean ready() throws IOException
```

Tells whether this stream is ready to be read.

Throws:

- `IOException`: If an I/O error occurs

## PushbackReader.mark(int)

```java
public void mark(int readAheadLimit) throws IOException
```

Marks the present position in the stream. The `mark`
for class `PushbackReader` always throws an exception.

Throws:

- `IOException`: Always, since mark is not supported

## PushbackReader.reset()

```java
public void reset() throws IOException
```

Resets the stream. The `reset` method of
`PushbackReader` always throws an exception.

Throws:

- `IOException`: Always, since reset is not supported

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

Throws:

- `IOException`: If an I/O error occurs

## PushbackReader.skip(long)

```java
public long skip(long n) throws IOException
```

(inherited documentation)
