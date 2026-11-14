# SocketImplFactory interface (java.net)

```java
public interface SocketImplFactory
```

This interface defines a factory for socket implementations. It
is used by the classes {@code Socket} and
{@code ServerSocket} to create actual socket
implementations.

@author  Arthur van Hoff
@see     java.net.Socket
@see     java.net.ServerSocket
@since   1.0

## SocketImplFactory.createSocketImpl()

```java
SocketImpl createSocketImpl()
```

Creates a new {@code SocketImpl} instance.

@return  a new instance of {@code SocketImpl}.
@see     java.net.SocketImpl