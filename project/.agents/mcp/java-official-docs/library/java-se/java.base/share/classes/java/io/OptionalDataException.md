---
title: "OptionalDataException class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/OptionalDataException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# OptionalDataException class (java.io)

```java
public final class OptionalDataException extends ObjectStreamException
```

Exception indicating the failure of an object read operation due to
unread primitive data, or the end of data belonging to a serialized
object in the stream.  This exception may be thrown in two cases:

- An attempt was made to read an object when the next element in the
      stream is primitive data.  In this case, the OptionalDataException's
      length field is set to the number of bytes of primitive data
      immediately readable from the stream, and the eof field is set to
      false.

- An attempt was made to read past the end of data consumable by a
      class-defined readObject or readExternal method.  In this case, the
      OptionalDataException's eof field is set to true, and the length field
      is set to 0.

**Since:** 1.1

## OptionalDataException.length

```java
public int length
```

The number of bytes of primitive data available to be read
in the current buffer.

## OptionalDataException.eof

```java
public boolean eof
```

True if there is no more data in the buffered part of the stream.
