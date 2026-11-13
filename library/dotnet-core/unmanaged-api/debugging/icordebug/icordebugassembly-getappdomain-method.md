---
title: "ICorDebugAssembly::GetAppDomain Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugassembly-getappdomain-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugAssembly::GetAppDomain Method

Gets an interface pointer to the application domain that contains this `ICorDebugAssembly` instance.

## Syntax

```cpp
HRESULT GetAppDomain (
    [out] ICorDebugAppDomain  **ppAppDomain
);
```

## Parameters

 `ppAppDomain`
 [out] A pointer to the address of an ICorDebugAppDomain interface that represents the application domain.

## Remarks

If this assembly is the system assembly, `GetAppDomain` returns null.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
