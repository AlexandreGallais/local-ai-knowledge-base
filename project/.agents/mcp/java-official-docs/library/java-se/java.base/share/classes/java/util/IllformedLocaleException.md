---
title: "IllformedLocaleException class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/IllformedLocaleException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IllformedLocaleException class (java.util)

```java
public class IllformedLocaleException extends RuntimeException
```

Thrown by methods in `Locale` and `Locale.Builder` to
indicate that an argument is not a well-formed BCP 47 tag.

**See also:** Locale

**Since:** 1.7

## IllformedLocaleException.IllformedLocaleException()

```java
public IllformedLocaleException()
```

Constructs a new `IllformedLocaleException` with no
detail message and -1 as the error index.

## IllformedLocaleException.IllformedLocaleException(String)

```java
public IllformedLocaleException(String message)
```

Constructs a new `IllformedLocaleException` with the
given message and -1 as the error index.

Parameters:

- `message`: the message

## IllformedLocaleException.IllformedLocaleException(String, int)

```java
public IllformedLocaleException(String message, int errorIndex)
```

Constructs a new `IllformedLocaleException` with the
given message and the error index.  The error index is the approximate
offset from the start of the ill-formed value to the point where the
parse first detected an error.  A negative error index value indicates
either the error index is not applicable or unknown.

Parameters:

- `message`: the message
- `errorIndex`: the index

## IllformedLocaleException.getErrorIndex()

```java
public int getErrorIndex()
```

Returns the index where the error was found. A negative value indicates
either the error index is not applicable or unknown.

**Returns:** the error index
