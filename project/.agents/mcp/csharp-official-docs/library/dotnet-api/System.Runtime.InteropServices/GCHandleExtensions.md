---
title: "GCHandleExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/GCHandleExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GCHandleExtensions class

Namespace: `System.Runtime.InteropServices`

```csharp
public static class GCHandleExtensions
```

Provides extension methods to operate with GC handles.

To be added.

## GCHandleExtensions.GetAddressOfArrayData<T>(PinnedGCHandle<T[]>) method

```csharp
public static T* GetAddressOfArrayData<T> (this System.Runtime.InteropServices.PinnedGCHandle<T[]> handle);
```

Retrieves the address of the array data in `handle`.

Parameters:

- `T`: To be added.
- `handle`: The handle to retrieve the pointer from.

Returns: The address of the 0th array element of the pinned array, or `null` if the handle doesn't point to any object.

Exceptions:

- `NullReferenceException`: The handle is not initialized or is already disposed.

To be added.

## GCHandleExtensions.GetAddressOfStringData(String>) method

```csharp
public static char* GetAddressOfStringData (this System.Runtime.InteropServices.PinnedGCHandle<string> handle);
```

Retrieves the address of the string data in `handle`.

Parameters:

- `handle`: The handle to retrieve the pointer from.

Returns: The address of the 0th character of the pinned `String`, or `null` if the handle doesn't point to any object.

Exceptions:

- `NullReferenceException`: The handle is not initialized or is already disposed.

To be added.
