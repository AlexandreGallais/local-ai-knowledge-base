---
title: "StringIndexOutOfBoundsException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/StringIndexOutOfBoundsException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# StringIndexOutOfBoundsException class (java.lang)

```java
public class StringIndexOutOfBoundsException extends IndexOutOfBoundsException
```

Thrown by `String` methods to indicate that an index is either negative
or greater than the size of the string.  For some methods such as the
charAt method, this exception also is thrown when the
index is equal to the size of the string.

**See also:** java.lang.String#charAt(int)

**Since:** 1.0

## StringIndexOutOfBoundsException.StringIndexOutOfBoundsException()

```java
public StringIndexOutOfBoundsException()
```

Constructs a `StringIndexOutOfBoundsException` with no detail
message.

## StringIndexOutOfBoundsException.StringIndexOutOfBoundsException(String)

```java
public StringIndexOutOfBoundsException(String s)
```

Constructs a `StringIndexOutOfBoundsException` with the specified
detail message.

Parameters:

- `s`: the detail message.

## StringIndexOutOfBoundsException.StringIndexOutOfBoundsException(int)

```java
public StringIndexOutOfBoundsException(int index)
```

Constructs a new `StringIndexOutOfBoundsException` class with an
argument indicating the illegal index.

The index is included in this exception's detail message.  The
exact presentation format of the detail message is unspecified.

Parameters:

- `index`: the illegal index.
