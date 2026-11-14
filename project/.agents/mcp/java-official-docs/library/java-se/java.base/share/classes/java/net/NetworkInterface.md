---
title: "NetworkInterface class (java.net)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/net/NetworkInterface.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# NetworkInterface class (java.net)

```java
public final class NetworkInterface
```

This class represents a Network Interface.

A Network Interface is an abstraction encapsulating
the characteristics of a Network Interface Controller, or
Virtual Network adapter, which is a system hardware/software
component connecting a computer, or host system, to a computer
network. A Network Interface can be physical or virtual.
A Network Interface has a name, zero or more assigned
IP addresses, zero or more MAC Addresses, and may have an index.
The name is highly platform specific but a name such as "le0"
is typical; it may not be unique. The index is a highly platform
specific number that identifies the interface. The network
configuration may change during the lifetime of the JVM.
For example, the set of IP addresses assigned to a network
interface can be transient and dynamically allocated, and may
change at any time.

When obtaining a `NetworkInterface` instance, part of its
configuration (such as its name and the list of assigned IP addresses),
is reflective of its configuration at creation time.
Obtaining an updated view of the network configuration may require
looking up a network interface again in order to obtain a new instance.

Network interface instances are typically used to identify the local
interface on which a multicast group is joined.

**API note:** Several static methods in this class are
factory methods, returning a new instance of a `NetworkInterface`,
reflecting the configuration at the time of instantiation.
The network configuration may change at any time, and as such,
these methods may need to be invoked again in order to obtain
a more up-to-date view of the network interfaces.
In particular, there is no guarantee that the same interface will be
found at the same index, or that the same network addresses will be
bound to the interface, if the network configuration of the system
has changed.

**Since:** 1.4

## NetworkInterface.getName()

```java
public String getName()
```

Get the name of this network interface.

**Returns:** the name of this network interface

## NetworkInterface.getInetAddresses()

```java
public Enumeration<InetAddress> getInetAddresses()
```

Get an Enumeration of the InetAddresses bound to this network interface.

**Implementation note:** The returned enumeration contains the InetAddresses that were bound to
the interface at the time the interface configuration was read

**Returns:** an Enumeration object with the InetAddresses bound to this
network interface

**See also:** #inetAddresses()

## NetworkInterface.inetAddresses()

```java
public Stream<InetAddress> inetAddresses()
```

Get a Stream of the InetAddresses bound to this network interface.

**Implementation note:** The stream contains the InetAddresses that were bound to the
interface at the time the interface configuration was read

**Returns:** a Stream object with the InetAddresses bound to this network interface

**Since:** 9

## NetworkInterface.getInterfaceAddresses()

```java
public List<InterfaceAddress> getInterfaceAddresses()
```

Get a List of the `InterfaceAddresses` of this network interface.

**Returns:** a `List` object with the InterfaceAddress of this
network interface

**Since:** 1.6

## NetworkInterface.getSubInterfaces()

```java
public Enumeration<NetworkInterface> getSubInterfaces()
```

Get an Enumeration with all the subinterfaces (also known as virtual
interfaces) attached to this network interface.

For instance eth0:1 will be a subinterface to eth0.

**Returns:** an Enumeration object with all of the subinterfaces
of this network interface

**See also:** #subInterfaces()

**Since:** 1.6

## NetworkInterface.subInterfaces()

```java
public Stream<NetworkInterface> subInterfaces()
```

Get a Stream of all subinterfaces (also known as virtual
interfaces) attached to this network interface.

**Returns:** a Stream object with all of the subinterfaces
of this network interface

**Since:** 9

## NetworkInterface.getParent()

```java
public NetworkInterface getParent()
```

Returns the parent NetworkInterface of this interface if this is
a subinterface, or `null` if it is a physical
(non virtual) interface or has no parent.

**Returns:** The `NetworkInterface` this interface is attached to.

**Since:** 1.6

## NetworkInterface.getIndex()

```java
public int getIndex()
```

Returns the index of this network interface. The index is an integer greater
or equal to zero, or `-1` for unknown. This is a system specific value
and interfaces with the same name can have different indexes on different
machines.

**Returns:** the index of this network interface or `-1` if the index is
        unknown

**See also:** #getByIndex(int)

**Since:** 1.7

## NetworkInterface.getDisplayName()

```java
public String getDisplayName()
```

Get the display name of this network interface.
A display name is a human readable String describing the network
device.

**Returns:** a non-empty string representing the display name of this network
        interface, or null if no display name is available.

## NetworkInterface.getByName(String)

```java
public static NetworkInterface getByName(String name) throws SocketException
```

Searches for the network interface with the specified name.

Parameters:

- `name`: The name of the network interface.

**API note:** The returned interface instance may reflect a snapshot of the
configuration taken at the time the instance is created.
See the general discussion of snapshots and configuration for the semantics of the returned interface.

**Returns:** A `NetworkInterface` with the specified name,
         or `null` if there is no network interface
         with the specified name.

Throws:

- `SocketException`: If an I/O error occurs.
- `NullPointerException`: If the specified name is `null`.

## NetworkInterface.getByIndex(int)

```java
public static NetworkInterface getByIndex(int index) throws SocketException
```

Get a network interface given its index.

Parameters:

- `index`: an integer, the index of the interface

**API note:** The returned interface instance may reflect a snapshot of the
configuration taken at the time the instance is created.
See the general discussion of snapshots and configuration for the semantics of the returned interface.

**Returns:** the NetworkInterface obtained from its index, or `null` if
        there is no interface with such an index on the system

**See also:** #getIndex()

**Since:** 1.7

Throws:

- `SocketException`: if an I/O error occurs.
- `IllegalArgumentException`: if index has a negative value

## NetworkInterface.getByInetAddress(InetAddress)

```java
public static NetworkInterface getByInetAddress(InetAddress addr) throws SocketException
```

Convenience method to search for a network interface that
has the specified Internet Protocol (IP) address bound to
it.

If the specified IP address is bound to multiple network
interfaces it is not defined which network interface is
returned.

Parameters:

- `addr`: The `InetAddress` to search with.

**API note:** The returned interface instance may reflect a snapshot of the
configuration taken at the time the instance is created.
See the general discussion of snapshots and configuration for the semantics of the returned interface.

**Returns:** A `NetworkInterface`
         or `null` if there is no network interface
         with the specified IP address.

Throws:

- `SocketException`: If an I/O error occurs.
- `NullPointerException`: If the specified address is `null`.

## NetworkInterface.getNetworkInterfaces()

```java
public static Enumeration<NetworkInterface> getNetworkInterfaces() throws SocketException
```

Returns an `Enumeration` of all the interfaces on this machine. The
`Enumeration` contains at least one element, possibly representing
a loopback interface that only supports communication between entities on
this machine.

**API note:** This method can be used in combination with
`getInetAddresses()` to obtain all IP addresses for this node.

The returned interface instances may reflect a snapshot of the
configuration taken at the time the instance is created.
See the general discussion of snapshots and configuration for the semantics of the returned interface.

**Returns:** an Enumeration of NetworkInterfaces found on this machine

**See also:** #networkInterfaces()

Throws:

- `SocketException`: if an I/O error occurs, or if the platform does not have at least one configured network interface.

## NetworkInterface.networkInterfaces()

```java
public static Stream<NetworkInterface> networkInterfaces() throws SocketException
```

Returns a `Stream` of all the interfaces on this machine.  The
`Stream` contains at least one interface, possibly representing a
loopback interface that only supports communication between entities on
this machine.

**API note:** This method can be used in combination with
`inetAddresses()` to obtain a stream of all IP addresses for
this node, for example:

```java
Stream<InetAddress> addrs = NetworkInterface.networkInterfaces()
    .flatMap(NetworkInterface::inetAddresses);
```

The returned interface instances may reflect a snapshot of the
configuration taken at the time the instance is created.
See the general discussion of snapshots and configuration for the semantics of the returned interface.

**Returns:** a Stream of NetworkInterfaces found on this machine

**Since:** 9

Throws:

- `SocketException`: if an I/O error occurs, or if the platform does not have at least one configured network interface.

## NetworkInterface.isUp()

```java
public boolean isUp() throws SocketException
```

Returns whether a network interface is up and running.

**Returns:** `true` if the interface is up and running.

**Since:** 1.6

Throws:

- `SocketException`: if an I/O error occurs.

## NetworkInterface.isLoopback()

```java
public boolean isLoopback() throws SocketException
```

Returns whether a network interface is a loopback interface.

**Returns:** `true` if the interface is a loopback interface.

**Since:** 1.6

Throws:

- `SocketException`: if an I/O error occurs.

## NetworkInterface.isPointToPoint()

```java
public boolean isPointToPoint() throws SocketException
```

Returns whether a network interface is a point to point interface.
A typical point to point interface would be a PPP connection through
a modem.

**Returns:** `true` if the interface is a point to point
         interface.

**Since:** 1.6

Throws:

- `SocketException`: if an I/O error occurs.

## NetworkInterface.supportsMulticast()

```java
public boolean supportsMulticast() throws SocketException
```

Returns whether a network interface supports multicasting or not.

**Returns:** `true` if the interface supports Multicasting.

**Since:** 1.6

Throws:

- `SocketException`: if an I/O error occurs.

## NetworkInterface.getHardwareAddress()

```java
public byte[] getHardwareAddress() throws SocketException
```

Returns the hardware address (usually MAC) of the interface if it
has one and if it can be accessed given the current privileges.

**Returns:** a byte array containing the address, or `null` if
         the address doesn't exist or is not accessible

**Since:** 1.6

Throws:

- `SocketException`: if an I/O error occurs.

## NetworkInterface.getMTU()

```java
public int getMTU() throws SocketException
```

Returns the Maximum Transmission Unit (MTU) of this interface.

**Returns:** the value of the MTU for that interface.

**Since:** 1.6

Throws:

- `SocketException`: if an I/O error occurs.

## NetworkInterface.isVirtual()

```java
public boolean isVirtual()
```

Returns whether this interface is a virtual interface (also called
subinterface).
Virtual interfaces are, on some systems, interfaces created as a child
of a physical interface and given different settings (like address or
MTU). Usually the name of the interface will the name of the parent
followed by a colon (:) and a number identifying the child since there
can be several virtual interfaces attached to a single physical
interface.

**Returns:** `true` if this interface is a virtual interface.

**Since:** 1.6

## NetworkInterface.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this object against the specified object.
The result is `true` if and only if the argument is
not `null` and it represents the same NetworkInterface
as this object.

Two instances of `NetworkInterface` represent the same
NetworkInterface if both the name and the set of `InetAddress`es
bound to the interfaces are equal.

Parameters:

- `obj`: the object to compare against.

**API note:** two `NetworkInterface` objects referring to the same
underlying interface may not compare equal if the addresses
of the underlying interface are being dynamically updated by
the system.

**Returns:** `true` if the objects are the same;
         `false` otherwise.

**See also:** java.net.InetAddress#getAddress()
