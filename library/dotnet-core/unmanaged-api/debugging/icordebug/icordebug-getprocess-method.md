---
title: "ICorDebug::GetProcess Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebug-getprocess-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebug::GetProcess Method

Gets a pointer to the "ICorDebugProcess" instance for the specified process.

## Syntax

```cpp
HRESULT GetProcess (
    [in] DWORD               dwProcessId,
    [out] ICorDebugProcess   **ppProcess
);
```

## Parameters

 `dwProcessId`
 [in] The ID of the process.

 `ppProcess`
 [out] A pointer to the address of a `ICorDebugProcess` instance for the specified process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebug Interface
