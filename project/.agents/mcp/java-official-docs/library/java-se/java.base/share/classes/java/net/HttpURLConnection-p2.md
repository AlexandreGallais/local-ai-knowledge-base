---
title: "HttpURLConnection class (java.net) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/HttpURLConnection.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# HttpURLConnection class (java.net) (part 2 of 2)

## HttpURLConnection.getErrorStream()

```java
public InputStream getErrorStream()
```

Returns the error stream if the connection failed
but the server sent useful data nonetheless. The
typical example is when an HTTP server responds
with a 404, which will cause a FileNotFoundException
to be thrown in connect, but the server sent an HTML
help page with suggestions as to what to do.

This method will not cause a connection to be initiated.  If
the connection was not connected, or if the server did not have
an error while connecting or if the server had an error but
no error data was sent, this method will return null. This is
the default.

**Returns:** an error stream if any, null if there have been no
errors, the connection is not connected or the server sent no
useful data.

## HttpURLConnection.HTTP_OK

```java
public static final int HTTP_OK
```

HTTP Status-Code 200: OK.

## HttpURLConnection.HTTP_CREATED

```java
public static final int HTTP_CREATED
```

HTTP Status-Code 201: Created.

## HttpURLConnection.HTTP_ACCEPTED

```java
public static final int HTTP_ACCEPTED
```

HTTP Status-Code 202: Accepted.

## HttpURLConnection.HTTP_NOT_AUTHORITATIVE

```java
public static final int HTTP_NOT_AUTHORITATIVE
```

HTTP Status-Code 203: Non-Authoritative Information.

## HttpURLConnection.HTTP_NO_CONTENT

```java
public static final int HTTP_NO_CONTENT
```

HTTP Status-Code 204: No Content.

## HttpURLConnection.HTTP_RESET

```java
public static final int HTTP_RESET
```

HTTP Status-Code 205: Reset Content.

## HttpURLConnection.HTTP_PARTIAL

```java
public static final int HTTP_PARTIAL
```

HTTP Status-Code 206: Partial Content.

## HttpURLConnection.HTTP_MULT_CHOICE

```java
public static final int HTTP_MULT_CHOICE
```

HTTP Status-Code 300: Multiple Choices.

## HttpURLConnection.HTTP_MOVED_PERM

```java
public static final int HTTP_MOVED_PERM
```

HTTP Status-Code 301: Moved Permanently.

## HttpURLConnection.HTTP_MOVED_TEMP

```java
public static final int HTTP_MOVED_TEMP
```

HTTP Status-Code 302: Temporary Redirect.

## HttpURLConnection.HTTP_SEE_OTHER

```java
public static final int HTTP_SEE_OTHER
```

HTTP Status-Code 303: See Other.

## HttpURLConnection.HTTP_NOT_MODIFIED

```java
public static final int HTTP_NOT_MODIFIED
```

HTTP Status-Code 304: Not Modified.

## HttpURLConnection.HTTP_USE_PROXY

```java
public static final int HTTP_USE_PROXY
```

HTTP Status-Code 305: Use Proxy.

## HttpURLConnection.HTTP_BAD_REQUEST

```java
public static final int HTTP_BAD_REQUEST
```

HTTP Status-Code 400: Bad Request.

## HttpURLConnection.HTTP_UNAUTHORIZED

```java
public static final int HTTP_UNAUTHORIZED
```

HTTP Status-Code 401: Unauthorized.

## HttpURLConnection.HTTP_PAYMENT_REQUIRED

```java
public static final int HTTP_PAYMENT_REQUIRED
```

HTTP Status-Code 402: Payment Required.

## HttpURLConnection.HTTP_FORBIDDEN

```java
public static final int HTTP_FORBIDDEN
```

HTTP Status-Code 403: Forbidden.

## HttpURLConnection.HTTP_NOT_FOUND

```java
public static final int HTTP_NOT_FOUND
```

HTTP Status-Code 404: Not Found.

## HttpURLConnection.HTTP_BAD_METHOD

```java
public static final int HTTP_BAD_METHOD
```

HTTP Status-Code 405: Method Not Allowed.

## HttpURLConnection.HTTP_NOT_ACCEPTABLE

```java
public static final int HTTP_NOT_ACCEPTABLE
```

HTTP Status-Code 406: Not Acceptable.

## HttpURLConnection.HTTP_PROXY_AUTH

```java
public static final int HTTP_PROXY_AUTH
```

HTTP Status-Code 407: Proxy Authentication Required.

## HttpURLConnection.HTTP_CLIENT_TIMEOUT

```java
public static final int HTTP_CLIENT_TIMEOUT
```

HTTP Status-Code 408: Request Time-Out.

## HttpURLConnection.HTTP_CONFLICT

```java
public static final int HTTP_CONFLICT
```

HTTP Status-Code 409: Conflict.

## HttpURLConnection.HTTP_GONE

```java
public static final int HTTP_GONE
```

HTTP Status-Code 410: Gone.

## HttpURLConnection.HTTP_LENGTH_REQUIRED

```java
public static final int HTTP_LENGTH_REQUIRED
```

HTTP Status-Code 411: Length Required.

## HttpURLConnection.HTTP_PRECON_FAILED

```java
public static final int HTTP_PRECON_FAILED
```

HTTP Status-Code 412: Precondition Failed.

## HttpURLConnection.HTTP_ENTITY_TOO_LARGE

```java
public static final int HTTP_ENTITY_TOO_LARGE
```

HTTP Status-Code 413: Request Entity Too Large.

## HttpURLConnection.HTTP_REQ_TOO_LONG

```java
public static final int HTTP_REQ_TOO_LONG
```

HTTP Status-Code 414: Request-URI Too Large.

## HttpURLConnection.HTTP_UNSUPPORTED_TYPE

```java
public static final int HTTP_UNSUPPORTED_TYPE
```

HTTP Status-Code 415: Unsupported Media Type.

## HttpURLConnection.HTTP_SERVER_ERROR

```java
public static final int HTTP_SERVER_ERROR
```

HTTP Status-Code 500: Internal Server Error.

**Deprecated:** it is misplaced and shouldn't have existed.

## HttpURLConnection.HTTP_INTERNAL_ERROR

```java
public static final int HTTP_INTERNAL_ERROR
```

HTTP Status-Code 500: Internal Server Error.

## HttpURLConnection.HTTP_NOT_IMPLEMENTED

```java
public static final int HTTP_NOT_IMPLEMENTED
```

HTTP Status-Code 501: Not Implemented.

## HttpURLConnection.HTTP_BAD_GATEWAY

```java
public static final int HTTP_BAD_GATEWAY
```

HTTP Status-Code 502: Bad Gateway.

## HttpURLConnection.HTTP_UNAVAILABLE

```java
public static final int HTTP_UNAVAILABLE
```

HTTP Status-Code 503: Service Unavailable.

## HttpURLConnection.HTTP_GATEWAY_TIMEOUT

```java
public static final int HTTP_GATEWAY_TIMEOUT
```

HTTP Status-Code 504: Gateway Timeout.

## HttpURLConnection.HTTP_VERSION

```java
public static final int HTTP_VERSION
```

HTTP Status-Code 505: HTTP Version Not Supported.
