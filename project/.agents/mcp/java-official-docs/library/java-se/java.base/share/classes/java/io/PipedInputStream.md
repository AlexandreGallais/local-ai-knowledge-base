---
title: "PipedInputStream class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/PipedInputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PipedInputStream class (java.io)

```java
public class PipedInputStream extends InputStream
```

A piped input stream should be connected
to a piped output stream; the piped  input
stream then provides whatever data bytes
are written to the piped output  stream.
Typically, data is read from a `PipedInputStream`
object by one thread  and data is written
to the corresponding `PipedOutputStream`
by some  other thread. Attempting to use
both objects from a single thread is not
recommended, as it may deadlock the thread.
The piped input stream contains a buffer,
decoupling read operations from write operations,
within limits.
A pipe is said to be  *broken*  if a
thread that was providing data bytes to the connected
piped output stream is no longer alive.

**See also:** java.io.PipedOutputStream

**Since:** 1.0

## PipedInputStream.PIPE_SIZE

```java
protected static final int PIPE_SIZE
```

The default size of the pipe's circular input buffer.

**Since:** 1.1

## PipedInputStream.protected byte buffer[]

```java
protected byte buffer[]
```

The circular buffer into which incoming data is placed.

**Since:** 1.1

## PipedInputStream.in

```java
protected int in
```

The index of the position in the circular buffer at which the
next byte of data will be stored when received from the connected
piped output stream. `in < 0` implies the buffer is empty,
`in == out` implies the buffer is full

**Since:** 1.1

## PipedInputStream.out

```java
protected int out
```

The index of the position in the circular buffer at which the next
byte of data will be read by this piped input stream.

**Since:** 1.1

## PipedInputStream.PipedInputStream(PipedOutputStream)

```java
public PipedInputStream(PipedOutputStream src) throws IOException
```

Creates a `PipedInputStream` so
that it is connected to the piped output
stream `src`. Data bytes written
to `src` will then be  available
as input from this stream.

Parameters:

- `src`: the stream to connect to.

Throws:

- `IOException`: if an I/O error occurs.

## PipedInputStream.PipedInputStream(PipedOutputStream, int)

```java
public PipedInputStream(PipedOutputStream src, int pipeSize) throws IOException
```

Creates a `PipedInputStream` so that it is
connected to the piped output stream
`src` and uses the specified pipe size for
the pipe's buffer.
Data bytes written to `src` will then
be available as input from this stream.

Parameters:

- `src`: the stream to connect to.
- `pipeSize`: the size of the pipe's buffer.

**Since:** 1.6

Throws:

- `IOException`: if an I/O error occurs.
- `IllegalArgumentException`: if `pipeSize <= 0`.

## PipedInputStream.PipedInputStream()

```java
public PipedInputStream()
```

Creates a `PipedInputStream` so
that it is not yet connected.
It must be java.io.PipedInputStream) connected to a
`PipedOutputStream` before being used.

## PipedInputStream.PipedInputStream(int)

```java
public PipedInputStream(int pipeSize)
```

Creates a `PipedInputStream` so that it is not yet
connected and
uses the specified pipe size for the pipe's buffer.
It must be java.io.PipedInputStream) connected to a `PipedOutputStream` before being used.

Parameters:

- `pipeSize`: the size of the pipe's buffer.

**Since:** 1.6

Throws:

- `IllegalArgumentException`: if `pipeSize <= 0`.

## PipedInputStream.connect(PipedOutputStream)

```java
public void connect(PipedOutputStream src) throws IOException
```

Causes this piped input stream to be connected
to the piped  output stream `src`.
If this object is already connected to some
other piped output  stream, an `IOException`
is thrown.

If `src` is an
unconnected piped output stream and `snk`
is an unconnected piped input stream, they
may be connected by either the call:

or the call:

The two calls have the same effect.

Parameters:

- `src`: The piped output stream to connect to.

Throws:

- `IOException`: if an I/O error occurs.

## PipedInputStream.receive(int)

```java
protected synchronized void receive(int b) throws IOException
```

Receives a byte of data.  This method will block if no input is
available.

Parameters:

- `b`: the byte being received

**Since:** 1.1

Throws:

- `IOException`: If the pipe is  `broken`, unconnected, closed, or if an I/O error occurs.

## PipedInputStream.read()

```java
public synchronized int read() throws IOException
```

Reads the next byte of data from this piped input stream. The
value byte is returned as an `int` in the range
`0` to `255`.
This method blocks until input data is available, the end of the
stream is detected, or an exception is thrown.

**Returns:** (inherited documentation)

Throws:

- `IOException`: if the pipe is unconnected,  `broken`, closed, or if an I/O error occurs.

## PipedInputStream.read(byte[], int, int)

```java
public synchronized int read(byte[] b, int off, int len) throws IOException
```

Reads up to `len` bytes of data from this piped input
stream into an array of bytes. Less than `len` bytes
will be read if the end of the data stream is reached or if
`len` exceeds the pipe's buffer size.
If `len` is zero, then no bytes are read and 0 is returned;
otherwise, the method blocks until at least 1 byte of input is
available, end of the stream has been detected, or an exception is
thrown.

Parameters:

- `b`: (inherited documentation)
- `off`: (inherited documentation)
- `len`: (inherited documentation)

**Returns:** (inherited documentation)

Throws:

- `NullPointerException`: (inherited documentation)
- `IndexOutOfBoundsException`: (inherited documentation)
- `IOException`: if the pipe is  `broken`, unconnected, closed, or if an I/O error occurs.

## PipedInputStream.available()

```java
public synchronized int available() throws IOException
```

Returns the number of bytes that can be read from this input
stream without blocking.

**Returns:** the number of bytes that can be read from this input stream
        without blocking, or `0` if this input stream has been
        closed by invoking its `close()` method, or if the pipe
        is unconnected, or
         `broken`.

**Since:** 1.0.2

Throws:

- `IOException`: (inherited documentation)

## PipedInputStream.close()

```java
public void close() throws IOException
```

(inherited documentation)

Throws:

- `IOException`: (inherited documentation)
