---
title: "AnnotationFormatError class (java.lang.annotation)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/annotation/AnnotationFormatError.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AnnotationFormatError class (java.lang.annotation)

```java
public class AnnotationFormatError extends Error
```

Thrown when the annotation parser attempts to read an annotation
from a class file and determines that the annotation is malformed.
This error can be thrown by the API used to read annotations reflectively.

**See also:** java.lang.reflect.AnnotatedElement

**Since:** 1.5

## AnnotationFormatError.AnnotationFormatError(String)

```java
public AnnotationFormatError(String message)
```

Constructs a new `AnnotationFormatError` with the specified
detail message.

Parameters:

- `message`: the detail message.

## AnnotationFormatError.AnnotationFormatError(String, Throwable)

```java
public AnnotationFormatError(String message, Throwable cause)
```

Constructs a new `AnnotationFormatError` with the specified
detail message and cause.  Note that the detail message associated
with `cause` is *not* automatically incorporated in
this error's detail message.

Parameters:

- `message`: the detail message
- `cause`: the cause (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)

## AnnotationFormatError.AnnotationFormatError(Throwable)

```java
public AnnotationFormatError(Throwable cause)
```

Constructs a new `AnnotationFormatError` with the specified
cause and a detail message of
`(cause == null ? null : cause.toString())` (which
typically contains the class and detail message of `cause`).

Parameters:

- `cause`: the cause (A `null` value is permitted, and indicates that the cause is nonexistent or unknown.)
