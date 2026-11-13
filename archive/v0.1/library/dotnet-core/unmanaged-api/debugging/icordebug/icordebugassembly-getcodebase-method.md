---
title: "ICorDebugAssembly::GetCodeBase Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugassembly-getcodebase-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugAssembly::GetCodeBase Method

This method is not implemented.

## Syntax

```cpp
HRESULT GetCodeBase (
    [in] ULONG32  cchName,
    [out] ULONG32 *pcchName,
    [out, size_is(cchName), length_is(*pcchName)]
        WCHAR szName[]
);
```
