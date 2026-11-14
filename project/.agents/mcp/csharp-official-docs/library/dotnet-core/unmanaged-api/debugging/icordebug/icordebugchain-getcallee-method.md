---
title: "ICorDebugChain::GetCallee Method"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/unmanaged-api/debugging/icordebug/icordebugchain-getcallee-method.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# ICorDebugChain::GetCallee Method

Gets the chain that was called by this chain.

## Syntax

```cpp
HRESULT GetCallee (
    [out] ICorDebugChain     **ppChain
);
```

## Parameters

 `ppChain`
 [out] A pointer to the address of an ICorDebugChain object that represents the called chain. If this chain is currently executing (that is, if this chain is not waiting for a called chain to return), `ppChain` will be null.

## Remarks

This chain will wait for the called chain to return before it resumes execution. The called chain may be on another thread in the case of cross-thread marshalled calls.

## Requirements

 **Platforms:** See .NET supported operating systems.

 **Header:** CorDebug.idl, CorDebug.h

 **Library:** CorGuids.lib

 **.NET versions:** Available since .NET Framework 1.0
