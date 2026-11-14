---
title: "IllegalFormatCodePointException class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/IllegalFormatCodePointException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IllegalFormatCodePointException class (java.util)

```java
public non-sealed class IllegalFormatCodePointException extends IllegalFormatException
```

Unchecked exception thrown when a character with an invalid Unicode code
point as defined by `Character.isValidCodePoint` is passed to the
`Formatter`.

 Unless otherwise specified, passing a `null` argument to any
method or constructor in this class will cause a `NullPointerException` to be thrown.

**Since:** 1.5

## IllegalFormatCodePointException.IllegalFormatCodePointException(int)

```java
public IllegalFormatCodePointException(int c)
```

Constructs an instance of this class with the specified illegal code
point as defined by `Character.isValidCodePoint`.

Parameters:

- `c`: The illegal Unicode code point

## IllegalFormatCodePointException.getCodePoint()

```java
public int getCodePoint()
```

Returns the illegal code point as defined by `Character.isValidCodePoint`.

**Returns:** The illegal Unicode code point
