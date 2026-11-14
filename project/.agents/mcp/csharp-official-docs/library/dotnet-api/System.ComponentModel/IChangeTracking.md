---
title: "IChangeTracking interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/IChangeTracking.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IChangeTracking interface

Namespace: `System.ComponentModel`

```csharp
public interface IChangeTracking
```

Defines the mechanism for querying the object for changes and resetting of the changed status.

To be added.

## IChangeTracking.IsChanged property

```csharp
public bool IsChanged { get; }
```

Gets the object's changed status.

Returns: `true` if the object's content has changed since the last call to `IChangeTracking.AcceptChanges`; otherwise, `false`.

To be added.

## IChangeTracking.AcceptChanges() method

```csharp
public void AcceptChanges ();
```

Resets the object's state to unchanged by accepting the modifications.

To be added.
