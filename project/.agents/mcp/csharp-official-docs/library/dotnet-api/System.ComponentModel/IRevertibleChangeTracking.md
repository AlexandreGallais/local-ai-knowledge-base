---
title: "IRevertibleChangeTracking interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/IRevertibleChangeTracking.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IRevertibleChangeTracking interface

Namespace: `System.ComponentModel`

```csharp
public interface IRevertibleChangeTracking : System.ComponentModel.IChangeTracking
```

Provides support for rolling back the changes.

#### Remarks
The `IRevertibleChangeTracking` extends `IChangeTracking` by adding support for rolling back the changes.

## IRevertibleChangeTracking.RejectChanges() method

```csharp
public void RejectChanges ();
```

Resets the object's state to unchanged by rejecting the modifications.

To be added.
