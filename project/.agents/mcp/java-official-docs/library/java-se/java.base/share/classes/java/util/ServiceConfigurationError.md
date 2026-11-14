---
title: "ServiceConfigurationError class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/ServiceConfigurationError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ServiceConfigurationError class (java.util)

```java
public class ServiceConfigurationError extends Error
```

Error thrown when something goes wrong while locating, loading, or
instantiating a service provider.

**Since:** 1.6

**See also:** ServiceLoader

## ServiceConfigurationError.ServiceConfigurationError(String)

```java
public ServiceConfigurationError(String msg)
```

Constructs a new instance with the specified message.

Parameters:

- `msg`: The message, or `null` if there is no message

## ServiceConfigurationError.ServiceConfigurationError(String, Throwable)

```java
public ServiceConfigurationError(String msg, Throwable cause)
```

Constructs a new instance with the specified message and cause.

Parameters:

- `msg`: The message, or `null` if there is no message
- `cause`: The cause, or `null` if the cause is nonexistent or unknown
