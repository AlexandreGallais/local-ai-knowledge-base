---
title: "ICorDebugAppDomain::GetId Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugappdomain-getid-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugAppDomain::GetId Method

Gets the unique identifier of the application domain.

## Syntax

```cpp
HRESULT GetID (
    [out] ULONG32   *pId
);
```

## Parameters

 `pId`
 [out] The unique identifier of the application domain.

## Remarks

The identifier for the application domain is unique within the containing process.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
