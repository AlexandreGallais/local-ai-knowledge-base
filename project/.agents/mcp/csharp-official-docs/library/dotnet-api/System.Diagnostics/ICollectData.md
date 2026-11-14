---
title: "ICollectData interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/ICollectData.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ICollectData interface

Namespace: `System.Diagnostics`

```csharp
public interface ICollectData
```

Prepares performance data for the performance DLL the system loads when working with performance counters.

To be added.

## ICollectData.CloseData() method

```csharp
public void CloseData ();
```

Called by the performance DLL's close performance data function.

To be added.

## ICollectData.CollectData(Int32, IntPtr, IntPtr, Int32, IntPtr) method

```csharp
public void CollectData (int id, IntPtr valueName, IntPtr data, int totalBytes, out IntPtr res);
```

Collects the performance data for the performance DLL.

Parameters:

- `id`: The call index.
- `valueName`: A pointer to a Unicode string list with the requested object identifiers.
- `data`: A pointer to the data buffer.
- `totalBytes`: A pointer to a number of bytes.
- `res`: When this method returns, contains a `IntPtr` to the first byte after the data, -1 for an error, or -2 if a larger buffer is required. This parameter is passed uninitialized.

To be added.
