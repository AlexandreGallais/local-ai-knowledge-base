---
title: "AnnotationTypeMismatchException class (java.lang.annotation)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/annotation/AnnotationTypeMismatchException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# AnnotationTypeMismatchException class (java.lang.annotation)

```java
public class AnnotationTypeMismatchException extends RuntimeException
```

Thrown to indicate that a program has attempted to access an element of
an annotation whose type has changed after the annotation was compiled
(or serialized).
This exception can be thrown by the API used to read annotations reflectively.

**See also:** java.lang.reflect.AnnotatedElement

**Since:** 1.5

## AnnotationTypeMismatchException.AnnotationTypeMismatchException(Method, String)

```java
public AnnotationTypeMismatchException(Method element, String foundType)
```

Constructs an AnnotationTypeMismatchException for the specified
annotation type element and found data type.

Parameters:

- `element`: the `Method` object for the annotation element, may be `null`
- `foundType`: the (erroneous) type of data found in the annotation. This string may, but is not required to, contain the value as well. The exact format of the string is unspecified, may be `null`.

## AnnotationTypeMismatchException.element()

```java
public Method element()
```

Returns the `Method` object for the incorrectly typed element.
The value may be unavailable if this exception has been
serialized and then read back in.

**Returns:** the `Method` object for the incorrectly typed
element, or `null` if unavailable

## AnnotationTypeMismatchException.foundType()

```java
public String foundType()
```

Returns the type of data found in the incorrectly typed element.
The returned string may, but is not required to, contain the value
as well.  The exact format of the string is unspecified and the string
may be `null`.

**Returns:** the type of data found in the incorrectly typed element
