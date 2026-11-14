# TypeNotPresentException class (java.lang)

```java
public class TypeNotPresentException extends RuntimeException
```

Thrown when an application tries to access a type using a string
representing the type's name, but no definition for the type with
the specified name can be found. This exception differs from
{@link ClassNotFoundException} in that {@code ClassNotFoundException}
is a checked exception, whereas this exception is unchecked.

<p>Note that this exception may be used when undefined type variables
are accessed as well as when types (e.g., classes, interfaces or
annotation types) are loaded.
In particular, this exception can be thrown by the {@linkplain
java.lang.reflect.AnnotatedElement API used to read annotations
reflectively}.

@author  Josh Bloch
@see     java.lang.reflect.AnnotatedElement
@since 1.5

## TypeNotPresentException.TypeNotPresentException(String, Throwable)

```java
public TypeNotPresentException(String typeName, Throwable cause)
```

Constructs a {@code TypeNotPresentException} for the named type or
type variable with the specified cause.

@param typeName the fully qualified name of the unavailable type or type variable
@param cause the exception that was thrown when the system attempted to
   load the named type, or {@code null} if unavailable or inapplicable

## TypeNotPresentException.typeName()

```java
public String typeName()
```

Returns the fully qualified name of the unavailable type or type variable name.

@return the fully qualified name of the unavailable type or type variable name