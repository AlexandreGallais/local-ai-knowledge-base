---
title: "EventLogPermissionEntry class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EventLogPermissionEntry.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventLogPermissionEntry class

Namespace: `System.Diagnostics`

```csharp
public class EventLogPermissionEntry
```

Defines the smallest unit of a code access security permission that is set for an `EventLog`.

To be added.

## EventLogPermissionEntry.EventLogPermissionEntry(EventLogPermissionAccess, String) constructor

```csharp
public EventLogPermissionEntry (System.Diagnostics.EventLogPermissionAccess permissionAccess, string machineName);
```

Initializes a new instance of the `EventLogPermissionEntry` class.

Parameters:

- `permissionAccess`: A bitwise combination of the `EventLogPermissionAccess` values. The `EventLogPermissionEntry.PermissionAccess` property is set to this value.
- `machineName`: The name of the computer on which to read or write events. The `EventLogPermissionEntry.MachineName` property is set to this value.

Exceptions:

- `ArgumentException`: The computer name is invalid.

#### Remarks
If the application is running in a High trust zone, request for permission to the local machine must refer to the machine name as COMPUTERNAME or ".", instead of the full machine name. Full machine name is not accepted for security reasons. In addition, the COMPUTERNAME must be treated as case-sensitive.

## EventLogPermissionEntry.MachineName property

```csharp
public string MachineName { get; }
```

Gets the name of the computer on which to read or write events.

Returns: The name of the computer on which to read or write events.

#### Remarks
If the application is running in a High trust zone, request for permission to the local machine must refer to the machine name as COMPUTERNAME or ".", instead of the full machine name. Full machine name is not accepted for security reasons. In addition, the COMPUTERNAME must be treated as case-sensitive.

## EventLogPermissionEntry.PermissionAccess property

```csharp
public System.Diagnostics.EventLogPermissionAccess PermissionAccess { get; }
```

Gets the permission access levels used in the permissions request.

Returns: A bitwise combination of the `EventLogPermissionAccess` values.

To be added.
