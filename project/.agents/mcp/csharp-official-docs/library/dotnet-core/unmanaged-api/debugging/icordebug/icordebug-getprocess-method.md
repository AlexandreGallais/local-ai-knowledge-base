---
title: "ICorDebug::GetProcess Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebug-getprocess-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
