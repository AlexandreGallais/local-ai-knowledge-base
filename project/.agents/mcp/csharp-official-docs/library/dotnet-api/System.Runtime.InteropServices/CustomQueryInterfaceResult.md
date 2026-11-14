---
title: "CustomQueryInterfaceResult enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/CustomQueryInterfaceResult.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CustomQueryInterfaceResult enum

Namespace: `System.Runtime.InteropServices`

```csharp
public enum CustomQueryInterfaceResult
```

Provides return values for the `ICustomQueryInterface.GetInterface` method.

To be added.

## CustomQueryInterfaceResult.Failed field

```csharp
Failed
```

The interface for a specific interface ID is not available. In this case, the returned interface is `null`. E_NOINTERFACE is returned to the caller of IUnknown::QueryInterface.

## CustomQueryInterfaceResult.Handled field

```csharp
Handled
```

The interface pointer that is returned from the `ICustomQueryInterface.GetInterface` method can be used as the result of IUnknown::QueryInterface.

## CustomQueryInterfaceResult.NotHandled field

```csharp
NotHandled
```

The custom `QueryInterface` was not used. Instead, the default implementation of IUnknown::QueryInterface should be used.
