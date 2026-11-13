---
title: "ICorDebugAppDomain::GetProcess Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugappdomain-getprocess-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugAppDomain::GetProcess Method

Gets the process containing the application domain.

## Syntax

```cpp
HRESULT GetProcess (
    [out] ICorDebugProcess   **ppProcess
);
```

## Parameters

 `ppProcess`
 [out] A pointer to the address of an ICorDebugProcess object that represents the process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
