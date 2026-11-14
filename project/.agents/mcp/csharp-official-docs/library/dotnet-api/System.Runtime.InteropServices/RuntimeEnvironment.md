---
title: "RuntimeEnvironment class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/RuntimeEnvironment.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RuntimeEnvironment class

Namespace: `System.Runtime.InteropServices`

```csharp
public static class RuntimeEnvironment
```

Provides a collection of `static` methods that return information about the common language runtime environment.

#### Examples
This example shows how to call many of the methods defined by the `RuntimeEnvironment` class.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/RuntimeEnvironment/Overview/RuntimeEnvironment.cs._

## RuntimeEnvironment.SystemConfigurationFile property

```csharp
public static string SystemConfigurationFile { get; }
```

Gets the path to the system configuration file.

Returns: The path to the system configuration file.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## RuntimeEnvironment.FromGlobalAccessCache(Assembly) method

```csharp
public static bool FromGlobalAccessCache (System.Reflection.Assembly a);
```

Tests whether the specified assembly is loaded in the global assembly cache.

Parameters:

- `a`: The assembly to test.

Returns: `true` if the assembly is loaded in the global assembly cache; otherwise, `false`.

#### Examples
The following example demonstrates calling the `RuntimeEnvironment.FromGlobalAccessCache` method. This code example is part of a larger example provided for the `RuntimeEnvironment` class.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/RuntimeEnvironment/Overview/RuntimeEnvironment.cs._

## RuntimeEnvironment.GetRuntimeDirectory() method

```csharp
public static string GetRuntimeDirectory ();
```

Returns the directory where the common language runtime is installed.

Returns: A string that contains the path to the directory where the common language runtime is installed.

#### Examples
The following example demonstrates calling the `RuntimeEnvironment.GetRuntimeDirectory` method. This code example is part of a larger example provided for the `RuntimeEnvironment` class.

_Code sample not included: ~/snippets/csharp/System.Runtime.InteropServices/RuntimeEnvironment/Overview/RuntimeEnvironment.cs._

## RuntimeEnvironment.GetRuntimeInterfaceAsIntPtr(Guid, Guid) method

```csharp
public static IntPtr GetRuntimeInterfaceAsIntPtr (Guid clsid, Guid riid);
```

Returns the specified interface on the specified class.

Parameters:

- `clsid`: The identifier for the desired class.
- `riid`: The identifier for the desired interface.

Returns: An unmanaged pointer to the requested interface.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## RuntimeEnvironment.GetRuntimeInterfaceAsObject(Guid, Guid) method

```csharp
public static object GetRuntimeInterfaceAsObject (Guid clsid, Guid riid);
```

Returns an instance of a type that represents a COM object by a pointer to its `IUnknown` interface.

Parameters:

- `clsid`: The identifier for the desired class.
- `riid`: The identifier for the desired interface.

Returns: An object that represents the specified unmanaged COM object.

Exceptions:

- `PlatformNotSupportedException`: In all cases.

To be added.

## RuntimeEnvironment.GetSystemVersion() method

```csharp
public static string GetSystemVersion ();
```

Gets the version number of the common language runtime that's running the current process.

Returns: A string containing the version number of the common language runtime.

On .NET 8 and later, this method returns `v` concatenated with `Environment.Version`, which is the version of the CLR. For example: `v8.0.0`.
