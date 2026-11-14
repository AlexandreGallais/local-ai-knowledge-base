---
title: "MulticastSocket class (java.net) (part 2 of 2)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/MulticastSocket.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# MulticastSocket class (java.net) (part 2 of 2)

## MulticastSocket.send(DatagramPacket, byte)

```java
public void send(DatagramPacket p, byte ttl) throws IOException
```

Sends a datagram packet to the destination, with a TTL (time-to-live)
other than the default for the socket.  This method
need only be used in instances where a particular TTL is desired;
otherwise it is preferable to set a TTL once on the socket, and
use that default TTL for all packets.  This method does **not
** alter the default TTL for the socket. Its behavior may be
affected by `setInterface`.

Parameters:

- `p`: is the packet to be sent. The packet should contain the destination multicast ip address and the data to be sent. One does not need to be the member of the group to send packets to a destination multicast address.
- `ttl`: optional time to live for multicast packet. default ttl is 1.

**Deprecated:** Use the following code or its equivalent instead:

```java
  ......
 int ttl = mcastSocket.getOption(StandardSocketOptions.IP_MULTICAST_TTL);
 mcastSocket.setOption(StandardSocketOptions.IP_MULTICAST_TTL, newttl);
 mcastSocket.send(p);
 mcastSocket.setOption(StandardSocketOptions.IP_MULTICAST_TTL, ttl);
 ......
```

**See also:** DatagramSocket#send

**See also:** DatagramSocket#receive

Throws:

- `IOException`: if an I/O error occurs, or the socket is closed.
- `PortUnreachableException`: may be thrown if the socket is connected to a currently unreachable destination. Note, there is no guarantee that the exception will be thrown.
- `IllegalArgumentException`: if the socket is connected, and connected address and packet address differ, or if the socket is not connected and the packet address is not set or if its port is out of range.
