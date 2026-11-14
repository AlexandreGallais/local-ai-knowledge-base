---
title: "IllegalFormatWidthException class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/IllegalFormatWidthException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IllegalFormatWidthException class (java.util)

```java
public non-sealed class IllegalFormatWidthException extends IllegalFormatException
```

Unchecked exception thrown when the format width is a negative value other
than `-1` or is otherwise unsupported. If a given format width is not
representable by an `int` type, then the value
`Integer.MIN_VALUE` will be used in the exception.

**Since:** 1.5

## IllegalFormatWidthException.IllegalFormatWidthException(int)

```java
public IllegalFormatWidthException(int w)
```

Constructs an instance of this class with the specified width.

Parameters:

- `w`: The width

## IllegalFormatWidthException.getWidth()

```java
public int getWidth()
```

Returns the width. If the width is not representable by an `int`,
then returns `Integer.MIN_VALUE`.

**Returns:** The width
