---
title: "InvalidModuleDescriptorException class (java.lang.module)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/module/InvalidModuleDescriptorException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# InvalidModuleDescriptorException class (java.lang.module)

```java
public class InvalidModuleDescriptorException extends RuntimeException
```

Thrown when reading a module descriptor and the module descriptor is found
to be malformed or otherwise cannot be interpreted as a module descriptor.

**See also:** ModuleDescriptor#read

**Since:** 9

## InvalidModuleDescriptorException.InvalidModuleDescriptorException()

```java
public InvalidModuleDescriptorException()
```

Constructs an `InvalidModuleDescriptorException` with no detail
message.

## InvalidModuleDescriptorException.InvalidModuleDescriptorException(String)

```java
public InvalidModuleDescriptorException(String msg)
```

Constructs an `InvalidModuleDescriptorException` with the
specified detail message.

Parameters:

- `msg`: The detail message; can be `null`
