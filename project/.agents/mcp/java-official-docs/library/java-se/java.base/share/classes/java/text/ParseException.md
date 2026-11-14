---
title: "ParseException class (java.text)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/text/ParseException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ParseException class (java.text)

```java
public class ParseException extends Exception
```

Signals that an error has been reached unexpectedly
while parsing.

**See also:** java.lang.Exception

**See also:** java.text.Format

**See also:** java.text.FieldPosition

**Since:** 1.1

## ParseException.ParseException(String, int)

```java
public ParseException(String s, int errorOffset)
```

Constructs a ParseException with the specified detail message and
offset.
A detail message is a String that describes this particular exception.

Parameters:

- `s`: the detail message
- `errorOffset`: the position where the error is found while parsing.

## ParseException.getErrorOffset()

```java
public int getErrorOffset ()
```

Returns the position where the error was found.

**Returns:** the position where the error was found
