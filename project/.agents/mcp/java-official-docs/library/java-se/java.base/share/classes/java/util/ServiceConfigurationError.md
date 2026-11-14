# ServiceConfigurationError class (java.util)

```java
public class ServiceConfigurationError extends Error
```

Error thrown when something goes wrong while locating, loading, or
instantiating a service provider.

@author Mark Reinhold
@since 1.6
@see ServiceLoader

## ServiceConfigurationError.ServiceConfigurationError(String)

```java
public ServiceConfigurationError(String msg)
```

Constructs a new instance with the specified message.

@param  msg  The message, or {@code null} if there is no message

## ServiceConfigurationError.ServiceConfigurationError(String, Throwable)

```java
public ServiceConfigurationError(String msg, Throwable cause)
```

Constructs a new instance with the specified message and cause.

@param  msg  The message, or {@code null} if there is no message

@param  cause  The cause, or {@code null} if the cause is nonexistent
               or unknown