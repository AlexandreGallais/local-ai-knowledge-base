# UnsupportedTemporalTypeException class (java.time.temporal)

```java
public class UnsupportedTemporalTypeException extends DateTimeException
```

UnsupportedTemporalTypeException indicates that a ChronoField or ChronoUnit is
not supported for a Temporal class.

@implSpec
This class is intended for use in a single thread.

@since 1.8

## UnsupportedTemporalTypeException.UnsupportedTemporalTypeException(String)

```java
public UnsupportedTemporalTypeException(String message)
```

Constructs a new UnsupportedTemporalTypeException with the specified message.

@param message  the message to use for this exception, may be null

## UnsupportedTemporalTypeException.UnsupportedTemporalTypeException(String, Throwable)

```java
public UnsupportedTemporalTypeException(String message, Throwable cause)
```

Constructs a new UnsupportedTemporalTypeException with the specified message and cause.

@param message  the message to use for this exception, may be null
@param cause  the cause of the exception, may be null