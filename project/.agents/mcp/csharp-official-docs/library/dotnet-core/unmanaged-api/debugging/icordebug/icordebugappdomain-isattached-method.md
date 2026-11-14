---
title: "ICorDebugAppDomain::IsAttached Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugappdomain-isattached-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
