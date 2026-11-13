---
title: "ICorDebugProcess::GetHandle Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugprocess-gethandle-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
