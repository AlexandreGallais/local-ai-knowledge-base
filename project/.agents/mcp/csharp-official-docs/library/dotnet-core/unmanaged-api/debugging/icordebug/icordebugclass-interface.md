---
title: "ICorDebugClass Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugclass-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugClass Interface

Represents a type, which can be either basic or complex (that is, user-defined). If the type is generic, `ICorDebugClass` represents the uninstantiated generic type.

## Methods

|Method|Description|
|------------|-----------------|
|GetModule Method|Gets the module that defines this class.|
|GetStaticFieldValue Method|Gets the value of the specified static field.|
|GetToken <example-value>|Gets the `TypeDef` metadata token for this class.|

## Remarks

The `ICorDebugClass` interface represents an uninstantiated generic type. The `ICorDebugType` interface represents an instantiated generic type. For example, `Hashtable<K, V>` would be represented by `ICorDebugClass`, whereas `Hashtable<Int32, String>` would be represented by `ICorDebugType`.

Non-generic types are represented by both `ICorDebugClass` and `ICorDebugType`. The latter interface was introduced in .NET Framework 2.0 to deal with type instantiation.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
