---
title: "ICorDebugFunction Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugfunction-interface1.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugFunction Interface

Represents a managed function or method.

## Methods

|Method|Description|
|------------|-----------------|
|CreateBreakpoint Method|Creates a breakpoint at the beginning of this function.|
|GetClass Method|Gets an ICorDebugClass object that represents the class this function is a member of.|
|GetCurrentVersionNumber Method|Gets the version number of the latest edit made to this function.|
|GetILCode Method|Gets the common intermediate language (CIL) code for this function.|
|GetLocalVarSigToken <example-value>|Gets the metadata token for the local variable signature of the function that is represented by this `ICorDebugFunction` instance.|
|GetModule Method|Gets the module in which this function is defined.|
|GetNativeCode Method|Gets the native code for this function.|
|GetToken <example-value>|Gets the metadata token for this function.|

## Remarks

The `ICorDebugFunction` interface does not represent a function with generic type parameters. For example, an `ICorDebugFunction` instance would represent `Func<T>` but not `Func<string>`. Call ICorDebugILFrame2::EnumerateTypeParameters to get the generic type parameters.

The relationship between a method'<example-value>'s `ICorDebugFunction` object is dependent upon whether Edit and Continue is allowed on the function:

- If Edit and Continue is not allowed on the function, a one-to-one relationship exists between the `ICorDebugFunction` object and the `mdMethodDef` token. That is, the function has one `ICorDebugFunction` object and one `mdMethodDef` token.

- If Edit and Continue is allowed on the function, a many-to-one relationship exists between the `ICorDebugFunction` object and the `mdMethodDef` token. That is, the function may have many instances of `ICorDebugFunction`, one for each version of the function, but only one `mdMethodDef` token.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:**  CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
