---
title: "ICorDebugManagedCallback::Break Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/unmanaged-api/debugging/icordebug/icordebugmanagedcallback-break-method.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
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
