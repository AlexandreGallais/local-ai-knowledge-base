---
title: "ICorDebugRegisterSet::SetThreadContext Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugregisterset-setthreadcontext-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugRegisterSet::SetThreadContext Method

`SetThreadContext` is not implemented.

> **Note:**
> Use the higher-level operation ICorDebugNativeFrame::SetIP to set the context of a thread.

## Syntax

```cpp
HRESULT SetThreadContext (
    [in] ULONG32 contextSize,
    [in, length_is(contextSize),
         size_is(contextSize)] BYTE context[]
);
```

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** 1.1, 1.0

## See also

- ICorDebugRegisterSet Interface
- ICorDebugRegisterSet2 Interface
