---
title: "DuplicateFormatFlagsException class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/DuplicateFormatFlagsException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DuplicateFormatFlagsException class (java.util)

```java
public non-sealed class DuplicateFormatFlagsException extends IllegalFormatException
```

Unchecked exception thrown when duplicate flags are provided in the format
specifier.

 Unless otherwise specified, passing a `null` argument to any
method or constructor in this class will cause a `NullPointerException` to be thrown.

**Since:** 1.5

## DuplicateFormatFlagsException.DuplicateFormatFlagsException(String)

```java
public DuplicateFormatFlagsException(String f)
```

Constructs an instance of this class with the specified flags.

Parameters:

- `f`: The set of format flags which contain a duplicate flag.

## DuplicateFormatFlagsException.getFlags()

```java
public String getFlags()
```

Returns the set of flags which contains a duplicate flag.

**Returns:** The flags
