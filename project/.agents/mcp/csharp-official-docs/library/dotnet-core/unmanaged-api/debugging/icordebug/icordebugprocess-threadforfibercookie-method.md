---
title: "ICorDebugProcess::ThreadForFiberCookie Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess-threadforfibercookie-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugProcess::ThreadForFiberCookie Method

This method is not implemented.

## Syntax

```cpp
HRESULT ThreadForFiberCookie (
    [in] DWORD fiberCookie,
    [out] ICorDebugThread **ppThread
);
```

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
