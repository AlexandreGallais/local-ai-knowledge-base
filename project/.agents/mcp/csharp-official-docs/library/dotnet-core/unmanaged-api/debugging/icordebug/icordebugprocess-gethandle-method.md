---
title: "ICorDebugProcess::GetHandle Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess-gethandle-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugProcess::GetHandle Method

Gets a handle to the process.

## Syntax

```cpp
HRESULT GetHandle([out] HPROCESS *phProcessHandle);
```

## Parameters

 `phProcessHandle`
 [out] A pointer to an `HPROCESS` that is the handle to the process.

## Remarks

The retrieved handle is owned by the debugging interface. The debugger should duplicate the handle before using it.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
