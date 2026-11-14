# AnnotationTypeMismatchException class (java.lang.annotation)

```java
public class AnnotationTypeMismatchException extends RuntimeException
```

Thrown to indicate that a program has attempted to access an element of
an annotation whose type has changed after the annotation was compiled
(or serialized).
This exception can be thrown by the {@linkplain
java.lang.reflect.AnnotatedElement API used to read annotations
reflectively}.

@author  Josh Bloch
@see     java.lang.reflect.AnnotatedElement
@since 1.5

## AnnotationTypeMismatchException.AnnotationTypeMismatchException(Method, String)

```java
public AnnotationTypeMismatchException(Method element, String foundType)
```

Constructs an AnnotationTypeMismatchException for the specified
annotation type element and found data type.

@param element the {@code Method} object for the annotation
element, may be {@code null}
@param foundType the (erroneous) type of data found in the annotation.
       This string may, but is not required to, contain the value
       as well.  The exact format of the string is unspecified,
       may be {@code null}.

## AnnotationTypeMismatchException.element()

```java
public Method element()
```

Returns the {@code Method} object for the incorrectly typed element.
The value may be unavailable if this exception has been
serialized and then read back in.

@return the {@code Method} object for the incorrectly typed
element, or {@code null} if unavailable

## AnnotationTypeMismatchException.foundType()

```java
public String foundType()
```

Returns the type of data found in the incorrectly typed element.
The returned string may, but is not required to, contain the value
as well.  The exact format of the string is unspecified and the string
may be {@code null}.

@return the type of data found in the incorrectly typed element