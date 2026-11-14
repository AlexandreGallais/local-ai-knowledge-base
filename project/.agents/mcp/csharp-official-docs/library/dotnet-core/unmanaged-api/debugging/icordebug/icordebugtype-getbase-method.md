---
title: "ICorDebugType::GetBase Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugtype-getbase-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugType::GetBase Method

Gets an interface pointer to an ICorDebugType that represents the base type, if one exists, of the type represented by this `ICorDebugType`.

## Syntax

```cpp
HRESULT GetBase (
    [out] ICorDebugType   **pBase
);
```

## Parameters

 `pBase`
 [out] A pointer to the address of an `ICorDebugType` object that represents the base type.

## Remarks

Looking up the base type for a type is useful to implement common debugger functionality, such as printing out all the fields of an object or its parent classes.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
