---
title: "DataInputStream class (java.io) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/DataInputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DataInputStream class (java.io) (part 2 of 2)

## DataInputStream.readUTF(DataInput)

```java
public static final String readUTF(DataInput in) throws IOException
```

Reads from the
stream `in` a representation
of a Unicode  character string encoded in
modified UTF-8 format;
this string of characters is then returned as a `String`.
The details of the modified UTF-8 representation
are  exactly the same as for the `readUTF`
method of `DataInput`.

Parameters:

- `in`: a data input stream.

**Returns:** a Unicode string.

**See also:** java.io.DataInputStream#readUnsignedShort()

Throws:

- `EOFException`: if the input stream reaches the end before all the bytes.
- `IOException`: the stream has been closed and the contained input stream does not support reading after close, or another I/O error occurs.
- `UTFDataFormatException`: if the bytes do not represent a valid modified UTF-8 encoding of a Unicode string.
