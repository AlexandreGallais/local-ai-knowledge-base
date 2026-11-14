---
title: "DatagramPacket class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/DatagramPacket.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# DatagramPacket class (java.net)

```java
public final class DatagramPacket
```

This class represents a datagram packet.

Datagram packets are used to implement a connectionless packet
delivery service. Each message is routed from one machine to
another based solely on information contained within that packet.
Multiple packets sent from one machine to another might be routed
differently, and might arrive in any order. Packet delivery is
not guaranteed.

Unless otherwise specified, passing a `null` argument causes
a NullPointerException to be thrown.

Methods and constructors of `DatagramPacket` accept parameters
of type `SocketAddress`. `DatagramPacket` supports
`InetSocketAddress`, and may support additional `SocketAddress`
sub-types.

**Since:** 1.0

## DatagramPacket.DatagramPacket(byte[], int, int)

```java
public DatagramPacket(byte[] buf, int offset, int length)
```

Constructs a `DatagramPacket` for receiving packets of
length `length`, specifying an offset into the buffer.

The `length` argument must be less than or equal to
`buf.length`.

Parameters:

- `buf`: buffer for holding the incoming datagram.
- `offset`: the offset for the buffer
- `length`: the number of bytes to read.

**Since:** 1.2

Throws:

- `IllegalArgumentException`: if the length or offset is negative, or if the length plus the offset is greater than the length of the packet's given buffer.

## DatagramPacket.DatagramPacket(byte[], int)

```java
public DatagramPacket(byte[] buf, int length)
```

Constructs a `DatagramPacket` for receiving packets of
length `length`.

The `length` argument must be less than or equal to
`buf.length`.

Parameters:

- `buf`: buffer for holding the incoming datagram.
- `length`: the number of bytes to read.

Throws:

- `IllegalArgumentException`: if the length is negative or if the length is greater than the length of the packet's given buffer.

## DatagramPacket.DatagramPacket(byte[], int, int, InetAddress, int)

```java
public DatagramPacket(byte[] buf, int offset, int length, InetAddress address, int port)
```

Constructs a datagram packet for sending packets of length
`length` with offset `offset` to the
specified port number on the specified host. The
`length` argument must be less than or equal to
`buf.length`.

Parameters:

- `buf`: the packet data.
- `offset`: the packet data offset.
- `length`: the packet data length.
- `address`: the destination address, or `null`.
- `port`: the destination port number.

**See also:** java.net.InetAddress

**Since:** 1.2

Throws:

- `IllegalArgumentException`: if the length or offset is negative, or if the length plus the offset is greater than the length of the packet's given buffer, or if the port is out of range.

## DatagramPacket.DatagramPacket(byte[], int, int, SocketAddress)

```java
public DatagramPacket(byte[] buf, int offset, int length, SocketAddress address)
```

Constructs a datagram packet for sending packets of length
`length` with offset `offset` to the
specified port number on the specified host. The
`length` argument must be less than or equal to
`buf.length`.

Parameters:

- `buf`: the packet data.
- `offset`: the packet data offset.
- `length`: the packet data length.
- `address`: the destination socket address.

**See also:** java.net.InetAddress

**Since:** 1.4

Throws:

- `IllegalArgumentException`: if address is null or its type is not supported, or if the length or offset is negative, or if the length plus the offset is greater than the length of the packet's given buffer.

## DatagramPacket.DatagramPacket(byte[], int, InetAddress, int)

```java
public DatagramPacket(byte[] buf, int length, InetAddress address, int port)
```

Constructs a datagram packet for sending packets of length
`length` to the specified port number on the specified
host. The `length` argument must be less than or equal
to `buf.length`.

Parameters:

- `buf`: the packet data.
- `length`: the packet length.
- `address`: the destination address, or `null`.
- `port`: the destination port number.

**See also:** java.net.InetAddress

Throws:

- `IllegalArgumentException`: if the length is negative, or if the length is greater than the length of the packet's given buffer, or if the port is out of range.

## DatagramPacket.DatagramPacket(byte[], int, SocketAddress)

```java
public DatagramPacket(byte[] buf, int length, SocketAddress address)
```

Constructs a datagram packet for sending packets of length
`length` to the specified port number on the specified
host. The `length` argument must be less than or equal
to `buf.length`.

Parameters:

- `buf`: the packet data.
- `length`: the packet length.
- `address`: the destination address.

**See also:** java.net.InetAddress

**Since:** 1.4

Throws:

- `IllegalArgumentException`: if address is null or its type is not supported, or if the length is negative, or if the length is greater than the length of the packet's given buffer, or if the port is out of range.

## DatagramPacket.getAddress()

```java
public synchronized InetAddress getAddress()
```

Returns the IP address of the machine to which this datagram is being
sent or from which the datagram was received, or `null` if not
set.

**Returns:** the IP address of the machine to which this datagram is being
         sent or from which the datagram was received.

**See also:** java.net.InetAddress

**See also:** #setAddress(java.net.InetAddress)

## DatagramPacket.getPort()

```java
public synchronized int getPort()
```

Returns the port number on the remote host to which this datagram is
being sent or from which the datagram was received, or 0 if not set.

**Returns:** the port number on the remote host to which this datagram is
         being sent or from which the datagram was received.

**See also:** #setPort(int)

## DatagramPacket.getData()

```java
public synchronized byte[] getData()
```

Returns the data buffer. The data received or the data to be sent
starts from the `offset` in the buffer,
and runs for `length` long.

**Returns:** the buffer used to receive or  send data

**See also:** #setData(byte[], int, int)

## DatagramPacket.getOffset()

```java
public synchronized int getOffset()
```

Returns the offset of the data to be sent or the offset of the
data received.

**Returns:** the offset of the data to be sent or the offset of the
         data received.

**Since:** 1.2

## DatagramPacket.getLength()

```java
public synchronized int getLength()
```

Returns the length of the data to be sent or the length of the
data received.

**Returns:** the length of the data to be sent or the length of the
         data received.

**See also:** #setLength(int)

## DatagramPacket.setData(byte[], int, int)

```java
public synchronized void setData(byte[] buf, int offset, int length)
```

Set the data buffer for this packet. This sets the
data, length and offset of the packet.

Parameters:

- `buf`: the buffer to set for this packet
- `offset`: the offset into the data
- `length`: the length of the data and/or the length of the buffer used to receive data

**See also:** #getData

**See also:** #getOffset

**See also:** #getLength

**Since:** 1.2

Throws:

- `IllegalArgumentException`: if the length or offset is negative, or if the length plus the offset is greater than the length of the packet's given buffer.

## DatagramPacket.setAddress(InetAddress)

```java
public synchronized void setAddress(InetAddress iaddr)
```

Sets the IP address of the machine to which this datagram
is being sent.

Parameters:

- `iaddr`: the `InetAddress`, or `null`.

**See also:** #getAddress()

**Since:** 1.1

## DatagramPacket.setPort(int)

```java
public synchronized void setPort(int iport)
```

Sets the port number on the remote host to which this datagram
is being sent.

Parameters:

- `iport`: the port number

**See also:** #getPort()

**Since:** 1.1

Throws:

- `IllegalArgumentException`: if the port is out of range

## DatagramPacket.setSocketAddress(SocketAddress)

```java
public synchronized void setSocketAddress(SocketAddress address)
```

Sets the SocketAddress (usually IP address + port number) of the remote
host to which this datagram is being sent.

Parameters:

- `address`: the `SocketAddress`

**See also:** #getSocketAddress

**Since:** 1.4

Throws:

- `IllegalArgumentException`: if address is null or is a SocketAddress subclass not supported.

## DatagramPacket.getSocketAddress()

```java
public synchronized SocketAddress getSocketAddress()
```

Returns the int) SocketAddress (usually IP address +
port number) of the remote host that this packet
is being sent to or is coming from.

**Returns:** the `SocketAddress`

**See also:** #setSocketAddress

**Since:** 1.4

## DatagramPacket.setData(byte[])

```java
public synchronized void setData(byte[] buf)
```

Set the data buffer for this packet. With the offset of
this DatagramPacket set to 0, and the length set to
the length of `buf`.

Parameters:

- `buf`: the buffer to set for this packet.

**See also:** #getLength

**See also:** #getData

**Since:** 1.1

## DatagramPacket.setLength(int)

```java
public synchronized void setLength(int length)
```

Set the length for this packet. The length of the packet is
the number of bytes from the packet's data buffer that will be
sent, or the number of bytes of the packet's data buffer that
will be used for receiving data. The `length` plus the
offset must be lesser or equal to the
length of the packet's data buffer.

Parameters:

- `length`: the length to set for this packet.

**See also:** #getLength

**See also:** #setData

**Since:** 1.1

Throws:

- `IllegalArgumentException`: if the length is negative, or if the length plus the offset is greater than the length of the packet's data buffer.
