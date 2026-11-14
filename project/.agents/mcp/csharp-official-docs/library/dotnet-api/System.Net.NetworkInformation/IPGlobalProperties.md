---
title: "IPGlobalProperties class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/IPGlobalProperties.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IPGlobalProperties class

Namespace: `System.Net.NetworkInformation`

```csharp
public abstract class IPGlobalProperties
```

Provides information about the network connectivity of the local computer.

#### Remarks
This class provides configuration and statistical information about the local computer's network interfaces and network connections.

The information provided by this class is similar to that provided by the Internet Protocol Helper API functions. For information about the Internet Protocol Helper, see IP Helper.

#### Examples
The following code example displays information about the local computer using an instance of this class.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPGlobalProperties.IPGlobalProperties() constructor

```csharp
protected IPGlobalProperties ();
```

Initializes a new instance of the `IPGlobalProperties` class.

#### Remarks
This constructor can be called only by classes derived from `IPGlobalProperties`.

## IPGlobalProperties.DhcpScopeName property

```csharp
public abstract string DhcpScopeName { get; }
```

Gets the Dynamic Host Configuration Protocol (DHCP) scope name.

Returns: A `String` instance that contains the computer's DHCP scope name.

Exceptions:

- `NetworkInformationException`: A Win32 function call failed.

#### Remarks
A DHCP scope is an administrative grouping of networked computers that are on the same subnet.

#### Examples
The following code example displays network information for the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## IPGlobalProperties.DomainName property

```csharp
public abstract string DomainName { get; }
```

Gets the domain in which the local computer is registered.

Returns: A `String` instance that contains the computer's domain name. If the computer does not belong to a domain, returns `String.Empty`.

Exceptions:

- `NetworkInformationException`: A Win32 function call failed.

#### Examples
The following code example displays network information for the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## IPGlobalProperties.HostName property

```csharp
public abstract string HostName { get; }
```

Gets the host name for the local computer.

Returns: A `String` instance that contains the computer's NetBIOS name.

Exceptions:

- `NetworkInformationException`: A Win32 function call failed.

#### Remarks
This property calls into the native IP Helper function, GetNetworkParams, which returns a FIXED_INFO structure that contains the NetBIOS host name string. The host name string is truncated when it exceeds 15 characters.

A computer's NetBIOS name must be unique within a network and is not fully qualified by the domain name.

#### Examples
The following code example displays network information for the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## IPGlobalProperties.IsWinsProxy property

```csharp
public abstract bool IsWinsProxy { get; }
```

Gets a `Boolean` value that specifies whether the local computer is acting as a Windows Internet Name Service (WINS) proxy.

Returns: `true` if the local computer is a WINS proxy; otherwise, `false`.

Exceptions:

- `NetworkInformationException`: A Win32 function call failed.

#### Remarks
WINS provides a distributed database for registering and querying dynamic NetBIOS names to IP address mappings.

#### Examples
The following code example displays network information for the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## IPGlobalProperties.NodeType property

```csharp
public abstract System.Net.NetworkInformation.NetBiosNodeType NodeType { get; }
```

Gets the Network Basic <example-value> System (NetBIOS) node type of the local computer.

Returns: A `NetBiosNodeType` value.

Exceptions:

- `NetworkInformationException`: A Win32 function call failed.

#### Remarks
The node type determines the way in which NetBIOS names are resolved to IP addresses. For additional information, see the `NetBiosNodeType` class overview.

#### Examples
The following code example displays network information for the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## IPGlobalProperties.BeginGetUnicastAddresses(AsyncCallback, Object) method

```csharp
public virtual IAsyncResult BeginGetUnicastAddresses (AsyncCallback? callback, object? state);
```

Begins an asynchronous request to retrieve the stable unicast IP address table on the local computer.

Parameters:

- `callback`: The `AsyncCallback` delegate.
- `state`: An object that contains state information for this request.

Returns: An `IAsyncResult` that references the asynchronous request.

Exceptions:

- `NotImplementedException`: This method is not implemented on the platform. This method uses the native `NotifyStableUnicastIpAddressTable` function that is supported on Windows Vista and later.
- `Win32Exception`: The call to the native `NotifyStableUnicastIpAddressTable` function failed.

#### Remarks
In order to support outbound connections or to accept incoming connections on a Teredo interface, applications need to ensure that the Teredo interface is up and ready for use. This is because Teredo can go into a dormant state when not used for some period of time.

The `IPGlobalProperties.BeginGetUnicastAddresses` method allows an application to asynchronously retrieve the list of stable unicast IP addresses. The `IsIPv6Teredo` property can be used to determine if an IP address is an IPv6 Teredo address with the prefix of 2001::/32.

The `IPGlobalProperties.BeginGetUnicastAddresses` method also returns non-Teredo addresses and provides a more convenient way to obtain the unicast IP addresses for a system than enumerating all the `NetworkInterface` objects on a local computer and querying the associated IP addresses.

## IPGlobalProperties.EndGetUnicastAddresses(IAsyncResult) method

```csharp
public virtual System.Net.NetworkInformation.UnicastIPAddressInformationCollection EndGetUnicastAddresses (IAsyncResult asyncResult);
```

Ends a pending asynchronous request to retrieve the stable unicast IP address table on the local computer.

Parameters:

- `asyncResult`: An `IAsyncResult` that references the asynchronous request.

Returns: An `IAsyncResult` that stores state information and any user defined data for this asynchronous operation.

Exceptions:

- `NetworkInformationException`: The call to the native `GetAdaptersAddresses` function failed.
- `NotImplementedException`: This method is not implemented on the platform. This method uses the native `NotifyStableUnicastIpAddressTable` function that is supported on Windows Vista and later.
- `SecurityException`: The caller does not have necessary `NetworkInformationAccess.Read` permission.

#### Remarks
In order to support outbound connections or to accept incoming connections on a Teredo interface, applications need to ensure that the Teredo interface is up and ready for use. This is because Teredo can go into a dormant state when not used for some period of time.

The `IPGlobalProperties.BeginGetUnicastAddresses` method allows an application to asynchronously retrieve the list of stable unicast IP addresses. The `IsIPv6Teredo` property can be used to determine if an IP address is an IPv6 Teredo address with the prefix of 2001::/32.

The `IPGlobalProperties.EndGetUnicastAddresses` method ends a pending asynchronous request to retrieve the stable unicast IP address table.

The `IPGlobalProperties.BeginGetUnicastAddresses` method also returns non-Teredo addresses and provides a more convenient way to obtain the unicast IP addresses for a system than enumerating all the `NetworkInterface` objects on a local computer and querying the associated IP addresses.

## IPGlobalProperties.GetActiveTcpConnections() method

```csharp
public abstract System.Net.NetworkInformation.TcpConnectionInformation[] GetActiveTcpConnections ();
```

Returns information about the Internet Protocol version 4 (IPv4) and IPv6 Transmission Control Protocol (TCP) connections on the local computer.

Returns: A `TcpConnectionInformation` array that contains objects that describe the active TCP connections, or an empty array if no active TCP connections are detected.

Exceptions:

- `NetworkInformationException`: The Win32 function `GetTcpTable` failed.

#### Remarks
The objects returned by this method include connections in all TCP states except the `Listen` state. You can check the state of a connection by calling `TcpConnectionInformation.State`.

The TCP protocol is defined in IETF RFC 793. Note that the objects returned by this method reflect the connections as of the time the array is created. This information is not updated dynamically.

#### Examples
The following example displays endpoint information for active TCP connections.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## IPGlobalProperties.GetActiveTcpListeners() method

```csharp
public abstract System.Net.IPEndPoint[] GetActiveTcpListeners ();
```

Returns endpoint information about the Internet Protocol version 4 (IPv4) and IPv6 Transmission Control Protocol (TCP) listeners on the local computer.

Returns: A `IPEndPoint` array that contains objects that describe the active TCP listeners, or an empty array, if no active TCP listeners are detected.

Exceptions:

- `NetworkInformationException`: The Win32 function `GetTcpTable` failed.

#### Remarks
The objects returned by this method include listeners in all TCP states except the `Listen` state.

The TCP protocol is defined in IETF RFC 793. Note that the objects returned by this method reflect the connections as of the time the array is created. This information is not updated dynamically.

#### Examples
The following code example displays endpoint information for active TCP listeners.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## IPGlobalProperties.GetActiveUdpListeners() method

```csharp
public abstract System.Net.IPEndPoint[] GetActiveUdpListeners ();
```

Returns information about the Internet Protocol version 4 (IPv4) and IPv6 User Datagram Protocol (UDP) listeners on the local computer.

Returns: An `IPEndPoint` array that contains objects that describe the UDP listeners, or an empty array if no UDP listeners are detected.

Exceptions:

- `NetworkInformationException`: The call to the Win32 function `GetUdpTable` failed.

#### Remarks
UDP is a connectionless transport layer protocol that is responsible for sending and receiving datagrams. It is defined in IETF RFC 768.

A UDP listener is an open socket that waits for and receives UDP datagrams. Because UDP is a connectionless protocol, the listener does not maintain a connection to a remote endpoint.

#### Examples
The following example displays the active UDP listeners.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## IPGlobalProperties.GetIcmpV4Statistics() method

```csharp
public abstract System.Net.NetworkInformation.IcmpV4Statistics GetIcmpV4Statistics ();
```

Provides Internet Control Message Protocol (ICMP) version 4 statistical data for the local computer.

Returns: An `IcmpV4Statistics` object that provides ICMP version 4 traffic statistics for the local computer.

Exceptions:

- `NetworkInformationException`: The Win32 function `GetIcmpStatistics` failed.

#### Remarks
ICMP is a set of messages for use with Internet Protocol version 4 (IPv4). ICMP is used by IPv4 nodes to report errors encountered in processing data packets and to perform other Internet layer functions. ICMP version 4 is defined in IETF RFC 792.

For details on the ICMP version 4 traffic statistics that are available to applications, see the `IcmpV4Statistics` class documentation. Note that the `IcmpV4Statistics` object returned by this method reflects the statistics as of the time the object is created. This information is not updated dynamically.

#### Examples
The following example displays the current ICMPv4 statistics.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## IPGlobalProperties.GetIcmpV6Statistics() method

```csharp
public abstract System.Net.NetworkInformation.IcmpV6Statistics GetIcmpV6Statistics ();
```

Provides Internet Control Message Protocol (ICMP) version 6 statistical data for the local computer.

Returns: An `IcmpV6Statistics` object that provides ICMP version 6 traffic statistics for the local computer.

Exceptions:

- `NetworkInformationException`: The Win32 function `GetIcmpStatisticsEx` failed.
- `PlatformNotSupportedException`: The operating system is not Windows.

#### Remarks
ICMP version 6 is a set of messages for use with Internet Protocol version 6 (IPv6). ICMP is used by IPv6 nodes to report errors encountered in processing data packets and to perform other Internet layer functions. ICMP version 6 is defined in IETF RFC 1885.

For details on the ICMP version 6 traffic statistics available to applications, see the `IcmpV6Statistics` class documentation. Note that the `IcmpV6Statistics` object returned by this method reflects the statistics as of the time the object is created. This information is not updated dynamically.

#### Examples
The following example displays the current ICMPv6 statistics.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
## IPGlobalProperties.GetIPGlobalProperties() method

```csharp
public static System.Net.NetworkInformation.IPGlobalProperties GetIPGlobalProperties ();
```

Gets an object that provides information about the local computer's network connectivity and traffic statistics.

Returns: A `IPGlobalProperties` object that contains information about the local computer.

#### Remarks
The object returned by this method is a system-supplied type that derives from the `IPGlobalProperties` class.

#### Examples
The following code example displays information about the local computer.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/IcmpV4Statistics/Overview/netinfo.cs._
