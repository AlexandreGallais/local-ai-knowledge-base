---
title: "EventLogPermission class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/EventLogPermission.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventLogPermission class

Namespace: `System.Diagnostics`

```csharp
public sealed class EventLogPermission : System.Security.Permissions.ResourcePermissionBase
```

Controls code access permissions for event logging.

#### Remarks

## EventLogPermission.EventLogPermission() constructor

```csharp
public EventLogPermission ();
```

Initializes a new instance of the `EventLogPermission` class.

To be added.

## EventLogPermission.EventLogPermission(EventLogPermissionEntry[]) constructor

```csharp
public EventLogPermission (System.Diagnostics.EventLogPermissionEntry[] permissionAccessEntries);
```

Initializes a new instance of the `EventLogPermission` class with the specified permission entries.

Parameters:

- `permissionAccessEntries`: An array of  objects that represent permission entries. The `EventLogPermission.PermissionEntries` property is set to this value.

Exceptions:

- `ArgumentNullException`: `permissionAccessEntries` is `null`.

To be added.

## EventLogPermission.EventLogPermission(PermissionState) constructor

```csharp
public EventLogPermission (System.Security.Permissions.PermissionState state);
```

Initializes a new instance of the `EventLogPermission` class with the specified permission state.

Parameters:

- `state`: One of the enumeration values that specifies the permission state (full access or no access to resources).

Exceptions:

- `ArgumentException`: The `state` parameter is not a valid value of `PermissionState`.

To be added.

## EventLogPermission.EventLogPermission(EventLogPermissionAccess, String) constructor

```csharp
public EventLogPermission (System.Diagnostics.EventLogPermissionAccess permissionAccess, string machineName);
```

Initializes a new instance of the `EventLogPermission` class with the specified access levels and the name of the computer to use.

Parameters:

- `permissionAccess`: One of the enumeration values that specifies an access level.
- `machineName`: The name of the computer on which to read or write events.

To be added.

## EventLogPermission.PermissionEntries property

```csharp
public System.Diagnostics.EventLogPermissionEntryCollection PermissionEntries { get; }
```

Gets the collection of permission entries for this permissions request.

Returns: A collection that contains the permission entries for this permissions request.

To be added.
