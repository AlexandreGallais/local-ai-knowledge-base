---
title: "InputStreamReader class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/InputStreamReader.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InputStreamReader class (java.io)

```java
public class InputStreamReader extends Reader
```

An InputStreamReader is a bridge from byte streams to character streams: It
reads bytes and decodes them into characters using a specified charset.  The charset that it uses
may be specified by name or may be given explicitly, or the
default charset may be used.

 Each invocation of one of an InputStreamReader's read() methods may
cause one or more bytes to be read from the underlying byte-input stream.
To enable the efficient conversion of bytes to characters, more bytes may
be read ahead from the underlying stream than are necessary to satisfy the
current read operation.

 For top efficiency, consider wrapping an InputStreamReader within a
BufferedReader.  For example:

To read from `System.in`, use the system property value
stdin.encoding as the `Charset`:

**See also:** BufferedReader

**See also:** InputStream

**See also:** Charset

**See also:** System##stdin.encoding stdin.encoding

**Since:** 1.1

## InputStreamReader.InputStreamReader(InputStream)

```java
public InputStreamReader(InputStream in)
```

Creates an InputStreamReader that uses the
default charset.

Parameters:

- `in`: An InputStream

**See also:** Charset#defaultCharset()

## InputStreamReader.InputStreamReader(InputStream, String)

```java
public InputStreamReader(InputStream in, String charsetName) throws UnsupportedEncodingException
```

Creates an InputStreamReader that uses the named charset.

Parameters:

- `in`: An InputStream
- `charsetName`: The name of a supported charset

Throws:

- `UnsupportedEncodingException`: If the named charset is not supported

## InputStreamReader.InputStreamReader(InputStream, Charset)

```java
public InputStreamReader(InputStream in, Charset cs)
```

Creates an InputStreamReader that uses the given charset.

Parameters:

- `in`: An InputStream
- `cs`: A charset

**Since:** 1.4

## InputStreamReader.InputStreamReader(InputStream, CharsetDecoder)

```java
public InputStreamReader(InputStream in, CharsetDecoder dec)
```

Creates an InputStreamReader that uses the given charset decoder.

Parameters:

- `in`: An InputStream
- `dec`: A charset decoder

**Since:** 1.4

## InputStreamReader.getEncoding()

```java
public String getEncoding()
```

Returns the name of the character encoding being used by this stream.

 If the encoding has an historical name then that name is returned;
otherwise the encoding's canonical name is returned.

 If this instance was created with the String) constructor then the returned
name, being unique for the encoding, may differ from the name passed to
the constructor. This method will return `null` if the
stream has been closed.

**Returns:** The historical name of this encoding, or
        `null` if the stream has been closed

**See also:** Charset

## InputStreamReader.read()

```java
public int read() throws IOException
```

Reads a single character.

**Returns:** The character read, or -1 if the end of the stream has been
        reached

Throws:

- `IOException`: If an I/O error occurs

## InputStreamReader.read(char[], int, int)

```java
public int read(char[] cbuf, int off, int len) throws IOException
```

(inherited documentation)

Throws:

- `IndexOutOfBoundsException`: (inherited documentation)

## InputStreamReader.ready()

```java
public boolean ready() throws IOException
```

Tells whether this stream is ready to be read.  An InputStreamReader is
ready if its input buffer is not empty, or if bytes are available to be
read from the underlying byte stream.

Throws:

- `IOException`: If an I/O error occurs
