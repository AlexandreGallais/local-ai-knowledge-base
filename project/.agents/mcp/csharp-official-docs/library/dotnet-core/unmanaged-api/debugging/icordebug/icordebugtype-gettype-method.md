---
title: "ICorDebugType::GetType Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugtype-gettype-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugType::GetType Method

Gets a CorElementType value that describes the native type of the common language runtime (CLR) `System.Type` represented by this ICorDebugType.

## Syntax

```cpp
HRESULT GetType (
    [out] CorElementType   *ty
);
```

## Parameters

 `ty`
 [out] A pointer to a value of the `CorElementType` enumeration that indicates the CLR `System.Type` that this `ICorDebugType` represents.

## Remarks

If the value of `ty` is either ELEMENT_TYPE_CLASS or ELEMENT_TYPE_VALUETYPE, the ICorDebugType::GetClass method may be called to get the uninstantiated type for a generic type; otherwise, do not call `ICorDebugType::GetClass`.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
