---
title: "ObjectOutput interface (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/ObjectOutput.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ObjectOutput interface (java.io)

```java
public interface ObjectOutput extends DataOutput, AutoCloseable
```

ObjectOutput extends the DataOutput interface to include writing of objects.
DataOutput includes methods for output of primitive types, ObjectOutput
extends that interface to include objects, arrays, and Strings.

**See also:** java.io.InputStream

**See also:** java.io.ObjectOutputStream

**See also:** java.io.ObjectInputStream

**Since:** 1.1

## ObjectOutput.writeObject(Object)

```java
public void writeObject(Object obj) throws IOException
```

Write an object to the underlying storage or stream.  The
class that implements this interface defines how the object is
written.

Parameters:

- `obj`: the object to be written

Throws:

- `IOException`: Any of the usual Input/Output related exceptions.

## ObjectOutput.write(int)

```java
public void write(int b) throws IOException
```

Writes a byte. This method will block until the byte is actually
written.

Parameters:

- `b`: the byte

Throws:

- `IOException`: If an I/O error has occurred.

## ObjectOutput.write(byte[])

```java
public void write(byte[] b) throws IOException
```

Writes an array of bytes. This method will block until the bytes
are actually written.

Parameters:

- `b`: the data to be written

Throws:

- `IOException`: If an I/O error has occurred.

## ObjectOutput.write(byte[], int, int)

```java
public void write(byte[] b, int off, int len) throws IOException
```

Writes a sub array of bytes.

Parameters:

- `b`: the data to be written
- `off`: the start offset in the data
- `len`: the number of bytes that are written

Throws:

- `IOException`: If an I/O error has occurred.
- `IndexOutOfBoundsException`: (inherited documentation)

## ObjectOutput.flush()

```java
public void flush() throws IOException
```

Flushes the stream. This will write any buffered
output bytes.

Throws:

- `IOException`: If an I/O error has occurred.

## ObjectOutput.close()

```java
public void close() throws IOException
```

Closes the stream. This method must be called
to release any resources associated with the
stream.

Throws:

- `IOException`: If an I/O error has occurred.
