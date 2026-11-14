---
title: "ICorDebugObjectValue2::GetVirtualMethodAndType Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugobjectvalue2-getvirtualmethodandtype-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugObjectValue2::GetVirtualMethodAndType Method

This method is not yet implemented.

## Syntax

```cpp
HRESULT GetVirtualMethodAndType (
    [in] mdMemberRef          memberRef,
    [out] ICorDebugFunction   **ppFunction,
    [out] ICorDebugType       **ppType
);
```

## Remarks

Gets interface pointers to the "ICorDebugFunction" and "ICorDebugType" instances that represent the most derived method and type for the specified member reference.
