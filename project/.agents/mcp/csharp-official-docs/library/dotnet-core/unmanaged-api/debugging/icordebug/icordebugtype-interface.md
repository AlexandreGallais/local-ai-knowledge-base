---
title: "ICorDebugType Interface"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugtype-interface.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugType Interface

Represents a type, either basic or complex (that is, user-defined). If the type is generic, `ICorDebugType` represents the instantiated generic type.

## Methods

|Method|Description|
|------------|-----------------|
|EnumerateTypeParameters Method|Gets an interface pointer to an ICorDebugTypeEnum that references the generic `System.Type` parameters of the class referenced by this `ICorDebugType`.|
|GetBase Method|Gets an interface pointer to an `ICorDebugType` that references the base class of the class referenced by this `ICorDebugType`, if one exists.|
|GetClass Method|Gets an interface pointer to an ICorDebugClass that references the typed constructor of this `ICorDebugType`.|
|GetFirstTypeParameter Method|Gets an interface pointer to an `ICorDebugType` that references the first generic `System.Type` parameter for the constructor of the class referenced by this `ICorDebugType`.|
|GetRank Method|Gets the number of dimensions in an array type.|
|GetStaticFieldValue Method|Gets an interface pointer to an ICorDebugValue that contains the value of the static field referenced by the specified field token in the specified stack frame.|
|GetType Method|Gets a CorElementType value that describes the native type of the common language runtime `System.Type` referenced by this `ICorDebugType`.|

## Remarks

If the type is generic, `ICorDebugClass` represents the uninstantiated type. The `ICorDebugType` interface represents an instantiated generic type. For example, Hashtable\<K, V> would be represented by `ICorDebugClass`, whereas Hashtable\<Int32, String> would be represented by `ICorDebugType`.

Non-generic types are represented by both `ICorDebugClass` and `ICorDebugType`. The latter interface was introduced in .NET Framework 2.0 to deal with type instantiation.

> **Note:**
> This interface does not support being called remotely, either cross-machine or cross-process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
