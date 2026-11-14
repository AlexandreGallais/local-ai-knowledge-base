# WebSocketHandshakeException class (java.net.http)

```java
public final class WebSocketHandshakeException extends IOException
```

Thrown when the opening handshake has failed.

@since 11

## WebSocketHandshakeException.WebSocketHandshakeException(HttpResponse<?>)

```java
public WebSocketHandshakeException(HttpResponse<?> response)
```

Constructs a {@code WebSocketHandshakeException} with the given
{@code HttpResponse}.

@param response
       the {@code HttpResponse} that resulted in the handshake failure

## WebSocketHandshakeException.getResponse()

```java
public HttpResponse<?> getResponse()
```

Returns the server's counterpart of the opening handshake.

<p> The value may be unavailable ({@code null}) if this exception has
been serialized and then deserialized.

@apiNote The primary purpose of this method is to allow programmatic
examination of the reasons behind the failure of the opening handshake.
Some of these reasons might allow recovery.

@return server response