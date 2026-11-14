---
title: "ObjectInputValidation interface (java.io)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/io/ObjectInputValidation.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ObjectInputValidation interface (java.io)

```java
public interface ObjectInputValidation
```

Callback interface to allow validation of objects within a graph.
Allows an object to be called when a complete graph of objects has
been deserialized.

**See also:** ObjectInputStream

**See also:** ObjectInputStream#registerValidation(java.io.ObjectInputValidation, int)

**Since:** 1.1

## ObjectInputValidation.validateObject()

```java
public void validateObject() throws InvalidObjectException
```

Validates the object.

Throws:

- `InvalidObjectException`: If the object cannot validate itself.
