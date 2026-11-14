---
title: "ICorDebugFunction::GetClass Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugfunction-getclass-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugFunction::GetClass Method

Gets an ICorDebugClass object that represents the class this function is a member of.

## Syntax

```cpp
HRESULT GetClass (
    [out] ICorDebugClass **ppClass
);
```

## Parameters

 `ppClass`
 [out] A pointer to the address of the `ICorDebugClass` object that represents the class, or null, if this function is not a member of a class.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
