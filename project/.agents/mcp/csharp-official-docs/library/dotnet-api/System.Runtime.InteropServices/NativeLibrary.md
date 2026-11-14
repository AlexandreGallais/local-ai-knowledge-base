---
title: "NativeLibrary class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/NativeLibrary.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NativeLibrary class

Namespace: `System.Runtime.InteropServices`

```csharp
public static class NativeLibrary
```

Provides APIs for managing native libraries.

To be added.

## NativeLibrary.Free(IntPtr) method

```csharp
public static void Free (IntPtr handle);
```

Frees a loaded library with the specified OS handle, or takes no action if the input handle is `IntPtr.Zero`.

Parameters:

- `handle`: The native library OS handle to be freed.

To be added.

## NativeLibrary.GetExport(IntPtr, String) method

```csharp
public static IntPtr GetExport (IntPtr handle, string name);
```

Gets the address of an exported symbol.

Parameters:

- `handle`: The native library OS handle.
- `name`: The name of the exported symbol.

Returns: The address of the symbol.

Exceptions:

- `ArgumentNullException`: `handle` is `IntPtr.Zero` or `name` is `null`.
- `EntryPointNotFoundException`: The symbol is not found.

This is a simple wrapper around OS calls and does not perform any name mangling.

Calling this method with an invalid `handle` parameter other than `Zero` is not supported and will result in undefined behaviour.

## NativeLibrary.GetMainProgramHandle() method

```csharp
public static IntPtr GetMainProgramHandle ();
```

Get a handle that can be used with `NativeLibrary.GetExport` or `NativeLibrary.TryGetExport` to resolve exports from the entry point module.

Returns: The handle that can be used to resolve exports from the entry point module.

To be added.

## NativeLibrary.Load(String) method

```csharp
public static IntPtr Load (string libraryPath);
```

Provides a simple API for loading a native library that wraps the OS loader and uses default flags.

Parameters:

- `libraryPath`: The name of the native library to be loaded.

Returns: The OS handle for the loaded native library.

Exceptions:

- `ArgumentNullException`: `libraryPath` is `null`.
- `DllNotFoundException`: The library can't be found.
- `BadImageFormatException`: The library is not valid.

To be added.

## NativeLibrary.Load(String, Assembly, DllImportSearchPath>) method

```csharp
public static IntPtr Load (string libraryName, System.Reflection.Assembly assembly, System.Runtime.InteropServices.DllImportSearchPath? searchPath);
```

Provides a high-level API for loading a native library.

Parameters:

- `libraryName`: The name of the native library to be loaded.
- `assembly`: The assembly loading the native library.
- `searchPath`: The search path.

Returns: The OS handle for the loaded library.

Exceptions:

- `ArgumentNullException`: `libraryName` or `assembly` is `null`.
- `ArgumentException`: `assembly` is not a `RuntimeAssembly`.
- `DllNotFoundException`: The library can't be found.
- `BadImageFormatException`: The library is not valid.

Given a library name, this method searches specific paths based on the runtime configuration, input parameters, and attributes of the calling assembly. If the `searchPath` parameter is non-null, the flags in this enumeration are used. Otherwise, the flags specified by the `DefaultDllImportSearchPathsAttribute` on the calling assembly, if any are present, are used. This method does not invoke the resolver registered using `SetDllImportResolver`
method. This method invokes the `AssemblyLoadContext.LoadUnmanagedDll` method and the `ResolvingUnmanagedDll` event.

## NativeLibrary.SetDllImportResolver(Assembly, DllImportResolver) method

```csharp
public static void SetDllImportResolver (System.Reflection.Assembly assembly, System.Runtime.InteropServices.DllImportResolver resolver);
```

Sets a callback for resolving native library imports from an assembly.

Parameters:

- `assembly`: The assembly for which the resolver is registered.
- `resolver`: The resolver callback to register.

Exceptions:

- `ArgumentNullException`: `assembly` or `resolver` is `null`.
- `ArgumentException`: A resolver is already set for this assembly.

This per-assembly resolver is the first attempt to resolve native library loads initiated by this assembly.

The callers of this method should register the resolver for their own assemblies only.

Only one resolver can be registered per assembly. Trying to register a second resolver fails with an `InvalidOperationException`.

## NativeLibrary.TryGetExport(IntPtr, String, IntPtr) method

```csharp
public static bool TryGetExport (IntPtr handle, string name, out IntPtr address);
```

Gets the address of an exported symbol and returns a value that indicates whether the method call succeeded.

Parameters:

- `handle`: The native library OS handle.
- `name`: The name of the exported symbol.
- `address`: When the method returns, contains the symbol address, if it exists.

Returns: `true` if the address of the exported symbol was found successfully; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `handle` is `IntPtr.Zero` or `name` is `null`.

This is a simple wrapper around OS calls and does not perform any name mangling.

Calling this method with a invalid `handle` parameter other than `Zero` is not supported and will result in undefined behaviour.

## NativeLibrary.TryLoad(String, IntPtr) method

```csharp
public static bool TryLoad (string libraryPath, out IntPtr handle);
```

Provides a simple API for loading a native library and returns a value that indicates whether the operation succeeded.

Parameters:

- `libraryPath`: The name of the native library to be loaded.
- `handle`: When the method returns, the OS handle of the loaded native library.

Returns: `true` if the native library was loaded successfully; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `libraryPath` is `null`.

To be added.

## NativeLibrary.TryLoad(String, Assembly, DllImportSearchPath>, IntPtr) method

```csharp
public static bool TryLoad (string libraryName, System.Reflection.Assembly assembly, System.Runtime.InteropServices.DllImportSearchPath? searchPath, out IntPtr handle);
```

Provides a high-level API that loads a native library and returns a value that indicates whether the operation succeeded.

Parameters:

- `libraryName`: The name of the native library to be loaded.
- `assembly`: The assembly loading the native library.
- `searchPath`: The search path.
- `handle`: When the method returns, the OS handle of the loaded native library.

Returns: `true` if the native library was loaded successfully; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `libraryName` or `assembly` is `null`.
- `ArgumentException`: `assembly` is not a `RuntimeAssembly`.

To be added.
