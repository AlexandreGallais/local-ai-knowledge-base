---
title: "FilterWriter class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/FilterWriter.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# FilterWriter class (java.io)

```java
public abstract class FilterWriter extends Writer
```

Abstract class for writing filtered character streams.
The abstract class `FilterWriter` itself
provides default methods that pass all requests to the
contained stream. Subclasses of `FilterWriter`
should override some of these methods and may also
provide additional methods and fields.

**Since:** 1.1

## FilterWriter.out

```java
protected Writer out
```

The underlying character-output stream.

## FilterWriter.FilterWriter(Writer)

```java
protected FilterWriter(Writer out)
```

Create a new filtered writer.

Parameters:

- `out`: a Writer object to provide the underlying stream.

Throws:

- `NullPointerException`: if `out` is `null`

## FilterWriter.write(int)

```java
public void write(int c) throws IOException
```

Writes a single character.

Throws:

- `IOException`: If an I/O error occurs

## FilterWriter.write(char[], int, int)

```java
public void write(char[] cbuf, int off, int len) throws IOException
```

Writes a portion of an array of characters.

Parameters:

- `cbuf`: Buffer of characters to be written
- `off`: Offset from which to start reading characters
- `len`: Number of characters to be written

Throws:

- `IndexOutOfBoundsException`: If the values of the `off` and `len` parameters cause the corresponding method of the underlying `Writer` to throw an `IndexOutOfBoundsException`
- `IOException`: If an I/O error occurs

## FilterWriter.write(String, int, int)

```java
public void write(String str, int off, int len) throws IOException
```

Writes a portion of a string.

Parameters:

- `str`: String to be written
- `off`: Offset from which to start reading characters
- `len`: Number of characters to be written

Throws:

- `IndexOutOfBoundsException`: If the values of the `off` and `len` parameters cause the corresponding method of the underlying `Writer` to throw an `IndexOutOfBoundsException`
- `IOException`: If an I/O error occurs

## FilterWriter.flush()

```java
public void flush() throws IOException
```

Flushes the stream.

Throws:

- `IOException`: If an I/O error occurs
