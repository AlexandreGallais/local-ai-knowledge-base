---
title: "ObjectOutputStream class (java.io) (part 3 of 3)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/ObjectOutputStream.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ObjectOutputStream class (java.io) (part 3 of 3)

## ObjectOutputStream.write(ObjectOutput)

```java
public abstract void write(ObjectOutput out) throws IOException
```

Write the data and fields to the specified ObjectOutput stream,
which must be the same stream that produced this
`PutField` object.

Parameters:

- `out`: the stream to write the data and fields to

**Deprecated:** This method does not write the values contained by this
        `PutField` object in a proper format, and may
        result in corruption of the serialization stream.  The
        correct way to write `PutField` data is by
        calling the `java.io.ObjectOutputStream.writeFields()`
        method.

Throws:

- `IOException`: if I/O errors occur while writing to the underlying stream
- `IllegalArgumentException`: if the specified stream is not the same stream that produced this `PutField` object

## ObjectOutputStream.toString()

```java
public String toString()
```

Returns a string representation of this object
