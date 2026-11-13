---
title: "ICorDebugType::GetClass Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugtype-getclass-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugType::GetClass Method

Gets an interface pointer to an ICorDebugClass that represents the uninstantiated generic type.

## Syntax

```cpp
HRESULT GetClass (
    [out] ICorDebugClass   **ppClass
);
```

## Parameters

 `ppClass`
 [out] A pointer to the address of an `ICorDebugClass` interface that represents the uninstantiated generic type.

## Remarks

 `GetClass` can be called only under certain conditions. Call ICorDebugType::GetType before calling `GetClass`. If `ICorDebugType::GetType` returns a CorElementType value that is ELEMENT_TYPE_CLASS or ELEMENT_TYPE_VALUETYPE, `GetClass` can be called to get the uninstantiated type for a generic type.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 2.0
