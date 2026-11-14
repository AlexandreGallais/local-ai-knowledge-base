# FilterOutputStream class (java.io)

```java
public class FilterOutputStream extends OutputStream
```

This class is the superclass of all classes that filter output
streams. These streams sit on top of an already existing output
stream (the <i>underlying</i> output stream) which it uses as its
basic sink of data, but possibly transforming the data along the
way or providing additional functionality.
<p>
The class {@code FilterOutputStream} itself simply overrides
all methods of {@code OutputStream} with versions that pass
all requests to the underlying output stream. Subclasses of
{@code FilterOutputStream} may further override some of these
methods as well as provide additional methods and fields.

@author  Jonathan Payne
@since   1.0

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

@param   out   the underlying output stream to be assigned to
               the field {@code this.out} for later use, or
               {@code null} if this instance is to be
               created without an underlying stream.

## FilterOutputStream.write(int)

```java
public void write(int b) throws IOException
```

Writes the specified {@code byte} to this output stream.
<p>
The {@code write} method of {@code FilterOutputStream}
calls the {@code write} method of its underlying output stream,
that is, it performs {@code out.write(b)}.
<p>
Implements the abstract {@code write} method of {@code OutputStream}.

@param      b   {@inheritDoc}
@throws     IOException  if an I/O error occurs.

## FilterOutputStream.write(byte[])

```java
public void write(byte[] b) throws IOException
```

Writes {@code b.length} bytes to this output stream.
@implSpec
The {@code write} method of {@code FilterOutputStream}
calls its {@code write} method of three arguments with the
arguments {@code b}, {@code 0}, and
{@code b.length}.
@implNote
Note that this method does <em>not</em> call the one-argument
{@code write} method of its underlying output stream with
the single argument {@code b}.

@param      b   the data to be written.
@throws     IOException  {@inheritDoc}
@see        java.io.FilterOutputStream#write(byte[], int, int)

## FilterOutputStream.write(byte[], int, int)

```java
public void write(byte[] b, int off, int len) throws IOException
```

Writes {@code len} bytes from the specified
{@code byte} array starting at offset {@code off} to
this output stream.
@implSpec
The {@code write} method of {@code FilterOutputStream}
calls the {@code write} method of one argument on each
{@code byte} to output.
@implNote
Note that this method does not call the {@code write} method
of its underlying output stream with the same arguments. Subclasses
of {@code FilterOutputStream} should provide a more efficient
implementation of this method.

@param      b     {@inheritDoc}
@param      off   {@inheritDoc}
@param      len   {@inheritDoc}
@throws     IOException  if an I/O error occurs.
@throws     IndexOutOfBoundsException {@inheritDoc}
@see        java.io.FilterOutputStream#write(int)

## FilterOutputStream.flush()

```java
public void flush() throws IOException
```

Flushes this output stream and forces any buffered output bytes
to be written out to the stream.
@implSpec
The {@code flush} method of {@code FilterOutputStream}
calls the {@code flush} method of its underlying output stream.

@throws     IOException  {@inheritDoc}
@see        java.io.FilterOutputStream#out

## FilterOutputStream.close()

```java
public void close() throws IOException
```

Closes this output stream and releases any system resources
associated with the stream.
@implSpec
When not already closed, the {@code close} method of {@code
FilterOutputStream} calls its {@code flush} method, and then
calls the {@code close} method of its underlying output stream.

@throws     IOException  if an I/O error occurs.
@see        java.io.FilterOutputStream#flush()
@see        java.io.FilterOutputStream#out