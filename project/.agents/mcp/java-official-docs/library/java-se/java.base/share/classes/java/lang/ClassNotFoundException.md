---
title: "ClassNotFoundException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/ClassNotFoundException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ClassNotFoundException class (java.lang)

```java
public class ClassNotFoundException extends ReflectiveOperationException
```

Thrown when an application tries to load in a class through its
string name using:

- The `forName` method in class `Class`.

- The `findSystemClass` method in class
    `ClassLoader` .

- The `loadClass` method in class `ClassLoader`.

but no definition for the class with the specified name could be found.

**See also:** java.lang.Class#forName(java.lang.String)

**See also:** java.lang.ClassLoader#findSystemClass(java.lang.String)

**See also:** java.lang.ClassLoader#loadClass(java.lang.String, boolean)

**Since:** 1.0

## ClassNotFoundException.ClassNotFoundException()

```java
public ClassNotFoundException()
```

Constructs a `ClassNotFoundException` with no detail message.

## ClassNotFoundException.ClassNotFoundException(String)

```java
public ClassNotFoundException(String s)
```

Constructs a `ClassNotFoundException` with the
specified detail message.

Parameters:

- `s`: the detail message.

## ClassNotFoundException.ClassNotFoundException(String, Throwable)

```java
public ClassNotFoundException(String s, Throwable ex)
```

Constructs a `ClassNotFoundException` with the
specified detail message and optional exception that was
raised while loading the class.

Parameters:

- `s`: the detail message
- `ex`: the exception that was raised while loading the class

**Since:** 1.2

## ClassNotFoundException.getException()

```java
public Throwable getException()
```

Returns the exception that was raised if an error occurred while
attempting to load the class. Otherwise, returns `null`.

**API note:** This method predates the general-purpose exception chaining facility.
The `Throwable.getCause()` method is now the preferred means of
obtaining this information.

**Returns:** the `Exception` that was raised while loading a class

**Since:** 1.2
