---
title: "ComWrappers class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/ComWrappers.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ComWrappers class (part 2 of 2)

## ComWrappers.TryGetObject(IntPtr, Object) method

```csharp
public static bool TryGetObject (IntPtr unknown, out object? obj);
```

Determines if the specified COM object is a `ComWrappers`-created unmanaged wrapper and if so, returns the wrapped managed object.

Parameters:

- `unknown`: The unmanaged wrapper.
- `obj`: The managed object.

Returns: `true` if the wrapper was resolved to a managed object, otherwise `false`.

To be added.
