# FilterReader class (java.io)

```java
public abstract class FilterReader extends Reader
```

Abstract class for reading filtered character streams.
The abstract class {@code FilterReader} itself
provides default methods that pass all requests to
the contained stream. Subclasses of {@code FilterReader}
should override some of these methods and may also provide
additional methods and fields.

@author      Mark Reinhold
@since       1.1

## FilterReader.in

```java
protected Reader in
```

The underlying character-input stream.

## FilterReader.FilterReader(Reader)

```java
protected FilterReader(Reader in)
```

Creates a new filtered reader.

@param in  a Reader object providing the underlying stream.
@throws NullPointerException if {@code in} is {@code null}

## FilterReader.read()

```java
public int read() throws IOException
```

Reads a single character.

@throws     IOException  If an I/O error occurs

## FilterReader.read(char[], int, int)

```java
public int read(char[] cbuf, int off, int len) throws IOException
```

{@inheritDoc}
@throws     IndexOutOfBoundsException  {@inheritDoc}

## FilterReader.skip(long)

```java
public long skip(long n) throws IOException
```

{@inheritDoc}

@throws     IllegalArgumentException  If {@code n} is negative and the
            contained {@code Reader}'s {@code skip} method throws an
            IllegalArgumentException for a negative parameter

## FilterReader.ready()

```java
public boolean ready() throws IOException
```

Tells whether this stream is ready to be read.

@throws     IOException  If an I/O error occurs

## FilterReader.markSupported()

```java
public boolean markSupported()
```

Tells whether this stream supports the mark() operation.

## FilterReader.mark(int)

```java
public void mark(int readAheadLimit) throws IOException
```

Marks the present position in the stream.

@throws     IOException  If an I/O error occurs

## FilterReader.reset()

```java
public void reset() throws IOException
```

Resets the stream.

@throws     IOException  If an I/O error occurs