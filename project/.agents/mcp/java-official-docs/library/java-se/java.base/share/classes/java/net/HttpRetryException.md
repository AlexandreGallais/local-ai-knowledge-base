---
title: "HttpRetryException class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/HttpRetryException.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# HttpRetryException class (java.net)

```java
public class HttpRetryException extends IOException
```

Thrown to indicate that a HTTP request needs to be retried
but cannot be retried automatically, due to streaming mode
being enabled.

**Since:** 1.5

## HttpRetryException.HttpRetryException(String, int)

```java
public HttpRetryException(String detail, int code)
```

Constructs a new `HttpRetryException` from the
specified response code and exception detail message

Parameters:

- `detail`: the detail message.
- `code`: the HTTP response code from server.

## HttpRetryException.HttpRetryException(String, int, String)

```java
public HttpRetryException(String detail, int code, String location)
```

Constructs a new `HttpRetryException` with detail message
responseCode and the contents of the Location response header field.

Parameters:

- `detail`: the detail message.
- `code`: the HTTP response code from server.
- `location`: the URL to be redirected to

## HttpRetryException.responseCode()

```java
public int responseCode()
```

Returns the http response code

**Returns:** The http response code.

## HttpRetryException.getReason()

```java
public String getReason()
```

Returns a string explaining why the http request could
not be retried.

**Returns:** The reason string

## HttpRetryException.getLocation()

```java
public String getLocation()
```

Returns the value of the Location header field if the
error resulted from redirection.

**Returns:** The location string
