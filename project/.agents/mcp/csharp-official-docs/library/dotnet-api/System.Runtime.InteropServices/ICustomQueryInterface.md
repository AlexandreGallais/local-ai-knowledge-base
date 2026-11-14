---
title: "ICustomQueryInterface interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ICustomQueryInterface.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ICustomQueryInterface interface

Namespace: `System.Runtime.InteropServices`

```csharp
public interface ICustomQueryInterface
```

Enables developers to provide a custom, managed implementation of the IUnknown::QueryInterface(REFIID riid, void **ppvObject) method.

#### Remarks
This class permits advanced users to provide a customized managed implementation of the `QueryInterface` method.

Managed and native applications can use the customized implementation to return a specific interface for a specified interface ID, except for IID_IUnknown. That is, when `QueryInterface` is called, it will ignore custom implementations if its `riid` parameter is set to IID_IUnknown. However, you may still return IUnknown as the `ppvObject`.

Developers can provide custom implementations for all interfaces (except for `IUnknown`) if they define and implement a valid corresponding interface.

A valid user-defined interface has a v-table layout that matches the unmanaged COM interface exactly, and its `InterfaceTypeAttribute` is `InterfaceIsIUnknown`.

## ICustomQueryInterface.GetInterface(Guid, IntPtr) method

```csharp
public System.Runtime.InteropServices.CustomQueryInterfaceResult GetInterface (ref Guid iid, out IntPtr ppv);
```

Returns an interface according to a specified interface ID.

Parameters:

- `iid`: The GUID of the requested interface.
- `ppv`: A reference to the requested interface, when this method returns.

Returns: One of the enumeration values that indicates whether a custom implementation of IUnknown::QueryInterface was used.

#### Remarks
An application can use managed code to specify its own implementation for custom interfaces and standard runtime interfaces.

The `CustomQueryInterfaceResult` return value can be used to enable or disable customized implementations by showing or hiding specific interfaces during COM access.

This method is invisible to COM.
