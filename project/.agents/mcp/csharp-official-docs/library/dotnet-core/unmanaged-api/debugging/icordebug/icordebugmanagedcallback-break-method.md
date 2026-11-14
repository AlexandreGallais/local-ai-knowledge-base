---
title: "ICorDebugManagedCallback::Break Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-break-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugManagedCallback::Break Method

Notifies the debugger when a `System.Reflection.Emit.OpCodes.Break` instruction in the code stream is executed.

## Syntax

```cpp
HRESULT Break (
    [in] ICorDebugAppDomain *pAppDomain,
    [in] ICorDebugThread    *thread
);
```

## Parameters

`pAppDomain`\
[in] A pointer to an ICorDebugAppDomain object that represents the application domain that contains the break instruction.

`thread`\
[in] A pointer to an ICorDebugThread object that represents the thread that contains the break instruction.

## Requirements

**Platforms:** See .NET supported operating systems.

**Header:** CorDebug.idl, CorDebug.h

**Library:** CorGuids.lib

**.NET versions:** Available since .NET Framework 1.0

## See also

- ICorDebugManagedCallback Interface
