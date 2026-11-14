---
title: "IllegalFormatFlagsException class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/IllegalFormatFlagsException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IllegalFormatFlagsException class (java.util)

```java
public non-sealed class IllegalFormatFlagsException extends IllegalFormatException
```

Unchecked exception thrown when an illegal combination flags is given.

 Unless otherwise specified, passing a `null` argument to any
method or constructor in this class will cause a `NullPointerException` to be thrown.

**Since:** 1.5

## IllegalFormatFlagsException.IllegalFormatFlagsException(String)

```java
public IllegalFormatFlagsException(String f)
```

Constructs an instance of this class with the specified flags.

Parameters:

- `f`: The set of format flags which contain an illegal combination

## IllegalFormatFlagsException.getFlags()

```java
public String getFlags()
```

Returns the set of flags which contains an illegal combination.

**Returns:** The flags
