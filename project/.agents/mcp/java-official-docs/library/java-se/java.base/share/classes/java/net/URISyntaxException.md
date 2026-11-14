---
title: "URISyntaxException class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/URISyntaxException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# URISyntaxException class (java.net)

```java
public class URISyntaxException extends Exception
```

Checked exception thrown to indicate that a string could not be parsed as a
URI reference.

**See also:** URI

**Since:** 1.4

## URISyntaxException.URISyntaxException(String, String, int)

```java
public URISyntaxException(String input, String reason, int index)
```

Constructs an instance from the given input string, reason, and error
index.

Parameters:

- `input`: The input string
- `reason`: A string explaining why the input could not be parsed
- `index`: The index at which the parse error occurred, or `-1` if the index is not known

Throws:

- `NullPointerException`: If either the input or reason strings are `null`
- `IllegalArgumentException`: If the error index is less than `-1`

## URISyntaxException.URISyntaxException(String, String)

```java
public URISyntaxException(String input, String reason)
```

Constructs an instance from the given input string and reason.  The
resulting object will have an error index of `-1`.

Parameters:

- `input`: The input string
- `reason`: A string explaining why the input could not be parsed

Throws:

- `NullPointerException`: If either the input or reason strings are `null`

## URISyntaxException.getInput()

```java
public String getInput()
```

Returns the input string.

**Returns:** The input string

## URISyntaxException.getReason()

```java
public String getReason()
```

Returns a string explaining why the input string could not be parsed.

**Returns:** The reason string

## URISyntaxException.getIndex()

```java
public int getIndex()
```

Returns an index into the input string of the position at which the
parse error occurred, or `-1` if this position is not known.

**Returns:** The error index

## URISyntaxException.getMessage()

```java
public String getMessage()
```

Returns a string describing the parse error.  The resulting string
consists of the reason string followed by a colon character
(`':'`), a space, and the input string.  If the error index is
defined then the string `" at index "` followed by the index, in
decimal, is inserted after the reason string and before the colon
character.

**Returns:** A string describing the parse error
