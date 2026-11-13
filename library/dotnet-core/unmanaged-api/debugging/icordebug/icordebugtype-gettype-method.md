---
title: "ICorDebugType::GetType Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugtype-gettype-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
