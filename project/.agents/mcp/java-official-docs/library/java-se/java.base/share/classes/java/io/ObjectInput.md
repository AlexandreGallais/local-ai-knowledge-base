---
title: "ObjectInput interface (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/ObjectInput.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ObjectInput interface (java.io)

```java
public interface ObjectInput extends DataInput, AutoCloseable
```

ObjectInput extends the DataInput interface to include the reading of
objects. DataInput includes methods for the input of primitive types,
ObjectInput extends that interface to include objects, arrays, and Strings.

**See also:** java.io.InputStream

**See also:** java.io.ObjectOutputStream

**See also:** java.io.ObjectInputStream

**Since:** 1.1

## ObjectInput.readObject()

```java
public Object readObject() throws ClassNotFoundException, IOException
```

Read and return an object. The class that implements this interface
defines where the object is "read" from.

**Returns:** the object read from the stream

Throws:

- `java.lang.ClassNotFoundException`: If the class of a serialized object cannot be found.
- `IOException`: If any of the usual Input/Output related exceptions occur.

## ObjectInput.read()

```java
public int read() throws IOException
```

Reads a byte of data. This method will block if no input is
available.

**Returns:** the byte read, or -1 if the end of the
         stream is reached.

Throws:

- `IOException`: If an I/O error has occurred.

## ObjectInput.read(byte[])

```java
public int read(byte[] b) throws IOException
```

Reads into an array of bytes.  This method will
block until some input is available.

Parameters:

- `b`: the buffer into which the data is read

**Returns:** the total number of bytes read into the buffer, or
         `-1` if there is no more data because the end of
         the stream has been reached.

Throws:

- `IOException`: If an I/O error has occurred.

## ObjectInput.read(byte[], int, int)

```java
public int read(byte[] b, int off, int len) throws IOException
```

Reads into an array of bytes.  This method will
block until some input is available.

Parameters:

- `b`: the buffer into which the data is read
- `off`: the start offset of the data
- `len`: the maximum number of bytes read

**Returns:** the total number of bytes read into the buffer, or
         `-1` if there is no more data because the end of
         the stream has been reached.

Throws:

- `IOException`: If an I/O error has occurred.
- `IndexOutOfBoundsException`: If `off` is negative, `len` is negative, or `len` is greater than `b.length - off`

## ObjectInput.skip(long)

```java
public long skip(long n) throws IOException
```

Skips n bytes of input.

Parameters:

- `n`: the number of bytes to be skipped

**Returns:** the actual number of bytes skipped.

Throws:

- `IOException`: If an I/O error has occurred.

## ObjectInput.available()

```java
public int available() throws IOException
```

Returns the number of bytes that can be read
without blocking.

**Returns:** the number of available bytes.

Throws:

- `IOException`: If an I/O error has occurred.

## ObjectInput.close()

```java
public void close() throws IOException
```

Closes the input stream. Must be called
to release any resources associated with
the stream.

Throws:

- `IOException`: If an I/O error has occurred.
