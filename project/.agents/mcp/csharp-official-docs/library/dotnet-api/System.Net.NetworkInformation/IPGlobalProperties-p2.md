---
title: "IPGlobalProperties class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/IPGlobalProperties.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IPGlobalProperties class (part 2 of 2)

## IPGlobalProperties.GetIPv4GlobalStatistics() method

```csharp
public abstract System.Net.NetworkInformation.IPGlobalStatistics GetIPv4GlobalStatistics ();
```

Provides Internet Protocol version 4 (IPv4) statistical data for the local computer.

Returns: An `IPGlobalStatistics` object that provides IPv4 traffic statistics for the local computer.

Exceptions:

- `NetworkInformationException`: The call to the Win32 function `GetIpStatistics` failed.

#### Remarks
IPv4 is a network layer protocol that is responsible for routing data packets from its source computer to its destination.

For details on the IP traffic statistics available to applications, see the `IPGlobalStatistics` class documentation. Note that the object returned by this method reflects the statistics as of the time the `IPGlobalStatistics` object is created. This information is not updated dynamically.

#### Examples
The following code example displays IP statistics for the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## IPGlobalProperties.GetIPv6GlobalStatistics() method

```csharp
public abstract System.Net.NetworkInformation.IPGlobalStatistics GetIPv6GlobalStatistics ();
```

Provides Internet Protocol version 6 (IPv6) statistical data for the local computer.

Returns: An `IPGlobalStatistics` object that provides IPv6 traffic statistics for the local computer.

Exceptions:

- `NetworkInformationException`: The call to the Win32 function `GetIpStatistics` failed.
- `PlatformNotSupportedException`: The local computer is not running an operating system that supports IPv6.

#### Remarks
IPv6 is a network layer protocol responsible for routing data packets from its source computer to its destination.

For details on the IP traffic statistics available to applications, see the `IPGlobalStatistics` class documentation. Note that the object returned by this method reflects the statistics as of the time the `IPGlobalStatistics` object is created. This information is not updated dynamically.

#### Examples
The following code example displays IP statistics for the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## IPGlobalProperties.GetTcpIPv4Statistics() method

```csharp
public abstract System.Net.NetworkInformation.TcpStatistics GetTcpIPv4Statistics ();
```

Provides Transmission Control Protocol/Internet Protocol version 4 (TCP/IPv4) statistical data for the local computer.

Returns: A `TcpStatistics` object that provides TCP/IPv4 traffic statistics for the local computer.

Exceptions:

- `NetworkInformationException`: The call to the Win32 function `GetTcpStatistics` failed.

#### Remarks
TCP is a transport layer protocol that is responsible for reliably sending and receiving data packets. It is defined in IETF RFC 793.

For details on the TCP traffic statistics available to applications, see the `TcpStatistics` class documentation. Note that the object returned by this method reflects the statistics as of the time the `TcpStatistics` object is created. This information is not updated dynamically.

#### Examples
The following example displays the TCP/IP statistics for the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## IPGlobalProperties.GetTcpIPv6Statistics() method

```csharp
public abstract System.Net.NetworkInformation.TcpStatistics GetTcpIPv6Statistics ();
```

Provides Transmission Control Protocol/Internet Protocol version 6 (TCP/IPv6) statistical data for the local computer.

Returns: A `TcpStatistics` object that provides TCP/IPv6 traffic statistics for the local computer.

Exceptions:

- `NetworkInformationException`: The call to the Win32 function `GetTcpStatistics` failed.
- `PlatformNotSupportedException`: The local computer is not running an operating system that supports IPv6.

#### Remarks
TCP is a transport layer protocol responsible for reliably sending and receiving data packets. It is defined in IETF RFC 793.

For details on the TCP traffic statistics that are available to applications, see the `TcpStatistics` class documentation. Note that the object returned by this method reflects the statistics as of the time the `TcpStatistics` object is created. This information is not updated dynamically.

#### Examples
The following example displays the TCP/IP statistics for the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## IPGlobalProperties.GetUdpIPv4Statistics() method

```csharp
public abstract System.Net.NetworkInformation.UdpStatistics GetUdpIPv4Statistics ();
```

Provides User Datagram Protocol/Internet Protocol version 4 (UDP/IPv4) statistical data for the local computer.

Returns: A `UdpStatistics` object that provides UDP/IPv4 traffic statistics for the local computer.

Exceptions:

- `NetworkInformationException`: The call to the Win32 function GetUdpStatistics failed.

#### Remarks
UDP is a connectionless transport layer protocol that is responsible for sending and receiving datagrams. It is defined in IETF RFC 768.

For details on the UDP traffic statistics that are available to applications, see the `UdpStatistics` class documentation. Note that the object returned by this method reflects the statistics as of the time the `UdpStatistics` object is created. This information is not updated dynamically.

#### Examples
The following example displays the UDP/IP statistics for the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## IPGlobalProperties.GetUdpIPv6Statistics() method

```csharp
public abstract System.Net.NetworkInformation.UdpStatistics GetUdpIPv6Statistics ();
```

Provides User Datagram Protocol/Internet Protocol version 6 (UDP/IPv6) statistical data for the local computer.

Returns: A `UdpStatistics` object that provides UDP/IPv6 traffic statistics for the local computer.

Exceptions:

- `NetworkInformationException`: The call to the Win32 function `GetUdpStatistics` failed.
- `PlatformNotSupportedException`: The local computer is not running an operating system that supports IPv6.

#### Remarks
UDP is a connectionless transport layer protocol that is responsible for sending and receiving datagrams. It is defined in IETF RFC 768.

For details on the UDP traffic statistics that are available to applications, see the `UdpStatistics` class documentation. Note that the object returned by this method reflects the statistics as of the time the `UdpStatistics` object is created. This information is not updated dynamically.

#### Examples
The following example displays the UDP/IP statistics for the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## IPGlobalProperties.GetUnicastAddresses() method

```csharp
public virtual System.Net.NetworkInformation.UnicastIPAddressInformationCollection GetUnicastAddresses ();
```

Retrieves the stable unicast IP address table on the local computer.

Returns: A `UnicastIPAddressInformationCollection` that contains a list of stable unicast IP addresses on the local computer.

Exceptions:

- `NetworkInformationException`: The call to the native `GetAdaptersAddresses` function failed.
- `NotImplementedException`: This method is not implemented on the platform. This method uses the native `NotifyStableUnicastIpAddressTable` function that is supported on Windows Vista and later.
- `SecurityException`: The caller does not have necessary `NetworkInformationAccess.Read` permission.
- `Win32Exception`: The call to the native `NotifyStableUnicastIpAddressTable` function failed.

#### Remarks
In order to support outbound connections or to accept incoming connections on a Teredo interface, applications need to ensure that the Teredo interface is up and ready for use. This is because Teredo can go into a dormant state when not used for some period of time.

The `IPGlobalProperties.GetUnicastAddresses` method will allow an application to retrieve the list of stable unicast IP addresses. The `IsIPv6Teredo` property can be used to determine if an IP address is an IPv6 Teredo address with the prefix of 2001::/32.

The `IPGlobalProperties.GetUnicastAddresses` method also returns non-Teredo addresses and provides a more convenient way to obtain the unicast IP addresses for a system than enumerating all the `NetworkInterface` objects on a local computer and querying the associated IP addresses.

## IPGlobalProperties.GetUnicastAddressesAsync() method

```csharp
public virtual System.Threading.Tasks.Task<System.Net.NetworkInformation.UnicastIPAddressInformationCollection> GetUnicastAddressesAsync ();
```

Retrieves the stable unicast IP address table on the local computer as an asynchronous operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `NetworkInformationException`: The call to the native `GetAdaptersAddresses` function failed.
- `SecurityException`: The caller does not have necessary `NetworkInformationAccess.Read` permission.
- `Win32Exception`: The call to the native `NotifyStableUnicastIpAddressTable` function failed.

#### Remarks
In order to support outbound connections or to accept incoming connections on a Teredo interface, applications need to ensure that the Teredo interface is up and ready for use. This is because Teredo can go into a dormant state when not used for some period of time.

The `IPGlobalProperties.GetUnicastAddressesAsync` method will allow an application to retrieve the list of stable unicast IP addresses as asynchronous operation. The `IsIPv6Teredo` property can be used to determine if an IP address is an IPv6 Teredo address with the prefix of 2001::/32.

The `IPGlobalProperties.GetUnicastAddresses` method also returns non-Teredo addresses and provides a more convenient way to obtain the unicast IP addresses for a system than enumerating all the `NetworkInterface` objects on a local computer and querying the associated IP addresses.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `GetUnicastAddresses`.
