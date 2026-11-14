---
title: "IcorDebugVariableHome::GetLiveRange Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugvariablehome-getliverange-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
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
