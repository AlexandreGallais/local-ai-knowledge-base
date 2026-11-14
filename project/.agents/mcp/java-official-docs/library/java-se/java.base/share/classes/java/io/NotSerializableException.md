---
title: "NotSerializableException class (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/NotSerializableException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NotSerializableException class (java.io)

```java
public class NotSerializableException extends ObjectStreamException
```

Thrown when an instance is required to have a Serializable interface.
The serialization runtime or the class of the instance can throw
this exception. The argument should be the name of the class.

**Since:** 1.1

## NotSerializableException.NotSerializableException(String)

```java
public NotSerializableException(String classname)
```

Constructs a NotSerializableException object with message string.

Parameters:

- `classname`: Class of the instance being serialized/deserialized.

## NotSerializableException.NotSerializableException()

```java
public NotSerializableException()
```

Constructs a NotSerializableException object.
