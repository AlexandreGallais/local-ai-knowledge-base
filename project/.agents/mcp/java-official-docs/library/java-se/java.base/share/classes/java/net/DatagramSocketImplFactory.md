# DatagramSocketImplFactory interface (java.net)

```java
public interface DatagramSocketImplFactory
```

This interface defines a factory for datagram socket implementations. It
is used by the classes {@code DatagramSocket} to create actual socket
implementations.

@author  Yingxian Wang
@see     java.net.DatagramSocket
@since   1.3

## DatagramSocketImplFactory.createDatagramSocketImpl()

```java
DatagramSocketImpl createDatagramSocketImpl()
```

Creates a new {@code DatagramSocketImpl} instance.

@return  a new instance of {@code DatagramSocketImpl}.
@see     java.net.DatagramSocketImpl