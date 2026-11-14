---
title: "InvalidPathException class (java.nio.file)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/nio/file/InvalidPathException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InvalidPathException class (java.nio.file)

```java
public class InvalidPathException extends IllegalArgumentException
```

Unchecked exception thrown when path string cannot be converted into a
`Path` because the path string contains invalid characters, or
the path string is invalid for other file system specific reasons.

**Since:** 1.7

## InvalidPathException.InvalidPathException(String, String, int)

```java
public InvalidPathException(String input, String reason, int index)
```

Constructs an instance from the given input string, reason, and error
index.

Parameters:

- `input`: the input string
- `reason`: a string explaining why the input was rejected
- `index`: the index at which the error occurred, or `-1` if the index is not known

Throws:

- `NullPointerException`: if either the input or reason strings are `null`
- `IllegalArgumentException`: if the error index is less than `-1`

## InvalidPathException.InvalidPathException(String, String)

```java
public InvalidPathException(String input, String reason)
```

Constructs an instance from the given input string and reason.  The
resulting object will have an error index of `-1`.

Parameters:

- `input`: the input string
- `reason`: a string explaining why the input was rejected

Throws:

- `NullPointerException`: if either the input or reason strings are `null`

## InvalidPathException.getInput()

```java
public String getInput()
```

Returns the input string.

**Returns:** the input string

## InvalidPathException.getReason()

```java
public String getReason()
```

Returns a string explaining why the input string was rejected.

**Returns:** the reason string

## InvalidPathException.getIndex()

```java
public int getIndex()
```

Returns an index into the input string of the position at which the
error occurred, or `-1` if this position is not known.

**Returns:** the error index

## InvalidPathException.getMessage()

```java
public String getMessage()
```

Returns a string describing the error.  The resulting string
consists of the reason string followed by a colon character
(`':'`), a space, and the input string.  If the error index is
defined then the string `" at index "` followed by the index, in
decimal, is inserted after the reason string and before the colon
character.

**Returns:** a string describing the error
