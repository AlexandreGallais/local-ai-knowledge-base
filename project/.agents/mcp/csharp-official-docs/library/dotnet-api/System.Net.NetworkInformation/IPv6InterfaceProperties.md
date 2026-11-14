---
title: "IPv6InterfaceProperties class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.NetworkInformation/IPv6InterfaceProperties.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IPv6InterfaceProperties class

Namespace: `System.Net.NetworkInformation`

```csharp
public abstract class IPv6InterfaceProperties
```

Provides information about network interfaces that support Internet Protocol version 6 (IPv6).

#### Remarks
This class provides access to configuration and address information for network interfaces that support IPv6. You do not create instances of this class; they are returned by the `IPInterfaceProperties.GetIPv6Properties` method.

For IPV4 properties, see `IPInterfaceProperties.GetIPv4Properties`.

#### Examples
The following code example gets an `IPInterfaceProperties` object and displays its data.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPv6InterfaceProperties.IPv6InterfaceProperties() constructor

```csharp
protected IPv6InterfaceProperties ();
```

Initializes a new instance of the `IPv6InterfaceProperties` class.

#### Remarks
This constructor can be called only by classes that derive from `IPv6InterfaceProperties`.

## IPv6InterfaceProperties.Index property

```csharp
public abstract int Index { get; }
```

Gets the index of the network interface associated with an Internet Protocol version 6 (IPv6) address.

Returns: An `Int32` value that contains the index of the network interface for IPv6 address.

#### Remarks
If the value of this property is zero, IPv6 is not supported by this interface.

#### Examples
The following code example gets an `IPv6InterfaceProperties` object and displays its data.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPv6InterfaceProperties.Mtu property

```csharp
public abstract int Mtu { get; }
```

Gets the maximum transmission unit (MTU) for this network interface.

Returns: An `Int64` value that specifies the MTU.

#### Remarks
The MTU of a network interface is the largest packet that can be transmitted. It is measured in octets (8-bit bytes).

#### Examples
The following code example gets an `IPv6InterfaceProperties` object and displays its data.

_Code sample not included: ~/snippets/csharp/System.Net.NetworkInformation/DuplicateAddressDetectionState/Overview/networkexamples.cs._

## IPv6InterfaceProperties.GetScopeId(ScopeLevel) method

```csharp
public virtual long GetScopeId (System.Net.NetworkInformation.ScopeLevel scopeLevel);
```

Gets the scope ID of the network interface associated with an Internet Protocol version 6 (IPv6) address.

Parameters:

- `scopeLevel`: The scope level.

Returns: The scope ID of the network interface associated with an IPv6 address.

To be added.
