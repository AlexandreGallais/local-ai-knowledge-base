---
title: "EndpointPermission class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/EndpointPermission.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EndpointPermission class

Namespace: `System.Net`

```csharp
public class EndpointPermission
```

Defines an endpoint that is authorized by a `SocketPermission` instance.

#### Remarks
The `EndpointPermission` class defines a network endpoint, including host name, network port number, and transport type used to make the connection.

> **Note:**
> Avoid creating EndPoint permissions using host names because these names will have to be resolved to IP address, which could block the stack.

## EndpointPermission.Hostname property

```csharp
public string Hostname { get; }
```

Gets the DNS host name or IP address of the server that is associated with this endpoint.

Returns: A string that contains the DNS host name or IP address of the server.

To be added.

## EndpointPermission.Port property

```csharp
public int Port { get; }
```

Gets the network port number that is associated with this endpoint.

Returns: The network port number that is associated with this request, or `SocketPermission.AllPorts`.

To be added.

## EndpointPermission.Transport property

```csharp
public System.Net.TransportType Transport { get; }
```

Gets the transport type that is associated with this endpoint.

Returns: One of the `TransportType` values.

To be added.

## EndpointPermission.Equals(Object) method

```csharp
public override bool Equals (object obj);
```

Determines whether the specified `Object` is equal to the current `Object`.

Parameters:

- `obj`: The `Object` to compare with the current `Object`.

Returns: `true` if the specified `Object` is equal to the current `Object`; otherwise, `false`.

To be added.

## EndpointPermission.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for a particular type.

Returns: A hash code for the current `Object`.

To be added.
