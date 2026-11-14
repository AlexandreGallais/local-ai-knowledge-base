---
title: "MissingResourceException class (java.util)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/util/MissingResourceException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MissingResourceException class (java.util)

```java
public class MissingResourceException extends RuntimeException
```

Signals that a resource is missing.

**See also:** java.lang.Exception

**See also:** ResourceBundle

**Since:** 1.1

## MissingResourceException.MissingResourceException(String, String, String)

```java
public MissingResourceException(String s, String className, String key)
```

Constructs a MissingResourceException with the specified information.
A detail message is a String that describes this particular exception.

Parameters:

- `s`: the detail message
- `className`: the name of the resource class
- `key`: the key for the missing resource.

## MissingResourceException.getClassName()

```java
public String getClassName()
```

Gets parameter passed by constructor.

**Returns:** the name of the resource class

## MissingResourceException.getKey()

```java
public String getKey()
```

Gets parameter passed by constructor.

**Returns:** the key for the missing resource
