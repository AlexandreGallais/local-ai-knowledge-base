---
title: "IncompleteAnnotationException class (java.lang.annotation)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/lang/annotation/IncompleteAnnotationException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# IncompleteAnnotationException class (java.lang.annotation)

```java
public class IncompleteAnnotationException extends RuntimeException
```

Thrown to indicate that a program has attempted to access an element of
an annotation interface that was added to the annotation interface definition
after the annotation was compiled (or serialized). This exception will not be
thrown if the new element has a default value.
This exception can be thrown by the API used to read annotations reflectively.

**See also:** java.lang.reflect.AnnotatedElement

**Since:** 1.5

## IncompleteAnnotationException.IncompleteAnnotationException(Class<? extends Annotation>, String)

```java
public IncompleteAnnotationException( Class<? extends Annotation> annotationType, String elementName)
```

Constructs an IncompleteAnnotationException to indicate that
the named element was missing from the specified annotation interface.

Parameters:

- `annotationType`: the Class object for the annotation interface
- `elementName`: the name of the missing element

Throws:

- `NullPointerException`: if either parameter is `null`

## IncompleteAnnotationException.annotationType()

```java
public Class<? extends Annotation> annotationType()
```

Returns the Class object for the annotation interface with the
missing element.

**Returns:** the Class object for the annotation interface with the
    missing element

## IncompleteAnnotationException.elementName()

```java
public String elementName()
```

Returns the name of the missing element.

**Returns:** the name of the missing element
