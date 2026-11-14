# HttpConnectTimeoutException class (java.net.http)

```java
public class HttpConnectTimeoutException extends HttpTimeoutException
```

Thrown when a connection, over which an {@code HttpRequest} is intended to be
sent, is not successfully established within a specified time period.

@since 11

## HttpConnectTimeoutException.HttpConnectTimeoutException(String)

```java
public HttpConnectTimeoutException(String message)
```

Constructs an {@code HttpConnectTimeoutException} with the given detail
message.

@param message
       The detail message; can be {@code null}