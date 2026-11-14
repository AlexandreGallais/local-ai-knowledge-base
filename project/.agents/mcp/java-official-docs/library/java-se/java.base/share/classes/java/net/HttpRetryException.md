# HttpRetryException class (java.net)

```java
public class HttpRetryException extends IOException
```

Thrown to indicate that a HTTP request needs to be retried
but cannot be retried automatically, due to streaming mode
being enabled.

@author  Michael McMahon
@since   1.5

## HttpRetryException.HttpRetryException(String, int)

```java
public HttpRetryException(String detail, int code)
```

Constructs a new {@code HttpRetryException} from the
specified response code and exception detail message

@param   detail   the detail message.
@param   code   the HTTP response code from server.

## HttpRetryException.HttpRetryException(String, int, String)

```java
public HttpRetryException(String detail, int code, String location)
```

Constructs a new {@code HttpRetryException} with detail message
responseCode and the contents of the Location response header field.

@param   detail   the detail message.
@param   code   the HTTP response code from server.
@param   location   the URL to be redirected to

## HttpRetryException.responseCode()

```java
public int responseCode()
```

Returns the http response code

@return  The http response code.

## HttpRetryException.getReason()

```java
public String getReason()
```

Returns a string explaining why the http request could
not be retried.

@return  The reason string

## HttpRetryException.getLocation()

```java
public String getLocation()
```

Returns the value of the Location header field if the
error resulted from redirection.

@return The location string