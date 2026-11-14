---
title: "ExceptionInInitializerError class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/ExceptionInInitializerError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# ExceptionInInitializerError class (java.lang)

```java
public class ExceptionInInitializerError extends LinkageError
```

Signals that an unexpected exception has occurred in a static initializer.
An `ExceptionInInitializerError` is thrown to indicate that an
exception occurred during evaluation of a static initializer or the
initializer for a static variable.

**Since:** 1.1

## ExceptionInInitializerError.ExceptionInInitializerError()

```java
public ExceptionInInitializerError()
```

Constructs an `ExceptionInInitializerError` with
`null` as its detail message string and with no saved
throwable object.
A detail message is a String that describes this particular exception.

## ExceptionInInitializerError.ExceptionInInitializerError(Throwable)

```java
public ExceptionInInitializerError(Throwable thrown)
```

Constructs a new `ExceptionInInitializerError` class by
saving a reference to the `Throwable` object thrown for
later retrieval by the `getException()` method. The detail
message string is set to `null`.

Parameters:

- `thrown`: The exception thrown

## ExceptionInInitializerError.ExceptionInInitializerError(String)

```java
public ExceptionInInitializerError(String s)
```

Constructs an `ExceptionInInitializerError` with the specified detail
message string.  A detail message is a String that describes this
particular exception. The detail message string is saved for later
retrieval by the `Throwable.getMessage()` method. There is no
saved throwable object.

Parameters:

- `s`: the detail message

## ExceptionInInitializerError.getException()

```java
public Throwable getException()
```

Returns the exception that occurred during a static initialization that
caused this error to be created.

**API note:** This method predates the general-purpose exception chaining facility.
The `Throwable.getCause()` method is now the preferred means of
obtaining this information.

**Returns:** the saved throwable object of this
        `ExceptionInInitializerError`, or `null`
        if this `ExceptionInInitializerError` has no saved
        throwable object.
