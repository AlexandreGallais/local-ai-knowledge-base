# ZoneRulesException class (java.time.zone)

```java
public class ZoneRulesException extends DateTimeException
```

Thrown to indicate a problem with time-zone configuration.
<p>
This exception is used to indicate a problems with the configured
time-zone rules.

@implSpec
This class is intended for use in a single thread.

@since 1.8

## ZoneRulesException.ZoneRulesException(String)

```java
public ZoneRulesException(String message)
```

Constructs a new date-time exception with the specified message.

@param message  the message to use for this exception, may be null

## ZoneRulesException.ZoneRulesException(String, Throwable)

```java
public ZoneRulesException(String message, Throwable cause)
```

Constructs a new date-time exception with the specified message and cause.

@param message  the message to use for this exception, may be null
@param cause  the cause of the exception, may be null