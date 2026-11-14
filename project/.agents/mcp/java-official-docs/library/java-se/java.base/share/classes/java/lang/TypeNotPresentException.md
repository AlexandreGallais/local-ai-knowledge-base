---
title: "TypeNotPresentException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/TypeNotPresentException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# TypeNotPresentException class (java.lang)

```java
public class TypeNotPresentException extends RuntimeException
```

Thrown when an application tries to access a type using a string
representing the type's name, but no definition for the type with
the specified name can be found. This exception differs from
`ClassNotFoundException` in that `ClassNotFoundException`
is a checked exception, whereas this exception is unchecked.

Note that this exception may be used when undefined type variables
are accessed as well as when types (e.g., classes, interfaces or
annotation types) are loaded.
In particular, this exception can be thrown by the API used to read annotations reflectively.

**See also:** java.lang.reflect.AnnotatedElement

**Since:** 1.5

## TypeNotPresentException.TypeNotPresentException(String, Throwable)

```java
public TypeNotPresentException(String typeName, Throwable cause)
```

Constructs a `TypeNotPresentException` for the named type or
type variable with the specified cause.

Parameters:

- `typeName`: the fully qualified name of the unavailable type or type variable
- `cause`: the exception that was thrown when the system attempted to load the named type, or `null` if unavailable or inapplicable

## TypeNotPresentException.typeName()

```java
public String typeName()
```

Returns the fully qualified name of the unavailable type or type variable name.

**Returns:** the fully qualified name of the unavailable type or type variable name
