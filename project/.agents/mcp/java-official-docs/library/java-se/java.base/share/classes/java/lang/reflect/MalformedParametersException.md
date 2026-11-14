---
title: "MalformedParametersException class (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/MalformedParametersException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MalformedParametersException class (java.lang.reflect)

```java
public class MalformedParametersException extends RuntimeException
```

Thrown when the java.lang.reflect package attempts to read method parameters from
a class file and determines that one or more parameters are
malformed.

The following is a list of conditions under which this exception
can be thrown:

-  The number of parameters (parameter_count) is wrong for the method

-  A constant pool index is out of bounds.

-  A constant pool index does not refer to a UTF-8 entry

-  A parameter's name is "", or contains an illegal character

-  The flags field contains an illegal flag (something other than
    FINAL, SYNTHETIC, or MANDATED)

See `java.lang.reflect.Executable.getParameters` for more
information.

**See also:** java.lang.reflect.Executable#getParameters

**Since:** 1.8

## MalformedParametersException.MalformedParametersException()

```java
public MalformedParametersException()
```

Create a `MalformedParametersException` with an empty
reason.

## MalformedParametersException.MalformedParametersException(String)

```java
public MalformedParametersException(String reason)
```

Create a `MalformedParametersException`.

Parameters:

- `reason`: The reason for the exception.
