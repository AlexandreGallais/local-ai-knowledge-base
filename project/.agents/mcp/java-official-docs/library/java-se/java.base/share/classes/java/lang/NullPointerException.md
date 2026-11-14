---
title: "NullPointerException class (java.lang)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/NullPointerException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NullPointerException class (java.lang)

```java
public class NullPointerException extends RuntimeException
```

Thrown when an application attempts to use `null` in a
case where an object is required. These include:

- Calling the instance method of a `null` object.

- Accessing or modifying the field of a `null` object.

- Taking the length of `null` as if it were an array.

- Accessing or modifying the slots of `null` as if it
    were an array.

- Throwing `null` as if it were a `Throwable`
    value.

Applications should throw instances of this class to indicate
other illegal uses of the `null` object.

`NullPointerException` objects may be constructed by the
virtual machine as if Throwable, boolean, boolean) suppression were disabled and/or the stack trace was not writable.

**Since:** 1.0

## NullPointerException.NullPointerException()

```java
public NullPointerException()
```

Constructs a `NullPointerException` with no detail message.

## NullPointerException.NullPointerException(String)

```java
public NullPointerException(String s)
```

Constructs a `NullPointerException` with the specified
detail message.

Parameters:

- `s`: the detail message.

## NullPointerException.fillInStackTrace()

```java
public synchronized Throwable fillInStackTrace()
```

(inherited documentation)

## NullPointerException.getMessage()

```java
public String getMessage()
```

Returns the detail message string of this throwable.

 If a non-null message was supplied in a constructor it is
returned. Otherwise, an implementation specific message or
`null` is returned.

**Implementation note:** If no explicit message was passed to the constructor, and as
long as certain internal information is available, a verbose
description of the null reference is returned.
The internal information is not available in deserialized
NullPointerExceptions.

**Returns:** the detail message string, which may be `null`.
