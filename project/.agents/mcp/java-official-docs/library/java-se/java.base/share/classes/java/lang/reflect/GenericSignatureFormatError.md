---
title: "GenericSignatureFormatError class (java.lang.reflect)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/reflect/GenericSignatureFormatError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# GenericSignatureFormatError class (java.lang.reflect)

```java
public class GenericSignatureFormatError extends ClassFormatError
```

Thrown when a syntactically malformed signature attribute is
encountered by a reflective method that needs to interpret the generic
signature information for a class or interface, method or constructor.

**Since:** 1.5

## GenericSignatureFormatError.GenericSignatureFormatError()

```java
public GenericSignatureFormatError()
```

Constructs a new `GenericSignatureFormatError`.

## GenericSignatureFormatError.GenericSignatureFormatError(String)

```java
public GenericSignatureFormatError(String message)
```

Constructs a new `GenericSignatureFormatError` with the
specified message.

Parameters:

- `message`: the detail message, may be `null`
