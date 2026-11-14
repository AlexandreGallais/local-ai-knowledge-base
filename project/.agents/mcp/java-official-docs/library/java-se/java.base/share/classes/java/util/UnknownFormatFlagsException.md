---
title: "UnknownFormatFlagsException class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/UnknownFormatFlagsException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# UnknownFormatFlagsException class (java.util)

```java
public non-sealed class UnknownFormatFlagsException extends IllegalFormatException
```

Unchecked exception thrown when an unknown flag is given.

 Unless otherwise specified, passing a `null` argument to any
method or constructor in this class will cause a `NullPointerException` to be thrown.

**Since:** 1.5

## UnknownFormatFlagsException.UnknownFormatFlagsException(String)

```java
public UnknownFormatFlagsException(String f)
```

Constructs an instance of this class with the specified flags.

Parameters:

- `f`: The set of format flags which contain an unknown flag

## UnknownFormatFlagsException.getFlags()

```java
public String getFlags()
```

Returns the set of flags which contains an unknown flag.

**Returns:** The flags
