---
title: "InstantiationException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/InstantiationException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InstantiationException class (java.lang)

```java
public class InstantiationException extends ReflectiveOperationException
```

Thrown when an application tries to create an instance of a class
using the `newInstance` method in class
`Class`, but the specified class object cannot be
instantiated.  The instantiation can fail for a variety of
reasons including but not limited to:

-  the class object represents an abstract class, an interface,
     an array class, a primitive type, or `void`

-  the class has no nullary constructor

**See also:** java.lang.Class#newInstance()

**Since:** 1.0

## InstantiationException.InstantiationException()

```java
public InstantiationException()
```

Constructs an `InstantiationException` with no detail message.

## InstantiationException.InstantiationException(String)

```java
public InstantiationException(String s)
```

Constructs an `InstantiationException` with the
specified detail message.

Parameters:

- `s`: the detail message.
