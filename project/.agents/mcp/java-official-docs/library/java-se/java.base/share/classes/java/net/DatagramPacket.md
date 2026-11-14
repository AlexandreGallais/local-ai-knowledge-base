# DatagramPacket class (java.net)

```java
public final class DatagramPacket
```

This class represents a datagram packet.
<p>
Datagram packets are used to implement a connectionless packet
delivery service. Each message is routed from one machine to
another based solely on information contained within that packet.
Multiple packets sent from one machine to another might be routed
differently, and might arrive in any order. Packet delivery is
not guaranteed.

<p>
Unless otherwise specified, passing a {@code null} argument causes
a {@link NullPointerException NullPointerException} to be thrown.

<p>
Methods and constructors of {@code DatagramPacket} accept parameters
of type {@link SocketAddress}. {@code DatagramPacket} supports
{@link InetSocketAddress}, and may support additional {@code SocketAddress}
sub-types.

@author  Pavani Diwanji
@author  Benjamin Renaud
@since   1.0

## DatagramPacket.DatagramPacket(byte[], int, int)

```java
public DatagramPacket(byte[] buf, int offset, int length)
```

Constructs a {@code DatagramPacket} for receiving packets of
length {@code length}, specifying an offset into the buffer.
<p>
The {@code length} argument must be less than or equal to
{@code buf.length}.

@param   buf     buffer for holding the incoming datagram.
@param   offset  the offset for the buffer
@param   length  the number of bytes to read.

@throws  IllegalArgumentException    if the length or offset
         is negative, or if the length plus the offset is
         greater than the length of the packet's given buffer.

@since   1.2

## DatagramPacket.DatagramPacket(byte[], int)

```java
public DatagramPacket(byte[] buf, int length)
```

Constructs a {@code DatagramPacket} for receiving packets of
length {@code length}.
<p>
The {@code length} argument must be less than or equal to
{@code buf.length}.

@param   buf     buffer for holding the incoming datagram.
@param   length  the number of bytes to read.

@throws  IllegalArgumentException    if the length is negative
         or if the length is greater than the length of the
         packet's given buffer.

## DatagramPacket.DatagramPacket(byte[], int, int, InetAddress, int)

```java
public DatagramPacket(byte[] buf, int offset, int length, InetAddress address, int port)
```

Constructs a datagram packet for sending packets of length
{@code length} with offset {@code offset} to the
specified port number on the specified host. The
{@code length} argument must be less than or equal to
{@code buf.length}.

@param   buf     the packet data.
@param   offset  the packet data offset.
@param   length  the packet data length.
@param   address the destination address, or {@code null}.
@param   port    the destination port number.

@throws  IllegalArgumentException    if the length or offset
         is negative, or if the length plus the offset is
         greater than the length of the packet's given buffer,
         or if the port is out of range.

@see     java.net.InetAddress

@since   1.2

## DatagramPacket.DatagramPacket(byte[], int, int, SocketAddress)

```java
public DatagramPacket(byte[] buf, int offset, int length, SocketAddress address)
```

Constructs a datagram packet for sending packets of length
{@code length} with offset {@code offset} to the
specified port number on the specified host. The
{@code length} argument must be less than or equal to
{@code buf.length}.

@param   buf     the packet data.
@param   offset  the packet data offset.
@param   length  the packet data length.
@param   address the destination socket address.

@throws  IllegalArgumentException    if address is null or its
         type is not supported, or if the length or offset is
         negative, or if the length plus the offset is greater
         than the length of the packet's given buffer.

@see     java.net.InetAddress

@since   1.4

## DatagramPacket.DatagramPacket(byte[], int, InetAddress, int)

```java
public DatagramPacket(byte[] buf, int length, InetAddress address, int port)
```

Constructs a datagram packet for sending packets of length
{@code length} to the specified port number on the specified
host. The {@code length} argument must be less than or equal
to {@code buf.length}.

@param   buf     the packet data.
@param   length  the packet length.
@param   address the destination address, or {@code null}.
@param   port    the destination port number.

@throws  IllegalArgumentException    if the length is negative,
         or if the length is greater than the length of the
         packet's given buffer, or if the port is out of range.

@see     java.net.InetAddress

## DatagramPacket.DatagramPacket(byte[], int, SocketAddress)

```java
public DatagramPacket(byte[] buf, int length, SocketAddress address)
```

Constructs a datagram packet for sending packets of length
{@code length} to the specified port number on the specified
host. The {@code length} argument must be less than or equal
to {@code buf.length}.

@param   buf     the packet data.
@param   length  the packet length.
@param   address the destination address.

@throws  IllegalArgumentException    if address is null or its type is
         not supported, or if the length is negative, or if the length
         is greater than the length of the packet's given buffer, or
         if the port is out of range.

@see     java.net.InetAddress

@since   1.4

## DatagramPacket.getAddress()

```java
public synchronized InetAddress getAddress()
```

Returns the IP address of the machine to which this datagram is being
sent or from which the datagram was received, or {@code null} if not
set.

@return  the IP address of the machine to which this datagram is being
         sent or from which the datagram was received.
@see     java.net.InetAddress
@see #setAddress(java.net.InetAddress)

## DatagramPacket.getPort()

```java
public synchronized int getPort()
```

Returns the port number on the remote host to which this datagram is
being sent or from which the datagram was received, or 0 if not set.

@return  the port number on the remote host to which this datagram is
         being sent or from which the datagram was received.
@see #setPort(int)

## DatagramPacket.getData()

```java
public synchronized byte[] getData()
```

Returns the data buffer. The data received or the data to be sent
starts from the {@code offset} in the buffer,
and runs for {@code length} long.

@return  the buffer used to receive or  send data
@see #setData(byte[], int, int)

## DatagramPacket.getOffset()

```java
public synchronized int getOffset()
```

Returns the offset of the data to be sent or the offset of the
data received.

@return  the offset of the data to be sent or the offset of the
         data received.

@since 1.2

## DatagramPacket.getLength()

```java
public synchronized int getLength()
```

Returns the length of the data to be sent or the length of the
data received.

@return  the length of the data to be sent or the length of the
         data received.
@see #setLength(int)

## DatagramPacket.setData(byte[], int, int)

```java
public synchronized void setData(byte[] buf, int offset, int length)
```

Set the data buffer for this packet. This sets the
data, length and offset of the packet.

@param   buf     the buffer to set for this packet
@param   offset  the offset into the data
@param   length  the length of the data
         and/or the length of the buffer used to receive data

@throws  IllegalArgumentException    if the length or offset
         is negative, or if the length plus the offset is
         greater than the length of the packet's given buffer.

@see     #getData
@see     #getOffset
@see     #getLength

@since   1.2

## DatagramPacket.setAddress(InetAddress)

```java
public synchronized void setAddress(InetAddress iaddr)
```

Sets the IP address of the machine to which this datagram
is being sent.

@param   iaddr   the {@code InetAddress}, or {@code null}.

@see     #getAddress()

@since   1.1

## DatagramPacket.setPort(int)

```java
public synchronized void setPort(int iport)
```

Sets the port number on the remote host to which this datagram
is being sent.

@param   iport   the port number

@throws  IllegalArgumentException    if the port is out of range

@see     #getPort()

@since   1.1

## DatagramPacket.setSocketAddress(SocketAddress)

```java
public synchronized void setSocketAddress(SocketAddress address)
```

Sets the SocketAddress (usually IP address + port number) of the remote
host to which this datagram is being sent.

@param   address the {@code SocketAddress}

@throws  IllegalArgumentException    if address is null or is a
         SocketAddress subclass not supported.

@see     #getSocketAddress

@since   1.4

## DatagramPacket.getSocketAddress()

```java
public synchronized SocketAddress getSocketAddress()
```

Returns the {@link InetSocketAddress#InetSocketAddress(InetAddress, int)
SocketAddress} (usually {@linkplain #getAddress() IP address} +
{@linkplain #getPort() port number}) of the remote host that this packet
is being sent to or is coming from.

@return  the {@code SocketAddress}

@see     #setSocketAddress

@since   1.4

## DatagramPacket.setData(byte[])

```java
public synchronized void setData(byte[] buf)
```

Set the data buffer for this packet. With the offset of
this DatagramPacket set to 0, and the length set to
the length of {@code buf}.

@param   buf     the buffer to set for this packet.

@see     #getLength
@see     #getData

@since   1.1

## DatagramPacket.setLength(int)

```java
public synchronized void setLength(int length)
```

Set the length for this packet. The length of the packet is
the number of bytes from the packet's data buffer that will be
sent, or the number of bytes of the packet's data buffer that
will be used for receiving data. The {@code length} plus the
{@link #getOffset() offset} must be lesser or equal to the
length of the packet's data buffer.

@param   length      the length to set for this packet.

@throws  IllegalArgumentException    if the length is negative,
         or if the length plus the offset is greater than the
         length of the packet's data buffer.

@see     #getLength
@see     #setData

@since   1.1