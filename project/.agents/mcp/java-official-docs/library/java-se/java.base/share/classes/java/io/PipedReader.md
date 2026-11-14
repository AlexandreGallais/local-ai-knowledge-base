---
title: "PipedReader class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/PipedReader.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PipedReader class (java.io)

```java
public class PipedReader extends Reader
```

Piped character-input streams.

**Since:** 1.1

## PipedReader.PipedReader(PipedWriter)

```java
public PipedReader(PipedWriter src) throws IOException
```

Creates a `PipedReader` so
that it is connected to the piped writer
`src`. Data written to `src`
will then be available as input from this stream.

Parameters:

- `src`: the stream to connect to.

Throws:

- `IOException`: if an I/O error occurs.

## PipedReader.PipedReader(PipedWriter, int)

```java
public PipedReader(PipedWriter src, int pipeSize) throws IOException
```

Creates a `PipedReader` so that it is connected
to the piped writer `src` and uses the specified
pipe size for the pipe's buffer. Data written to `src`
will then be  available as input from this stream.

Parameters:

- `src`: the stream to connect to.
- `pipeSize`: the size of the pipe's buffer.

**Since:** 1.6

Throws:

- `IOException`: if an I/O error occurs.
- `IllegalArgumentException`: if `pipeSize <= 0`.

## PipedReader.PipedReader()

```java
public PipedReader()
```

Creates a `PipedReader` so
that it is not yet connected. It must be java.io.PipedReader) connected to a `PipedWriter`
before being used.

## PipedReader.PipedReader(int)

```java
public PipedReader(int pipeSize)
```

Creates a `PipedReader` so that it is not yet
connected and uses
the specified pipe size for the pipe's buffer.
It must be  java.io.PipedReader) connected to a `PipedWriter`
before being used.

Parameters:

- `pipeSize`: the size of the pipe's buffer.

**Since:** 1.6

Throws:

- `IllegalArgumentException`: if `pipeSize <= 0`.

## PipedReader.connect(PipedWriter)

```java
public void connect(PipedWriter src) throws IOException
```

Causes this piped reader to be connected
to the piped  writer `src`.
If this object is already connected to some
other piped writer, an `IOException`
is thrown.

If `src` is an
unconnected piped writer and `snk`
is an unconnected piped reader, they
may be connected by either the call:

or the call:

The two calls have the same effect.

Parameters:

- `src`: The piped writer to connect to.

Throws:

- `IOException`: if an I/O error occurs.

## PipedReader.read()

```java
public synchronized int read() throws IOException
```

Reads the next character of data from this piped stream.
If no character is available because the end of the stream
has been reached, the value `-1` is returned.
This method blocks until input data is available, the end of
the stream is detected, or an exception is thrown.

**Returns:** the next character of data, or `-1` if the end of the
         stream is reached.

Throws:

- `IOException`: if the pipe is  `broken`, unconnected, closed, or an I/O error occurs.

## PipedReader.read(char[], int, int)

```java
public synchronized int read(char[] cbuf, int off, int len) throws IOException
```

(inherited documentation)

 Fewer than `len` characters will be read if
`len` exceeds the pipe's buffer size.

Parameters:

- `cbuf`: (inherited documentation)
- `off`: (inherited documentation)
- `len`: (inherited documentation)

**Returns:** (inherited documentation)

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)
- `IOException`: if the pipe is  `broken`, unconnected, closed, or an I/O error occurs.

## PipedReader.ready()

```java
public synchronized boolean ready() throws IOException
```

Tell whether this stream is ready to be read.  A piped character
stream is ready if the circular buffer is not empty.

Throws:

- `IOException`: if the pipe is  `broken`, unconnected, or closed.

## PipedReader.close()

```java
public void close() throws IOException
```

Closes this piped stream and releases any system resources
associated with the stream.

Throws:

- `IOException`: if an I/O error occurs.
