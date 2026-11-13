---
title: "ICorDebugFunction2::EnumerateNativeCode Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugfunction2-enumeratenativecode-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugFunction2::EnumerateNativeCode Method

Gets an interface pointer to an ICorDebugCodeEnum object that contains the native code statements in the function referenced by this ICorDebugFunction2 object.

> **Note:**
> `EnumerateNativeCode` is not implemented in the current version of the .NET Framework.

## Syntax

```cpp
HRESULT EnumerateNativeCode (
    [out] ICorDebugCodeEnum   **ppCodeEnum
);
```

## Requirements

 **Header:** CorDebug.idl, CorDebug.h
