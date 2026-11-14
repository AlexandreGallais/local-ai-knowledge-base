# IncompleteAnnotationException class (java.lang.annotation)

```java
public class IncompleteAnnotationException extends RuntimeException
```

Thrown to indicate that a program has attempted to access an element of
an annotation interface that was added to the annotation interface definition
after the annotation was compiled (or serialized). This exception will not be
thrown if the new element has a default value.
This exception can be thrown by the {@linkplain
java.lang.reflect.AnnotatedElement API used to read annotations
reflectively}.

@author  Josh Bloch
@see     java.lang.reflect.AnnotatedElement
@since 1.5

## IncompleteAnnotationException.IncompleteAnnotationException(Class<? extends Annotation>, String)

```java
public IncompleteAnnotationException( Class<? extends Annotation> annotationType, String elementName)
```

Constructs an IncompleteAnnotationException to indicate that
the named element was missing from the specified annotation interface.

@param annotationType the Class object for the annotation interface
@param elementName the name of the missing element
@throws NullPointerException if either parameter is {@code null}

## IncompleteAnnotationException.annotationType()

```java
public Class<? extends Annotation> annotationType()
```

Returns the Class object for the annotation interface with the
missing element.

@return the Class object for the annotation interface with the
    missing element

## IncompleteAnnotationException.elementName()

```java
public String elementName()
```

Returns the name of the missing element.

@return the name of the missing element