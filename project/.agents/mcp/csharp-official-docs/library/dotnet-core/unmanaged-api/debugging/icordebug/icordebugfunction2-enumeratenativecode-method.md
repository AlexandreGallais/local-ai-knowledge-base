---
title: "ICorDebugFunction2::EnumerateNativeCode Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugfunction2-enumeratenativecode-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
