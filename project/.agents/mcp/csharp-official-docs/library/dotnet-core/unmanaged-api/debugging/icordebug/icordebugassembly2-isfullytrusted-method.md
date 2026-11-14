---
title: "ICorDebugAssembly2::IsFullyTrusted Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugassembly2-isfullytrusted-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugAssembly2::IsFullyTrusted Method

Gets a value that indicates whether the assembly has been granted full trust by the runtime security system.

## Syntax

```cpp
HRESULT IsFullyTrusted(
    [out] BOOL *pbFullyTrusted
);
```

## Parameters

 `pbFullyTrusted`
 [out] `true` if the assembly has been granted full trust by the runtime security system; otherwise, `false`.

## Remarks

This method returns an HRESULT of CORDBG_E_NOTREADY if the security policy for the assembly has not yet been resolved, that is, if no code in the assembly has been run yet.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
