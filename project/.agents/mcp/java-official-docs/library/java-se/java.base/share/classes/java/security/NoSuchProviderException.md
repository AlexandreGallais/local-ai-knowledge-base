# NoSuchProviderException class (java.security)

```java
public class NoSuchProviderException extends GeneralSecurityException
```

This exception is thrown when a particular security provider is
requested but is not available in the environment.

@author Benjamin Renaud
@since 1.1

## NoSuchProviderException.NoSuchProviderException()

```java
public NoSuchProviderException()
```

Constructs a {@code NoSuchProviderException} with no detail message. A
detail message is a {@code String} that describes this particular
exception.

## NoSuchProviderException.NoSuchProviderException(String)

```java
public NoSuchProviderException(String msg)
```

Constructs a {@code NoSuchProviderException} with the specified detail
message. A detail message is a {@code String} that describes this
particular exception.

@param msg the detail message.