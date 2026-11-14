---
title: "PipedOutputStream class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/PipedOutputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PipedOutputStream class (java.io)

```java
public class PipedOutputStream extends OutputStream
```

A piped output stream can be connected to a piped input stream
to create a communications pipe. The piped output stream is the
sending end of the pipe. Typically, data is written to a
`PipedOutputStream` object by one thread and data is
read from the connected `PipedInputStream` by some
other thread. Attempting to use both objects from a single thread
is not recommended as it may deadlock the thread.
The pipe is said to be  *broken*  if a
thread that was reading data bytes from the connected piped input
stream is no longer alive.

**See also:** java.io.PipedInputStream

**Since:** 1.0

## PipedOutputStream.PipedOutputStream(PipedInputStream)

```java
public PipedOutputStream(PipedInputStream snk) throws IOException
```

Creates a piped output stream connected to the specified piped
input stream. Data bytes written to this stream will then be
available as input from `snk`.

Parameters:

- `snk`: The piped input stream to connect to.

Throws:

- `IOException`: if an I/O error occurs.

## PipedOutputStream.PipedOutputStream()

```java
public PipedOutputStream()
```

Creates a piped output stream that is not yet connected to a
piped input stream. It must be connected to a piped input stream,
either by the receiver or the sender, before being used.

**See also:** java.io.PipedInputStream#connect(java.io.PipedOutputStream)

**See also:** java.io.PipedOutputStream#connect(java.io.PipedInputStream)

## PipedOutputStream.connect(PipedInputStream)

```java
public synchronized void connect(PipedInputStream snk) throws IOException
```

Connects this piped output stream to a receiver. If this object
is already connected to some other piped input stream, an
`IOException` is thrown.

If `snk` is an unconnected piped input stream and
`src` is an unconnected piped output stream, they may
be connected by either the call:

or the call:

The two calls have the same effect.

Parameters:

- `snk`: the piped input stream to connect to.

Throws:

- `IOException`: if an I/O error occurs.

## PipedOutputStream.write(int)

```java
public void write(int b) throws IOException
```

Writes the specified `byte` to the piped output stream.

Implements the `write` method of `OutputStream`.

Parameters:

- `b`: the `byte` to be written.

Throws:

- `IOException`: if the pipe is  broken, unconnected, closed, or if an I/O error occurs.

## PipedOutputStream.write(byte[], int, int)

```java
public void write(byte[] b, int off, int len) throws IOException
```

Writes `len` bytes from the specified byte array
starting at offset `off` to this piped output stream.
This method blocks until all the bytes are written to the output
stream.

Parameters:

- `b`: (inherited documentation)
- `off`: (inherited documentation)
- `len`: (inherited documentation)

Throws:

- `IOException`: if the pipe is  broken, unconnected, closed, or if an I/O error occurs.
- `IndexOutOfBoundsException`: (inherited documentation)

## PipedOutputStream.flush()

```java
public synchronized void flush() throws IOException
```

Flushes this output stream and forces any buffered output bytes
to be written out.
This will notify any readers that bytes are waiting in the pipe.

Throws:

- `IOException`: (inherited documentation)

## PipedOutputStream.close()

```java
public void close() throws IOException
```

Closes this piped output stream and releases any system resources
associated with this stream. This stream may no longer be used for
writing bytes.

Throws:

- `IOException`: (inherited documentation)
