# InvalidObjectException class (java.io)

```java
public class InvalidObjectException extends ObjectStreamException
```

Indicates that one or more deserialized objects failed validation
tests.  The argument should provide the reason for the failure.

@see ObjectInputValidation
@since 1.1

## InvalidObjectException.InvalidObjectException(String)

```java
public InvalidObjectException(String reason)
```

Constructs an {@code InvalidObjectException}.
@param reason Detailed message explaining the reason for the failure.

@see ObjectInputValidation

## InvalidObjectException.InvalidObjectException(String, Throwable)

```java
public InvalidObjectException(String reason, Throwable cause)
```

Constructs an {@code InvalidObjectException} with the given
reason and cause.

@param reason Detailed message explaining the reason for the failure.
@param cause the cause

@see ObjectInputValidation
@since 19