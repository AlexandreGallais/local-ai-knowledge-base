---
title: "OutputStreamWriter class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/OutputStreamWriter.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# OutputStreamWriter class (java.io)

```java
public class OutputStreamWriter extends Writer
```

An OutputStreamWriter is a bridge from character streams to byte streams:
Characters written to it are encoded into bytes using a specified charset.  The charset that it uses
may be specified by name or may be given explicitly, or the
default charset may be accepted.

 Each invocation of a write() method causes the encoding converter to be
invoked on the given character(s).  The resulting bytes are accumulated in a
buffer before being written to the underlying output stream.  Note that the
characters passed to the write() methods are not buffered.

 For top efficiency, consider wrapping an OutputStreamWriter within a
BufferedWriter so as to avoid frequent converter invocations.  For example:

 A *surrogate pair* is a character represented by a sequence of two
`char` values: A *high* surrogate in the range '\uD800' to
'\uDBFF' followed by a *low* surrogate in the range '\uDC00' to
'\uDFFF'.

 A *malformed surrogate element* is a high surrogate that is not
followed by a low surrogate or a low surrogate that is not preceded by a
high surrogate.

 This class always replaces malformed surrogate elements and unmappable
character sequences with the charset's default *substitution sequence*.
The `CharsetEncoder` class should be used when more
control over the encoding process is required.

**See also:** BufferedWriter

**See also:** OutputStream

**See also:** Charset

**Since:** 1.1

## OutputStreamWriter.OutputStreamWriter(OutputStream, String)

```java
public OutputStreamWriter(OutputStream out, String charsetName) throws UnsupportedEncodingException
```

Creates an OutputStreamWriter that uses the named charset.

Parameters:

- `out`: An OutputStream
- `charsetName`: The name of a supported charset

Throws:

- `UnsupportedEncodingException`: If the named encoding is not supported

## OutputStreamWriter.OutputStreamWriter(OutputStream)

```java
public OutputStreamWriter(OutputStream out)
```

Creates an OutputStreamWriter that uses the default character encoding, or
where `out` is a `PrintStream`, the charset used by the print
stream.

Parameters:

- `out`: An OutputStream

**See also:** Charset#defaultCharset()

## OutputStreamWriter.OutputStreamWriter(OutputStream, Charset)

```java
public OutputStreamWriter(OutputStream out, Charset cs)
```

Creates an OutputStreamWriter that uses the given charset.

Parameters:

- `out`: An OutputStream
- `cs`: A charset

**Since:** 1.4

## OutputStreamWriter.OutputStreamWriter(OutputStream, CharsetEncoder)

```java
public OutputStreamWriter(OutputStream out, CharsetEncoder enc)
```

Creates an OutputStreamWriter that uses the given charset encoder.

Parameters:

- `out`: An OutputStream
- `enc`: A charset encoder

**Since:** 1.4

## OutputStreamWriter.getEncoding()

```java
public String getEncoding()
```

Returns the name of the character encoding being used by this stream.

 If the encoding has an historical name then that name is returned;
otherwise the encoding's canonical name is returned.

 If this instance was created with the String) constructor then the returned
name, being unique for the encoding, may differ from the name passed to
the constructor.  This method may return `null` if the stream has
been closed.

**Returns:** The historical name of this encoding, or possibly
        `null` if the stream has been closed

**See also:** Charset

## OutputStreamWriter.write(int)

```java
public void write(int c) throws IOException
```

Writes a single character.

Throws:

- `IOException`: If an I/O error occurs

## OutputStreamWriter.write(char[], int, int)

```java
public void write(char[] cbuf, int off, int len) throws IOException
```

Writes a portion of an array of characters.

Parameters:

- `cbuf`: Buffer of characters
- `off`: Offset from which to start writing characters
- `len`: Number of characters to write

Throws:

- `IndexOutOfBoundsException`: If `off` is negative, or `len` is negative, or `off + len` is negative or greater than the length of the given array
- `IOException`: If an I/O error occurs

## OutputStreamWriter.write(String, int, int)

```java
public void write(String str, int off, int len) throws IOException
```

Writes a portion of a string.

Parameters:

- `str`: A String
- `off`: Offset from which to start writing characters
- `len`: Number of characters to write

Throws:

- `IndexOutOfBoundsException`: If `off` is negative, or `len` is negative, or `off + len` is negative or greater than the length of the given string
- `IOException`: If an I/O error occurs

## OutputStreamWriter.flush()

```java
public void flush() throws IOException
```

Flushes the stream.

Throws:

- `IOException`: If an I/O error occurs
