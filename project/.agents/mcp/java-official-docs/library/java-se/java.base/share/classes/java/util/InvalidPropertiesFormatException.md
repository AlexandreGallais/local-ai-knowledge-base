---
title: "InvalidPropertiesFormatException class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/InvalidPropertiesFormatException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InvalidPropertiesFormatException class (java.util)

```java
public class InvalidPropertiesFormatException extends IOException
```

Thrown to indicate that an operation could not complete because
the input did not conform to the appropriate XML document type
for a collection of properties, as per the `Properties`
specification.

Note, that although InvalidPropertiesFormatException inherits Serializable
interface from Exception, it is not intended to be Serializable. Appropriate
serialization methods are implemented to throw NotSerializableException.

**See also:** Properties

**Since:** 1.5

## InvalidPropertiesFormatException.InvalidPropertiesFormatException(Throwable)

```java
public InvalidPropertiesFormatException(Throwable cause)
```

Constructs an InvalidPropertiesFormatException with the specified
cause.

Parameters:

- `cause`: the cause (which is saved for later retrieval by the `Throwable.getCause()` method).

## InvalidPropertiesFormatException.InvalidPropertiesFormatException(String)

```java
public InvalidPropertiesFormatException(String message)
```

Constructs an InvalidPropertiesFormatException with the specified
detail message.

Parameters:

- `message`: the detail message. The detail message is saved for later retrieval by the `Throwable.getMessage()` method.
