# BindException class (java.net)

```java
public class BindException extends SocketException
```

Signals that an error occurred while attempting to bind a
socket to a local address and port.  Typically, the port is
in use, or the requested local address could not be assigned.

@since   1.1

## BindException.BindException(String)

```java
public BindException(String msg)
```

Constructs a new BindException with the specified detail
message as to why the bind error occurred.
A detail message is a String that gives a specific
description of this error.
@param msg the detail message

## BindException.BindException()

```java
public BindException()
```

Construct a new BindException with no detailed message.