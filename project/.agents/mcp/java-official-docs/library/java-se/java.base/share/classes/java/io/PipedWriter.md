---
title: "PipedWriter class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/PipedWriter.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PipedWriter class (java.io)

```java
public class PipedWriter extends Writer
```

Piped character-output streams.

**Since:** 1.1

## PipedWriter.PipedWriter(PipedReader)

```java
public PipedWriter(PipedReader snk) throws IOException
```

Creates a piped writer connected to the specified piped
reader. Data characters written to this stream will then be
available as input from `snk`.

Parameters:

- `snk`: The piped reader to connect to.

Throws:

- `IOException`: if an I/O error occurs.

## PipedWriter.PipedWriter()

```java
public PipedWriter()
```

Creates a piped writer that is not yet connected to a
piped reader. It must be connected to a piped reader,
either by the receiver or the sender, before being used.

**See also:** java.io.PipedReader#connect(java.io.PipedWriter)

**See also:** java.io.PipedWriter#connect(java.io.PipedReader)

## PipedWriter.connect(PipedReader)

```java
public synchronized void connect(PipedReader snk) throws IOException
```

Connects this piped writer to a receiver. If this object
is already connected to some other piped reader, an
`IOException` is thrown.

If `snk` is an unconnected piped reader and
`src` is an unconnected piped writer, they may
be connected by either the call:

or the call:

The two calls have the same effect.

Parameters:

- `snk`: the piped reader to connect to.

Throws:

- `IOException`: if an I/O error occurs.

## PipedWriter.write(int)

```java
public void write(int c) throws IOException
```

Writes the specified `char` to the piped output stream.
If a thread was reading data characters from the connected piped input
stream, but the thread is no longer alive, then an
`IOException` is thrown.

Implements the `write` method of `Writer`.

Parameters:

- `c`: the `char` to be written.

Throws:

- `IOException`: if the pipe is  `broken`, unconnected, closed or an I/O error occurs.

## PipedWriter.write(char[], int, int)

```java
public void write(char[] cbuf, int off, int len) throws IOException
```

Writes `len` characters from the specified character array
starting at offset `off` to this piped output stream.
This method blocks until all the characters are written to the output
stream.
If a thread was reading data characters from the connected piped input
stream, but the thread is no longer alive, then an
`IOException` is thrown.

Parameters:

- `cbuf`: the data.
- `off`: the start offset in the data.
- `len`: the number of characters to write.

Throws:

- `IndexOutOfBoundsException`: If `off` is negative, or `len` is negative, or `off + len` is negative or greater than the length of the given array
- `IOException`: if the pipe is `broken`, unconnected, closed or an I/O error occurs.

## PipedWriter.flush()

```java
public synchronized void flush() throws IOException
```

Flushes this output stream and forces any buffered output characters
to be written out.
This will notify any readers that characters are waiting in the pipe.

Throws:

- `IOException`: if the pipe is closed, or an I/O error occurs.

## PipedWriter.close()

```java
public void close() throws IOException
```

Closes this piped output stream and releases any system resources
associated with this stream. This stream may no longer be used for
writing characters.

Throws:

- `IOException`: if an I/O error occurs.
