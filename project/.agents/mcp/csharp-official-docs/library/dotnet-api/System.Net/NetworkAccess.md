---
title: "NetworkAccess enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net/NetworkAccess.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NetworkAccess enum

Namespace: `System.Net`

```csharp
public enum NetworkAccess
```

Specifies network access permissions.

#### Remarks
The `NetworkAccess` enumeration is used with the `WebPermission` and `SocketPermission` classes.

## NetworkAccess.Accept field

```csharp
Accept
```

Indicates that the application is allowed to accept connections from the Internet on a local resource. Notice that this is a protection for the local host that uses Accept to grant access to a local resource (address/port). At the time a socket tries to bind to this local resource a permission check is performed to see if an Accept exists on that resource.

## NetworkAccess.Connect field

```csharp
Connect
```

Indicates that the application is allowed to connect to specific Internet resources. Notice that, in the case of remote host resource, no check is performed to see that Connect permissions exist. This is because the port of a connecting remote host is unknown and not suitable permissions can be built in advance. It is the application responsibility to check the permissions of the remote host trying to connect to a listening socket.
