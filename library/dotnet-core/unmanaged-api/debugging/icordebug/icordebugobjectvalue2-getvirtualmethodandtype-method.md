---
title: "ICorDebugObjectValue2::GetVirtualMethodAndType Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugobjectvalue2-getvirtualmethodandtype-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
