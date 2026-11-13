---
title: "ICorDebugType::GetBase Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugtype-getbase-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
