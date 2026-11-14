---
title: "FilterOutputStream class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/FilterOutputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FilterOutputStream class (java.io)

```java
public class FilterOutputStream extends OutputStream
```

This class is the superclass of all classes that filter output
streams. These streams sit on top of an already existing output
stream (the *underlying* output stream) which it uses as its
basic sink of data, but possibly transforming the data along the
way or providing additional functionality.

The class `FilterOutputStream` itself simply overrides
all methods of `OutputStream` with versions that pass
all requests to the underlying output stream. Subclasses of
`FilterOutputStream` may further override some of these
methods as well as provide additional methods and fields.

**Since:** 1.0

## FilterOutputStream.out

```java
protected OutputStream out
```

The underlying output stream to be filtered.

## FilterOutputStream.FilterOutputStream(OutputStream)

```java
public FilterOutputStream(OutputStream out)
```

Creates an output stream filter built on top of the specified
underlying output stream.

Parameters:

- `out`: the underlying output stream to be assigned to the field `this.out` for later use, or `null` if this instance is to be created without an underlying stream.

## FilterOutputStream.write(int)

```java
public void write(int b) throws IOException
```

Writes the specified `byte` to this output stream.

The `write` method of `FilterOutputStream`
calls the `write` method of its underlying output stream,
that is, it performs `out.write(b)`.

Implements the abstract `write` method of `OutputStream`.

Parameters:

- `b`: (inherited documentation)

Throws:

- `IOException`: if an I/O error occurs.

## FilterOutputStream.write(byte[])

```java
public void write(byte[] b) throws IOException
```

Writes `b.length` bytes to this output stream.

Parameters:

- `b`: the data to be written.

**Implementation requirements:** The `write` method of `FilterOutputStream`
calls its `write` method of three arguments with the
arguments `b`, `0`, and
`b.length`.

**Implementation note:** Note that this method does *not* call the one-argument
`write` method of its underlying output stream with
the single argument `b`.

**See also:** java.io.FilterOutputStream#write(byte[], int, int)

Throws:

- `IOException`: (inherited documentation)

## FilterOutputStream.write(byte[], int, int)

```java
public void write(byte[] b, int off, int len) throws IOException
```

Writes `len` bytes from the specified
`byte` array starting at offset `off` to
this output stream.

Parameters:

- `b`: (inherited documentation)
- `off`: (inherited documentation)
- `len`: (inherited documentation)

**Implementation requirements:** The `write` method of `FilterOutputStream`
calls the `write` method of one argument on each
`byte` to output.

**Implementation note:** Note that this method does not call the `write` method
of its underlying output stream with the same arguments. Subclasses
of `FilterOutputStream` should provide a more efficient
implementation of this method.

**See also:** java.io.FilterOutputStream#write(int)

Throws:

- `IOException`: if an I/O error occurs.
- `IndexOutOfBoundsException`: (inherited documentation)

## FilterOutputStream.flush()

```java
public void flush() throws IOException
```

Flushes this output stream and forces any buffered output bytes
to be written out to the stream.

**Implementation requirements:** The `flush` method of `FilterOutputStream`
calls the `flush` method of its underlying output stream.

**See also:** java.io.FilterOutputStream#out

Throws:

- `IOException`: (inherited documentation)

## FilterOutputStream.close()

```java
public void close() throws IOException
```

Closes this output stream and releases any system resources
associated with the stream.

**Implementation requirements:** When not already closed, the `close` method of `FilterOutputStream` calls its `flush` method, and then
calls the `close` method of its underlying output stream.

**See also:** java.io.FilterOutputStream#flush()

**See also:** java.io.FilterOutputStream#out

Throws:

- `IOException`: if an I/O error occurs.
