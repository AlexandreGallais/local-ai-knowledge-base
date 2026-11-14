---
title: "FilterReader class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/FilterReader.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FilterReader class (java.io)

```java
public abstract class FilterReader extends Reader
```

Abstract class for reading filtered character streams.
The abstract class `FilterReader` itself
provides default methods that pass all requests to
the contained stream. Subclasses of `FilterReader`
should override some of these methods and may also provide
additional methods and fields.

**Since:** 1.1

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

Parameters:

- `in`: a Reader object providing the underlying stream.

Throws:

- `NullPointerException`: if `in` is `null`

## FilterReader.read()

```java
public int read() throws IOException
```

Reads a single character.

Throws:

- `IOException`: If an I/O error occurs

## FilterReader.read(char[], int, int)

```java
public int read(char[] cbuf, int off, int len) throws IOException
```

(inherited documentation)

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## FilterReader.skip(long)

```java
public long skip(long n) throws IOException
```

(inherited documentation)

Throws:

- `IllegalArgumentException`: If `n` is negative and the contained `Reader`'s `skip` method throws an IllegalArgumentException for a negative parameter

## FilterReader.ready()

```java
public boolean ready() throws IOException
```

Tells whether this stream is ready to be read.

Throws:

- `IOException`: If an I/O error occurs

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

Throws:

- `IOException`: If an I/O error occurs

## FilterReader.reset()

```java
public void reset() throws IOException
```

Resets the stream.

Throws:

- `IOException`: If an I/O error occurs
