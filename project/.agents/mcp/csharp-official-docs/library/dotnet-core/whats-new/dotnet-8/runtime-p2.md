---
title: "What's new in .NET 8 runtime (part 2 of 6)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/whats-new/dotnet-8/runtime.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# What's new in .NET 8 runtime (part 2 of 6)

## Core .NET libraries

This section contains the following subtopics:

- Reflection
- Serialization
- Time abstraction
- UTF8 improvements
- Methods for working with randomness
- Performance-focused types
- System.Numerics and System.Runtime.Intrinsics
- Data validation
- Metrics
- Cryptography
- Networking
- Stream-based ZipFile methods

### Reflection

Function pointers were introduced in .NET 5, however, the corresponding support for reflection wasn't added at that time. When using `typeof` or reflection on a function pointer, for example, `typeof(delegate*<void>())` or `FieldInfo.FieldType` respectively, an `System.IntPtr` was returned. Starting in .NET 8, a `System.Type` object is returned instead. This type provides access to function pointer metadata, including the calling conventions, return type, and parameters.

> **Note:**
> A function pointer instance, which is a physical address to a function, continues to be represented as an `System.IntPtr`. Only the reflection type has changed.

The new functionality is currently implemented only in the CoreCLR runtime and `System.Reflection.MetadataLoadContext`.

New APIs have been added to `System.Type`, such as `System.Type.IsFunctionPointer`, and to `System.Reflection.PropertyInfo`, `System.Reflection.FieldInfo`, and `System.Reflection.ParameterInfo`. The following code shows how to use some of the new APIs for reflection.

```csharp
﻿using System;
using System.Reflection;

// Sample class that contains a function pointer field.
public unsafe class UClass
{
    public delegate* unmanaged[Cdecl, SuppressGCTransition]<in int, void> _fp;
}

internal class FunctionPointerReflection
{
    public static void RunIt()
    {
        FieldInfo? fieldInfo = typeof(UClass).GetField(nameof(UClass._fp));

        // Obtain the function pointer type from a field.
        Type? fpType = fieldInfo?.FieldType;

        // New methods to determine if a type is a function pointer.
        Console.WriteLine(
        $"IsFunctionPointer: {fpType?.IsFunctionPointer}");
        Console.WriteLine(
            $"IsUnmanagedFunctionPointer: {fpType?.IsUnmanagedFunctionPointer}");

        // New methods to obtain the return and parameter types.
        Console.WriteLine($"Return type: {fpType?.GetFunctionPointerReturnType()}");

        if (fpType is not null)
        {
            foreach (Type parameterType in fpType.GetFunctionPointerParameterTypes())
            {
                Console.WriteLine($"Parameter type: {parameterType}");
            }
        }

        // Access to custom modifiers and calling conventions requires a "modified type".
        Type? modifiedType = fieldInfo?.GetModifiedFieldType();

        // A modified type forwards most members to its underlying type.
        Type? normalType = modifiedType?.UnderlyingSystemType;

        if (modifiedType is not null)
        {
            // New method to obtain the calling conventions.
            foreach (Type callConv in modifiedType.GetFunctionPointerCallingConventions())
            {
                Console.WriteLine($"Calling convention: {callConv}");
            }
        }

        // New method to obtain the custom modifiers.
        Type[]? modifiers =
            modifiedType?.GetFunctionPointerParameterTypes()[0].GetRequiredCustomModifiers();

        if (modifiers is not null)
        {
            foreach (Type modreq in modifiers)
            {
                Console.WriteLine($"Required modifier for first parameter: {modreq}");
            }
        }
    }
}
```
The previous example produces the following output:

```output
IsFunctionPointer: True
IsUnmanagedFunctionPointer: True
Return type: System.Void
Parameter type: System.Int32&
Calling convention: System.Runtime.CompilerServices.CallConvSuppressGCTransition
Calling convention: System.Runtime.CompilerServices.CallConvCdecl
Required modifier for first parameter: System.Runtime.InteropServices.InAttribute
```
