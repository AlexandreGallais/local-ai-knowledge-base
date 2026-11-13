---
title: "ICorDebugAppDomain::IsAttached Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugappdomain-isattached-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# ICorDebugAppDomain::IsAttached Method

Gets a value that indicates whether the debugger is attached to the application domain.

## Syntax

```cpp
HRESULT IsAttached (
    [out] BOOL  *pbAttached
);
```

## Parameters

 `pbAttached`
 [out] `true` if the debugger is attached to the application domain; otherwise, `false`.

## Remarks

The ICorDebugController methods cannot be used until the debugger attaches to the application domain.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
