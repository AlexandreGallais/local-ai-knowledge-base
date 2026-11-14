---
title: "UnknownHostException class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/UnknownHostException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# UnknownHostException class (java.net)

```java
public class UnknownHostException extends IOException
```

Thrown to indicate that the IP address of a host could not be determined.

**Since:** 1.0

## UnknownHostException.UnknownHostException(String)

```java
public UnknownHostException(String message)
```

Constructs a new `UnknownHostException` with the
specified detail message.

Parameters:

- `message`: the detail message.

## UnknownHostException.UnknownHostException()

```java
public UnknownHostException()
```

Constructs a new `UnknownHostException` with no detail
message.
