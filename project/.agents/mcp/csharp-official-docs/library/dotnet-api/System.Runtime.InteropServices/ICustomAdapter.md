---
title: "ICustomAdapter interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ICustomAdapter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ICustomAdapter interface

Namespace: `System.Runtime.InteropServices`

```csharp
public interface ICustomAdapter
```

Provides a way for clients to access the actual object, rather than the adapter object handed out by a custom marshaler.

#### Remarks
The objects that the built-in custom marshalers hand out to clients implement this interface.

## ICustomAdapter.GetUnderlyingObject() method

```csharp
public object GetUnderlyingObject ();
```

Provides access to the underlying object wrapped by a custom marshaler.

Returns: The object contained by the adapter object.

To be added.
