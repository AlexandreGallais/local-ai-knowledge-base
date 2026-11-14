---
title: "PatternSyntaxException class (java.util.regex)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/regex/PatternSyntaxException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PatternSyntaxException class (java.util.regex)

```java
public class PatternSyntaxException extends IllegalArgumentException
```

Unchecked exception thrown to indicate a syntax error in a
regular-expression pattern.

**Since:** 1.4

## PatternSyntaxException.PatternSyntaxException(String, String, int)

```java
public PatternSyntaxException(String desc, String regex, int index)
```

Constructs a new instance of this class.

Parameters:

- `desc`: A description of the error
- `regex`: The erroneous pattern
- `index`: The approximate index in the pattern of the error, or `-1` if the index is not known

## PatternSyntaxException.getIndex()

```java
public int getIndex()
```

Retrieves the error index.

**Returns:** The approximate index in the pattern of the error,
        or `-1` if the index is not known

## PatternSyntaxException.getDescription()

```java
public String getDescription()
```

Retrieves the description of the error.

**Returns:** The description of the error

## PatternSyntaxException.getPattern()

```java
public String getPattern()
```

Retrieves the erroneous regular-expression pattern.

**Returns:** The erroneous pattern

## PatternSyntaxException.getMessage()

```java
public String getMessage()
```

Returns a multi-line string containing the description of the syntax
error and its index, the erroneous regular-expression pattern, and a
visual indication of the error index within the pattern.

**Returns:** The full detail message
