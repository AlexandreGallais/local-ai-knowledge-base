---
title: "ICorDebugCode::GetFunction Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugcode-getfunction-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugCode::GetFunction Method

Gets the "ICorDebugFunction" associated with this "ICorDebugCode".

## Syntax

```cpp
HRESULT GetFunction (
    [out] ICorDebugFunction **ppFunction
);
```

## Parameters

 `ppFunction`
 [out] A pointer to the address of the function.

## Remarks

 `ICorDebugCode` and `ICorDebugFunction` maintain a one-to-one relationship.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
