---
title: "IcorDebugVariableHome::GetLiveRange Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugvariablehome-getliverange-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# IcorDebugVariableHome::GetLiveRange Method

Gets the native range over which this variable is live.

## Syntax

```cpp
HRESULT GetLiveRange(
    [out] ULONG32* pStartOffset,
    [out] ULONG32 *pEndOffset
);
```

## Parameters

 `pStartOffset`
 [out] The logical offset at which the variable is first live.

 `pEndOffset`
 [out] The logical offset immediately after the point at which the variable is last live.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 4.6.2

## See also

- ICorDebugVariableHome Interface
