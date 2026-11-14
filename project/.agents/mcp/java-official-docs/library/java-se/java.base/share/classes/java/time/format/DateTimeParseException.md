---
title: "DateTimeParseException class (java.time.format)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/time/format/DateTimeParseException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DateTimeParseException class (java.time.format)

```java
public class DateTimeParseException extends DateTimeException
```

An exception thrown when an error occurs during parsing.

This exception includes the text being parsed and the error index.

**Implementation requirements:** This class is intended for use in a single thread.

**Since:** 1.8

## DateTimeParseException.DateTimeParseException(String, CharSequence, int)

```java
public DateTimeParseException(String message, CharSequence parsedData, int errorIndex)
```

Constructs a new exception with the specified message.

Parameters:

- `message`: the message to use for this exception, may be null
- `parsedData`: the parsed text, should not be null
- `errorIndex`: the index in the parsed string that was invalid, should be a valid index

## DateTimeParseException.DateTimeParseException(String, CharSequence, int, Throwable)

```java
public DateTimeParseException(String message, CharSequence parsedData, int errorIndex, Throwable cause)
```

Constructs a new exception with the specified message and cause.

Parameters:

- `message`: the message to use for this exception, may be null
- `parsedData`: the parsed text, should not be null
- `errorIndex`: the index in the parsed string that was invalid, should be a valid index
- `cause`: the cause exception, may be null

## DateTimeParseException.getParsedString()

```java
public String getParsedString()
```

Returns the string that was being parsed.

**Returns:** the string that was being parsed, should not be null.

## DateTimeParseException.getErrorIndex()

```java
public int getErrorIndex()
```

Returns the index where the error was found.

**Returns:** the index in the parsed string that was invalid, should be a valid index
