# GenericSignatureFormatError class (java.lang.reflect)

```java
public class GenericSignatureFormatError extends ClassFormatError
```

Thrown when a syntactically malformed signature attribute is
encountered by a reflective method that needs to interpret the generic
signature information for a class or interface, method or constructor.

@since 1.5

## GenericSignatureFormatError.GenericSignatureFormatError()

```java
public GenericSignatureFormatError()
```

Constructs a new {@code GenericSignatureFormatError}.

## GenericSignatureFormatError.GenericSignatureFormatError(String)

```java
public GenericSignatureFormatError(String message)
```

Constructs a new {@code GenericSignatureFormatError} with the
specified message.

@param message the detail message, may be {@code null}